"use client";
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
import { Button } from "@/src/components/common/button";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import React, { useEffect, useState } from "react";
// import "../style.scss" // Moved to _app;
import { useForm } from "react-hook-form";
import { useDebounce } from "@/src/hooks/useDebounce";
import { fetchPlateNumberInfo } from "@/src/services/ticketsServices";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { getErrorMessages } from "@/src/utils/helper";
import { haulages } from "../lib/haulages";
import { createFlyingRevenue, fetchTonnage, } from "@/src/services/FlyingRevenue";
var FlyingRevenueForm = function (_a) {
    var setShow = _a.setShow, slug = _a.slug;
    var haulageItem = haulages.find(function (item) { return item.name.includes(slug); });
    var _b = useState([]), embleProductCode = _b[0], setEmbleProductCode = _b[1];
    var getEmblemProductCode = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchTonnage(haulageItem === null || haulageItem === void 0 ? void 0 : haulageItem.cat)];
                case 1:
                    data = _a.sent();
                    setEmbleProductCode(data);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        getEmblemProductCode();
    }, []);
    var _c = useForm({
        defaultValues: {
            merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
            penalty_status: "no penalty",
            total_number: "1",
            vehicle_content: "",
            product_code: "",
            category: haulageItem ? haulageItem.cat : "",
            taxPayerPhone: "",
            taxPayerName: "",
            plateNumber: "",
            collection_point: "",
            payment_period: "1Day",
            wallet_type: "fidelity",
            // next_payment_date: "1Day",
            amount: "",
        },
    }), handleSubmit = _c.handleSubmit, watch = _c.watch, setValue = _c.setValue, register = _c.register, errors = _c.formState.errors;
    var plateNumber = watch("plateNumber");
    var debouncedPlateNumber = useDebounce(plateNumber, 500);
    useEffect(function () {
        if (debouncedPlateNumber) {
            var getPlateNumberInfo = function (plateNumber) { return __awaiter(void 0, void 0, void 0, function () {
                var response, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, fetchPlateNumberInfo(plateNumber)];
                        case 1:
                            response = _a.sent();
                            if (response.data.length !== 0) {
                                toast.success(response.message);
                                setValue("taxPayerName", response.data.Name);
                                setValue("taxPayerPhone", response.data.Phone);
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _a.sent();
                            toast.error("Error fetching plate number information");
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
            getPlateNumberInfo(debouncedPlateNumber);
        }
    }, [debouncedPlateNumber, setValue]);
    var handleEmblemTypeChange = function (event) {
        var selectedProductCode = event.target.value;
        var selectedProduct = embleProductCode.find(function (item) { return item.productCode === selectedProductCode; });
        if (selectedProduct) {
            setValue("amount", selectedProduct.amount);
        }
        setValue("product_code", selectedProductCode);
    };
    var _d = useMutation({
        mutationFn: function (data) {
            return createFlyingRevenue(data);
        },
        onSuccess: function (data) {
            console.log(data);
            if (data === null || data === void 0 ? void 0 : data.response_code) {
                (data === null || data === void 0 ? void 0 : data.response_code) == "00"
                    ? toast.success(data === null || data === void 0 ? void 0 : data.response_message) &&
                        setShow({
                            mode: true,
                            message: data === null || data === void 0 ? void 0 : data.response_message,
                            expiry_date: "",
                            payment_ref: data === null || data === void 0 ? void 0 : data.payment_ref,
                        })
                    : toast.error(data === null || data === void 0 ? void 0 : data.response_message);
            }
            else {
                toast.error(getErrorMessages(data === null || data === void 0 ? void 0 : data.message));
            }
        },
        onError: function (error) {
            toast.error("Unable to proceed flying revenue request");
            console.log(error);
        },
    }), mutate = _d.mutate, isLoading = _d.isLoading;
    var onSubmit = function (reqData) {
        mutate(reqData);
    };
    return (<>
      <form onSubmit={handleSubmit(onSubmit)} className="loading_form">
          <>
            <SelectInput label={"Vehicle Type"} name={"product_code"} id={"product_code"} validation={{ required: true }} options={embleProductCode.map(function (item) { return ({
            label: item.productName,
            value: item.productCode,
        }); })} onChange={handleEmblemTypeChange}/>
          </>

        <FormTextInput label={"Vehicle Content"} name={"vehicle_content"} placeholder="Enter Vehicle Vehicle Content e.g Sand, Gravel..." register={register} validation={{ required: true }} error={errors.vehicle_content}/>
        <FormTextInput label={"Plate Number"} name={"plateNumber"} placeholder="Enter Vehicle Plate Number" register={register} validation={{ required: true }} error={errors.plateNumber}/>
        <FormTextInput label={"Taxpayer Phone Number"} name={"taxPayerPhone"} placeholder="Enter Taxpayer Phone Number" register={register} validation={{ required: true }} error={errors.taxPayerPhone}/>
        <FormTextInput label={"Taxpayer Name"} name={"taxPayerName"} placeholder="Enter Taxpayer Name" register={register} validation={{ required: true }} error={errors.taxPayerName}/>
        <FormTextInput label={"Collection Point"} name={"collection_point"} placeholder="Enter Collection Point" register={register} validation={{ required: true }} error={errors.collection_point}/>
        <FormTextInput label={"Amount"} name={"amount"} placeholder="Enter Amount" register={register} validation={{ required: true }} error={errors.amount} disabled/>
        <SelectInput label={"Wallet Type"} name={"wallet_type"} id={"wallet_type"} register={register} validation={{ required: true }} error={!!errors.wallet_type} options={[
            { label: "Fidelity", value: "fidelity" },
            { label: "Access", value: "access" },
        ]}/>

        <Button text={"Process Now"} loading={isLoading}/>
      </form>
    </>);
};
export default FlyingRevenueForm;
