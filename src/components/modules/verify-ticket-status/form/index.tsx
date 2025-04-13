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
import { fetchAssessment, VerifyTicketStatusPayload } from "@/src/services/verifyTicketStatus";

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

  const selectedVerificationType = watch("verifyType");

  const [assessments,setAsessments]=useState<any>([]);


  const mutation = useMutation({
    mutationFn: async (data: VerifyTicketStatusPayload) => verifyTicket(data),
    onSuccess: (data: any) => {
      const res = data?.data;
  
      console.log("API Response:", data);
  
      const responseCode = res?.data?.response_code;
      const responseMessage = res?.data?.response_message;
  
      if (responseCode === "00") {
        setDetails(res.data);
        toast.success("Ticket verified successfully");
      } else if (responseCode === "97") {
        setDetails(res.data);
        toast.error(responseMessage || "No ticket for today");
      } else if (responseCode === "99") {
        console.log("99")
        setDetails(null);
        toast.error(responseMessage || "Ticket not found");
      } else {
        toast.error("Unknown response from server");
      }
  
      reset();
    },
    onError: (error: any) => {
      console.log("error", error);
    
      const res = error?.response?.data?.data; // or error?.data?.data depending on how your API client is set up
      const responseCode = res?.response_code;
      const responseMessage = res?.response_message;
    
      if (responseCode === "99") {
        setDetails(null);
        toast.error(responseMessage || "Ticket not found");
      } else if (responseCode === "97") {
        setDetails(res);
        toast.error(responseMessage || "No ticket for today");
      } else {
        toast.error("An error occurred");
      }
    
      return error;
    },
  });
  

  const getAssessments = async () => {
    try {
      const { data } = await fetchAssessment();
      console.log("res", data);
      const response = data?.map((item: any) => {
        return {
          label: item?.name,
          value: item?.name,
        };
      });
      console.log("response", response);
      setAsessments(response);
    } catch (error: any) {
      console.log(error);
      toast.error("Error Enumerating Vehicle");
    }
  };

   useEffect(() => {
      getAssessments();
    }, []);


  const onSubmit = (data: VerifyTicketStatusPayload) => {
    mutation.mutate({ ...data, agentEmail: userData?.email });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="verify-tickets-form">
         <SelectInput
        label="Verification Type"
        name="verifyType"
        id="verifyType"
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
            name="assessment_type"
            id="assessment_type"
            register={register}
            options={assessments}
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
      <Button text="Verify Payment" loading={mutation.isPending} />
    </form>
  );
};

export default VerifyticketStatusForm; 