import { SelectInput, TextInput } from "@/src/components/common/input";
import React from "react";
import { TbSearch } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { searchOffence } from "@/src/services/trafficOffences";
import toast from "react-hot-toast";
import { Button } from "@/src/components/common/button";
// import "./style.scss" // Moved to _app;
var Form = function (_a) {
    var setTicketsData = _a.setTicketsData, setSearched = _a.setSearched;
    var _b = useForm({
        defaultValues: {
            search_value: "",
            search_by: "",
        },
    }), register = _b.register, handleSubmit = _b.handleSubmit, watch = _b.watch, errors = _b.formState.errors;
    var selectedVerificationType = watch("search_by");
    var _c = useMutation({
        mutationFn: function (data) {
            return searchOffence(data);
        },
        onSuccess: function (data) {
            console.log(data);
            if ((data === null || data === void 0 ? void 0 : data.status) == true) {
                setTicketsData(data === null || data === void 0 ? void 0 : data.data);
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
    return (<div>
      <form className="find-ticket" onSubmit={handleSubmit(onSubmit)}>
         <SelectInput label="Verification Type" name="search_by" id="search_by" register={register} options={[
            { label: "Plate Number", value: "plateNumber" },
            { label: "Reference", value: "reference" },
        ]} placeholder="Select Verification Type"/>
              
              {(selectedVerificationType === "reference") && (<TextInput label="Enter Reference Number" input_icon={<TbSearch />} type="text" name="search_value" placeholder="Enter reference number" register={register} validation={{
                required: "Reference Number is Required",
                minLength: {
                    value: 5,
                    message: "Length must be above 11 characters",
                },
                maxLength: {
                    value: 8,
                    message: "Length must be below 13 characters",
                },
            }}/>)}

        {(selectedVerificationType === "plateNumber") && (<TextInput label="Enter Plate Number" input_icon={<TbSearch />} type="text" name="search_value" placeholder="Enter Plate Number" register={register} validation={{
                required: "Plate Number is Required",
                minLength: {
                    value: 5,
                    message: "Length must be above 11 characters",
                },
                maxLength: {
                    value: 8,
                    message: "Length must be below 13 characters",
                },
            }}/>)}
       

    <Button text={"Search for Traffic Offence "} loading={isLoading}/>
       
      </form>
    </div>);
};
export default Form;
