"use client";
import React from "react";
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
import { VerifyTicketStatusPayload } from "@/src/services/verifyTicketStatus";

const VerifyticketStatusForm = ({ userData, setDetails }: any) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<VerifyTicketStatusPayload>({
    defaultValues: {
    verificationType:"",
      verifyType: "",
      referenceID: ""
    },
  });

  const selectedVerificationType = watch("verificationType");


  const mutation = useMutation({
    mutationFn: async (data: VerifyTicketStatusPayload) => verifyTicket(data),
    onSuccess: (data: any) => {
      const res = data?.data?.data;
      console.log("data", res);
      if (data?.status == 200) {
        if (res?.response_code == "00") {
          setDetails(res);
          toast.success("Ticket verified successfully");
        } else {
          res.response_code == "99" &&
            setDetails(null) &&
            toast.error(res.response_message);
          res.response_code == "97" &&
            setDetails(res) &&
            toast.error(res.response_message ?? "No ticket for today");
        }
      } else {
        return;
      }
      reset();
      return;
    },
    onError: (error: any) => {
      toast.error(error);
      // setDetails(error.data);
      console.log(error);
      return error;
    },
  });

  const onSubmit = (data: VerifyTicketStatusPayload) => {
    mutation.mutate({ ...data, agentEmail: userData?.email });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="verify-tickets-form">
         <SelectInput
        label="Verification Type"
        name="verificationType"
        id="verificationType"
        register={register}
        options={[
            { label: "Transport", value: "transport" },
            { label: "Transport Emblem", value: "emblem" },
            { label: "Flying Revenue", value: "revenue" },
            { label: "Demand Notice", value: "demand_notice" },
            { label: "Market Levy", value: "market_levy" },
            { label: "Bills Payment", value: "bills_payment" },
            { label: "Direct Assessment Tax", value: "direct_assessment_tax" },
        ]}
        placeholder="Select Verification Type"
      />
      
      {(selectedVerificationType === "revenue" ||selectedVerificationType === "emblem" || selectedVerificationType === "transport" )&& (
        <>
        <SelectInput
        label="Reference Type"
        name="verifyType"
        id="verifyType"
        register={register}
        options={[
          { label: "Plate Number", value: "plate_number" },
          { label: "Payment Reference", value: "payment_ref" },
          { label: "Emblem", value: "emblem" },
        ]}
        placeholder="Select Reference Type"
      />
      <FormTextInput
        label="Reference Number"
        type="text"
        name="referenceID"
        placeholder="Enter Reference Number"
        register={register}
        validation={{
          required: true,
          minLength: {
            value: 7,
            message: "Length must be above 11 characters",
          },
        }}
        error={errors.referenceID}
      />

        </>
      )}



{selectedVerificationType === "demand_notice" && (
        <>
          <FormTextInput
            label="Notice Number"
            type="text"
            name="noticeNumber"
            placeholder="Enter Notice Number"
            register={register}
            validation={{ required: true }}
            error={errors.noticeNumber}
          />
          <SelectInput
            label="Fiscal Year"
            name="fiscalYear"
            id="fiscalYear"
            register={register}
            options={[
              { label: "2023", value: "2023" },
              { label: "2024", value: "2024" },
              { label: "2025", value: "2025" },
            ]}
            placeholder="Select Fiscal Year"
          />
        </>
      )}

      {selectedVerificationType === "market_levy" && (
        <>
          <FormTextInput
            label="Enumeration Year"
            type="text"
            name="enumerationYear"
            placeholder="Enter Enumeration Year"
            register={register}
            validation={{ required: true }}
            error={errors.enumerationYear}
          />
          <SelectInput
            label="Fiscal Year"
            name="fiscalYear"
            id="fiscalYear"
            register={register}
            options={[
              { label: "2023", value: "2023" },
              { label: "2024", value: "2024" },
              { label: "2025", value: "2025" },
            ]}
            placeholder="Select Fiscal Year"
          />
        </>
      )}

      {selectedVerificationType === "bills_payment" && (
        <FormTextInput
          label="Bill Reference"
          type="text"
          name="billReference"
          placeholder="Enter Bill Reference"
          register={register}
          validation={{ required: true }}
          error={errors.billReference}
        />
      )}

      {selectedVerificationType === "direct_assessment_tax" && (
        <>
          <FormTextInput
            label="ABSSIN"
            type="text"
            name="abssin"
            placeholder="Enter ABSSIN"
            register={register}
            validation={{ required: true }}
            error={errors.abssin}
          />
          <SelectInput
            label="Assessment Type"
            name="assessmentType"
            id="assessmentType"
            register={register}
            options={[
              { label: "Personal", value: "personal" },
              { label: "Business", value: "business" },
              { label: "Corporate", value: "corporate" },
            ]}
            placeholder="Select Assessment Type"
          />
          <SelectInput
            label="Fiscal Year"
            name="fiscalYear"
            id="fiscalYear"
            register={register}
            options={[
              { label: "2023", value: "2023" },
              { label: "2024", value: "2024" },
              { label: "2025", value: "2025" },
            ]}
            placeholder="Select Fiscal Year"
          />
        </>
      )}
      <Button text="Verify Ticket" loading={mutation.isPending} />
    </form>
  );
};

export default VerifyticketStatusForm; 