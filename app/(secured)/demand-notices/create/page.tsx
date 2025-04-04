"use client"

import { Button, GoBackButton } from '@/src/components/common/button'
import { CustomHeader } from '@/src/components/common/header'
import { FormTextInput, SelectInput } from '@/src/components/common/input'
import { createDemandNotice, generateDemandNoticePayload } from '@/src/services/demandNotice'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from "react-hot-toast";

const CreateDemandNotice = () => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<generateDemandNoticePayload>({
      defaultValues: {
        taxpayerID: "",
      },
    });

    const router = useRouter();

    // const onSubmit = (data: generateDemandNoticePayload) => {
    //     // mutation.mutate({ ...data, agentEmail: userData?.email });
    //   };

      const onSubmit = async (formData: any) => {
        console.log("formData", formData);
        // if (!selectedProduct) {
        //   toast.error("Please select a product");
        //   return;
        // }
        
    
        const requestBody = {
          taxpayer_id: formData.taxpayerID,
          cdn_category_id: 1,
        createdby: "456789",
        fiscal_year: "2025"
        };
    
        try {
          await createDemandNotice(requestBody);
          toast.success("Bill created successfully");
          // router.push('/bills');
        } catch (error: any) {
          toast.error(error.message || "Failed to create bill");
        }
      };
  return (
    <div>
      <GoBackButton />
      <section>
        <div className="">
            <header className="verify-tickets-comp_header">
                    <CustomHeader
                      title="Generate New Notice"
                      desc=""
                    />
                  </header>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="verify-tickets-form">
             
        <FormTextInput
  label="ABSSIN"
  type="text"
  name="taxpayerID"  // Change this to match your state
  placeholder="Enter Corporate ABSSIN"
  register={register}
  validation={{
    required: true,
    minLength: {
      value: 7,
      message: "Length must be above 7 characters",
    },
  }}
  error={errors.taxpayerID} // Ensure error matches the correct field name
/>

              <Button text="Verify Ticket" 
              // loading={mutation.isPending} 
              />
            </form>
      </section>
    </div>
  )
}

export default CreateDemandNotice