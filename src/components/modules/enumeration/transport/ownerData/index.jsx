"use client";
import { Button } from "@/src/components/common/button";
import React from "react";
import { LuUser } from "react-icons/lu";
import { FormTextInput } from "@/src/components/common/input";
// import "../style.scss" // Moved to _app;
import { saveContact, } from "@/src/services/transportEnumerationService";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
var OwnerData = function (_a) {
    var _b, _c;
    var setStage = _a.setStage, details = _a.details, formData = _a.formData;
    var _d = useMutation({
        mutationFn: function (data) {
            return saveContact(data);
        },
        mutationKey: ["save_contact"],
        onSuccess: function (data) {
            toast.success((data === null || data === void 0 ? void 0 : data.response_message) || "Owner's data saved successfully");
            setStage(2);
        },
        onError: function (error) {
            console.log(error);
            toast.error("Error Saving Owner's data");
        },
    }), mutate = _d.mutate, isLoading = _d.isLoading;
    var onSubmit = function (reqData) {
        mutate(reqData);
    };
    var _e = useForm({
        defaultValues: {
            email: "",
            name: (details === null || details === void 0 ? void 0 : details.vehicle_owner.ownerName) || "",
            phone: (details === null || details === void 0 ? void 0 : details.vehicle_owner.phoneNumber) || "",
            plate_number: formData.plate_number || "",
            contact_type: "owner",
            merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
        },
    }), register = _e.register, handleSubmit = _e.handleSubmit;
    return (<form onSubmit={handleSubmit(onSubmit)} className="enumeration-form">
      <div className="user-image">
        {((_b = details === null || details === void 0 ? void 0 : details.vehicle_owner) === null || _b === void 0 ? void 0 : _b.photoUrl) ? (<img src={(_c = details === null || details === void 0 ? void 0 : details.vehicle_owner) === null || _c === void 0 ? void 0 : _c.photoUrl} alt=""/>) : (<LuUser className="user"/>)}
      </div>
      <FormTextInput label={"Owner's ABSSIN"} name={"abssin"} value={(details === null || details === void 0 ? void 0 : details.vehicle_owner.abssin) || ""}/>
      <FormTextInput label={"Owner's Name"} name={"name"} register={register} value={(details === null || details === void 0 ? void 0 : details.vehicle_owner.ownerName) || ""}/>
      <FormTextInput label={"Owner's Address"} name={"ownerAddress"} value={(details === null || details === void 0 ? void 0 : details.vehicle_owner.ownerAddress) || ""}/>
      <FormTextInput label={"Phone Number"} name={"phone"} register={register} value={(details === null || details === void 0 ? void 0 : details.vehicle_owner.phoneNumber) || ""}/>

      <div className="button-container">
        <button className="button secondary" onClick={function () { return setStage(0); }}>
          Go Back
        </button>
        <Button text="Save & Continue" loading={isLoading}/>
      </div>
    </form>);
};
export default OwnerData;
