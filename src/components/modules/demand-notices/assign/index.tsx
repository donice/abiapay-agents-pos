"use client"

import { Button, GoBackButton } from '@/src/components/common/button'
import Empty from '@/src/components/common/empty'
import { CustomHeader } from '@/src/components/common/header'
import { FormTextInput } from '@/src/components/common/input'
import { assignDemandNotice, assignDemandNoticePayload, fetchDemandNotice } from '@/src/services/demandNotice'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import "./style.scss";
import { SuccessModal } from '@/src/components/common/modal'

const AssignNotice = () => {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [noticeDetails, setNoticeDetails] = React.useState<any | null>(null);
    const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<assignDemandNoticePayload>({
    defaultValues: {
      notice_number: "",
      abssin: "",
      merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
    },
  });

  // Mutation for searching Demand Notice
  const searchMutation = useMutation({
    mutationFn: async (data: { notice_number: string; merchant_key: string }) =>
      fetchDemandNotice(data),
    onSuccess: (data: any) => {
      const res = data?.data;
      console.log("res", res);
      if (res && Object.keys(res).length > 0) {
        setNoticeDetails(res.response_data.notice);
        setErrorMessage(null);
        toast.success(res.response_message || "Demand notice found!");
        
      } else {
        setNoticeDetails(null);
        setErrorMessage(data.data?.response_message || "No record found");
        toast.error(data.data?.response_message || "No record found");
      }
    },
    onError: (error: any) => {
      setNoticeDetails(null);
      setErrorMessage(error?.error || "An error occurred while searching.");
      toast.error(error?.error || "An error occurred while searching.");
    },
  });

  // Mutation for assigning Demand Notice with ABSSIN
  const assignMutation = useMutation({
    mutationFn: async (data: assignDemandNoticePayload) => assignDemandNotice(data),
    onSuccess: (data: any) => {
      toast.success(data.data?.response_message || "Notice assigned successfully!");
      reset();
      setNoticeDetails(null);
    },
    onError: (error: any) => {
      toast.error(error?.error || "An error occurred. Please try again.");
    },
  });

  // Step 1: handle search
  const handleSearch = (formData: assignDemandNoticePayload) => {
    searchMutation.mutate({
      notice_number: formData.notice_number,
      merchant_key: formData.merchant_key,
    });
  };

  // Step 2: handle final assign
  const handleAssign = (formData: assignDemandNoticePayload) => {
    assignMutation.mutate(formData);
  };

  const noticeNumber = watch("notice_number");

  return (
    <section className="verify-tickets">
      <div className="verify-tickets-comp">
        <GoBackButton />
        <header className="verify-tickets-comp_header mb-5">
          <CustomHeader title="Assign Blank Notice Ticket" desc="" />
        </header>

        {/* Step 1: Search Demand Notice */}
        {!noticeDetails && (
          <form onSubmit={handleSubmit(handleSearch)} className="verify-tickets-comp_form flex flex-col gap-4">
            <FormTextInput
              label="Notice Number"
              type="text"
              name="notice_number"
              register={register}
              validation={{ required: true }}
              error={errors.notice_number}
            />
            <Button text="Search Demand Notice" loading={searchMutation.isPending} />
          </form>
        )}

        {/* Step 2: Show details + ABSSIN input */}
        {noticeDetails && (
          <form onSubmit={handleSubmit(handleAssign)} className="verify-tickets-comp_form flex flex-col gap-4">
            {/* Demand Notice details */}
        
            <div className="main-table">
  {noticeDetails ? (
    <div className="main-table_form_tickets_container">
      <div className="tickets">
        <div className="ticket">
          <div>
            <p>{noticeDetails.notice_number}</p>
            <p>{noticeDetails.payment_status}</p>
            <p>{noticeDetails.total_amount}</p>
          </div>
          {/* <div>
            <p>{noticeDetails.coy_name}</p>
            <p>{noticeDetails.phone_no}</p>
            <p>{noticeDetails.tax_office}</p>
          </div> */}
        </div>
      </div>
    </div>
  ) : (
    <Empty text="No Notice Number Found" />
  )}
</div>

            

            {/* ABSSIN input */}
            <FormTextInput
              label="ABSSIN"
              type="text"
              name="abssin"
              placeholder='Enter Corporate ABSSIN'
              register={register}
              validation={{ required: true }}
              error={errors.abssin}
            />

            <Button text="Assign Blank Demand Notice" loading={assignMutation.isPending} />
          </form>
        )}
      </div>

      
    </section>
  )
}

export default AssignNotice
