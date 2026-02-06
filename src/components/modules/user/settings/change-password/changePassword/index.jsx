var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { Button } from "@/src/components/common/button";
import { FormTextInput } from "@/src/components/common/input";
import { ChangePasswordModal, } from "@/src/components/common/modal";
import { changePasswordAPI, } from "@/src/services/changePasswordService";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
var ValidateOTP = function (_a) {
    var setStage = _a.setStage, setFormData = _a.setFormData, formData = _a.formData;
    var _b = useState({
        open: false,
        message: "",
    }), modal = _b[0], setModal = _b[1];
    var _c = useMutation({
        mutationFn: function (data) {
            return changePasswordAPI(data);
        },
        mutationKey: ["change-password"],
        onSuccess: function (data) {
            if (data.status == true) {
                toast.success(data.message || "Password Changed Successfully");
                setModal({
                    open: true,
                    message: data.message,
                });
            }
            else {
                toast.error("Error changing password");
            }
        },
        onError: function (error) {
            console.log(error);
        },
    }), mutate = _c.mutate, isLoading = _c.isLoading;
    var _d = useForm({
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    }), register = _d.register, errors = _d.formState.errors, handleSubmit = _d.handleSubmit, watch = _d.watch;
    var onSubmit = function (reqData) {
        console.log(reqData);
        setFormData(__assign(__assign({}, formData), reqData));
        mutate({ otp: formData.otp, password: reqData.password });
    };
    // Watch the password field for comparison with confirmPassword
    var password = watch("password");
    return (<div>
      <form onSubmit={handleSubmit(onSubmit)} className="change-password_form">
        <FormTextInput label={"New Password"} name={"password"} register={register} placeholder={"Enter New Password for ".concat(formData.email)} type="password" error={errors.password} validation={{
            required: true,
            minLength: {
                value: 8,
                message: "Length must be above 8 characters",
            },
        }}/>

        <FormTextInput label={"Confirm New Password"} name={"confirmPassword"} register={register} placeholder="Confirm New Password" type="password" error={errors.confirmPassword} validation={{
            required: "Confirm Password is required",
            validate: function (value) {
                return value === password || "Passwords do not match";
            },
        }}/>

        <div className="button-container">
          <button className="button secondary" onClick={function () { return setStage(1); }}>
            Edit OTP
          </button>
          <Button text="Change Password" loading={isLoading}/>
        </div>
      </form>

      {modal.open === true && (<ChangePasswordModal maintext={modal.message} id={"Changed Successfully"} onClick={function () { return setStage(1); }} link="/dashboard" text="Done"/>)}
    </div>);
};
export default ValidateOTP;
