"use client";
import React, { useEffect, useState } from "react";
import "./style.scss";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { Button, GoBackButton } from "@/src/components/common/button";
import { useForm } from "react-hook-form";
import { useDebounce } from "@/src/hooks/useDebounce";
import {
  AccessTransferFunds,
  AccessWalletToWallet,
  fetchWalletInfo,
  FidelityTransferFunds,
  FidelityWalletToWallet,
  WalletToWalletBank,
  WalletToWalletPayload,
} from "@/src/services/walletService";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SmallLoader } from "@/src/components/common/loader";
import { fetchDashboardData } from "@/src/services/dashboardService";
import { SuccessModal } from "@/src/components/common/modal";
import { fetchBanks } from "@/src/services/common";

const StatementPage = ({ params }: { params: { slug: string } }) => {
  const activeAccount = params.slug;
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [beneficiary, setBeneficiary] = useState("");
  const [banks, setBanks] = useState([]);

  const {
    watch,
    setValue,
    register: registerTransferToBank,
    formState: { errors: errorsTransferToBank },
    handleSubmit: handleSubmitTransferToBank,
  } = useForm({
    defaultValues: {
      cashout_type: "",
      merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
      recipient_wallet_no: "",
      amount: "",
      desc: "",
    },
  });
  const {
    register: registerTransferWallet,
    formState: { errors: errorsTransferWallet },
    handleSubmit: handleSubmitTransferWallet,
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
  const { onChange } = registerTransferToBank("amount");

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
    mutationFn: (data: any) => {
      if (cashoutType == "wallet") {
        return activeAccount == "access"
          ? AccessWalletToWallet(data)
          : FidelityWalletToWallet(data);
      }
      if (cashoutType == "bank") {
        return activeAccount == "access"
          ? AccessTransferFunds(data)
          : FidelityTransferFunds(data);
      }
      throw new Error("Invalid cashout type or active account");
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
    console.log("DATA", reqData);
    mutateTransfer(reqData);
  };

  return (
    <section className="other-wallet">
      <header>
        <GoBackButton link="/account/statement" />
      </header>

      <SelectInput
        label={"Cashout Type"}
        name={"cashout_type"}
        id={"cashout_type"}
        register={registerTransferToBank}
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
        <form
          onSubmit={handleSubmitTransferToBank(onSubmit)}
          className="other-wallet_form"
        >
          {" "}
          <SelectInput
            label={"Bank Name"}
            name={"bank_code"}
            id={"bank_code"}
            register={registerTransferToBank}
            options={banks}
          />
          <FormTextInput
            type="number"
            label={"Beneficiary Wallet"}
            name="recipient_wallet_no"
            placeholder={"Enter Beneficiary Wallet ID"}
            register={registerTransferToBank}
            validation={{ required: true }}
            error={errorsTransferToBank.recipient_wallet_no}
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
            register={registerTransferToBank}
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
            error={errorsTransferToBank.amount}
          />
          <FormTextInput
            label={"Description"}
            name={"desc"}
            placeholder="Enter Description"
            register={registerTransferToBank}
            validation={{ required: true }}
            error={errorsTransferToBank.desc}
          />
          <Button
            text="Transfer Funds"
            loading={isPendingTransfer}
            disabled={isPendingTransfer}
          />
        </form>
      )}

      {cashoutType == "wallet" && (
        <form
          onSubmit={handleSubmitTransferWallet(onSubmit)}
          className="other-wallet_form"
        >
          {" "}
          <FormTextInput
            type="number"
            label={"Beneficiary Wallet"}
            name="recipient_wallet_no"
            placeholder={"Enter Beneficiary Wallet ID"}
            register={registerTransferWallet}
            validation={{ required: true }}
            error={errorsTransferWallet.recipient_wallet_no}
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
            register={registerTransferWallet}
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
            error={errorsTransferWallet.amount}
          />
          <FormTextInput
            label={"Description"}
            name={"desc"}
            placeholder="Enter Description"
            register={registerTransferWallet}
            validation={{ required: true }}
            error={errorsTransferWallet.desc}
          />
          <Button
            text="Transfer Funds"
            loading={isPendingTransfer}
            disabled={isPendingTransfer}
          />
        </form>
      )}


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

export default StatementPage;
