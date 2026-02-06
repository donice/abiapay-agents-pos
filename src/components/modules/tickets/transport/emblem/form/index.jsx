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
import { Button } from "@/src/components/common/button";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import React, { useEffect, useState } from "react";
// import "../style.scss" // Moved to _app;
import { useForm } from "react-hook-form";
import { createTransportEmblem, fetchEmblemProductCode, } from "@/src/services/emblemService";
import { useDebounce } from "@/src/hooks/useDebounce";
import { fetchPlateNumberInfo } from "@/src/services/ticketsServices";
import toast from "react-hot-toast";
import { fetchLGAData } from "@/src/services/common";
import { useMutation } from "@tanstack/react-query";
import { getErrorMessages } from "@/src/utils/helper";
var CreateEmblemForm = function (_a) {
    var show = _a.show, setShow = _a.setShow;
    var _b = useState([]), embleProductCode = _b[0], setEmbleProductCode = _b[1];
    var _c = useState([]), lga = _c[0], setLga = _c[1];
    var getEmblemProductCode = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchEmblemProductCode()];
                case 1:
                    data = (_a.sent()).data;
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
    var getLgas = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchLGAData()];
                case 1:
                    data = (_a.sent()).data;
                    setLga(data === null || data === void 0 ? void 0 : data.map(function (item) {
                        return {
                            label: item.lgaName,
                            value: item.lgaID,
                        };
                    }));
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        getEmblemProductCode();
        getLgas();
    }, []);
    var _d = useForm({
        defaultValues: {
            merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
            product_code: "",
            plate_number: "",
            taxpayer_phone: "",
            customer_name: "",
            customer_email: "",
            description: "Emblem",
            amount: "",
            lga: "",
            payment_period: "2025",
            wallet_type: "fidelity",
            payment_method: "fidelity",
        },
    }), handleSubmit = _d.handleSubmit, watch = _d.watch, setValue = _d.setValue, register = _d.register, errors = _d.formState.errors;
    var plateNumber = watch("plate_number");
    var debouncedPlateNumber = useDebounce(plateNumber, 500);
    useEffect(function () {
        if (debouncedPlateNumber) {
            var getPlateNumberInfo = function (plateNumber) { return __awaiter(void 0, void 0, void 0, function () {
                var response, error_3;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, fetchPlateNumberInfo(plateNumber)];
                        case 1:
                            response = _b.sent();
                            if (((_a = response.data) === null || _a === void 0 ? void 0 : _a.length) !== 0) {
                                toast.success(response.message);
                                setValue("customer_name", response.data.Name);
                                setValue("taxpayer_phone", response.data.Phone);
                                setValue("customer_email", response.data.Email);
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_3 = _b.sent();
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
        console.log(selectedProduct);
        if (selectedProduct) {
            setValue("amount", selectedProduct.emblem);
        }
        setValue("product_code", selectedProductCode);
    };
    var _e = useMutation({
        mutationFn: function (data) {
            return createTransportEmblem(data);
        },
        onSuccess: function (data) {
            if (data === null || data === void 0 ? void 0 : data.response_code) {
                if ((data === null || data === void 0 ? void 0 : data.response_code) == "00") {
                    toast.success(data === null || data === void 0 ? void 0 : data.response_message) &&
                        setShow({
                            mode: true,
                            message: data === null || data === void 0 ? void 0 : data.response_message,
                            expiry_date: data === null || data === void 0 ? void 0 : data.next_expiration_date,
                            payment_ref: data === null || data === void 0 ? void 0 : data.payment_ref,
                            plate_no: watch("plate_number"),
                        });
                }
                else
                    toast.error(data === null || data === void 0 ? void 0 : data.response_message);
            }
            else {
                toast.error(getErrorMessages(data === null || data === void 0 ? void 0 : data.message));
            }
        },
        onError: function (error) {
            console.log(error);
        },
    }), mutate = _e.mutate, isLoading = _e.isLoading;
    var onSubmit = function (reqData) {
        mutate(reqData);
        sessionStorage.setItem("TRANSPORT_INVOICE", JSON.stringify(__assign({}, reqData)));
    };
    return (<form onSubmit={handleSubmit(onSubmit)} className="emblem_form">
      <SelectInput label={"Emblem Type"} name={"product_code"} id={"product_code"} validation={{ required: true }} options={embleProductCode.map(function (item) { return ({
            label: item.productName,
            value: item.productCode,
        }); })} onChange={handleEmblemTypeChange}/>

      <FormTextInput label={"Plate Number"} name={"plate_number"} placeholder="Enter Vehicle Plate Number" register={register} validation={{
            required: true,
            pattern: {
                value: /^[A-Za-z0-9]{1,8}$/,
                message: "Only letters and numbers allowed, maximum 8 characters",
            },
            maxLength: {
                value: 8,
                message: "Maximum 8 characters allowed",
            },
            setValueAs: function (value) { return value.toUpperCase(); },
        }} error={errors.plate_number}/>

      <FormTextInput label={"Taxpayer Phone Number"} name={"taxpayer_phone"} placeholder="Enter Taxpayer Phone Number" register={register} validation={{ required: true }} error={errors.taxpayer_phone}/>
      <FormTextInput label={"Taxpayer Name"} name={"customer_name"} placeholder="Enter Taxpayer Name" register={register} validation={{ required: true }} error={errors.customer_name}/>

      <FormTextInput label={"Taxpayer Email"} name={"customer_email"} placeholder="Enter Taxpayer Email" register={register} validation={{ required: true }} error={errors.customer_email}/>

      <FormTextInput label={"Amount"} name={"amount"} placeholder="Enter Amount" register={register} validation={{ required: true }} error={errors.amount} disabled/>

      <SelectInput label={"Payment Period"} name={"payment_period"} id={"payment_period"} register={register} validation={{ required: true }} error={!!errors.payment_period} options={[{ label: "2025", value: "2025" }]}/>
      <SelectInput label={"LGA"} name={"lga"} id={"lga"} register={register} validation={{ required: true }} error={!!errors.lga} options={lga}/>
      <SelectInput label={"Wallet Type"} name={"wallet_type"} id={"wallet_type"} register={register} validation={{ required: true }} error={!!errors.wallet_type} options={[
            { label: "Fidelity", value: "fidelity" },
            { label: "Access", value: "access" },
        ]}/>

      <Button text={"Process Now"} loading={isLoading}/>
    </form>);
};
export default CreateEmblemForm;
