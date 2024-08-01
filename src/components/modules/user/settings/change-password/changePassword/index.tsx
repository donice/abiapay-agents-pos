import { PrimaryButton } from "@/src/components/common/button";
import { FormTextInput } from "@/src/components/common/input";
import React from "react";
import { useForm } from "react-hook-form";

const ValidateOTP = ({ setStage, setFormData, formData }: any) => {

  const {
    register, 
    formState: { errors },
    handleSubmit
  } = useForm ({
    defaultValues: {
      otp: "",
    },
  })


  const onSubmit = (reqData: {otp: string}) => {
    console.log(reqData)
    setFormData({...reqData});
    setStage(2)
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="change-password_form">
        <FormTextInput
          label={"OTP Token"}
          name={"otp"}
          register={register}
          placeholder={`Enter OTP sent to ${formData.email}`}
          type="password"
          error={errors.otp}
          validation={{
            required: true,
            minLength: {
              value: 8,
              message: "Length must be above 8 characters",
            },
          }}
        />

        <div className="button-container">
          <button className="button secondary" onClick={() => setStage(0)}>
            Edit OTP
          </button>
          <PrimaryButton text="Change Password" />
        </div>
      </form>
    </div>
  );
};

export default ValidateOTP;
