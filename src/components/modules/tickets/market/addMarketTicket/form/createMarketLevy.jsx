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
import React, { useEffect } from "react";
import { FormButton } from "@/src/components/common/button";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
// import "./style.scss" // Moved to _app;
import { useForm } from "react-hook-form";
import { fetchMarkets, postPayForMarketLevy, } from "@/src/services/ticketsServices";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDebounce } from "@/src/hooks/useDebounce";
import { fetchABSSINInfo } from "@/src/services/common";
import { MarketTicketModal } from "@/src/components/common/modal";
import { FcApproval } from "react-icons/fc";
import { getCurrentYear } from "@/src/utils/getCurrentYear";
var CreateMarketLevyForm = function () {
    var _a = React.useState([]), markets = _a[0], setMarkets = _a[1];
    var _b = React.useState({
        openModal: false,
        mode: "success",
    }), status = _b[0], setStatus = _b[1];
    var _c = React.useState({
        enumeration_id: "",
        payment_status: "",
        response_message: "",
        payment_ref: "",
    }), modalDetails = _c[0], setModalDetails = _c[1];
    var _d = useForm({
        defaultValues: {
            taxpayer_name: "",
            abssin: "",
            taxpayer_phone: "",
            zone_line: "",
            market_id: "",
            shop_number: "",
            payment_period: getCurrentYear(),
            merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
            wallet_type: "fidelity",
        },
    }), register = _d.register, watch = _d.watch, handleSubmit = _d.handleSubmit, setValue = _d.setValue, errors = _d.formState.errors;
    var getMarkets = function () {
        return __awaiter(void 0, void 0, void 0, function () {
            var data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fetchMarkets()];
                    case 1:
                        data = _a.sent();
                        setMarkets(data === null || data === void 0 ? void 0 : data.data.map(function (item) {
                            return ({
                                label: item.market,
                                value: item.market_id,
                            });
                        }));
                        return [2 /*return*/, data];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error("Error fetching transactions: ".concat(error_1 === null || error_1 === void 0 ? void 0 : error_1.message));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    var mutatePayForMarketLevy = useMutation({
        mutationKey: ["payForMarketLevy"],
        mutationFn: function (data) {
            return postPayForMarketLevy(data);
        },
        onSuccess: function (data) {
            console.log(data);
            if ((data === null || data === void 0 ? void 0 : data.response_code) == "00" || (data === null || data === void 0 ? void 0 : data.response_code) == "12") {
                setStatus({ openModal: true, mode: "success" });
                console.log(data);
                setModalDetails({
                    enumeration_id: (data === null || data === void 0 ? void 0 : data.enumeration_id) || (data === null || data === void 0 ? void 0 : data.enumerationId) || "N/A",
                    payment_status: (data === null || data === void 0 ? void 0 : data.payment_status) || (data === null || data === void 0 ? void 0 : data.paymentStatus) || "N/A",
                    response_message: (data === null || data === void 0 ? void 0 : data.response_message) || (data === null || data === void 0 ? void 0 : data.responseMessage) || "Success",
                    payment_ref: (data === null || data === void 0 ? void 0 : data.payment_ref) || (data === null || data === void 0 ? void 0 : data.paymentRef) || "N/A",
                });
                toast.success(data === null || data === void 0 ? void 0 : data.response_message);
            }
            else {
                toast.error("Cannot pay for market levy");
            }
        },
        onError: function (error) {
            toast.error("Cannot pay for market levy");
        },
    });
    var onsubmit = function (data) { return mutatePayForMarketLevy.mutate(data); };
    var abssin = watch("abssin");
    var debouncedAbssin = useDebounce(abssin, 300);
    useEffect(function () {
        if (debouncedAbssin) {
            var getPlateNumberInfo = function (req) {
                return __awaiter(void 0, void 0, void 0, function () {
                    var response, error_2;
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
                                    setValue("taxpayer_name", response.data.firstname +
                                        " " +
                                        response.data.middle_name +
                                        " " +
                                        response.data.lastname);
                                    setValue("taxpayer_phone", response.data.phone_number);
                                }
                                return [3 /*break*/, 3];
                            case 2:
                                error_2 = _b.sent();
                                console.log(error_2);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            getPlateNumberInfo(debouncedAbssin);
        }
    }, [debouncedAbssin, setValue]);
    useEffect(function () {
        getMarkets();
    }, []);
    return (<div className="add-market-ticket">
        <section className="grid gap-4">
            <div>
                <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-2 justify-between">
                    {" "}
                    <FormTextInput label="Taxpayer ABSSIN" type="number" name="abssin" placeholder="Enter Taxpayer ABSSIN" register={register} validation={{
                        required: "Taxpayer ABSSIN is Required",
                        minLength: {
                            value: 10,
                            message: "Length must be above 10 characters",
                        },
                        maxLength: {
                            value: 11,
                            message: "Length must be below 11 characters",
                        },
                    }} error={errors.abssin} />
                    <FormTextInput label="Taxpayer Name" type="text" name="taxpayer_name" placeholder="Enter Taxpayer Name" register={register} validation={{
                        required: "Taxpayer Name is Required",
                    }} error={errors.taxpayer_name} />
                    <FormTextInput label="Taxpayer Phone" type="number" name="taxpayer_phone" placeholder="Enter Taxpayer Phone" register={register} validation={{
                        required: "Taxpayer Phone is Required",
                    }} error={errors.taxpayer_phone} />
                    <SelectInput label={"Market Name"} name={"market_id"} id={"market_id"} register={register} validation={{ required: true }} error={!!errors.market_id} options={markets} />
                    <FormTextInput label={"Shop Number"} name={"shop_number"} register={register} validation={{ required: true }} error={errors.shop_number} />
                    <FormTextInput label={"Zone Line"} name={"zone_line"} register={register} validation={{ required: true }} error={errors.zone_line} />{" "}
                    <SelectInput label={"Payment Period"} name={"payment_period"} id={"payment_period"} register={register} validation={{ required: true }} error={!!errors.payment_period} options={[
                        { label: "2025", value: "2025" },
                    ]} />
                    <FormTextInput label={"Amount to be paid"} name={"amount"} disabled value={18000} error={errors.zone_line} />
                    <SelectInput label={"Wallet Type"} name={"wallet_type"} id={"wallet_type"} options={[
                        { value: "fidelity", label: "Fidelity" },
                        { value: "access", label: "Access" },
                    ]} />
                    <FormButton text={"Pay Now"} disabled={mutatePayForMarketLevy.isLoading} loading={mutatePayForMarketLevy.isLoading} />
                </form>

                {status.openModal && status.mode === "success" && (<MarketTicketModal details={{
                    enum_id: modalDetails === null || modalDetails === void 0 ? void 0 : modalDetails.enumeration_id,
                    payment_status: modalDetails === null || modalDetails === void 0 ? void 0 : modalDetails.payment_status,
                    payment_ref: modalDetails === null || modalDetails === void 0 ? void 0 : modalDetails.payment_ref,
                }} text={modalDetails === null || modalDetails === void 0 ? void 0 : modalDetails.response_message} icon={<FcApproval className="my-4 text-[5rem] p-3 bg-green-100 rounded-full" />} maintext={"Market Ticket Payment Successful"} />)}
            </div>
        </section>
    </div>);
};
export default CreateMarketLevyForm;
