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
import { PrimaryButton } from "@/src/components/common/button";
import { FormTextInput } from "@/src/components/common/input";
import React from "react";
import { useForm } from "react-hook-form";
var ValidateOTP = function (_a) {
    var setStage = _a.setStage, setFormData = _a.setFormData, formData = _a.formData;
    var _b = useForm({
        defaultValues: {
            otp: "",
        },
    }), register = _b.register, errors = _b.formState.errors, handleSubmit = _b.handleSubmit;
    var onSubmit = function (reqData) {
        console.log(reqData);
        setFormData(__assign(__assign({}, formData), reqData));
        setStage(2);
    };
    return (<div>
      <form onSubmit={handleSubmit(onSubmit)} className="change-password_form">
        <FormTextInput label={"OTP Token"} name={"otp"} register={register} placeholder={"Enter OTP sent to ".concat(formData.email)} type="password" error={errors.otp} validation={{
            required: true,
            minLength: {
                value: 6,
                message: "Length must be above 3 characters",
            },
            maxLength: {
                value: 6,
                message: "Length must be below 5 characters",
            },
        }}/>

        <div className="button-container">
          <button className="button secondary" onClick={function () { return setStage(0); }}>
            Change Email
          </button>
          <PrimaryButton text="Enter New Password"/>
        </div>
      </form>
    </div>);
};
export default ValidateOTP;
