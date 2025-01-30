"use client";
import { CustomHeader } from "@/src/components/common/header";
import { fetchDashboardData } from "@/src/services/dashboardService";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import TransferWalletCards from "../../wallet/components/wallet-cards";
import Networks from "../lib/Networks";
import "../style.scss";
import { useForm } from "react-hook-form";
import { FormTextInput } from "@/src/components/common/input";
import { FormButton } from "@/src/components/common/button";

const AirtimeModule = () => {
  const [activeAccount, setActiveAccount] = React.useState("fidelity");
  const { data } = useQuery({
    queryKey: ["get_dashboard_data"],
    queryFn: () => {
      return fetchDashboardData();
    },
  });

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{
    amount: number | null;
    phone_number: number | null;
    network: string | null;
    wallet: string | null;
  }>({
    defaultValues: {
      // merchant_key: null,
      amount: null,
      phone_number: null,
      network: null,
      wallet: "fidelity",
    },
  });

  const handleNetworkSelect = (network: string) => {
    setValue("network", network);
  };
  const handleWalletSelect = (wallet: string) => {
    setValue("wallet", wallet);};

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <CustomHeader title="Airtime" desc="Purchase airtime for any network" />
      <section className="service">
        <TransferWalletCards
          data={data}
          activeAccount={activeAccount}
          setActiveAccount={setActiveAccount}
          onWalletSelect={handleWalletSelect}
          type="earnings"
        />

        <Networks onNetworkSelect={handleNetworkSelect} />

       {watch("network") !== null && <form className="service_form" onSubmit={handleSubmit(onSubmit)}>
          <FormTextInput
            label={"Phone Number"}
            name={"phone_number"}
            type={"number"}
            validation={{
              required: "Phone number is required",
              minLength: { value: 11, message: "Phone number must be 11 digits" },
              maxLength: { value: 11, message: "Phone number must be 11 digits" }
            }}
            error={errors.phone_number}
            register={register}
          />
          <FormTextInput
            label={"Amount"}
            name={"amount"}
            type={"number"}
            validation={{
              required: "Amount is required",
              min: { value: 50, message: "Amount must be at least ₦50" }
            }}
            error={errors.amount}
            register={register}
          />

          <FormButton text={"Buy Airtime"} disabled={false} loading={false} />
        </form>}
      </section>
    </div>
  );
};

export default AirtimeModule;
