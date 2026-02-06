"use client";
import React from "react";
import { FormButton } from "@/src/components/common/button";
import { SelectInput, FormTextInput } from "@/src/components/common/input";
// import "./style.scss" // Moved to _app;
import { useForm } from "react-hook-form";
import { fetchMarketEnumerationDetails } from "@/src/services/ticketsServices";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import CreateMarketLevyForm from "./createMarketLevy";
var AddMarketTicketForm = function () {
    var router = useRouter();
    var _a = useForm({
        defaultValues: {
            option: "",
            enumeration_id: "",
        },
    }), registerRenderForm = _a.register, watchRenderForm = _a.watch, handleRenderFormSubmit = _a.handleSubmit;
    var _b = useMutation({
        mutationKey: ["fetchMarketEnumerationDetails"],
        mutationFn: function () {
            return fetchMarketEnumerationDetails({
                enumeration_id: watchRenderForm("enumeration_id"),
            });
        },
        onSuccess: function (data) {
            if ((data === null || data === void 0 ? void 0 : data.response_code) == "00") {
                router.push("/tickets/market/add/".concat(data === null || data === void 0 ? void 0 : data.response_data.enumeration_id));
            }
            else {
                toast.error((data === null || data === void 0 ? void 0 : data.response_message) || "No details for this enumeration id", {});
            }
        },
    }), mutateEnumerationDetails = _b.mutate, isLoadingEnumerationDetails = _b.isLoading;
    var onSubmitEnumerationID = function (data) {
        mutateEnumerationDetails();
    };
    var watchOption = watchRenderForm("option");
    return (<div className="add-market-ticket">
      <>
        {" "}
        <h2 className="mb-1 text-uppercase font-semibold text-teal-600 text-xs tracking-wider">
          DO YOU HAVE A MARKET ENUMERATION ID?
        </h2>
        <SelectInput label="Select Option" name="option" register={registerRenderForm} placeholder="Select Option" id={""} options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
        ]}/>
        {watchOption == "yes" ? (<form onSubmit={handleRenderFormSubmit(onSubmitEnumerationID)}>
            <div className="add-market-ticket">
              <FormTextInput label="Enumeration ID" type="number" name="enumeration_id" register={registerRenderForm} placeholder="Enter Enumeration ID"/>{" "}
              <FormButton text={"Check Details"} disabled={watchRenderForm("enumeration_id") == "" ||
                isLoadingEnumerationDetails} loading={isLoadingEnumerationDetails}/>
            </div>
          </form>) : (watchOption == "no" && <CreateMarketLevyForm />)}
      </>
    </div>);
};
export default AddMarketTicketForm;
