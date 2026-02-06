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
import React, { useEffect, useState } from "react";
import { Button } from "@/src/components/common/button";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { useForm } from "react-hook-form";
import { createMarketEnumeration, fetchMarkets, } from "@/src/services/marketEnumerationService";
import { fetchABSSINInfo, fetchLGAData } from "@/src/services/common";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDebounce } from "@/src/hooks/useDebounce";
import { getCurrentYear } from "@/src/utils/getCurrentYear";
var EnumerationDetails = function (_a) {
    var setStage = _a.setStage, setFormData = _a.setFormData, formData = _a.formData;
    var _b = useState([]), markets = _b[0], setMarkets = _b[1];
    var _c = useState([]), lga = _c[0], setLga = _c[1];
    var _d = useMutation({
        mutationFn: function (data) {
            return createMarketEnumeration(data);
        },
        mutationKey: ["save_owner_contact"],
        onSuccess: function (data) {
            if (data.response_code) {
                toast.success("Shop Enumerated Successfully");
                setFormData({
                    payment_reference: data === null || data === void 0 ? void 0 : data.payment_reference,
                    enumeration_id: data === null || data === void 0 ? void 0 : data.enumeration_id,
                });
                setStage(1);
            }
            else {
                toast.error("Shop Enumeration Failed");
            }
        },
        onError: function (error) {
            console.log(error);
            toast.error("Error Saving Driver's data");
        },
    }), mutate = _d.mutate, isLoading = _d.isLoading;
    var _e = useForm({
        defaultValues: {
            merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
            taxpayer_category: (formData === null || formData === void 0 ? void 0 : formData.taxpayer_category) || "",
            abssin: (formData === null || formData === void 0 ? void 0 : formData.abssin) || "",
            shop_owner_name: (formData === null || formData === void 0 ? void 0 : formData.shop_owner_name) || "",
            shop_owner_phone: (formData === null || formData === void 0 ? void 0 : formData.shop_owner_phone) || "",
            shop_number: (formData === null || formData === void 0 ? void 0 : formData.shop_number) || "",
            shop_category: (formData === null || formData === void 0 ? void 0 : formData.shop_category) || "",
            revenue_year: (formData === null || formData === void 0 ? void 0 : formData.revenue_year) || getCurrentYear(),
            zone_line: (formData === null || formData === void 0 ? void 0 : formData.zone_line) || "",
            market: (formData === null || formData === void 0 ? void 0 : formData.market) || "",
            monthly_income_range: (formData === null || formData === void 0 ? void 0 : formData.monthly_income_range) || "",
            lga: (formData === null || formData === void 0 ? void 0 : formData.lga) || "",
            enumeration_fee: (formData === null || formData === void 0 ? void 0 : formData.enumeration_fee) || "18000",
            ticket_amount_shop_owner: (formData === null || formData === void 0 ? void 0 : formData.ticket_amount_shop_owner) || "18000",
            ticket_amount_per_occupant: (formData === null || formData === void 0 ? void 0 : formData.ticket_amount_per_occupant) || "18000",
            payment_method: (formData === null || formData === void 0 ? void 0 : formData.payment_method) || "fidelity",
        },
    }), register = _e.register, handleSubmit = _e.handleSubmit, watch = _e.watch, setValue = _e.setValue, errors = _e.formState.errors;
    var onSubmit = function (reqData) {
        mutate(__assign(__assign({}, reqData), formData));
        // setFormData(enumerationDetails);
    };
    var getMarkets = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, res, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchMarkets()];
                case 1:
                    data = (_a.sent()).data;
                    res = data === null || data === void 0 ? void 0 : data.map(function (item) {
                        return {
                            label: item.market,
                            value: item.market,
                        };
                    });
                    setMarkets(res);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    toast.error("Error Enumerating Vehicle");
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
        getMarkets();
        getLgas();
    }, []);
    var abssin = watch("abssin");
    var debouncedAbssin = useDebounce(abssin, 300);
    useEffect(function () {
        if (debouncedAbssin) {
            var getPlateNumberInfo = function (req) { return __awaiter(void 0, void 0, void 0, function () {
                var response, error_3;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, fetchABSSINInfo({ id: req })];
                        case 1:
                            response = _b.sent();
                            if (((_a = response.data) === null || _a === void 0 ? void 0 : _a.length) !== 0) {
                                toast.success(response.message);
                                setValue("shop_owner_name", response.data.firstname +
                                    " " +
                                    response.data.middle_name +
                                    " " +
                                    response.data.lastname);
                                setValue("shop_owner_phone", response.data.phone_number);
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_3 = _b.sent();
                            // toast.error("Error fetching plate number information");
                            console.log(error_3);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
            getPlateNumberInfo(debouncedAbssin);
        }
    }, [debouncedAbssin, setValue]);
    return (<div>
      <form onSubmit={handleSubmit(onSubmit)} className="enumeration-form">
        <SelectInput label="Taxpayer Category" name="taxpayer_category" id="taxpayer_category" options={[
            { label: "Individual", value: "Individual" },
            { label: "Non-individual", value: "Non-individual" },
        ]} placeholder="Select Taxpayer Category" register={register} validation={{ required: true }}/>
        <FormTextInput label="ABSSIN" type="number" name="abssin" placeholder="Enter ABSSIN" register={register} validation={{
            required: "ABSSIN is Required",
            minLength: {
                value: 10,
                message: "Length must be above 10 characters",
            },
            maxLength: {
                value: 11,
                message: "Length must be below 11 characters",
            },
        }} error={errors.abssin}/>
        <FormTextInput label="Shop Owner's Name" type="text" name="shop_owner_name" placeholder="Enter Shop Owner's Name" register={register} validation={{
            required: true,
        }} error={errors.shop_owner_name}/>
        <FormTextInput label="Shop Owner's Phone Number" type="number" name="shop_owner_phone" placeholder="Enter Shop Owner's Phone Number" register={register} validation={{
            required: "Phone Number is Required",
            minLength: {
                value: 11,
                message: "Length must be above 11 characters",
            },
            maxLength: {
                value: 11,
                message: "Length must be below 13 characters",
            },
        }} error={errors.shop_owner_phone}/>
        <SelectInput label="Shop Category" name="shop_category" id="shop_category" options={[
            { label: "Single", value: "Single" },
            { label: "Double", value: "Double" },
            { label: "Small Warehouse", value: "Small Warehouse" },
            { label: "Medium Warehouse", value: "Medium Warehouse" },
            { label: "Large Warehouse", value: "Large Warehouse" },
        ]} placeholder="Select Shop Category" register={register} validation={{ required: true }}/>
        <SelectInput label="Market" name="market" id="market" options={markets} placeholder="Select Market" register={register} validation={{ required: true }}/>
        <FormTextInput label="Zone/Line" type="text" name="zone_line" placeholder="Enter Zone/Line" register={register} validation={{
            required: true,
        }} error={errors.zone_line}/>
        <FormTextInput label="Shop Number" type="text" name="shop_number" placeholder="Enter Shop Number" register={register} validation={{
            required: true,
        }} error={errors.shop_number}/>

        <SelectInput label="Monthly Income" name="monthly_income_range" id="monthly_income_range" options={[
            { label: "Less than 10,000", value: "Less than 10,000" },
            { label: "10,000 - 50,000", value: "10,000 - 50,000" },
            { label: "50,001 - 100,000", value: "50,001 - 100,000" },
            { label: "100,001 - 500,000", value: "100,001 - 500,000" },
            { label: "500,001 - 1,000,000", value: "500,001 - 1,000,000" },
            { label: "1,000,001 - 5,000,000", value: "1,000,001 - 5,000,000" },
            {
                label: "5,000,001 - 10,000,000",
                value: "5,000,001 - 10,000,000",
            },
            { label: "Above 10,000,000", value: "Above 10,000,000" },
        ]} placeholder="Select Monthly Income" register={register} validation={{ required: true }}/>
        {/* <SelectInput
          label="LGA"
          name="lga"
          id="lga"
          options={lga}
          placeholder="Select LGA"
          register={register}
          validation={{ required: true }}
        /> */}

        {/* <FormTextInput
          disabled
          label="Annual Shop Ticket Amount (Shop Owner)"
          type="text"
          name="ticket_amount_shop_owner"
          value={"18000"}
          placeholder="Enter Annual Shop Ticket Amount (Shop Owner)"
          register={register}
          validation={{
            required: true,
          }}
        /> */}
        {/* <SelectInput
          label="Payment Method"
          name="payment_method"
          id="payment_method"
          options={[
            { label: "Fidelity", value: "fidelity" },
            { label: "Access", value: "access" },
          ]}
          placeholder="Select Payment Method"
          register={register}
          validation={{ required: true }}
        /> */}

        <Button text="Create Enumeration" loading={isLoading}/>
      </form>
    </div>);
};
export default EnumerationDetails;
