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

const Dynamic = () => {
  const path = usePathname();
  const segment = getLastPathSegment(path);
  const [billIsueeDetails, setBillIsueeDetails] = useState<any>({});

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
        setBillIsueeDetails(data?.response_data);
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
      setValue("customer_email", billIsueeDetails?.customer_email);
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
            <p>₦ {formatAmount(ticket[0]?.amount) || "-"}</p>
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

      <form onSubmit={handleSubmit(onSubmit)} className="">
        <SelectInput
          label="Choose Wallet"
          name="wallet_type"
          id="wallet_type"
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
    </div>
  );
};

export default Dynamic;
