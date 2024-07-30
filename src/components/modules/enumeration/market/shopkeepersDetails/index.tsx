"use client";
import { Button } from "@/src/components/common/button";
import React, { useState } from "react";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import "../style.scss";
import { FieldError, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createMarketEnumeration,
  CreateMarketEnumerationType,
} from "@/src/services/marketEnumerationService";
import { EnumerationModal } from "@/src/components/common/modal";

interface ModalType {
  response_code: string;
  payment_reference: string;
  enumeration_id: string;
}

const ShopkeepersDetails = ({ setStage, formData }: any) => {
  const [ticketData, setTicketData] = useState<ModalType>({
    response_code: "",
    payment_reference: "",
    enumeration_id: "",
  });
  const [show, setShow] = useState(false);
  const ticketPerOccupant =
    formData?.shop_category == "Single" ? 2000 * 1 : 2000 * 2;

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateMarketEnumerationType) => {
      return createMarketEnumeration(data);
    },
    mutationKey: ["save_owner_contact"],
    onSuccess: (data) => {
      if (data.response_code) {
        toast.success("Shop Enumerated Successfully");
        setShow(true);
        setTicketData(data);
      } else {
        toast.error("Shop Enumeration Failed");
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error Saving Driver's data");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      enumeration_fee: formData?.enumeration_fee || "1000",
      ticket_amount_shop_owner: formData?.ticket_amount_shop_owner || "16000",
      ticket_amount_per_occupant:
        formData?.ticket_amount_per_occupant || ticketPerOccupant || "",
      payment_method: formData?.payment_method || "Fidelity",
    },
  });

  const onSubmit = (reqData: any) => {
    try {
      mutate({ ...reqData, ...formData });
    } catch (error) {
      console.log(error);
      toast.error("Error Enumerating Vehicle");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="enumeration-form">
        <FormTextInput
          label="Annual Shop Ticket Amount (Shop Owner)"
          type="text"
          name="ticket_amount_shop_owner"
          value={formData.ticket_amount_shop_owner}
          placeholder="Enter Annual Shop Ticket Amount (Shop Owner)"
          register={register}
          validation={{
            required: true,
          }}
          error={errors.ticket_amount_shop_owner as FieldError}
        />
        <FormTextInput
          label="Annual Ticket Amount (Per Occupant)"
          type="text"
          name="ticket_amount_per_occupant"
          value={formData.ticket_amount_per_occupant}
          placeholder="Enter Annual Ticket Amount (Per Occupant)"
          register={register}
          validation={{
            required: true,
          }}
          error={errors.ticket_amount_per_occupant as FieldError}
        />
        <FormTextInput
          label="Shop Enumeration Fee"
          type="text"
          name="enumeration_fee"
          value={formData.enumeration_fee}
          placeholder="Enter Shop Enumeration Fee"
          register={register}
          validation={{
            required: true,
          }}
          error={errors.enumeration_fee as FieldError}
        />

        <SelectInput
          label="Payment Method"
          name="payment_method"
          id="payment_method"
          options={[
            { label: "Fidelity", value: "Fidelity" },
            { label: "Access", value: "Access" },
          ]}
          placeholder="Select Payment Method"
          register={register}
          validation={{ required: true }}
        />
        <div className="button-container">
          <button className="button secondary" onClick={() => setStage(0)}>
            Go Back
          </button>
          <Button
            text="Complete Enumerate"
            loading={isPending}
            disabled={isPending}
          />
        </div>
      </form>

      {show && (
        <EnumerationModal
          id={`Pyament Ref: ${ticketData?.payment_reference}, Enumeration ID: ${ticketData?.enumeration_id}`}
          maintext="Shop Enumerated Successfully"
          link="/dashboard"
          text={"Done"}
        />
      )}
    </>
  );
};

export default ShopkeepersDetails;
