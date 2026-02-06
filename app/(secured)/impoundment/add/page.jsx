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
import React, { useEffect, useState } from "react";
import "./style.scss";
import { CustomHeader } from "@/src/components/common/header";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { useForm } from "react-hook-form";
import { Button, CancelButton } from "@/src/components/common/button";
import { fetchABSSINInfoWIthPhone, fetchLGAData, } from "@/src/services/common";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isBrowser } from "@/src/utils/isBrowser";
import CustomDialog from "@/src/components/common/modal/CustomDialog";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { useDebounce } from "@/src/hooks/useDebounce";
import toast from "react-hot-toast";
import FaceCam from "@/src/components/modules/identity/create/infant/faceCam";
import axiosInstance from "@/src/lib/axiosInstance";
var CreateInfantAbssinModule = function () {
    var _a = useState(), userData = _a[0], setUserData = _a[1];
    useEffect(function () {
        if (isBrowser) {
            var data = window.sessionStorage.getItem("USER_DATA");
            if (data) {
                try {
                    setUserData(JSON.parse(data));
                }
                catch (e) {
                    console.error("Error parsing JSON data:", e);
                    setUserData({});
                }
            }
        }
    }, []);
    var _b = useForm({
        defaultValues: {
            merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
            plate_number: "",
            amount: 0,
            vehicle_image_base64: "",
            driver_abssin: "",
            driver_name: "",
            driver_phone_number: "",
            vehicle_color: "",
            incident_location: "",
            geohash: "",
            taskforce_name: "",
            lga_zone: "",
            supervisor_name: "",
            vehicle_owner_phone_number: "",
            impound_reason: "",
        },
    }), handleSubmit = _b.handleSubmit, register = _b.register, reset = _b.reset, watch = _b.watch, setValue = _b.setValue, errors = _b.formState.errors;
    var _c = useState(null), capturedImage = _c[0], setCapturedImage = _c[1];
    var handleCapture = function (base64Image) {
        setCapturedImage(base64Image);
    };
    var lgaData = useQuery({
        queryKey: ["lgaData"],
        queryFn: function () { return fetchLGAData(); },
    }).data;
    console.log("lgaData", lgaData);
    var phone = watch("driver_phone_number");
    var debouncedPhoneNumber = useDebounce(phone, 500);
    useEffect(function () {
        if (debouncedPhoneNumber) {
            var getAbssinDetails = function (phone) { return __awaiter(void 0, void 0, void 0, function () {
                var response, error_1;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, fetchABSSINInfoWIthPhone({ phone: phone })];
                        case 1:
                            response = _b.sent();
                            console.log("response", response);
                            if (response.response_data.length !== 0) {
                                toast.success((_a = response.message) !== null && _a !== void 0 ? _a : "ABSSIN information fetched");
                                setValue("driver_abssin", response.response_data.state_id);
                                setValue("driver_name", response.response_data.first_name + " " + response.response_data.surname);
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _b.sent();
                            toast.error("Error fetching ABSSIN information");
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
            getAbssinDetails(debouncedPhoneNumber);
        }
    }, [debouncedPhoneNumber, setValue]);
    var _d = useMutation({
        mutationFn: function (data) {
            var res = axiosInstance.post("/impoundment/impound-vehicle", data);
            return res;
        },
        onError: function (error) {
            var _a, _b, _c;
            toast.error((_c = (_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.response_message) !== null && _c !== void 0 ? _c : "Error");
        },
        onSuccess: function (data) {
            var _a;
            console.log("data", data);
            (_a = document.getElementById("createImpoundment")) === null || _a === void 0 ? void 0 : _a.showModal();
        },
    }), mutate = _d.mutate, isPending = _d.isPending;
    var onSubmit = function (data) {
        console.log("data", data);
        mutate(__assign(__assign({}, data), { vehicle_image_base64: capturedImage || "" }));
    };
    return (<section>
      <CustomHeader title="Create Impoundment Form" desc={"Ensure to fill all important fields with (*)"}/>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="app-container">
          <FaceCam onCapture={handleCapture}/>
          {capturedImage && (<div className="captured-image mt-4">
              <h2 className="text-lg font-semibold mb-2">Image:</h2>
              <img src={capturedImage} alt="Captured" className="border rounded-lg" style={{ maxWidth: "100%" }}/>
            </div>)}
        </div>

        <FormTextInput label={"Vehicle Color"} name={"vehicle_color"} placeholder="Enter Vehicle Color" register={register} validation={{ required: true }} error={errors.vehicle_color}/>
        <FormTextInput label={"Vehicle Plate Number"} name={"plate_number"} placeholder="Enter Vehicle Plate Number" register={register} validation={{ required: true }} error={errors.plate_number}/>

        <SelectInput label="LGA" placeholder="LGA" name={"lga_zone"} register={register} validation={{ required: true }} error={!!errors.lga_zone} id={"lga_zone"} options={lgaData
            ? lgaData === null || lgaData === void 0 ? void 0 : lgaData.data.map(function (lga) { return ({
                label: lga.lgaName,
                value: lga.lgaID,
            }); })
            : []}/>

        <FormTextInput label="Driver's Phone Number" placeholder="Driver's Phone Number" name={"driver_phone_number"} register={register} validation={{
            required: true,
            pattern: {
                value: /^\d{11}$/,
                message: "Phone number must be 11 digits",
            },
        }} error={errors.driver_phone_number}/>
        <FormTextInput label="Driver's Name" placeholder="Driver's Name" name={"driver_name"} register={register} validation={{
            required: true,
        }} error={errors.driver_name}/>
        <FormTextInput label="Driver's ABSSIN" placeholder="Driver's ABSSIN" name={"driver_abssin"} register={register} validation={{
            required: true,
        }} error={errors.driver_abssin}/>

        <FormTextInput label="Vehicle Owner's Number" placeholder="Vehicle Owner's Number" name={"vehicle_owner_phone_number"} register={register} validation={{
            required: true,
        }} error={errors.vehicle_owner_phone_number}/>

        <FormTextInput label="Taskforce's Name" placeholder="Taskforce's Name" name={"taskforce_name"} register={register} validation={{
            required: true,
        }} error={errors.taskforce_name}/>

        <FormTextInput label="Supervisor's Name" placeholder="Supervisor's Name" name={"supervisor_name"} register={register} validation={{
            required: true,
        }} error={errors.supervisor_name}/>

        <SelectInput label="Reason for Impoundment" placeholder="Reason for Impoundment" name={"impound_reason"} register={register} validation={{ required: true }} error={!!errors.impound_reason} id={"impound_reason"} options={[
            { label: "Obstruction", value: "Obstruction" },
            { label: "One way", value: "One way" },
            { label: "Restriction Violation", value: "Restriction Violation" },
        ]}/>

        <SelectInput label="Incident Location" placeholder="Incident Location" name={"incident_location"} register={register} validation={{ required: true }} error={!!errors.incident_location} id={"incident_location"} options={lgaData
            ? lgaData === null || lgaData === void 0 ? void 0 : lgaData.data.map(function (lga) { return ({
                label: lga.lgaName,
                value: lga.lgaID,
            }); })
            : []}/>

        <Button text="Submit" loading={isPending} disabled={isPending}/>
      </form>
      <CustomDialog id="createImpoundment" onClose={function () {
            var _a;
            return (_a = document.getElementById("createImpoundment")) === null || _a === void 0 ? void 0 : _a.close();
        }}>
        <div className="flex gap-1 items-center justify-center flex-col text-center">
          <TbRosetteDiscountCheckFilled className="text-green-600 text-7xl"/>
          <h1 className="text-lg font-semibold">Created Successfully</h1>
          <p className="text-xs md:text-sm text-gray-400 max-w-[14rem]">
            You have successfully listed an impoundment
          </p>
          <div className="w-full grid grid-cols-2 gap-2 mt-4">
            <CancelButton link={"/impoundment"}/>
            <Button text="Create New" onClick={function () {
            var _a;
            (_a = document.getElementById("createImpoundment")) === null || _a === void 0 ? void 0 : _a.close();
            reset();
        }}/>
          </div>
        </div>
      </CustomDialog>
    </section>);
};
export default CreateInfantAbssinModule;
