"use client";
import { CustomHeader } from "@/src/components/common/header";
import { fetchDashboardData } from "@/src/services/dashboardService";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import TransferWalletCards from "../../wallet/components/wallet-cards";
import Networks from "../lib/Networks";
import "../style.scss";
import { useForm } from "react-hook-form";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { FormButton } from "@/src/components/common/button";
import { BuyAirtimeService, GetDataPlans } from "@/src/services/VATService";
import { useRouter } from "next/navigation";

const DataModule = () => {
  const router = useRouter();
  const [activeAccount, setActiveAccount] = React.useState("fidelity");
  const [dataPlans, setDataPlans] = React.useState<Array<{label: string, value: string}>>([]);

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
  });
  const { mutate: getDataPlans } = useMutation({
    mutationKey: ["get_data_plans"],
    mutationFn: (req: { network: string }) => {
      return GetDataPlans(req);
    },
    onSuccess: (data) => {
      const plans = data.response_data?.map((item: any) => ({
        label: item.name,
        value: item.tarrifTypeId
      })) || [];
      setValue("amount", data.response_data?.[0]?.price || 0);
      setDataPlans(plans);
    },
  });

  useEffect(() => {
    getDataPlans({ network: watch("network") });
  }, [watch("network")]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["buy_airtime"],

    mutationFn: async (data: AirtimeServiceTypes) => {
      const res = await BuyAirtimeService(data);
      return res;
    },
    onSuccess: async (data: any) => {
      await refetch();
      router.push("/success");
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
      <CustomHeader title="Data" desc="Purchase data for any network" />
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
            <SelectInput
              label={"Tarrif Plans"}
              name={"tarrifTypeId"}
              id={"tarrifTypeId"}
              options={dataPlans || []}
            />

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

            <FormTextInput
              label={"Amount"}
              name={"amount"}
              type={"number"}
              disabled
              validation={{
                required: "Amount is required",
                min: { value: 40, message: "Amount must be at least ₦50" },
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

export default DataModule;

type AirtimeServiceTypes = {
  amount: number;
  phone_number: string;
  network: string;
  wallet: string;
};
