"use client"

import { Button, GoBackButton } from '@/src/components/common/button'
import { CustomHeader } from '@/src/components/common/header'
import { FormTextInput, SelectInput } from '@/src/components/common/input'
import { assignDemandNotice, assignDemandNoticePayload } from '@/src/services/demandNotice'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const AssignNotice= () => {

     const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
      const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<assignDemandNoticePayload>({
        defaultValues: {
          notice_number: "",
          abssin: "",
          merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
        },
      });

      const mutation = useMutation({
    mutationFn: async (data: assignDemandNoticePayload) => assignDemandNotice(data),
    onSuccess: (data: any) => {
      const res = data?.data;
      console.log("response data",data)

      if (res && Object.keys(res).length > 0) {
        // setDisplayDetails(res);
        // setErrorMessage(null);

        toast.success(data.data.response_message);
      } else {
        // setDisplayDetails(null);
        setErrorMessage(data.data.response_message);
        toast.error(data.data.response_message);
      }
      
      reset();
    },
    onError: (error: any) => {
    //   setDisplayDetails(null);
      setErrorMessage(error?.error || "An error occurred. Please try again.");
      toast.error(error?.error || "An error occurred. Please try again.");
    },
  });

       const onSubmit = (data: assignDemandNoticePayload) => {
        //   setDisplayDetails(null);
        //   setErrorMessage(null);
          mutation.mutate({ ...data });
        };
  return (
       <section className="verify-tickets">
      <div className="verify-tickets-comp">
      <GoBackButton />
        <header  className="verify-tickets-comp_header">
           <CustomHeader
                      title="Assign Blank Notice Ticket"
                      desc=""
                    />
        </header>
          
        <form onSubmit={handleSubmit(onSubmit)} className="verify-tickets-comp_form flex flex-col gap-4">
            <FormTextInput
    label="ABSSIN"
    type="text"
    name="abssin"
    register={register}
    validation={{ required: true }}
    error={errors.abssin}
  />
  <FormTextInput
    label="Notice Number"
    type="text"
    name="notice_number"
    register={register}
    validation={{ required: true }}
    error={errors.notice_number}
  />
  
  <Button text="Assign Blank Demand Notice" loading={mutation.isPending} />
</form>

      </div>
    

     
    </section>
  )
}

export default AssignNotice
