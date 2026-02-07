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
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
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
import { InstantAccountModal } from "@/src/components/common/modal";
import React, { useEffect, useState } from "react";
// import "../style.scss" // Moved to _app;
import { useForm } from "react-hook-form";
import { useDebounce } from "@/src/hooks/useDebounce";
import { createIndividualSportTicket } from "@/src/services/ticketsServices";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { getErrorMessages } from "@/src/utils/helper";
import { fetchABSSINInfo } from "@/src/services/common";
var Form = function (_a) {
    var setShow = _a.setShow, category = _a.category;
    var _instantModal = useState({ show: false, details: null }), instantModal = _instantModal[0], setInstantModal = _instantModal[1];
    var _b = useForm({
        defaultValues: {
            merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
            team_name: "",
            taxpayer_phone: "",
            taxpayer_name: "",
            ticket_type: "",
            abssin: "",
            wallet_type: "",
            amount: "",
            stadium_name: "",
        },
    }), handleSubmit = _b.handleSubmit, watch = _b.watch, setValue = _b.setValue, register = _b.register, errors = _b.formState.errors;
    var abssin = watch("abssin");
    var debouncedABSSIN = useDebounce(abssin, 500);
    useEffect(function () {
        if (debouncedABSSIN) {
            var getPlateNumberInfo = function (abssin) {
                return __awaiter(void 0, void 0, void 0, function () {
                    var response, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, fetchABSSINInfo({ id: abssin })];
                            case 1:
                                response = _a.sent();
                                if (response.data.length !== 0) {
                                    toast.success(response.message);
                                    setValue("taxpayer_name", response.data.firstname +
                                        "" +
                                        response.data.middle_name +
                                        " " +
                                        response.data.lastname);
                                    setValue("taxpayer_phone", response.data.phone_number);
                                }
                                return [3 /*break*/, 3];
                            case 2:
                                error_1 = _a.sent();
                                toast.error("Error fetching ABSSIN information");
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            getPlateNumberInfo(debouncedABSSIN);
        }
    }, [debouncedABSSIN, setValue]);
    var _c = useMutation({
        mutationFn: function (data) {
            return createIndividualSportTicket(data);
        },
        onSuccess: function (data) {
            var _a, _b;
            console.log(data);
            if (data === null || data === void 0 ? void 0 : data.data.response_code) {
                if ((data === null || data === void 0 ? void 0 : data.data.response_code) == "00") {
                    toast.success((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.response_message);
                    setShow({
                        mode: true,
                        message: data === null || data === void 0 ? void 0 : data.data.response_message,
                        expiry_date: "",
                        payment_ref: ((_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.payment_ref) || ((_c = data === null || data === void 0 ? void 0 : data.data) === null || _c === void 0 ? void 0 : _c.paymentRef) || "N/A",
                    });
                }
                else if ((data === null || data === void 0 ? void 0 : data.data.response_code) == "12") {
                    toast.success((_d = data === null || data === void 0 ? void 0 : data.data) === null || _d === void 0 ? void 0 : _d.response_message);
                    var details = data.data.data || data.data;
                    setInstantModal({
                        show: true,
                        details: {
                            virtual_acct_no: details.virtual_acct_no || details.account_number || details.Account_Number,
                            virtual_acct_name: details.virtual_acct_name || details.account_name || details.Account_Name,
                            transaction_amount: details.transaction_amount || details.amount || details.Amount,
                            bank_name: details.bank_name || details.Bank_Name || "Bank",
                            expiry_datetime: details.expiry_datetime || details.Expiry_Date,
                        }
                    });
                }
                else {
                    toast.error(data === null || data === void 0 ? void 0 : data.data.response_message);
                }
            }
            else {
                toast.error(getErrorMessages(data === null || data === void 0 ? void 0 : data.data.response_message));
            }
        },
        onError: function (error) {
            toast.error("Unable to create loading offloading request");
            console.log(error);
        },
    }), mutate = _c.mutate, isLoading = _c.isLoading;
    var onSubmit = function (reqData) {
        mutate(reqData);
        // console.log(reqData);
    };
    return (<form onSubmit={handleSubmit(onSubmit)} className="loading_form">
        {category === "abian" && (<FormTextInput label={"ABSSIN"} name={"abssin"} placeholder="Enter ABSSIN" register={register} validation={{ required: true }} error={errors.abssin} />)}
        <FormTextInput label={"Taxpayer Phone Number"} name={"taxpayer_phone"} placeholder="Enter Taxpayer Phone Number" register={register} validation={{ required: true }} error={errors.taxpayer_phone} />
        <FormTextInput label={"Taxpayer Name"} name={"taxpayer_name"} placeholder="Enter Taxpayer Name" register={register} validation={{ required: true }} error={errors.taxpayer_name} />

        <SelectInput label={"Stadium Name"} name={"stadium_name"} id={"stadium_name"} register={register} validation={{ required: true }} error={!!errors.stadium_name} options={[
            { label: "Enyimba Stadium, Aba", value: "Enyimba Stadium, Aba" },
            {
                label: "Umuahia Township Stadium, Umuahia",
                value: "Umuahia Township Stadium, Umuahia",
            },
        ]} />
        <SelectInput label={"Team Name"} name={"team_name"} id={"team_name"} register={register} validation={{ required: true }} error={!!errors.stadium_name} options={[
            { label: "Enyimba FC, Aba", value: "Enyimba FC, Aba" },
            {
                label: "Abia Warrior FC, Umuahia",
                value: "Abia Warrior FC, Umuahia",
            },
        ]} />
        <SelectInput label={"Ticket Type"} name={"ticket_type"} id={"ticket_type"} register={register} validation={{ required: true }} error={!!errors.stadium_name} options={[
            { label: "VIP", value: "VIP" },
            {
                label: "Popular Stand",
                value: "Popular Stand",
            },
        ]} />

        <FormTextInput label={"Amount"} name={"amount"} placeholder="Enter Amount" value={category === "guest" ? "1200" : "1000"} register={register} validation={{ required: true }} error={errors.amount} disabled />

        <SelectInput label={"Wallet Type"} name={"wallet_type"} id={"wallet_type"} register={register} validation={{ required: true }} error={!!errors.wallet_type} options={[
            { label: "Fidelity", value: "fidelity" },
            { label: "Access", value: "access" },
        ]} />

        <Button text={"Process Now"} loading={isLoading} />
        {instantModal.show && (<InstantAccountModal
            virtual_acct_no={instantModal.details.virtual_acct_no}
            virtual_acct_name={instantModal.details.virtual_acct_name}
            transaction_amount={instantModal.details.transaction_amount}
            bank_name={instantModal.details.bank_name}
            expiry_datetime={instantModal.details.expiry_datetime}
            onClick={() => {
                setInstantModal({ show: false, details: null });
                router.push("/tickets/sport");
            }}
        />)}
    </form>);
};
export default Form;
