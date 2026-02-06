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
import { EmailSuccessModal } from "@/src/components/common/modal";
import { changePasswordOTP, } from "@/src/services/changePasswordService";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
var ConfirmEmail = function (_a) {
    var setStage = _a.setStage, setFormData = _a.setFormData;
    var _b = useState({
        open: false,
        message: "",
    }), modal = _b[0], setModal = _b[1];
    var _c = useMutation({
        mutationFn: function (data) {
            return changePasswordOTP(data);
        },
        mutationKey: ["change-password"],
        onSuccess: function (data) {
            if (data) {
                toast.success("OTP sent");
                // setStage(1);
                console.log(data.message);
                setModal({
                    open: true,
                    message: data.message,
                });
            }
            else {
                toast.error("Password Change Failed");
            }
        },
        onError: function (error) {
            console.log(error);
            toast.error("Error");
        },
    }), mutate = _c.mutate, isLoading = _c.isLoading;
    var _d = useForm({
        defaultValues: {
            email: "",
        },
    }), handleSubmit = _d.handleSubmit, register = _d.register, errors = _d.formState.errors;
    var onSubmit = function (reqData) {
        mutate(reqData);
        setFormData(__assign({}, reqData));
    };
    return (<section className="change-password">
      <form onSubmit={handleSubmit(onSubmit)} className="change-password_form">
        <FormTextInput label={"Agent's Email"} name={"email"} placeholder="Enter agent's email" type="text" register={register} validation={{ required: true }} error={errors.email}/>
        <Button text="Send OTP" loading={isLoading}/>
      </form>

      {modal.open === true && <EmailSuccessModal text={modal.message} buttonText="Validate OTP" onClick={function () { return setStage(1); }}/>}
    </section>);
};
export default ConfirmEmail;
