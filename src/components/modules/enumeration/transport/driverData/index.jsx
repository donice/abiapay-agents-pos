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
import React, { useEffect, useState } from "react";
import { LuUser } from "react-icons/lu";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
// import "../style.scss" // Moved to _app;
import { useForm } from "react-hook-form";
import { saveContact, createTransportEnumeration, } from "@/src/services/transportEnumerationService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { EnumerationSuccessModal } from "@/src/components/common/modal";
import { fetchLGAData } from "@/src/services/common";
import { getCurrentYear } from "@/src/utils/getCurrentYear";
var DriverData = function (_a) {
    var _b, _c;
    var setStage = _a.setStage, details = _a.details, formData = _a.formData;
    var _d = useState([]), lga = _d[0], setLga = _d[1];
    var _e = useState({
        response_code: "",
        response_message: "",
        enumeration_id: "",
        assetCode: "",
    }), ticketData = _e[0], setTicketData = _e[1];
    var _f = useState(false), show = _f[0], setShow = _f[1];
    var _g = useMutation({
        mutationFn: function (data) {
            return saveContact(data);
        },
        mutationKey: ["save_driver_contact"],
        onSuccess: function (data) {
            console.log(data || "Driver's data saved successfully");
        },
        onError: function (error) {
            console.log(error);
            toast.error("Error Saving Driver's data");
        },
    }), mutate = _g.mutate, isLoading = _g.isLoading;
    var mutate2 = useMutation({
        mutationFn: function (data) {
            return createTransportEnumeration(data);
        },
        mutationKey: ["create_transport_enumeration"],
        onSuccess: function (data) {
            console.log((data === null || data === void 0 ? void 0 : data.response_message) || "Successful Enumeration");
            console.log("TICKETS DATA", data);
            setTicketData(data);
            setShow(true);
            toast.success((data === null || data === void 0 ? void 0 : data.response_message) || "Vehicle Enumerated Successfully");
        },
        onError: function (error) {
            console.log(error);
            toast.error("Error Enumerating Vehicle");
        },
    }).mutate;
    var _h = useForm({
        defaultValues: {
            email: "",
            name: (details === null || details === void 0 ? void 0 : details.driver.driverName) || "",
            phone: (details === null || details === void 0 ? void 0 : details.vehicle_owner.phoneNumber) || "",
            plate_number: formData.plate_number || "",
            contact_type: "driver",
            taxpayer_location: formData.taxpayer_location || "",
            merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
        },
    }), register = _h.register, handleSubmit = _h.handleSubmit;
    var req = {
        taxpayer_category: "individual",
        abssin: (details === null || details === void 0 ? void 0 : details.vehicle_owner.abssin) || "",
        vehicle_plate_number: formData.plate_number.toUpperCase() || "",
        taxpayer_name: (details === null || details === void 0 ? void 0 : details.vehicle_owner.ownerName) || "",
        taxpayer_phone: formData.phone_number || "",
        revenue_year: getCurrentYear().toString(),
        taxpayer_location: formData.taxpayer_location || "",
        operating_park: formData.operating_park || "",
        trade_union: formData.trade_union || "",
        vehicle_category: formData.vehicle_category || "",
        owner_name: (details === null || details === void 0 ? void 0 : details.vehicle_owner.ownerName) || "",
        owner_address: (details === null || details === void 0 ? void 0 : details.vehicle_owner.ownerAddress) || "",
        daily_ticket_amount: 250,
        enumeration_fee: "1500",
        merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
    };
    var onSubmit = function (reqData) {
        try {
            mutate(reqData);
            mutate2(__assign(__assign({}, req), { taxpayer_location: reqData.taxpayer_location }));
        }
        catch (error) {
            console.log(error);
            toast.error("Error Enumerating Vehicle");
        }
    };
    var getLgas = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, error_1;
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
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        getLgas();
    }, []);
    return (<>
      <form onSubmit={handleSubmit(onSubmit)} className="enumeration-form">
        <div className="user-image">
          {((_b = details === null || details === void 0 ? void 0 : details.driver) === null || _b === void 0 ? void 0 : _b.photoUrl) ? (<img src={(_c = details === null || details === void 0 ? void 0 : details.driver) === null || _c === void 0 ? void 0 : _c.photoUrl} alt=""/>) : (<LuUser className="user"/>)}
        </div>
        <FormTextInput label={"Driver's Email"} name={"email"} register={register}/>
        <FormTextInput label={"Driver's ABSSIN"} name={"abssin"} value={(details === null || details === void 0 ? void 0 : details.driver.abssin) || ""}/>
        <FormTextInput label={"Driver's Name"} name={"name"} register={register} value={(details === null || details === void 0 ? void 0 : details.driver.driverName) || ""}/>
        <FormTextInput label={"Driver's Address"} name={"driverAddress"} value={(details === null || details === void 0 ? void 0 : details.driver.driverAddress) || ""}/>
        <FormTextInput label={"Phone Number"} name={"phone"} register={register} value={(details === null || details === void 0 ? void 0 : details.driver.phoneNumber) || ""}/>
        <SelectInput label="LGA" name="taxpayer_location" id="taxpayer_location" options={lga} placeholder="Select LGA" register={register} validation={{ required: true }}/>
        <div className="button-container">
          <button className="button secondary" onClick={function () { return setStage(1); }}>
            Go Back
          </button>
          <Button text="Complete Enumerate" loading={isLoading} disabled={isLoading}/>
        </div>
      </form>

      {show && (<EnumerationSuccessModal qr_link={"https://portal.abiapay.com/verify-asset?assetCode=".concat(ticketData === null || ticketData === void 0 ? void 0 : ticketData.assetCode)} plate_number={formData.plate_number || ""} text={(ticketData === null || ticketData === void 0 ? void 0 : ticketData.assetCode) || ""} id={(ticketData === null || ticketData === void 0 ? void 0 : ticketData.enumeration_id) || ""} vehicle_category={formData.vehicle_category || ""}/>)}
    </>);
};
export default DriverData;
