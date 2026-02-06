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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState, useEffect } from "react";
import { Button } from "@/src/components/common/button";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { saveVehicleDetails, } from "@/src/services/transportEnumerationService";
import toast from "react-hot-toast";
import { InfoModal } from "@/src/components/common/modal";
import { CustomHeader } from "@/src/components/common/header";
// import "../style.scss" // Moved to _app;
import { fetchStates } from "@/src/services/common";
var SaveVehicleDetailsComponent = function () {
    var _a = useState([]), state = _a[0], setState = _a[1];
    var _b = useState({
        vehicleStatus: "",
        state_of_registration: "",
    }), formData = _b[0], setFormData = _b[1];
    var _c = useState({
        mode: false,
        status: "",
    }), show = _c[0], setShow = _c[1];
    var _d = useForm({
        defaultValues: {
            merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
            plate_number: "",
            owner_phone_number: "",
            vehicle_make: "",
            vehicle_model: "",
            engine_number: "",
            chassis_number: "",
            owner_name: "",
            owner_address: "",
            vehicleStatus: "",
            vehicle_color: "",
            state_of_registration: "",
            expiry_date: "",
        },
    }), register = _d.register, handleSubmit = _d.handleSubmit, errors = _d.formState.errors;
    var getStates = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchStates()];
                case 1:
                    data = _a.sent();
                    setState(data === null || data === void 0 ? void 0 : data.data.map(function (item) {
                        return {
                            label: item.state,
                            value: item.state,
                        };
                    }));
                    console.log(state);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        getStates();
    }, []);
    var _e = useMutation({
        mutationFn: function (data) {
            return saveVehicleDetails(__assign(__assign({}, data), { vehicleStatus: formData.vehicleStatus, state_of_registration: formData.state_of_registration }));
        },
        mutationKey: ["save_plate_number"],
        onSuccess: function (data) {
            console.log(data);
            if (data.response == "00") {
                toast.success(data.response_message || "Plate Number Verified Successfully");
                setShow({ mode: true, status: "success" });
                console.log(show);
            }
            else {
                toast.error("Error Verifying Plate Number");
                setShow({ mode: true, status: "error" });
            }
        },
        onError: function (error) {
            toast.error(error.message);
            console.log(error);
        },
    }), mutate = _e.mutate, isLoading = _e.isLoading;
    var onSubmit = function (reqData) {
        mutate(reqData);
        console.log(reqData);
        // setStage(1);
    };
    var handleChange = function (e) {
        var _a;
        var _b = e.target, name = _b.name, value = _b.value;
        setFormData(__assign(__assign({}, formData), (_a = {}, _a[name] = value, _a)));
        console.log(formData);
    };
    return (<div>
      <CustomHeader title="Vehicle Details" desc={"Enter Correct Vehicle Details"}/>
      <form onSubmit={handleSubmit(onSubmit)} className="enumeration-form">
        <FormTextInput label="Plate Number" type="text" name="plate_number" placeholder="Enter Vehicle's Plate Number" register={register} validation={{ required: true }} error={errors.plate_number}/>
        <FormTextInput label="Phone Number (e.g 08123456789)" type="number" name="owner_phone_number" placeholder="Enter Owner's Phone Number" register={register} validation={{ required: true }} error={errors.owner_phone_number}/>
        <FormTextInput label="Owner's Name" type="text" name="owner_name" placeholder="Enter Owner's Owner's Name" register={register} validation={{ required: true }} error={errors.owner_name}/>
        <FormTextInput label="Owner's Address" type="text" name="owner_address" placeholder="Enter Owner's Owner's Address" register={register} validation={{ required: true }} error={errors.owner_address}/>
        <FormTextInput label="Vehicle Make" type="text" name="vehicle_make" placeholder="Enter Owner's Vehicle Make" register={register} validation={{ required: true }} error={errors.vehicle_make}/>
        <FormTextInput label="Vehicle Model" type="text" name="vehicle_model" placeholder="Enter Owner's Vehicle Model" register={register} validation={{ required: true }} error={errors.vehicle_model}/>
        <SelectInput label="Vehicle Status" name="vehicleStatus" id="vehicleStatus" onChange={handleChange} options={[
            { label: "Select Vehicle Status", value: "" },
            { label: "Active", value: "active" },
            { label: "Default", value: "default" },
        ]} placeholder="Select Vehicle Status"/>
        <FormTextInput label="Vehicle Color" type="text" name="vehicle_color" placeholder="Enter Owner's Vehicle Color" register={register} validation={{ required: true }} error={errors.vehicle_color}/>
        <FormTextInput label="Engine Number" type="text" name="engine_number" placeholder="Enter Owner's Engine Number" register={register} validation={{ required: true }} error={errors.engine_number}/>
        <FormTextInput label="Chassis Number" type="text" name="chassis_number" placeholder="Enter Owner's Chassis Number" register={register} validation={{ required: true }} error={errors.chassis_number}/>
        <SelectInput label="Registration State" name="state_of_registration" id="state_of_registration" onChange={handleChange} options={__spreadArray([{ label: "Select Registration State", value: "" }], state, true)} placeholder="Select Registration State"/>
        <FormTextInput label="Vehicle Expiry Date" type="date" name="expiry_date" placeholder="Enter Owner's Expiry Date" register={register} validation={{ required: true }} error={errors.expiry_date}/>

        <Button text="Save & Continue" loading={isLoading}/>
      </form>

      {show.mode && show.status == "success" && (<InfoModal status={show.status} text_header="Vehicle Details Saved Successfully" button_text="Enumerate Vehicle" link="/enumeration/transport" text_info={"You can now proceed to Enumerate your Vehicle"}/>)}
      {show.mode && show.status == "error" && (<InfoModal status={show.status} text_header="Vehicle Information Not Found" button_text="Enter Vehicle Details" link="/enumeration/transport/save" text_info={"Cannot Proceed. Please Register Vehicle Details"}/>)}
    </div>);
};
export default SaveVehicleDetailsComponent;
