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
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { fetchProducts } from "@/src/services/common";
import { createTrafficoffence } from "@/src/services/trafficOffences";
// import "./style.scss" // Moved to _app;
import { BackButton, Button } from "@/src/components/common/button";
import toast from "react-hot-toast";
import { getCurrentDateTime } from "@/src/utils/getCurrentDateTime";
import { useMutation } from "@tanstack/react-query";
import { fetchPlateNumberInfo } from "@/src/services/ticketsServices";
import { useDebounce } from "@/src/hooks/useDebounce";
import { fetchAllOffences } from "@/src/services/trafficOffences";
import { useRouter } from "next/router";
import { bankOptions } from "@/src/lib/app";
var AddTrafficOffenceTicketForm = function (_a) {
    var setSelectedType = _a.setSelectedType, setSelectedVehicleType = _a.setSelectedVehicleType;
    var _b = useForm({
        defaultValues: {
            merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
            amount: "",
            plate_number: "",
            vehicle_type: "",
            taxpayer_name: "",
            taxpayer_phone: "",
            offence_type: "",
            wallet_type: "fidelity",
        },
    }), register = _b.register, watch = _b.watch, handleSubmit = _b.handleSubmit, errors = _b.formState.errors, setValue = _b.setValue;
    var router = useRouter();
    var _c = React.useState([]), offences = _c[0], setOffences = _c[1];
    var _d = React.useState([]), vehicles = _d[0], setVehicles = _d[1];
    var getOffences = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchAllOffences()];
                case 1:
                    response = _a.sent();
                    setOffences(response.data);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var getProductsData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchProducts()];
                case 1:
                    response = _b.sent();
                    setVehicles(response === null || response === void 0 ? void 0 : response.data);
                    return [3 /*break*/, 3];
                case 2:
                    _a = _b.sent();
                    toast.error("Error fetching Vehicles");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        getOffences();
        getProductsData();
    }, []);
    var _e = useMutation({
        mutationFn: function (data) {
            console.log(data);
            return createTrafficoffence(data);
        },
        onSuccess: function (response) {
            if (response.responseCode === "00") {
                toast.success(response.message);
                router.push("/traffic-offence/traffic-ticket-history");
                // setPaymentRef(response.payment_ref);
                // setShow(true);
            }
            else if (response.response_code === "74") {
                toast.error(response.message);
                // router.push("/tickets/transport");
            }
            else {
                toast.error("".concat(response.response_message, ", Try again"));
            }
        },
        onError: function () {
            toast.error("Error Creating Ticket");
        },
    }), mutate = _e.mutate, isLoading = _e.isLoading;
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var formData;
        return __generator(this, function (_a) {
            formData = __assign(__assign({}, data), { transaction_date: getCurrentDateTime() });
            sessionStorage.setItem("TRAFFIC_OFFENCE", JSON.stringify(formData));
            mutate(formData);
            return [2 /*return*/];
        });
    }); };
    var plateNumber = watch("plate_number");
    var debouncedPlateNumber = useDebounce(plateNumber, 500);
    useEffect(function () {
        if (debouncedPlateNumber) {
            var getPlateNumberInfo = function (plateNumber) { return __awaiter(void 0, void 0, void 0, function () {
                var response, error_2;
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
                                setValue("taxpayer_name", response.data.Name);
                                setValue("taxpayer_phone", response.data.Phone);
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _b.sent();
                            toast.error("Error fetching plate number information");
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
            getPlateNumberInfo(debouncedPlateNumber);
        }
    }, [debouncedPlateNumber, setValue]);
    var offenceType = watch("offence_type");
    useEffect(function () {
        if (offenceType) {
            var selectedOffence = offences.find(function (off) { return off.id === Number(offenceType); });
            if (selectedOffence) {
                setValue("amount", String(selectedOffence.fee));
            }
        }
    }, [offenceType, offences, setValue]);
    return (<form className="add-offence" onSubmit={handleSubmit(onSubmit)}>
      <SelectInput label="Select Verification Type" name="offence_type" id="offence_type" register={register} validation={{
            required: true,
            onChange: function (e) {
                // setOffences(e.target.value);
            },
        }} options={offences.map(function (offences) { return ({
            value: offences.id,
            label: offences.title,
        }); })} placeholder="Select Offence"/>

      <SelectInput label="Vehicle Type" name="vehicle_type" id="vehicle_type" register={register} validation={{
            required: true,
            onChange: function (e) {
                setSelectedVehicleType(e.target.value);
            },
        }} options={vehicles.map(function (vehicles) { return ({
            value: vehicles.productCode,
            label: vehicles.productName,
        }); })} placeholder="Select Ticket Type"/>

      <FormTextInput label="Plate Number" type="text" name="plate_number" placeholder="Enter Plate Number" register={register} validation={{
            required: true,
            setValueAs: function (value) { return value.toUpperCase(); },
        }} error={errors.plate_number}/>

      <FormTextInput label="Taxpayer Phone Number" type="number" name="taxpayer_phone" placeholder="Enter Taxpayer Phone Number" register={register} validation={{
            required: "Field Required",
            minLength: {
                value: 11,
                message: "Length must be above 11 characters",
            },
            maxLength: {
                value: 11,
                message: "Length must be below 13 characters",
            },
        }} error={errors.taxpayer_phone}/>

      <FormTextInput label="Taxpayer Name" type="text" name="taxpayer_name" placeholder="Enter Taxpayer Name" register={register} validation={{ required: true }} error={errors.taxpayer_name}/>

      <FormTextInput label="Amount" type="number" name="amount" placeholder="Enter Amount" register={register} readOnly validation={{ required: true }} error={errors.amount}/>

      <SelectInput label="Choose Wallet" name="wallet_type" id="wallet_type" register={register} validation={{ required: true }} options={bankOptions} placeholder="Select Wallet Type" error={!!errors.wallet_type}/>

      <div className="btn_container">
        <BackButton link="/traffic-offence"/>
        <Button text="Create Ticket" loading={isLoading}/>
      </div>
    </form>);
};
export default AddTrafficOffenceTicketForm;
function mutate(formData) {
    throw new Error("Function not implemented.");
}
