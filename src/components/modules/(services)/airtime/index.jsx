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
import { CustomHeader } from "@/src/components/common/header";
import { fetchDashboardData } from "@/src/services/dashboardService";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import TransferWalletCards from "../../wallet/components/wallet-cards";
import Networks, { AirtimeAmounts } from "../lib/Networks";
// import "../style.scss" // Moved to _app;
import { useForm, useWatch } from "react-hook-form";
import { FormTextInput } from "@/src/components/common/input";
import { FormButton } from "@/src/components/common/button";
import { BuyAirtimeService } from "@/src/services/VATService";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Link from "next/link";
var AirtimeModule = function () {
    var router = useRouter();
    var _a = React.useState("fidelity"), activeAccount = _a[0], setActiveAccount = _a[1];
    var _b = useForm({
        defaultValues: {
            wallet: "fidelity",
        },
    }), register = _b.register, setValue = _b.setValue, handleSubmit = _b.handleSubmit, watch = _b.watch, control = _b.control, errors = _b.formState.errors;
    var selectedNetwork = useWatch({ control: control, name: "network" });
    var handleNetworkSelect = function (network) {
        setValue("network", network);
    };
    var handleWalletSelect = function (wallet) {
        setValue("wallet", wallet);
    };
    var _c = useQuery({
        queryKey: ["get_dashboard_data"],
        queryFn: function () {
            return fetchDashboardData();
        },
    }), data = _c.data, refetch = _c.refetch;
    var _d = useMutation({
        mutationKey: ["buy_airtime"],
        mutationFn: function (data) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, BuyAirtimeService(data)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        }); },
        onSuccess: function (data) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, refetch()];
                    case 1:
                        _a.sent();
                        if ((data === null || data === void 0 ? void 0 : data.response_code) == "00") {
                            if (typeof (data === null || data === void 0 ? void 0 : data.response_message) !== "string") {
                                return [2 /*return*/, toast.error("Unsuccessful airtime purchase")];
                            }
                            else {
                                router.push("/success");
                            }
                        }
                        else {
                            toast.error(data === null || data === void 0 ? void 0 : data.response_message);
                        }
                        return [2 /*return*/];
                }
            });
        }); },
        onError: function (error) {
            console.error(error);
        },
    }), mutate = _d.mutate, isLoading = _d.isLoading;
    var onSubmit = function (data) {
        mutate(data);
    };
    return (<div>
      <CustomHeader title="Airtime" desc="Purchase airtime for any network"/>
      <div className="flex flex-end justify-end items-center my-4">
        <Link href={"/airtime/history"}>
          <a className="text-sm font-bold">View history</a>
        </Link>
      </div>
      <section className="service">
        <TransferWalletCards data={data} activeAccount={activeAccount} setActiveAccount={setActiveAccount} onWalletSelect={handleWalletSelect} type="balance"/>

        <Networks onNetworkSelect={handleNetworkSelect}/>

        {selectedNetwork && (<form className="service_form" onSubmit={handleSubmit(onSubmit)}>
            <FormTextInput label={"Phone Number"} name={"phone_number"} type={"number"} validation={{
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

            <div>
              <AirtimeAmounts onAmountSelect={function (amount) { return setValue("amount", amount); }}/>
            </div>
            <FormTextInput label={"Amount"} name={"amount"} type={"number"} validation={{
                required: "Amount is required",
                min: { value: 50, message: "Amount must be at least ₦50" },
            }} error={errors.amount} register={register}/>

            {watch("amount") && (<span className="animate-slide-down text-blue-500 text-xs font-normal border border-blue-200 bg-blue-50 p-1 rounded-md text-center block">
                You will receive a ₦{(watch("amount") * 0.015).toFixed(2)}{" "}
                Cashback
              </span>)}

            <FormButton text={"Buy Airtime"} disabled={isLoading} loading={isLoading}/>
          </form>)}
      </section>
    </div>);
};
export default AirtimeModule;
