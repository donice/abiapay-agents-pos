"use client";
import React from "react";
import { TextInput } from "@/src/components/common/input";
import { Button } from "@/src/components/common/button";
import { useForm } from "react-hook-form";
import { fetchTransactionsUsingPhoneNumber, } from "@/src/services/findServices";
// import "./style.scss" // Moved to _app;
import { TbSearch } from "react-icons/tb";
import { useMutation } from "@tanstack/react-query";
var Form = function (_a) {
    var setTicketsData = _a.setTicketsData, setSearched = _a.setSearched;
    var _b = useForm({
        defaultValues: {
            merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
            phone_number: "",
            page: 1,
            limit: 5,
        },
    }), register = _b.register, handleSubmit = _b.handleSubmit, errors = _b.formState.errors;
    var _c = useMutation({
        mutationFn: function (data) {
            return fetchTransactionsUsingPhoneNumber(data);
        },
        mutationKey: ["fetch_transactions"],
        onSuccess: function (data) {
            setTicketsData(data === null || data === void 0 ? void 0 : data.response_data);
            setSearched(true);
        },
        onError: function (error) {
            console.log(error);
        },
    }), mutate = _c.mutate, error = _c.error, isLoading = _c.isLoading;
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
        <TextInput label="Phone Number" input_icon={<TbSearch />} type="number" name="phone_number" placeholder="Enter Taxpayer Phone Number" register={register} validation={{
            required: "Phon Number is Required",
            minLength: {
                value: 11,
                message: "Length must be above 11 characters",
            },
            maxLength: {
                value: 11,
                message: "Length must be below 13 characters",
            },
        }} error={errors.phone_number}/>

        <Button text={"Search Tickets"} loading={isLoading}/>
      </form>
    </>);
};
export default Form;
