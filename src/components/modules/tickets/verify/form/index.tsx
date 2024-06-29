"use client";
import React from "react";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { Button } from "@/src/components/common/button";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import "./style.scss";

interface FormData {
  ref_type: string;
  ref_number: string;
}

const VerifyTicketsFrom = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))} className="verify-tickets-form">
      <SelectInput
        label="Reference Type"
        name="ref_type"
        id="ref_type"
        register={register}
        validation={{ required: true }}
        options={[
          { label: "Plate Number", value: "plate_number" },
          { label: "Payment Reference", value: "payment_ref" },
        ]}
        placeholder="Select Reference Type"
        error={!!errors.ref_type}
      />

      <FormTextInput
        label="Reference Number"
        type="text"
        name="ref_number"
        placeholder="Enter Reference Number"
        register={register}
        validation={{ required: true }}
        error={errors.ref_number}
        onChange={(e: any) => {
          console.log(e.target.value);
        }}
      />

      <Button text="Verify Ticket" loading={false}/>
    </form>
  );
};

export default VerifyTicketsFrom;
