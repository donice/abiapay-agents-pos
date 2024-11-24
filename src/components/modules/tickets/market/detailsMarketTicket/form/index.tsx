"use client";
import React, { useEffect } from "react";
import { FormButton } from "@/src/components/common/button";
import { SelectInput, FormTextInput } from "@/src/components/common/input";
import { fetchLGAData } from "@/src/services/common";
import "./style.scss";
import { useForm } from "react-hook-form";
import { fetchMarketEnumerationDetails } from "@/src/services/ticketsServices";
import { useMutation } from "@tanstack/react-query";
import { formatAmount } from "@/src/utils/formatAmount";
import { PiSealCheckDuotone } from "react-icons/pi";

const AddMarketTicketForm = () => {
  const [details, setDetails] = React.useState<any>(null);
  const {
    register: registerRenderForm,
    watch: watchRenderForm,
    handleSubmit: handleRenderFormSubmit,
  } = useForm({
    defaultValues: {
      option: "",
      enumeration_id: "",
    },
  });

  const {
    mutate: mutateEnumerationDetails,
    isPending: isPendingEnumerationDetails,
  } = useMutation({
    mutationKey: ["fetchMarketEnumerationDetails"],
    mutationFn: () => {
      return fetchMarketEnumerationDetails({
        enumeration_id: watchRenderForm("enumeration_id"),
      });
    },
    onSuccess: (data) => {
      setDetails(data?.response_data);
      console.log(data);
    },
  });

  const onSubmitEnumerationID = (data: any) => {
    mutateEnumerationDetails();
    console.log(data);
  };

  const watchOption = watchRenderForm("option");

  const getLGAData = async () => {
    const res = await fetchLGAData();
    console.log(res);
    return res;
  };

  useEffect(() => {
    getLGAData();
  }, []);

  return (
    <div className="add-market-ticket">
      {details == null ? (
        <>
          {" "}
          <h2 className="mb-1 text-uppercase font-semibold text-teal-600 text-xs tracking-wider">
            DO YOU HAVE A MARKET ENUMERATION ID?
          </h2>
          <SelectInput
            label="Select Option"
            name="option"
            register={registerRenderForm}
            placeholder="Select Select Option"
            id={""}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          {watchOption == "yes" ? (
            <form onSubmit={handleRenderFormSubmit(onSubmitEnumerationID)}>
              <div className="add-market-ticket">
                <FormTextInput
                  label="Enumeration ID"
                  type="number"
                  name="enumeration_id"
                  register={registerRenderForm}
                  placeholder="Enter Enumeration ID"
                />{" "}
                <FormButton
                  text={"Check Details"}
                  disabled={
                    watchRenderForm("enumeration_id") == "" ||
                    isPendingEnumerationDetails
                  }
                  loading={isPendingEnumerationDetails}
                />
              </div>
            </form>
          ) : null}
        </>
      ) : (
        <section className="grid gap-4">
          <div>
            <div className="border-b-2 border-dashed py-3 flex justify-between">
              <p className="text-sm text-gray-400">Enumeration ID:</p>
              <p className="text-sm font-semibold text-gray-600">
                {details?.enumeration_id}
              </p>
            </div>
            <div className="border-b-2 border-dashed py-3 flex justify-between">
              <p className="text-sm text-gray-400">ABSSIN:</p>
              <p className="text-sm font-semibold text-gray-600">
                {details?.taxpayer_id}
              </p>
            </div>
            <div className="border-b-2 border-dashed py-3 flex justify-between">
              <p className="text-sm text-gray-400">Taxpayer Name:</p>
              <p className="text-sm font-semibold text-gray-600">
                {details?.taxpayer_name}
              </p>
            </div>
            <div className="border-b-2 border-dashed py-3 flex justify-between">
              <p className="text-sm text-gray-400">Taxpayer Phone:</p>
              <p className="text-sm font-semibold text-gray-600">
                {details?.taxpayer_phone}
              </p>
            </div>
            <div className="border-b-2 border-dashed py-3 flex justify-between">
              <p className="text-sm text-gray-400">Amount:</p>
              <p className="text-sm font-semibold text-gray-600">
                {formatAmount(Number(details?.total_amount))}
              </p>
            </div>
            <div className="border-b-2 border-dashed py-3 flex justify-between">
              <p className="text-sm text-gray-400">Payment Status:</p>
              <p
                className={`flex items-center gap-1 text-sm font-semibold ${
                  watchOption == "yes" ? "text-green-500" : "text-yellow-500"
                }`}
              >
                <PiSealCheckDuotone className="text-green-500 text-xl" />
                {"Completed"}
              </p>
            </div>
            <div className="py-3 flex justify-between">
              <p className="text-sm text-gray-400">Created:</p>
              <p className="text-sm font-semibold text-gray-600">
                {details?.created_at}
              </p>
            </div>
            <div className="pt-3">

            <SelectInput
              label={"Wallet Type"}
              name={"wallet_type"}
              id={"wallet_type"}
              options={[
                { value: "fidelity", label: "Fidelity" },
                { value: "access", label: "Access" },
              ]}
            />
            </div>
          </div>

          <FormButton text={"Pay Now"} disabled={false} loading={false} />
        </section>
      )}
    </div>
  );
};

export default AddMarketTicketForm;
