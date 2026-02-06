"use client";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Button, GoBackButton } from "@/src/components/common/button";
import Empty from "@/src/components/common/empty";
import { FormTextInput } from "@/src/components/common/input";
import { searchDemandNotice, } from "@/src/services/demandNotice";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
// import "./style.scss" // Moved to _app;
import { CustomHeader } from "@/src/components/common/header";
var SearchDemandnoticeComponent = function () {
    var _a = useForm({
        defaultValues: {
            notice_number: "",
            merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
        },
    }), register = _a.register, handleSubmit = _a.handleSubmit, reset = _a.reset, errors = _a.formState.errors;
    var _b = React.useState(null), displayDetails = _b[0], setDisplayDetails = _b[1];
    var _c = React.useState(null), errorMessage = _c[0], setErrorMessage = _c[1];
    var mutation = useMutation({
        mutationFn: function (data) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, searchDemandNotice(data)];
        }); }); },
        onSuccess: function (data) {
            var res = data === null || data === void 0 ? void 0 : data.data.response_data.notice;
            console.log("Response Data:", res); // Debugging log
            if (res && Object.keys(res).length > 0) {
                setDisplayDetails(res);
                setErrorMessage(null);
                toast.success("Demand Notice Found");
            }
            else {
                setDisplayDetails(null);
                setErrorMessage("No matching notice found.");
                toast.error("No matching notice found.");
            }
            reset();
        },
        onError: function (error) {
            setDisplayDetails(null);
            setErrorMessage((error === null || error === void 0 ? void 0 : error.error) || "An error occurred. Please try again.");
            toast.error((error === null || error === void 0 ? void 0 : error.error) || "An error occurred. Please try again.");
        },
    });
    var onSubmit = function (data) {
        setDisplayDetails(null);
        setErrorMessage(null);
        mutation.mutate(__assign({}, data));
    };
    return (<section className="verify-tickets">
      <div className="verify-tickets-comp">
        <GoBackButton />
        <header className="verify-tickets-comp_header">
          <CustomHeader title="Search Notice Ticket" desc=""/>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="verify-tickets-comp_form flex flex-col gap-4">
          <FormTextInput label="Notice Number" type="text" name="notice_number" register={register} validation={{ required: true }} error={errors.notice_number}/>
          {/* <SelectInput
          label="Fiscal Year"
          name="year"
          id="year"
          register={register}
          options={[
            { label: "2024", value: "2024" },
            { label: "2025", value: "2025" },
          ]}
          placeholder="Select Fiscal Year"
        /> */}
          <Button text="Search Demand Notice" loading={mutation.isLoading}/>
        </form>
      </div>

      <div className="verify-tickets-comp_details">
        {errorMessage ? (<Empty text={errorMessage}/>) : displayDetails ? (<div className="border-2 border-dashed rounded-xl px-4">
            <div className="line-items">
              <p>Status:</p>
              <p className="success">Valid Notice</p>
            </div>

            {[
                { label: "Taxpayer Name", key: "taxpayer_name" },
                { label: "Category Name", key: "category_name" },
                { label: "Notice Number", key: "notice_number" },
                { label: "Fiscal Year", key: "fiscal_year" },
                { label: "LGA", key: "lga" },
                { label: "Total Amount", key: "total_amount" },
                { label: "Payment Status", key: "payment_status" },
            ]
                .filter(function (_a, index, self) {
                var key = _a.key;
                return index === self.findIndex(function (k) { return k.key === key; });
            } // to remove duplicates
            )
                .map(function (_a) {
                var label = _a.label, key = _a.key;
                if (!(displayDetails === null || displayDetails === void 0 ? void 0 : displayDetails[key]))
                    return null;
                var value = displayDetails[key];
                if (key === "total_amount") {
                    value = "\u20A6".concat(parseFloat(value).toLocaleString("en-NG", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                    }));
                }
                return (<div key={key} className="line-items">
                    <p>{label}:</p>
                    <p>{value}</p>
                  </div>);
            })}
          </div>) : null}
      </div>
    </section>);
};
export default SearchDemandnoticeComponent;
