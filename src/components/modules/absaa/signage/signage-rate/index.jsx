"use client";
import React, { useState } from "react";
import { Button } from "@/src/components/common/button";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { verifyPlateNumber, } from "@/src/services/transportEnumerationService";
import toast from "react-hot-toast";
import { ErrorModal, InfoModal, VehicleCheckSuccessModal, } from "@/src/components/common/modal";
// import "../style.scss" // Moved to _app;
import { CustomHeader } from "@/src/components/common/header";
var SignageCategoryComponent = function (_a) {
    var _b = useState({
        vehicle_make: "",
        vehicle_model: "",
        vehicle_color: "",
        state_of_registration: "",
        expiry_date: "",
        size_in_meters: "",
        size_in_feet: "",
        premium_zone_rate: "",
        standard_zone_rate: "",
    }), modalDetails = _b[0], setModalDetails = _b[1];
    var _c = useState({
        mode: false,
        user: "",
        status: "",
    }), show = _c[0], setShow = _c[1];
    var _d = useForm({
        defaultValues: {
            merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
            amount: "",
            signage_category: "",
            trade_union: "",
            operating_park: "",
            size_in_meters: "",
            size_in_feet: "",
            premium_zone_rate: "",
            standard_zone_rate: "",
        },
    }), register = _d.register, handleSubmit = _d.handleSubmit, reset = _d.reset, errors = _d.formState.errors;
    var _e = useMutation({
        mutationFn: function (data) {
            return verifyPlateNumber(data);
        },
        mutationKey: ["verify_plate_number"],
        onSuccess: function (data) {
            console.log("FIRST LOG", data);
        },
        onError: function (error) {
            toast.error("Error Verifying Plate Number");
            reset();
            console.log(error);
        },
    }), mutate = _e.mutate, isLoading = _e.isLoading;
    var onSubmit = function (reqData) {
        mutate(reqData);
    };
    return (<div>
      <CustomHeader title="Create Signage Rate" desc="Signage Details"/>
      <form onSubmit={handleSubmit(onSubmit)} className="absaa-form">
        <SelectInput label="Signage Category" name="signage_category" id="signage_category" options={[
            {
                label: "Select Signage Category",
                value: "",
            },
            {
                label: "Wall Signs",
                value: "Wall Signs",
            },
            {
                label: "Free Standing",
                value: "Free Standing",
            },
        ]} placeholder="Select Signage Category" register={register} validation={{ required: true }}/>

        <SelectInput label="Road Category" name="road_category" id="road_category" options={[
            {
                label: "Select Road Category",
                value: "",
            },
            {
                label: "Premium",
                value: "Premium",
            },
            {
                label: "Azikwe Street",
                value: "Azikwe Street",
            },
        ]} placeholder="Select Road Category" register={register} validation={{ required: true }}/>

        <SelectInput label="Road" name="road_name" id="road_name" options={[
            {
                label: "Select Road",
                value: "",
            },
            {
                label: "Azikwe Road",
                value: "Azikwe Road",
            },
            {
                label: "Azikwe Street",
                value: "Azikwe Street",
            },
        ]} placeholder="Select Road" register={register} validation={{ required: true }}/>

        <FormTextInput label="Size in Meters" type="number" name="size_in_meters" placeholder="Enter Size in Meters" register={register} validation={{
            required: true,
        }} error={errors.size_in_meters}/>

        <FormTextInput label="Size in Feet" type="number" name="size_in_feet" placeholder="Enter Size in Feet" register={register} validation={{
            required: true,
        }} error={errors.size_in_feet}/>

        <FormTextInput label="Size in Meters" type="number" name="size_in_meters" placeholder="Enter Size in Meters" register={register} validation={{
            required: true,
        }} error={errors.size_in_meters}/>

        <FormTextInput label="Premium Zone Rate" type="number" name="premium_zone_rate" placeholder="Enter Premium Zone Rate" register={register} validation={{
            required: true,
        }} error={errors.premium_zone_rate}/>

        <FormTextInput label="Standard Zone Rate" type="number" name="standard_zone_rate" placeholder="Enter Standard Zone Rate" register={register} validation={{
            required: true,
        }} error={errors.standard_zone_rate}/>

        <SelectInput label="Status" name="road_name" id="road_name" options={[
            {
                label: "Select Status",
                value: "",
            },
            {
                label: "Active",
                value: "Active",
            },
            {
                label: "Inactive",
                value: "Inactive",
            },
        ]} placeholder="Select Road" register={register} validation={{ required: true }}/>

        <Button text="Pay now" loading={isLoading}/>
      </form>

      {show.mode === true && (<ErrorModal text_header={"Error Validating ".concat(show.user, " ABSSIN")} button_text="Create ABSSIN" link="/identity/create/individual/verify" text_info={"To proceed, kindly click \"Create ABSSIN\" to create ".concat(show.user, " ABSSIN")} status={"error"}/>)}
      {show.mode && show.status == "error" && (<InfoModal status={show.status} text_header="Vehicle Information Not Found" button_text="Enter Vehicle Details" link="/enumeration/transport/save" text_info={"Cannot Proceed. Please Register Vehicle Details"}/>)}
      {show.mode && show.status == "success" && (<VehicleCheckSuccessModal text_header="Information Retrieved Successfully" vehicle_make={modalDetails.vehicle_make} vehicle_model={modalDetails.vehicle_model} vehicle_color={modalDetails.vehicle_color} state_of_registration={modalDetails.state_of_registration} expiry_date={modalDetails.expiry_date} button_text="Continue" onClick={function () {
                setShow({ mode: false, status: "", user: "" });
            }}/>)}
    </div>);
};
export default SignageCategoryComponent;
