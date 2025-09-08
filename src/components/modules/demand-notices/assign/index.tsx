"use client"

import { Button, GoBackButton } from '@/src/components/common/button'
import Empty from '@/src/components/common/empty'
import { CustomHeader } from '@/src/components/common/header'
import { FormTextInput, SelectInput } from '@/src/components/common/input'
import { fetchCategory, fetchLGAData } from '@/src/services/common'
import { assignDemandNotice, assignnoAbssinDemandNotice, fetchDemandNotice } from '@/src/services/demandNotice'
import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import "./style.scss";
import { InformationModal, SuccessModal } from '@/src/components/common/modal'
import { useRouter } from 'next/navigation'
import { TbSend } from 'react-icons/tb'

const AssignNotice = () => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [noticeDetails, setNoticeDetails] = React.useState<any | null>(null);
  const [showModal, setShowModal] = React.useState(false);
  const [noticeNumber, setNoticeNumber] = React.useState<string>("");
  const [taxpayerId, setTaxpayerId] = React.useState<string>("");
  const [mode, setMode] = React.useState<"abssin" | "no_abssin" | "">(""); 

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      notice_number: "",
      abssin: "",
      company_name: "",
      company_phone_number: "",
      company_address_street: "",
      company_house_no: "",
      lga: "",
      merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
    },
  });

  const { data: lgaData } = useQuery({
    queryKey: ["lgaData"],
    queryFn: () => fetchLGAData(),
  });

  const { data: lgaCategory } = useQuery({
    queryKey: ["lgaCategory"],
    queryFn: () => fetchCategory(),
  });

  // Mutation for searching Demand Notice
  const searchMutation = useMutation({
    mutationFn: async (data: { notice_number: string; merchant_key: string }) =>
      fetchDemandNotice(data),
    onSuccess: (data: any) => {
      const res = data?.data;
      if (res && Object.keys(res).length > 0) {
        const notice = res.response_data.notice;
        setNoticeNumber(notice.notice_number);
        const normalizedNotice = Array.isArray(notice) ? notice[0] : notice;
        setNoticeDetails(normalizedNotice);
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

  // Mutation for assigning with ABSSIN
  const assignWithAbssinMutation = useMutation({
    mutationFn: async (data: any) => assignDemandNotice(data),
    onSuccess: (data: any) => {
      toast.success(data.data?.response_message || "Notice assigned successfully!");
      reset();
      setNoticeDetails(null);
       console.log("data", data);
    //   setNoticeNumber(data?.data?.response_data?.notice_number || "");
      setTaxpayerId(data?.data?.response_data?.taxpayer_id || "");
      setShowModal(true);
    },
    onError: (error: any) => {
      toast.error(error?.error || "An error occurred. Please try again.");
    },
  });

  // Mutation for assigning without ABSSIN
  const assignWithoutAbssinMutation = useMutation({
    mutationFn: async (data: any) => assignnoAbssinDemandNotice(data),
    onSuccess: (data: any) => {
      toast.success(data.data?.response_message || "Notice assigned successfully!");
      reset();
      setNoticeDetails(null);
      console.log("data", data);
      setNoticeNumber(data?.data?.response_data?.notice_number || "");
      setTaxpayerId(data?.data?.response_data?.taxpayer_id || "");
      setShowModal(true);
    },
    onError: (error: any) => {
      toast.error(error?.error || "An error occurred. Please try again.");
    },
  });

  // Step 1: handle search
  const handleSearch = (formData: any) => {
    searchMutation.mutate({
      notice_number: formData.notice_number,
      merchant_key: formData.merchant_key,
    });
  };

  // Step 2: handle assign
  const handleAssign = (formData: any) => {
    if (mode === "abssin") {
      assignWithAbssinMutation.mutate(formData);
    } else {
      assignWithoutAbssinMutation.mutate(formData);
    }
  };

  return (
    <section className="verify-tickets">
      <div className="verify-tickets-comp">
        <GoBackButton />
        <header className="verify-tickets-comp_header mb-5">
          <CustomHeader title="Assign Demand Notice" desc="" />
        </header>

        {/* Step 0: Mode Selector */}
        <div className="verify-tickets-comp_form flex flex-col gap-4">
          <SelectInput
            label="Select Option"
            placeholder="Choose..."
            name="mode"
            id='mode'
            value={mode}
            onChange={(e: any) => setMode(e.target.value)}
            options={[
              { label: "I have my ABSSIN", value: "abssin" },
              { label: "I don’t have ABSSIN", value: "no_abssin" },
            ]}
          />
        </div>

        {/* Step 1: Search Demand Notice (always visible) */}
        <form onSubmit={handleSubmit(handleSearch)} className="verify-tickets-comp_form flex flex-col gap-4 mt-4">
          <FormTextInput
            label="Notice Number"
            type="text"
            name="notice_number"
            register={register}
            validation={{ required: true }}
          />
          <Button text="Search Demand Notice" loading={searchMutation.isPending} />
        </form>

        {/* Step 2: Show details + conditional form */}
        {noticeDetails && (
          <form onSubmit={handleSubmit(handleAssign)} className="verify-tickets-comp_form flex flex-col gap-4 mt-6">
            {/* Demand Notice details */}
            <div className="main-table">
              <div className="main-table_form_tickets_container">
                <div className="tickets">
                  <div className="ticket">
                    <div>
                      <p>{noticeDetails.notice_number}</p>
                      <p>{noticeDetails.status}</p>
                      <p>{parseFloat(noticeDetails.total_amount).toLocaleString()}</p>
                      <p>{noticeDetails.lga}</p>
                      <p>
                        <strong>Business Category: </strong>
                        {
                          lgaCategory?.data?.find(
                            (cat: any) => cat.id === noticeDetails.cdn_category
                          )?.category_name || "N/A"
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Conditional inputs */}
            {mode === "abssin" ? (
              <FormTextInput
                label="ABSSIN"
                type="text"
                name="abssin"
                placeholder="Enter Corporate ABSSIN"
                register={register}
                validation={{ required: true }}
              />
            ) : (
              <>
                <FormTextInput
                  label="Company Name"
                  type="text"
                  name="company_name"
                  placeholder="Enter Company Name"
                  register={register}
                  validation={{ required: true }}
                />
                <FormTextInput
                  label="Company Phone Number"
                  type="text"
                  name="company_phone_number"
                  placeholder="Enter Company Phone Number"
                  register={register}
                />
                <FormTextInput
                  label="Company Address Street"
                  type="text"
                  name="company_address_street"
                  placeholder="Enter Company Street Address"
                  register={register}
                  validation={{ required: true }}
                />
                <FormTextInput
                  label="Company House Number"
                  type="text"
                  name="company_house_no"
                  placeholder="Enter Company House Number"
                  register={register}
                  validation={{ required: true }}
                />
                <SelectInput
                  label="LGA"
                  placeholder="LGA"
                  name="lga"
                  register={register}
                  validation={{ required: true }}
                  error={!!errors.lga}
                  id="lga"
                  options={
                    lgaData
                      ? lgaData?.data.map((lga: any) => ({
                          label: lga.lgaName,
                          value: lga.lgaID,
                        }))
                      : []
                  }
                />
              </>
            )}

            <Button
              text={mode === "abssin" ? "Assign Notice with ABSSIN" : "Assign Notice with Taxpayer Details"}
              loading={
                mode === "abssin" ? assignWithAbssinMutation.isPending : assignWithoutAbssinMutation.isPending
              }
            />
          </form>
        )}

        {showModal && (
        //   <SuccessModal
        //     text="Demand Notice Assigned"
        //     maintext="Demand Notice Assigned Successfully"
        //     id={`Notice Number: ${noticeNumber} | Taxpayer ID: ${taxpayerId}`}
        //     onClick={() => {
        //       setShowModal(false);
        //       router.push("/demand-notices/assign");
        //     }}
        //   />
           <AssignNoticeModal
    mode="success"
    maintext="Notice Assigned Successfully!"
    subtext={`Notice Number: ${noticeNumber}`}
    success_text="Assign Another"
    link="/demand-notices"
    onClick={() => {
              setShowModal(false);
            }}
    close={() => {setShowModal(false); console.log("closed")}}
  />
        )}
      </div>
    </section>
  )
}

export default AssignNotice

const AssignNoticeModal = (props: any) => {
  return (
    <InformationModal
      {...props}
      success_text="Assign Another"
      close={props.close}
      
    />
  );
};

