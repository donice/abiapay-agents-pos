"use client";
import { usePathname } from "next/navigation";
import { getLastPathSegment } from "@/src/utils/getLastPathSegment";
import React, { useEffect, useMemo, useState } from "react";
import {
  BackButton,
  FormButton,
  PrimaryButton,
} from "@/src/components/common/button";
import "./style.scss";
import { formatAmount } from "@/src/utils/formatAmount";
import { useMutation, useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { Loading } from "@/src/components/common/loader/redirecting";
import {
  BillPaymentPayload,
  FetchBillPayload,
  fetchBillPayment,
  fetchBills,
  fetchInstantAccount,
} from "@/src/services/billServices";
import { useForm } from "react-hook-form";
import { SelectInput } from "@/src/components/common/input";
import { InformationModal } from "@/src/components/common/modal";
import { getErrorMessages } from "@/src/utils/helper";
import { PiReceiptDuotone } from "react-icons/pi";

const Dynamic = () => {
  const path = usePathname();
  const segment = getLastPathSegment(path);
  const [billIsueeDetails, setBillIsueeDetails] = useState<any>({});

  const [show, setShow] = useState({
    mode: false,
    state: "",
    message: "",
    sum_message: "",
  });

  const [viewItems, setViewItems] = useState<any>(false);

  const { mutate } = useMutation({
    mutationFn: (data: FetchBillPayload) => {
      return fetchBillPayment(data);
    },
    onSuccess: (data: any) => {
      setBillIsueeDetails(data?.response_data);
    },
  });
  const { mutate: mutateGenerateAccount, isPending: isPendingGenerateAccount } =
    useMutation({
      mutationFn: (data: BillPaymentPayload) => {
        return fetchInstantAccount(data);
      },
      onSuccess: (data: any) => {
        if (data.response_code == "00") {
          setShow({
            mode: true,
            state: "success",
            message: data.response_message,
            sum_message:
              "Pay" +
              " " +
              data?.response_data?.transaction_amount +
              " " +
              "to the account:" +
              " " +
              data?.response_data?.virtual_acct_no +
              ", " +
              " " +
              data?.response_data?.virtual_acct_name +
              " " +
              "with the bank name:" +
              " " +
              data?.response_data?.bank_name,
          });
        } else if (data.response_code == "05") {
          setShow({
            mode: true,
            state: "warning",
            message: data.response_message,
            sum_message: "",
          });
        } else {
          setShow({
            mode: true,
            state: "error",
            message: data.response_message || getErrorMessages(data.message),
            sum_message: "",
          });
        }
      },
    });

  const { data, isError } = useQuery({
    queryKey: ["get_transactions"],
    queryFn: () => {
      return fetchBills();
    },
  });

  if (isError) {
    toast.error("Something went wrong fetching transactions");
    console.log("error");
  }

  const ticket = useMemo(() => {
    return data?.response_data?.filter(
      (ticket: { transref: string }) => ticket.transref === segment
    );
  }, [data, segment]);

  useEffect(() => {
    if (ticket && ticket.length > 0) {
      mutate({ bill_ref: ticket[0]?.transref });
    }
  }, [ticket]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BillPaymentPayload>({
    defaultValues: {
      notice_number: "",
      customer_name: "",
      customer_email: "",
      customer_phone: "",
      account_type: "access",
    },
  });

  const onSubmit = (formData: any) => {
    console.log(formData);
    mutateGenerateAccount(formData);
  };

  useEffect(() => {
    if (billIsueeDetails && ticket && ticket.length > 0) {
      setValue("notice_number", segment);
      setValue("customer_name", billIsueeDetails?.taxpayer_name);
      setValue("customer_email", billIsueeDetails?.agent_email);
      setValue("customer_phone", billIsueeDetails?.taxpayer_phone);
    }
  }, [billIsueeDetails]);

  return (
    <div className="bill-details">
      <h1>Bill Details</h1>
      {data?.response_data ? (
        <div className="bill-details_comp">
          <div>
            <p>Bill Status</p>
            <p>{ticket[0]?.status || "-"}</p>
          </div>
          <div>
            <p>Occurrence</p>
            <p>{ticket[0]?.occurrence || "-"}</p>
          </div>

          <div>
            <p>Amount</p>
            <p>₦{formatAmount(ticket[0]?.amount) || "-"}</p>
          </div>

          <div>
            <p>Taxpayer Name</p>
            <p>{billIsueeDetails?.taxpayer_name || "-"}</p>
          </div>

          <div>
            <p>Taxpayer Phone</p>
            <p>{billIsueeDetails?.taxpayer_phone || "-"}</p>
          </div>
          <div>
            <p>ABSSIN</p>
            <p>{ticket[0]?.taxpayer || "-"}</p>
          </div>

          <div>
            <p>MDA</p>
            <p>{ticket[0]?.mda || "-"}</p>
          </div>
          <div>
            <p>Revenue Item</p>
            <p>{ticket[0]?.rev_item || "-"}</p>
          </div>
          <div>
            <p>Bill Reference</p>
            <p>{ticket[0]?.transref || "-"}</p>
          </div>
          <div>
            <p>Date Created</p>
            <p>{ticket[0]?.transdate || "-"}</p>
          </div>
        </div>
      ) : (
        <Loading />
      )}

      <button className="bill-details_btn" onClick={() => setViewItems(!viewItems)}>
        <PiReceiptDuotone className="icon"/>{" "}
        <span>{!viewItems ? "View Bill Items" : "Hide Bill Items"}</span>
      </button>

      {viewItems &&
        billIsueeDetails?.items?.map((item: any, index: number) => (
          <div className="bill-details_comp" key={index}>
            <div>
              <p>Revenue Item</p>
              <p>{item?.revenue_item || "-"}</p>
            </div>
            <div>
              <p>Amount</p>
              <p>₦{formatAmount(item?.amount) || "-"}</p>
            </div>
            <div>
              <p>Payment Ref</p>
              <p>{item?.payment_ref || "-"}</p>
            </div>
          </div>
        ))}

      <form onSubmit={handleSubmit(onSubmit)} className="">
        <SelectInput
          label="Choose Wallet"
          name="account_type"
          id="account_type"
          register={register}
          validation={{ required: true }}
          options={[
            { value: "access", label: "Access Bank" },
            { value: "fidelity", label: "Fidelity Bank" },
          ]}
          placeholder="Select Wallet Type"
          error={!!errors.account_type}
        />
        <div className="bill-details_form_btn">
          <FormButton
            text={"Generate Instant Account"}
            disabled={isPendingGenerateAccount}
            loading={isPendingGenerateAccount}
          />
          <PrimaryButton text={"Send Bill"} />
          <BackButton link={"/bills"} />
        </div>
      </form>
      {show.mode == true && show.state == "success" && (
        <InformationModal
          mode="success"
          maintext={show.message}
          subtext={show.sum_message}
          link="/bills"
          success_text="Proceed to confirm payment"
        />
      )}
      {show.mode == true && show.state == "warning" && (
        <InformationModal
          mode="warning"
          maintext={show.message}
          subtext="Cannot proceed this bill instant account creation"
          link={`/bills`}
        />
      )}
      {show.mode == true && show.state == "error" && (
        <InformationModal
          mode="error"
          maintext={show.message}
          subtext="Cannot proceed this bill instant account creation"
          link={`/bills`}
        />
      )}
    </div>
  );
};

export default Dynamic;
