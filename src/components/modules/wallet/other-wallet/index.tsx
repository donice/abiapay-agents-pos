"use client";
import React, { useEffect, useState } from "react";
import "./style.scss";
import TransferWalletCards from "../components/wallet-cards";
import { FormTextInput } from "@/src/components/common/input";
import { Button } from "@/src/components/common/button";
import { useForm } from "react-hook-form";
import { useDebounce } from "@/src/hooks/useDebounce";
import { fetchWalletInfo } from "@/src/services/walletService";
import { CustomHeader } from "@/src/components/common/header";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { SmallLoader } from "@/src/components/common/loader";

const OtherWalletsTransferComponent = () => {
  const [beneficiary, setBeneficiary] = useState("");
  const {
    watch,
    setValue,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
      recipient_wallet_no: "",
      amount: "",
      desc: "",
    },
  });

  const walletNo = watch("recipient_wallet_no");
  const debouncedWalletNo = useDebounce(walletNo, 500);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: string) => {
      return fetchWalletInfo(data);
    },
    mutationKey: ["fetch_wallet_info"],
    onSuccess: (data) => {
      if (data.status == true) {
        setBeneficiary(data.data.VirtualAccountName);
      } else {
        // toast.error(data.message);
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
    console.log(reqData);
    toast.success("Transaction Successful");
  };

  return (
    <section className="other-wallet">
      <CustomHeader title={"Transfer"} desc={"Send money to other wallet"} />
      <TransferWalletCards />

      <form onSubmit={handleSubmit(onSubmit)} className="other-wallet_form">
        <FormTextInput
          type="number"
          label={"Beneficiary Wallet"}
          name="recipient_wallet_no"
          placeholder={"Enter Beneficiary Wallet ID"}
          register={register}
          validation={{ required: true }}
          error={errors.recipient_wallet_no}
        />
        {isPending && <p className="other-wallet_form_beneficiary"><SmallLoader/> </p>}
        {beneficiary !== "" && (
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
          validation={{ required: true }}
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
        <Button text="Pay" disabled={beneficiary === ""} />
      </form>
    </section>
  );
};

export default OtherWalletsTransferComponent;
