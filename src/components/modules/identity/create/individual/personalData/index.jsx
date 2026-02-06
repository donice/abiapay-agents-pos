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
import React, { useEffect } from "react";
// import "../style.scss" // Moved to _app;
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { Button } from "@/src/components/common/button";
import { useForm } from "react-hook-form";
import FaceCam from "../faceCam";
var PersonalData = function (_a) {
    var setStage = _a.setStage, setFormData = _a.setFormData, formData = _a.formData;
    console.log(formData);
    var _b = useForm({
        defaultValues: {
            first_name: formData.first_name || "",
            middle_name: formData.middle_name || "",
            surname: formData.surname || "",
            indv_title: formData.indv_title || "",
            gender: formData.gender || "",
            marital_status: formData.marital_status || "",
        },
    }), register = _b.register, handleSubmit = _b.handleSubmit, errors = _b.formState.errors, setValue = _b.setValue;
    useEffect(function () {
        setValue("first_name", formData.first_name);
        setValue("middle_name", formData.middle_name);
        setValue("surname", formData.surname);
        setValue("indv_title", formData.indv_title);
        setValue("gender", formData.gender);
        setValue("marital_status", formData.marital_status);
    }, [formData]);
    var onSubmit = function (data) {
        console.log(data);
        setFormData(function (prev) {
            return __assign(__assign({}, prev), data);
        });
        setStage(1);
    };
    return (<div>
      <form className="identity-form" onSubmit={handleSubmit(onSubmit)}>
        <FaceCam setFormData={setFormData}/>
        <SelectInput label="Title" name="indv_title" id="indv_title" register={register} error={!!errors.indv_title} validation={{ required: true }} options={[
            { value: "Mr", label: "Mr" },
            { value: "Mrs", label: "Mrs" },
            { value: "Miss", label: "Miss" },
            { value: "Dr", label: "Dr" },
            { value: "Chief", label: "Chief" },
        ]}/>
        <FormTextInput label="First Name" name="first_name" placeholder="Enter first name" register={register} error={errors.first_name} validation={{ required: true }}/>
        <FormTextInput label="Middle Name" name="middle_name" placeholder="Enter first name" register={register} error={errors.middle_name} validation={{ required: true }}/>
        <FormTextInput label="Last Name" name="surname" placeholder="Enter first name" register={register} error={errors.surname} validation={{ required: true }}/>
        <SelectInput label="Gender" name="gender" id="gender" register={register} error={!!errors.gender} validation={{ required: true }} options={[
            { value: "Female", label: "Female" },
            { value: "Male", label: "Male" },
        ]}/>
        <SelectInput label="Marital Status" name="marital_status" id="marital_status" register={register} error={!!errors.marital_status} validation={{ required: true }} options={[
            { value: "Single", label: "Single" },
            { value: "Married", label: "Married" },
            { value: "Divorced", label: "Divorced" },
            { value: "Widowed", label: "Widowed" },
        ]}/>
        <Button text={"Proceed"}/>
      </form>
    </div>);
};
export default PersonalData;
