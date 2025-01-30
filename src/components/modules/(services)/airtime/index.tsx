"use client";
import { CustomHeader } from "@/src/components/common/header";
import { fetchDashboardData } from "@/src/services/dashboardService";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import TransferWalletCards from "../../wallet/components/wallet-cards";
import Networks, { AirtimeAmounts } from "../lib/Networks";
import "../style.scss";
import { useForm } from "react-hook-form";
import { FormTextInput } from "@/src/components/common/input";
import { FormButton } from "@/src/components/common/button";
import { BuyAirtimeService } from "@/src/services/VATService";
import { useRouter } from "next/navigation";

const AirtimeModule = () => {
  const router = useRouter();
  const [activeAccount, setActiveAccount] = React.useState("fidelity");

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AirtimeServiceTypes>({
    defaultValues: {
      wallet: "fidelity",
    },
  });

  const handleNetworkSelect = (network: string) => {
    setValue("network", network);
  };
  const handleWalletSelect = (wallet: string) => {
    setValue("wallet", wallet);
  };

  const { data, refetch } = useQuery({
    queryKey: ["get_dashboard_data"],
    queryFn: () => {
      return fetchDashboardData();
    },
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ["buy_airtime"],
    mutationFn: async (data: AirtimeServiceTypes) => {
      const res = await BuyAirtimeService(data);
      return res;
    },
    onSuccess: async (data: any) => {
      await refetch();

      if (data?.response_code == "00") {
          router.push("/success");
      }


    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (data: any) => {
    mutate(data);
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

        {watch("network") !== null && (
          <form className="service_form" onSubmit={handleSubmit(onSubmit)}>
            <FormTextInput
              label={"Phone Number"}
              name={"phone_number"}
              type={"number"}
              validation={{
                required: "Phone number is required",
                minLength: {
                  value: 11,
                  message: "Phone number must be 11 digits",
                },
                maxLength: {
                  value: 11,
                  message: "Phone number must be 11 digits",
                },
              }}
              error={errors.phone_number}
              register={register}
            />

            <div>
            <AirtimeAmounts onAmountSelect={(amount: number) => setValue("amount", amount)}/>
            </div>
            <FormTextInput
              label={"Amount"}
              name={"amount"}
              type={"number"}
              validation={{
                required: "Amount is required",
                min: { value: 50, message: "Amount must be at least ₦50" },
              }}
              error={errors.amount}
              register={register}
            />


            <FormButton
              text={"Buy Airtime"}
              disabled={isPending}
              loading={isPending}
            />
          </form>
        )}
      </section>
    </div>
  );
};

export default AirtimeModule;

type AirtimeServiceTypes = {
  amount: number;
  phone_number: string;
  network: string;
  wallet: string;
};
