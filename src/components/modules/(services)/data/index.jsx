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
import { useRouter } from "next/router";
import { useForm, useWatch } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CustomHeader } from "@/src/components/common/header";
import TransferWalletCards from "../../wallet/components/wallet-cards";
import Networks from "../lib/Networks";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { FormButton } from "@/src/components/common/button";
import { fetchDashboardData } from "@/src/services/dashboardService";
import { BuyDataService, GetDataPlans } from "@/src/services/VATService";
var DataModule = function () {
    var _a;
    var router = useRouter();
    var _b = useState("fidelity"), activeAccount = _b[0], setActiveAccount = _b[1];
    var _c = useForm({
        defaultValues: {
            wallet: "fidelity",
            amount: 0,
        },
    }), register = _c.register, setValue = _c.setValue, handleSubmit = _c.handleSubmit, control = _c.control, errors = _c.formState.errors;
    var selectedNetwork = useWatch({ control: control, name: "network" });
    var selectedTarrifId = useWatch({ control: control, name: "tarrifTypeId" });
    var handleNetworkSelect = function (network) {
        return setValue("network", network, { shouldValidate: true });
    };
    var handleWalletSelect = function (wallet) {
        return setValue("wallet", wallet, { shouldValidate: true });
    };
    var _d = useQuery({
        queryKey: ["get_dashboard_data"],
        queryFn: fetchDashboardData,
    }), dashboardData = _d.data, refetch = _d.refetch;
    var dataPlans = useQuery({
        queryKey: ["get_data_plans", selectedNetwork],
        queryFn: function () { return GetDataPlans({ network: selectedNetwork }); },
        enabled: !!selectedNetwork,
    }).data;
    useEffect(function () {
        var _a;
        var selectedPlan = (_a = dataPlans === null || dataPlans === void 0 ? void 0 : dataPlans.response_data) === null || _a === void 0 ? void 0 : _a.find(function (plan) {
            return plan.tarrifTypeId === selectedTarrifId ||
                plan.planId === selectedTarrifId;
        });
        console.log(selectedPlan);
        if (selectedPlan) {
            setValue("amount", selectedPlan.price);
        }
    }, [selectedTarrifId, dataPlans, setValue]);
    useEffect(function () {
        setValue("amount", 0);
        setValue("tarrifTypeId", "");
    }, [selectedNetwork, setValue]);
    var _e = useMutation({
        mutationKey: ["buy_airtime"],
        mutationFn: BuyDataService,
        onSuccess: function (res) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, refetch()];
                    case 1:
                        _a.sent();
                        if ((res === null || res === void 0 ? void 0 : res.response_code) === "00") {
                            if (typeof (res === null || res === void 0 ? void 0 : res.response_message) === "string") {
                                router.push("/success");
                            }
                            else {
                                toast.error("Unsuccessful data purchase");
                            }
                        }
                        else {
                            toast.error(res === null || res === void 0 ? void 0 : res.response_message);
                        }
                        return [2 /*return*/];
                }
            });
        }); },
        onError: function (err) {
            console.error(err);
            toast.error("An error occurred. Please try again.");
        },
    }), mutate = _e.mutate, isLoading = _e.isLoading;
    var onSubmit = function (data) {
        mutate(__assign(__assign({}, data), { amount: Number(data.amount) }));
    };
    var getPlanValue = function (plan) {
        switch (selectedNetwork) {
            case "mtn":
                return plan.tarrifTypeId;
            case "airtel":
            case "glo":
                return plan.planId;
            case "9mobile":
                return plan.tarrifTypeId || plan.planId;
            default:
                return null;
        }
    };
    return (<div>
      <CustomHeader title="Data" desc="Purchase data for any network"/>
      <section className="service">
        <TransferWalletCards data={dashboardData} activeAccount={activeAccount} setActiveAccount={setActiveAccount} onWalletSelect={handleWalletSelect} type="balance"/>

        <Networks onNetworkSelect={handleNetworkSelect}/>

        {selectedNetwork && (<form className="service_form" onSubmit={handleSubmit(onSubmit)}>
            <SelectInput label="Tarrif Plans" name="tarrifTypeId" id="tarrifTypeId" register={register} onChange={function (e) {
                return setValue("tarrifTypeId", e.target.value, {
                    shouldValidate: true,
                });
            }} options={((_a = dataPlans === null || dataPlans === void 0 ? void 0 : dataPlans.response_data) === null || _a === void 0 ? void 0 : _a.map(function (plan) { return ({
                label: plan.name,
                value: getPlanValue(plan),
            }); })) || []}/>

            <FormTextInput label="Phone Number" name="phone_number" type="number" validation={{
                required: "Phone number is required",
                minLength: {
                    value: 11,
                    message: "Phone number must be 11 digits",
                },
                maxLength: {
                    value: 11,
                    message: "Phone number must be 11 digits",
                },
            }} error={errors.phone_number} register={register}/>

            <FormTextInput label="Amount" name="amount" type="number" disabled validation={{
                required: "Amount is required",
                min: { value: 40, message: "Amount must be at least ₦50" },
            }} error={errors.amount} register={register}/>

            <FormButton text="Buy Data" disabled={isLoading} loading={isLoading}/>
          </form>)}
      </section>
    </div>);
};
export default DataModule;
