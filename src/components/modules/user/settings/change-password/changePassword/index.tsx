import { PrimaryButton } from "@/src/components/common/button";
import { FormTextInput } from "@/src/components/common/input";
import {
  changePasswordAPI,
  changePasswordType,
} from "@/src/services/changePasswordService";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ValidateOTP = ({ setStage, setFormData, formData }: any) => {
  const [modal, setModal] = useState({
    open: false,
    message: "",
  });

  const { mutate } = useMutation({
    mutationFn: (data: changePasswordType) => {
      return changePasswordAPI(data);
    },
    mutationKey: ["change-password"],
    onSuccess: (data) => {
      if (data) {
        toast.success("OTP sent");
        // setStage(1);
        console.log(data.message);
        setModal({
          open: true,
          message: data.message,
        });
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
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (reqData: { password: string; confirmPassword: string }) => {
    console.log(reqData);
    setFormData({ ...formData, ...reqData });
    mutate({ otp: formData.otp, password: reqData.password });
  };

  // Watch the password field for comparison with confirmPassword
  const password = watch("password");

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="change-password_form">
        <FormTextInput
          label={"New Password"}
          name={"password"}
          register={register}
          placeholder={`Enter New Password for ${formData.email}`}
          type="password"
          error={errors.password}
          validation={{
            required: true,
            minLength: {
              value: 8,
              message: "Length must be above 8 characters",
            },
          }}
        />

        <FormTextInput
          label={"Confirm New Password"}
          name={"confirmPassword"}
          register={register}
          placeholder="Confirm New Password"
          type="password"
          error={errors.confirmPassword}
          validation={{
            required: "Confirm Password is required",
            validate: (value: string) =>
              value === password || "Passwords do not match",
          }}
        />

        <div className="button-container">
          <button className="button secondary" onClick={() => setStage(1)}>
            Edit OTP
          </button>
          <PrimaryButton text="Change Password" />
        </div>
      </form>
    </div>
  );
};

export default ValidateOTP;
