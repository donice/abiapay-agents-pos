"use client";
import React, { useEffect, useState } from "react";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { Button } from "@/src/components/common/button";
import {
  verifyTicket,
  VerifyTicketPayload,
} from "@/src/services/verifyTickets";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import "./style.scss";
import toast from "react-hot-toast";
import useIsBrower from "@/src/hooks/useIsBrower";

const VerifyTicketsFrom = ({ userData }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyTicketPayload>({
    defaultValues: {
      agentEmail: userData?.email,
      referenceID: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: VerifyTicketPayload) => verifyTicket(data),
    onSuccess: (data) => {
      console.log(data);
      toast.success(
        data?.message || "Ticket Verified Successfully, reach Donice to dispay"
      );
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: VerifyTicketPayload) => {
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="verify-tickets-form">
      <SelectInput
        label="Reference Type"
        name="ref_type"
        id="ref_type"
        options={[
          { label: "Plate Number", value: "plate_number" },
          { label: "Payment Reference", value: "payment_ref" },
        ]}
        placeholder="Select Reference Type"
      />

      <FormTextInput
        label="Reference Number"
        type="text"
        name="referenceID"
        placeholder="Enter Reference Number"
        register={register}
        validation={{ required: true }}
        error={errors.referenceID}
      />

      <Button text="Verify Ticket" loading={mutation.isPending} />
    </form>
  );
};

export default VerifyTicketsFrom;
