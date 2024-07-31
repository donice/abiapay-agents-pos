import { Button } from '@/src/components/common/button';
import { FormTextInput } from '@/src/components/common/input';
import { changePasswordOTPType, changePasswordOTP } from '@/src/services/changePasswordService';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const ConfirmEmail = ({ setStage, formData}: any) => {
  const [modalDetails, setModalDetails] = useState({});
  const { mutate, isPending } = useMutation({
    mutationFn: (data: changePasswordOTPType) => {
      return changePasswordOTP(data);
    },
    mutationKey: ["change-password"],
    onSuccess: (data) => {
      if (data) {
        toast.success("OTP sent");
        console.log(data.message);
      } else {
        toast.error("Password Change Failed");
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error");
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (reqData: changePasswordOTPType) => {
    mutate(reqData);
  };
  return (
    <section className="change-password">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="change-password_form"
        >
          <FormTextInput
            label={"Email"}
            name={"email"}
            placeholder="Enter your email"
            type="text"
            register={register}
            validation={{ required: true }}
            error={errors.email}
          />
          <Button text="Send OTP" loading={isPending} />
        </form>
      </section>
  )
}

export default ConfirmEmail