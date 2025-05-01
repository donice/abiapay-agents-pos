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
import { BuyDataService, GetDataPlans } from "@/src/services/VATService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DataModule = () => {
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
      amount: 0,
    },
  });

  const handleNetworkSelect = (network: string) => {
    setValue("network", network, { shouldValidate: true });
  };

  const handleWalletSelect = (wallet: string) => {
    setValue("wallet", wallet, { shouldValidate: true });
  };

  const { data, refetch } = useQuery({
    queryKey: ["get_dashboard_data"],
    queryFn: fetchDashboardData,
  });

  const { data: dataPlans } = useQuery({
    queryKey: ["get_data_plans", watch("network")],
    queryFn: () => GetDataPlans({ network: watch("network") }),
    enabled: !!watch("network"), // Ensures query runs only if network is selected
  });

  console.log("Data Plans: ", dataPlans); // Debugging

  useEffect(() => {
    const selectedPlan = dataPlans?.response_data?.find(
      (item: { tarrifTypeId: string; price: number }) =>
        item.tarrifTypeId === watch("tarrifTypeId")
    );

    if (selectedPlan) {
      setValue("amount", selectedPlan.price, { shouldValidate: true });
    }
  }, [watch("tarrifTypeId"), dataPlans, setValue]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["buy_airtime"],
    mutationFn: async (data: AirtimeServiceTypes) => {
      const res = await BuyDataService(data);
      return res;
    },
    onSuccess: async (data: any) => {
      await refetch();

      if (data?.response_code == "00") {
        if (typeof data?.response_message !== "string") {
          return toast.error("Unsuccessful data purchase");
        } else {
          router.push("/success");
        }
      } else {
        toast.error(data?.response_message);
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (data: AirtimeServiceTypes) => {
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
          type="balance"
        />

        <Networks onNetworkSelect={handleNetworkSelect} />

        {watch("network") && (
          <form className="service_form" onSubmit={handleSubmit(onSubmit)}>
            <SelectInput
              label={"Tarrif Plans"}
              name={"tarrifTypeId"}
              id={"tarrifTypeId"}
              register={register}
              onChange={(e) => {
                setValue("tarrifTypeId", e.target.value, { shouldValidate: true });
              }}
              options={
                dataPlans?.response_data?.map(
                  (item: { name: string; tarrifTypeId: string }) => ({
                    label: item.name,
                    value: item.tarrifTypeId,
                  })
                ) || []
              }
            />

            <FormTextInput
              label={"Phone Number"}
              name={"phone_number"}
              type={"number"}
              validation={{
                required: "Phone number is required",
                minLength: { value: 11, message: "Phone number must be 11 digits" },
                maxLength: { value: 11, message: "Phone number must be 11 digits" },
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

            <FormButton text={"Buy Data"} disabled={isPending} loading={isPending} />
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
  tarrifTypeId: string;
  network: string;
  wallet: string;
};
