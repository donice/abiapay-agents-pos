"use client";
import React, { useEffect, useState } from "react";
import "./style.scss";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import {
  BackButton,
  Button,
  GoBackButton,
} from "@/src/components/common/button";
import { useForm } from "react-hook-form";
import { useDebounce } from "@/src/hooks/useDebounce";
import {
  AccessWalletToWallet,
  fetchWalletInfo,
  FidelityWalletToWallet,
  WalletToWalletPayload,
} from "@/src/services/walletService";
import { CustomHeader } from "@/src/components/common/header";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SmallLoader } from "@/src/components/common/loader";
import { fetchDashboardData } from "@/src/services/dashboardService";
import { SuccessModal } from "@/src/components/common/modal";
import { fetchBanks } from "@/src/services/common";

const StatemenrPage = ({ params }: { params: { slug: string } }) => {
  const activeAccount = params.slug;
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [beneficiary, setBeneficiary] = useState("");
  const [banks, setBanks] = useState([]);

  const {
    watch,
    setValue,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      cashout_type: "",
      merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
      recipient_wallet_no: "",
      amount: "",
      desc: "",
    },
  });
  const cashoutType = watch("cashout_type");
  const { onChange } = register("amount");

  const walletNo = watch("recipient_wallet_no");
  const debouncedWalletNo = useDebounce(walletNo, 500);

  const { data: dasboardData } = useQuery({
    queryKey: ["get_dashboard_data"],
    queryFn: () => {
      return fetchDashboardData();
    },
  });

  const getBanks = async () => {
    try {
      const data = await fetchBanks();
      console.log(data);
      setBanks(
        data?.response_data?.map((item: any) => {
          return {
            label: item.name,
            value: item.code,
          };
        })
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBanks();
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: string) => {
      return fetchWalletInfo(data);
    },
    mutationKey: ["fetch_wallet_info"],
    onSuccess: (data) => {
      if (data.status == true) {
        setBeneficiary(data.data.VirtualAccountName);
      } else {
        setBeneficiary("");
      }
    },
    onError: (error) => {
      setBeneficiary("");
      console.log(error);
    },
  });

  const { mutate: mutateTransfer, isPending: isPendingTransfer } = useMutation({
    mutationFn: (data: WalletToWalletPayload) => {
      return activeAccount == "access"
        ? AccessWalletToWallet(data)
        : FidelityWalletToWallet(data);
    },
    mutationKey: ["post_payment"],
    onSuccess: (data) => {
      if (data.response_code == "00") {
        toast.success("Transaction Successful");
        setShowSuccessModal(true);
        setBeneficiary(data.data.VirtualAccountName);
      } else {
        toast.error(data.response_message);
        setBeneficiary("");
      }
    },
    onError: (error) => {
      setBeneficiary("");
      console.log(error);
    },
  });

  useEffect(() => {
    if (debouncedWalletNo) {
      mutate(debouncedWalletNo);
    }
  }, [debouncedWalletNo, setValue]);

  const onSubmit = (reqData: any) => {
    mutateTransfer(reqData);
  };

  return (
    <section className="other-wallet">
      <GoBackButton link="/account/statement" />
      <form onSubmit={handleSubmit(onSubmit)} className="other-wallet_form">
        <SelectInput
          label={"Cashout Type"}
          name={"cashout_type"}
          id={"cashout_type"}
          register={register}
          options={[
            {
              value: "wallet",
              label: "Cashout to Wallet",
            },
            {
              value: "bank",
              label: "Cashout to Bank",
            },
          ]}
        />

        {cashoutType == "bank" && (
          <>
            {" "}
            <SelectInput
              label={"Bank Name"}
              name={"bank"}
              id={"bank"}
              register={register}
              options={banks}
            />
            <FormTextInput
              type="number"
              label={"Beneficiary Wallet"}
              name="recipient_wallet_no"
              placeholder={"Enter Beneficiary Wallet ID"}
              register={register}
              validation={{ required: true }}
              error={errors.recipient_wallet_no}
            />
            {isPending && (
              <p className="other-wallet_form_beneficiary">
                <SmallLoader />{" "}
              </p>
            )}
            {beneficiary !== "" && !isPending && (
              <div className="other-wallet_form_beneficiary">
                <p>{beneficiary}</p>
              </div>
            )}
            <FormTextInput
              type="number"
              label={"Amount"}
              name={"amount"}
              placeholder="Enter Amount"
              register={register}
              onChange={onChange}
              validation={{
                required: "Enter an amount",
                validate: (value: number) => {
                  if (activeAccount == "access") {
                    if (value > dasboardData?.access?.wallet_balance) {
                      return "Insufficient funds in your Access wallet";
                    }
                  } else {
                    if (value > dasboardData?.fidelity?.balance) {
                      return "Insufficient funds in your Fidelity wallet";
                    }
                  }
                },
              }}
              error={errors.amount}
            />
            <FormTextInput
              label={"Description"}
              name={"desc"}
              placeholder="Enter Description"
              register={register}
              validation={{ required: true }}
              error={errors.desc}
            />
            <Button
              text="Transfer Funds"
              loading={isPendingTransfer}
              disabled={isPendingTransfer}
            />
          </>
        )}
        {cashoutType == "wallet" && (
          <>
            {" "}
            <FormTextInput
              type="number"
              label={"Beneficiary Wallet"}
              name="recipient_wallet_no"
              placeholder={"Enter Beneficiary Wallet ID"}
              register={register}
              validation={{ required: true }}
              error={errors.recipient_wallet_no}
            />
            {isPending && (
              <p className="other-wallet_form_beneficiary">
                <SmallLoader />{" "}
              </p>
            )}
            {beneficiary !== "" && !isPending && (
              <div className="other-wallet_form_beneficiary">
                <p>{beneficiary}</p>
              </div>
            )}
            <FormTextInput
              type="number"
              label={"Amount"}
              name={"amount"}
              placeholder="Enter Amount"
              register={register}
              onChange={onChange}
              validation={{
                required: "Enter an amount",
                validate: (value: number) => {
                  if (activeAccount == "access") {
                    if (value > dasboardData?.access?.wallet_balance) {
                      return "Insufficient funds in your Access wallet";
                    }
                  } else {
                    if (value > dasboardData?.fidelity?.balance) {
                      return "Insufficient funds in your Fidelity wallet";
                    }
                  }
                },
              }}
              error={errors.amount}
            />
            <FormTextInput
              label={"Description"}
              name={"desc"}
              placeholder="Enter Description"
              register={register}
              validation={{ required: true }}
              error={errors.desc}
            />
            <Button
              text="Transfer Funds"
              loading={isPendingTransfer}
              disabled={isPendingTransfer}
            />
          </>
        )}

        {/* <Button text="Transfer Funds" disabled={beneficiary === ""} /> */}
      </form>

      {showSuccessModal && (
        <SuccessModal
          maintext={"Transaction completed successfully"}
          link={"/wallet"}
          text="You can now proceed to sp"
        />
      )}
    </section>
  );
};

export default StatemenrPage;
