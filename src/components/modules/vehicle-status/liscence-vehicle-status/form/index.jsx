"use client";
import React from "react";
import { TextInput } from "@/src/components/common/input";
import { Button } from "@/src/components/common/button";
import { useForm } from "react-hook-form";
// import "./style.scss" // Moved to _app;
import { TbSearch } from "react-icons/tb";
import { useMutation } from "@tanstack/react-query";
import { verifyVehicleStatus, } from "@/src/services/vehicleStatusService";
import toast from "react-hot-toast";
var Form = function (_a) {
    var setTicketsData = _a.setTicketsData, setSearched = _a.setSearched;
    var _b = useForm({
        defaultValues: {
            ref: "",
        },
    }), register = _b.register, handleSubmit = _b.handleSubmit, errors = _b.formState.errors;
    var _c = useMutation({
        mutationKey: ["verify_vehicle_status"],
        mutationFn: function (data) {
            return verifyVehicleStatus(data);
        },
        onSuccess: function (data) {
            console.log(data);
            if ((data === null || data === void 0 ? void 0 : data.response_code) == "00") {
                setTicketsData(data === null || data === void 0 ? void 0 : data.response_data);
                setSearched(true);
            }
            else {
                toast.error(data === null || data === void 0 ? void 0 : data.response_message);
                setSearched(true);
            }
        },
        onError: function (error) {
            console.log(error);
        },
    }), mutate = _c.mutate, isLoading = _c.isLoading;
    var onSubmit = function (data) {
        try {
            mutate(data);
        }
        catch (error) {
            console.log(error);
        }
    };
    return (<>
      <form className="find-ticket" onSubmit={handleSubmit(onSubmit)}>
        <TextInput label="Plate Number" input_icon={<TbSearch />} type="text" name="ref" placeholder="Enter Taxpayer Plate Number" register={register} validation={{
            required: "Plate Number is Required",
            minLength: {
                value: 5,
                message: "Length must be above 11 characters",
            },
            maxLength: {
                value: 8,
                message: "Length must be below 13 characters",
            },
        }} error={errors.ref}/>

        <Button text={"Search Tickets"} loading={isLoading}/>
      </form>
    </>);
};
export default Form;
