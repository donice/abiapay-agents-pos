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
import { useMutation } from "@tanstack/react-query";
import { fetchVehicleCategory, verifyPlateNumber, } from "@/src/services/transportEnumerationService";
import toast from "react-hot-toast";
import { ErrorModal, InfoModal, VehicleCheckSuccessModal, } from "@/src/components/common/modal";
import { fetchParks, fetchTradeUnions } from "@/src/services/common";
var VehicleData = function (_a) {
    var setStage = _a.setStage, setDetails = _a.setDetails, setFormData = _a.setFormData, formData = _a.formData;
    var _b = useState([]), parks = _b[0], setParks = _b[1];
    var _c = useState([]), tradeUnions = _c[0], setTradeUnions = _c[1];
    var _d = useState([]), vehicleCategory = _d[0], setVehicleCategory = _d[1];
    var _e = useState({
        vehicle_make: "",
        vehicle_model: "",
        vehicle_color: "",
        state_of_registration: "",
        expiry_date: "",
    }), modalDetails = _e[0], setModalDetails = _e[1];
    var _f = useState({
        mode: false,
        user: "",
        status: "",
    }), show = _f[0], setShow = _f[1];
    var _g = useForm({
        defaultValues: {
            merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
            plate_number: formData.plate_number || "",
            phone_number: formData.phone_number || "",
            vehicle_category: formData.vehicle_category || "",
            trade_union: formData.trade_union || "",
            operating_park: formData.operating_park || "",
        },
    }), register = _g.register, handleSubmit = _g.handleSubmit, reset = _g.reset, errors = _g.formState.errors;
    var _h = useMutation({
        mutationFn: function (data) {
            return verifyPlateNumber(data);
        },
        mutationKey: ["verify_plate_number"],
        onSuccess: function (data) {
            var _a, _b, _c, _d, _e, _f;
            if (data.response_code == "00") {
                if (Object.keys((_a = data === null || data === void 0 ? void 0 : data.response_data) === null || _a === void 0 ? void 0 : _a.driver).length < 1 ||
                    ((_b = data.response_data) === null || _b === void 0 ? void 0 : _b.driver.abssin) == "" ||
                    ((_c = data.response_data) === null || _c === void 0 ? void 0 : _c.vehicle_owner.abssin) == "") {
                    setShow({
                        mode: true,
                        status: "",
                        user: Object.keys((_d = data === null || data === void 0 ? void 0 : data.response_data) === null || _d === void 0 ? void 0 : _d.driver).length < 1
                            ? "Driver"
                            : ((_e = data.response_data) === null || _e === void 0 ? void 0 : _e.vehicle_owner.abssin) == ""
                                ? "Vehicle Owner"
                                : "Driver & Vehicle Owner",
                    });
                }
                else {
                    toast.success("Plate Number Verified Successfully");
                    setShow({ mode: true, status: "success", user: "" });
                    setDetails(data === null || data === void 0 ? void 0 : data.response_data);
                    setModalDetails((_f = data === null || data === void 0 ? void 0 : data.response_data) === null || _f === void 0 ? void 0 : _f.vehicle_data);
                }
                // setStage(1);
            }
            else if (data.response_code == "12") {
                toast.success(data.response_message);
            }
            else {
                toast.error("Error Verifying Plate Number");
                setShow({ mode: true, status: "error", user: "" });
            }
        },
        onError: function (error) {
            toast.error("Error Verifying Plate Number");
            reset();
            console.log(error);
        },
    }), mutate = _h.mutate, isLoading = _h.isLoading;
    var onSubmit = function (reqData) {
        mutate(reqData);
        setFormData(reqData);
    };
    var getVehicleCategories = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, res, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchVehicleCategory()];
                case 1:
                    data = (_a.sent()).data;
                    console.log(data, "PRODUCT CODE");
                    res = data === null || data === void 0 ? void 0 : data.map(function (item) {
                        return {
                            label: item.productName,
                            value: item.productCode,
                        };
                    });
                    setVehicleCategory(res);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var getParks = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, res, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchParks()];
                case 1:
                    data = _a.sent();
                    res = data === null || data === void 0 ? void 0 : data.map(function (item) {
                        return {
                            label: item.park,
                            value: item.park,
                        };
                    });
                    setParks(res);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var getTradeUnions = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, res, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchTradeUnions()];
                case 1:
                    data = _a.sent();
                    res = data === null || data === void 0 ? void 0 : data.map(function (item) {
                        return {
                            label: item.unionCode,
                            value: item.unionName,
                        };
                    });
                    setTradeUnions(res);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.log(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        getParks();
        getTradeUnions();
        getVehicleCategories();
    }, []);
    return (<div>
      <form onSubmit={handleSubmit(onSubmit)} className="enumeration-form">
        <FormTextInput label="Driver's Phone Number (e.g 08123456789)" type="number" name="phone_number" placeholder="Enter Driver's Phone Number" register={register} validation={{
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
        <FormTextInput label="Vehicle Plate Number" type="text" name="plate_number" placeholder="Enter Vehicle Plate Number" register={register} validation={{
            required: "Vehicle Number is Required",
            maxLength: {
                value: 8,
                message: "Length must be below 13 characters",
                setValueAs: function (value) { return value.toUpperCase(); },
            },
        }} error={errors.plate_number}/>
        <SelectInput label="Vehicle Category" name="vehicle_category" id="vehicle_category" options={vehicleCategory} placeholder="Select Vehicle Category" register={register} validation={{ required: true }}/>
        <SelectInput label="Operating Park" name="operating_park" id="operating_park" options={parks} placeholder="Select Operating Park" register={register} validation={{ required: true }}/>
        <SelectInput label="Trade Unions" name="trade_union" id="trade_union" options={tradeUnions} placeholder="Select Trade Unions" register={register} validation={{ required: true }}/>
        <Button text="Save & Continue" loading={isLoading}/>
      </form>

      {show.mode === true && (<ErrorModal text_header={"Error Validating ".concat(show.user, " ABSSIN")} button_text="Create ABSSIN" link="/identity/create/individual/verify" text_info={"To proceed, kindly click \"Create ABSSIN\" to create ".concat(show.user, " ABSSIN")} status={"error"}/>)}
      {show.mode && show.status == "error" && (<InfoModal status={show.status} text_header="Vehicle Information Not Found" button_text="Enter Vehicle Details" link="/enumeration/transport/save" text_info={"Cannot Proceed. Please Register Vehicle Details"}/>)}
      {show.mode && show.status == "success" && (<VehicleCheckSuccessModal text_header="Information Retrieved Successfully" vehicle_make={modalDetails.vehicle_make} vehicle_model={modalDetails.vehicle_model} vehicle_color={modalDetails.vehicle_color} state_of_registration={modalDetails.state_of_registration} expiry_date={modalDetails.expiry_date} button_text="Continue" onClick={function () {
                setShow({ mode: false, status: "", user: "" });
                setStage(1);
            }}/>)}
    </div>);
};
export default VehicleData;
