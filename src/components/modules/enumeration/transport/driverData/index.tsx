"use client";
import { Button } from "@/src/components/common/button";
import React, { useState } from "react";
import { LuUser } from "react-icons/lu";
import { FormTextInput } from "@/src/components/common/input";
import "../style.scss";
import { useForm } from "react-hook-form";
import { SaveContactType, saveContact } from "@/src/services/transportEnumerationService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const DriverData = ({ setStage, details, formData }: any) => {
  console.log(details)
  console.log(formData)

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SaveContactType) => {
      return saveContact(data);
    },
    mutationKey: ["save_contact"],
    onSuccess: (data) => {
      toast.success(data?.response_message || "Driver's data saved successfully");
      // setStage(2);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error Saving Driver's data");
    },
  });

  const onSubmit = (reqData: any) => {
    try {
      mutate(reqData);
    } catch (error) {
      console.log(error);
    }
    
  };
  
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      name: details?.vehicle_owner.ownerName || "",
      phone: details?.vehicle_owner.phoneNumber || "",
      plate_number: formData.plate_number || "",
      contact_type: "driver",
      merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
    },
  });
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="enumeration-form">
      <div className="user-image">
        {details?.driver?.photoUrl ? (
          <img src={details?.driver?.photoUrl} alt="" />
        ) : (
          <LuUser className="user" />
        )}
      </div>
      <FormTextInput
        label={"Driver's Email"}
        name={"email"}
        register={register}
        // value={details?.driver.abssin || ""}
      />
      <FormTextInput
        label={"Driver's ABSSIN"}
        name={"abssin"}
        value={details?.driver.abssin || ""}
      />
      <FormTextInput
        label={"Driver's Name"}
        name={"name"}
        register={register}
        value={details?.driver.driverName || ""}
      />
      <FormTextInput
        label={"Driver's Address"}
        name={"driverAddress"}
        value={details?.driver.driverAddress || ""}
      />
      <FormTextInput
        label={"Phone Number"}
        name={"phone"}
        register={register}
        value={details?.driver.phoneNumber || ""}
      />

      <div className="button-container">
        <button className="button secondary" onClick={() => setStage(1)}>
          Go Back
        </button>
        <Button text="Enumerate Vehicle" loading={isPending} />
      </div>
    </form>
  );
};

export default DriverData;
