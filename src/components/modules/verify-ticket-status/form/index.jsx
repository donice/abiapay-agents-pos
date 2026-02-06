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
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { Button } from "@/src/components/common/button";
import { verifyTicket, } from "@/src/services/verifyTickets";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
// import "./style.scss" // Moved to _app;
import toast from "react-hot-toast";
import { fetchAssessment, } from "@/src/services/verifyTicketStatus";
var VerifyticketStatusForm = function (_a) {
    var userData = _a.userData, setDetails = _a.setDetails;
    var _b = useForm({
        defaultValues: {
            verificationType: "",
            referenceType: "",
            verifyType: "",
            referenceID: "",
            plateNumber: "",
        },
    }), register = _b.register, handleSubmit = _b.handleSubmit, reset = _b.reset, watch = _b.watch, errors = _b.formState.errors;
    var selectedVerificationType = watch("verifyType");
    var selectedReferenceType = watch("referenceType");
    var _c = useState([]), assessments = _c[0], setAsessments = _c[1];
    var mutation = useMutation({
        mutationFn: function (data) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, verifyTicket(data)];
        }); }); },
        onSuccess: function (data) {
            var _a, _b;
            var res = data === null || data === void 0 ? void 0 : data.data;
            console.log("API Response:", data);
            var responseCode = (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.response_code;
            var responseMessage = (_b = res === null || res === void 0 ? void 0 : res.data) === null || _b === void 0 ? void 0 : _b.response_message;
            if (responseCode === "00") {
                setDetails(res.data);
                toast.success("Ticket verified successfully");
            }
            else if (responseCode === "97") {
                setDetails(res.data);
                toast.error(responseMessage || "No ticket for today");
            }
            else if (responseCode === "99") {
                console.log("99");
                setDetails(null);
                toast.error(responseMessage || "Ticket not found");
            }
            else {
                toast.error("Unknown response from server");
            }
            reset();
        },
        onError: function (error) {
            var _a, _b;
            console.log("error", error);
            var res = (_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.data; // or error?.data?.data depending on how your API client is set up
            var responseCode = res === null || res === void 0 ? void 0 : res.response_code;
            var responseMessage = res === null || res === void 0 ? void 0 : res.response_message;
            if (responseCode === "99") {
                setDetails(null);
                toast.error(responseMessage || "Ticket not found");
            }
            else if (responseCode === "97") {
                setDetails(res);
                toast.error(responseMessage || "No ticket for today");
            }
            else {
                toast.error("An error occurred");
            }
            return error;
        },
    });
    var getAssessments = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchAssessment()];
                case 1:
                    data = (_a.sent()).data;
                    console.log("res", data);
                    response = data === null || data === void 0 ? void 0 : data.map(function (item) {
                        return {
                            label: item === null || item === void 0 ? void 0 : item.name,
                            value: item === null || item === void 0 ? void 0 : item.name,
                        };
                    });
                    console.log("response", response);
                    setAsessments(response);
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
    useEffect(function () {
        getAssessments();
    }, []);
    var onSubmit = function (data) {
        mutation.mutate(__assign(__assign({}, data), { agentEmail: userData === null || userData === void 0 ? void 0 : userData.email }));
    };
    return (<form onSubmit={handleSubmit(onSubmit)} className="verify-tickets-form">
      <SelectInput label="Verification Type" name="verifyType" id="verifyType" register={register} options={[
            { label: "Transport", value: "transport" },
            { label: "Transport Emblem", value: "emblem" },
            { label: "Flying Revenue", value: "revenue" },
            { label: "Demand Notice", value: "demand_notice" },
            { label: "Market Levy", value: "market_levy" },
            { label: "Bills Payment", value: "bills_payment" },
            { label: "Direct Assessment Tax", value: "direct_assessment_tax" },
        ]} placeholder="Select Verification Type"/>

      {(selectedVerificationType === "revenue" ||
            selectedVerificationType === "emblem" ||
            selectedVerificationType === "transport") && (<>
          <SelectInput label="Reference Type" name="referenceType" id="referenceType" register={register} options={[
                { label: "Plate Number", value: "plateNumber" },
                { label: "Payment Reference", value: "payment_ref" },
            ]} placeholder="Select Reference Type"/>
        </>)}

      {selectedReferenceType === "payment_ref" && (<FormTextInput label="Reference Number" type="text" name="referenceID" placeholder="Enter Reference Number" register={register} validation={{
                required: true,
                minLength: {
                    value: 7,
                    message: "Length must be above 7 characters",
                },
            }} error={errors.referenceID}/>)}

      {selectedReferenceType === "plateNumber" && (<FormTextInput label="Plate Number" type="text" name="referenceID" placeholder="Enter Plate Number" register={register} validation={{
                required: true,
                minLength: {
                    value: 7,
                    message: "Length must be above 7 characters",
                },
            }} error={errors.plateNumber}/>)}

      {selectedVerificationType === "demand_notice" && (<>
          <FormTextInput label="Notice Number" type="text" name="noticeNumber" placeholder="Enter Notice Number" register={register} validation={{ required: true }} error={errors.noticeNumber}/>
          <SelectInput label="Fiscal Year" name="fiscalYear" id="fiscalYear" register={register} options={[
                { label: "2021", value: "2021" },
                { label: "2022", value: "2022" },
                { label: "2023", value: "2023" },
                { label: "2024", value: "2024" },
                { label: "2025", value: "2025" },
            ]} placeholder="Select Fiscal Year"/>
        </>)}

      {selectedVerificationType === "market_levy" && (<>
          <FormTextInput label="Enumeration ID" type="text" name="enumerationID" placeholder="Enter Enumeration ID" register={register} validation={{ required: true }} error={errors.enumerationID}/>
          <SelectInput label="Enumeration Year" name="enumerationYear" id="enumerationYear" register={register} options={[
                { label: "2021", value: "2021" },
                { label: "2022", value: "2022" },
                { label: "2023", value: "2023" },
                { label: "2024", value: "2024" },
                { label: "2025", value: "2025" },
            ]} placeholder="Select Enumeration Year"/>
        </>)}

      {selectedVerificationType === "bills_payment" && (<FormTextInput label="Bill Reference" type="text" name="billReference" placeholder="Enter Bill Reference" register={register} validation={{ required: true }} error={errors.billReference}/>)}

      {selectedVerificationType === "direct_assessment_tax" && (<>
          <FormTextInput label="ABSSIN" type="text" name="abssin" placeholder="Enter ABSSIN" register={register} validation={{ required: true }} error={errors.abssin}/>
          <SelectInput label="Assessment Type" name="assessment_type" id="assessment_type" register={register} options={assessments} placeholder="Select Assessment Type"/>
          <SelectInput label="Fiscal Year" name="fiscalYear" id="fiscalYear" register={register} options={[
                { label: "2021", value: "2021" },
                { label: "2022", value: "2022" },
                { label: "2023", value: "2023" },
                { label: "2024", value: "2024" },
                { label: "2025", value: "2025" },
            ]} placeholder="Select Fiscal Year"/>
        </>)}
      <Button text="Verify Payment" loading={mutation.isLoading}/>
    </form>);
};
export default VerifyticketStatusForm;
