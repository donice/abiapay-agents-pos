"use client";
import { Button } from "@/src/components/common/button";
import React, { useState } from "react";
import { LuUser } from "react-icons/lu";
import { FormTextInput } from "@/src/components/common/input";
import "../style.scss";
import { useForm } from "react-hook-form";
import {
  SaveContactType,
  saveContact,
  CreateTicketType,
  createTransportEnumeration,
} from "@/src/services/transportEnumerationService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { EnumerationSuccessModal } from "@/src/components/common/modal";

interface TicketsDataType {
  response_code: string;
  response_message: string;
  enumeration_id: string;
  assetCode: string;
}

const DriverData = ({ setStage, details, formData }: any) => {
  const [ticketData, setTicketData] = useState<TicketsDataType>({
    response_code: "",
    response_message: "",
    enumeration_id: "",
    assetCode: "",
  });
  const [show, setShow] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: (data: SaveContactType) => {
      return saveContact(data);
    },
    mutationKey: ["create_transport_enumeration"],
    onSuccess: (data) => {
      console.log(data?.response_message || "Driver's data saved successfully");

      // setStage(2);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error Saving Driver's data");
    },
  });

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

  const req: CreateTicketType = {
    taxpayer_category: "individual",
    abssin: details?.vehicle_owner.abssin || "",
    vehicle_plate_number: formData.plate_number || "",
    taxpayer_name: details?.vehicle_owner.ownerName || "",
    taxpayer_phone: formData.phone_number || "",
    revenue_year: "2024",
    taxpayer_location: details?.vehicle_owner.ownerAddress || "",
    operating_park: formData.operating_park || "",
    trade_union: formData.trade_union || "",
    vehicle_category: formData.vehicle_category || "",
    owner_name: details?.vehicle_owner.ownerName || "",
    owner_address: details?.vehicle_owner.ownerAddress || "",
    daily_ticket_amount: 250,
    enumeration_fee: "1500",
    merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
  };

  const handleCreateTransportEnumeration = async () => {
    try {
      const res = await createTransportEnumeration(req);
      console.log("TICKETS DATA", res);
      setTicketData(res);
      toast.success(res?.response_message || "Vehicle Enumerated Successfully");
      setShow(true);
      console.log(res);
    } catch (error) {
      toast.error("Error Enumerating Vehicle");
      console.log(error);
    }
  };

  const onSubmit = (reqData: any) => {
    try {
      mutate(reqData);
      handleCreateTransportEnumeration();
    } catch (error) {
      console.log(error);
      toast.error("Error Enumerating Vehicle");
    }
  };

  return (
    <>
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
          <Button
            text="Complete Enumerate"
            loading={isPending}
            disabled={isPending}
          />
        </div>
      </form>

      {show && (
        <EnumerationSuccessModal
          qr_link="https://sandboxweb.abiapay.ng/"
          plate_number={formData.plate_number || ""}
          text={ticketData?.assetCode || ""}
          id={ticketData?.enumeration_id || ""}
          vehicle_category={formData.vehicle_category || ""}
        />
      )}
    </>
  );
};

export default DriverData;
