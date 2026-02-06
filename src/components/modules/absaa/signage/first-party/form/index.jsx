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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { fetchABSSINInfo } from "@/src/services/common";
import { randomInvoiceGenerator } from "@/src/utils/randomInvoiceGenerator";
import { getCurrentDateTime } from "@/src/utils/getCurrentDateTime";
import toast from "react-hot-toast";
import { isBrowser } from "@/src/utils/isBrowser";
import { useRouter } from "next/router";
import { Button } from "@/src/components/common/button";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { SuccessModal } from "@/src/components/common/modal";
import { useDebounce } from "@/src/hooks/useDebounce";
// import "./style.scss" // Moved to _app;
import { useMutation } from "@tanstack/react-query";
import { createFirstPartySignage } from "@/src/services/absaaService";
import { bankOptions } from "@/src/lib/app";
var CreateFirstPartySignageForm = function (_a) {
    var show = _a.show, setShow = _a.setShow, paymentRef = _a.paymentRef, setPaymentRef = _a.setPaymentRef, selectedPeriod = _a.selectedPeriod, selectedProduct = _a.selectedProduct;
    var _b = useForm({
        defaultValues: {
            merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
            amount: "",
            zone: "",
            size_meter: "",
            sign_type: "",
            road_name: "",
            occurence: "1",
            abssin: "",
            taxpayer_phone: "",
            taxpayer_name: "",
            wallet_type: "fidelity",
        },
    }), register = _b.register, watch = _b.watch, handleSubmit = _b.handleSubmit, errors = _b.formState.errors, setValue = _b.setValue;
    var router = useRouter();
    var data = isBrowser && sessionStorage.getItem("USER_DATA");
    var user_data = data && JSON.parse(data);
    var _c = useMutation({
        mutationFn: function (data) {
            return createFirstPartySignage(data);
        },
        onSuccess: function (response) {
            if (response.response_code === "00") {
                toast.success(response.response_message);
                setPaymentRef(response.payment_ref);
                setShow(true);
            }
            else if (response.response_code === "74") {
                toast.error(response.response_message);
                router.push("/tickets/transport");
            }
            else {
                toast.error("".concat(response.response_message, ", Try again"));
            }
        },
        onError: function () {
            toast.error("Error Creating Ticket");
        },
    }), mutate = _c.mutate, isLoading = _c.isLoading;
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var formData;
        return __generator(this, function (_a) {
            formData = __assign(__assign({}, data), { transaction_date: getCurrentDateTime(), invoice_id: "INV".concat(randomInvoiceGenerator()) });
            sessionStorage.setItem("TRANSPORT_INVOICE", JSON.stringify(formData));
            mutate(formData);
            return [2 /*return*/];
        });
    }); };
    var abssin = watch("abssin");
    var debouncedPlateNumber = useDebounce(abssin, 500);
    useEffect(function () {
        if (debouncedPlateNumber) {
            var getPlateNumberInfo = function (abssin) { return __awaiter(void 0, void 0, void 0, function () {
                var response, error_1;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, fetchABSSINInfo({ id: abssin })];
                        case 1:
                            response = _b.sent();
                            if (((_a = response.data) === null || _a === void 0 ? void 0 : _a.length) !== 0) {
                                toast.success(response.message);
                                setValue("taxpayer_name", response.data.firstname + " " + response.data.lastname);
                                setValue("taxpayer_phone", response.data.phone_number);
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _b.sent();
                            toast.error("Error fetching plate number information");
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
            getPlateNumberInfo(debouncedPlateNumber);
        }
    }, [debouncedPlateNumber, setValue]);
    return (<form onSubmit={handleSubmit(onSubmit)} className="add-ticket">
      <SelectInput label="Sign Type" name="sign_type" id="sign_type" register={register} validation={{ required: true }} options={[
            { value: "Wall Signs", label: "Wall Signs" },
            { value: "Free Standing Signs", label: "Free Standing Signs" },
        ]} placeholder="Select Sign Type" error={!!errors.sign_type}/>
      <SelectInput label="Zone" name="zone" id="zone" register={register} validation={{ required: true }} options={[
            { value: "Standard Zone", label: "Standard Zone" },
            { value: "Premium", label: "Premium" },
        ]} placeholder="Select Zone" error={!!errors.zone}/>
      <SelectInput label="Area in SQM" name="size_meter" id="size_meter" register={register} validation={{ required: true }} options={[
            {
                value: "0.1m to 1.0(2 x 2 - 3 x 4)ft",
                label: "0.1m to 1.0(2 x 2 - 3 x 4)ft",
            },
            {
                value: "1.01m to 3.0(4 x 6 - 5 x 8)ft",
                label: "1.01m to 3.0(4 x 6 - 5 x 8)ft",
            },
            {
                value: "3.01m to 5.0(6 x 10 - 6 x 12)ft",
                label: "3.01m to 5.0(6 x 10 - 6 x 12)ft",
            },
            {
                value: "5.01m to 7.0(6 x 12 - 8 x 10)ft",
                label: "5.01m to 7.0(6 x 12 - 8 x 10)ft",
            },
            {
                value: "7.01m to 10.0(8 x 10 - 10 x 10)ft",
                label: "7.01m to 10.0(8 x 10 - 10 x 10)ft",
            },
            {
                value: "10.01m to 13.0(10 x 10 - 10 x 12)ft",
                label: "10.01m to 13.0(10 x 10 - 10 x 12)ft",
            },
            {
                value: "13.01m to 15.0(10 x 12 - 10 x 16)ft",
                label: "13.01m to 15.0(10 x 12 - 10 x 16)ft",
            },
            {
                value: "15.01m to 25.0(10 x 16 - 10 x 20)ft",
                label: "15.01m to 25.0(10 x 16 - 10 x 20)ft",
            },
        ]} placeholder="Select Area in SQM" error={!!errors.size_meter}/>

      <FormTextInput label="ABSSIN" type="text" name="abssin" placeholder="Enter ABSSIN" register={register} validation={{ required: true }} error={errors.abssin}/>

      <FormTextInput label="Taxpayer Name" type="text" name="taxpayer_name" placeholder="Enter Taxpayer Name" register={register} validation={{ required: true }} error={errors.taxpayer_name}/>

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

      <FormTextInput label="Location" type="text" name="road_name" placeholder="Enter Location" register={register} validation={{ required: true }} error={errors.road_name}/>

      <FormTextInput label="Amount" type="number" name="amount" placeholder="Enter Amount" register={register} readOnly validation={{ required: true }} error={errors.amount}/>

      <SelectInput label="Choose Wallet" name="wallet_type" id="wallet_type" register={register} validation={{ required: true }} options={bankOptions} placeholder="Select Wallet Type" error={!!errors.wallet_type}/>

      <div className="btn_container">
        <Button text="Pay Now" loading={isLoading}/>
      </div>

      {show && (<SuccessModal text="View Receipt" link="/tickets/transport/add/summary" id={"Ref: ".concat(paymentRef, ", Valid for: ").concat(selectedPeriod, ", Payment for: ").concat(selectedProduct)} buttonText="Done"/>)}
    </form>);
};
export default CreateFirstPartySignageForm;
