"use client";
import React, { useEffect } from "react";
import { FormButton, PrimaryButton } from "@/src/components/common/button";
import { SelectInput, FormTextInput } from "@/src/components/common/input";
import { fetchLGAData } from "@/src/services/common";
import "./style.scss";
import { useForm } from "react-hook-form";
import { fetchMarketEnumerationDetails } from "@/src/services/ticketsServices";
import { useMutation } from "@tanstack/react-query";

const AddMarketTicketForm = () => {
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
    </div>
  );
};

export default AddMarketTicketForm;
