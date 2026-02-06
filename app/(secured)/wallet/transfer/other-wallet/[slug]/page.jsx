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
import React, { useEffect, useState } from "react";
import "./style.scss";
import { FormTextInput, } from "@/src/components/common/input";
import { Button, GoBackButton } from "@/src/components/common/button";
import { useForm } from "react-hook-form";
import { useDebounce } from "@/src/hooks/useDebounce";
import { AccessWalletToWallet, fetchWalletInfo, FidelityWalletToWallet, } from "@/src/services/walletService";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SmallLoader } from "@/src/components/common/loader";
import { fetchDashboardData } from "@/src/services/dashboardService";
import { InformationModal } from "@/src/components/common/modal";
import { fetchBanks } from "@/src/services/common";
import { IndividualTransferWalletCards } from "@/src/components/modules/wallet/components/wallet-cards";
import { TbSend } from "react-icons/tb";
import { getErrorMessages } from "@/src/utils/helper";
var StatementPage = function (_a) {
    var params = _a.params;
    var activeAccount = params.slug;
    var _b = useState({
        show: false,
        mode: "",
    }), showSuccessModal = _b[0], setShowSuccessModal = _b[1];
    var _c = useState(""), beneficiary = _c[0], setBeneficiary = _c[1];
    var _d = useState([]), banks = _d[0], setBanks = _d[1];
    var _e = useForm({
        defaultValues: {
            cashout_type: "",
            merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
            bank_account: "",
            amount: "",
            desc: "",
        },
    }), setValue = _e.setValue, registerTransferToBank = _e.register, errorsTransferToBank = _e.formState.errors, handleSubmitTransferToBank = _e.handleSubmit;
    var _f = useForm({
        defaultValues: {
            cashout_type: "",
            merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
            recipient_wallet_no: "",
            amount: "",
            desc: "",
        },
    }), watchTransferWallet = _f.watch, registerTransferWallet = _f.register, errorsTransferWallet = _f.formState.errors, handleSubmitTransferWallet = _f.handleSubmit;
    var cashoutType = "wallet";
    var onChange = registerTransferToBank("amount").onChange;
    var walletNo = watchTransferWallet("recipient_wallet_no");
    var debouncedWalletNo = useDebounce(walletNo, 500);
    var data = useQuery({
        queryKey: ["get_dashboard_data"],
        queryFn: function () {
            return fetchDashboardData();
        },
    }).data;
    var dasboardData = useQuery({
        queryKey: ["get_dashboard_data"],
        queryFn: function () {
            return fetchDashboardData();
        },
    }).data;
    var getBanks = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data_1, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchBanks()];
                case 1:
                    data_1 = _b.sent();
                    console.log(data_1);
                    setBanks((_a = data_1 === null || data_1 === void 0 ? void 0 : data_1.response_data) === null || _a === void 0 ? void 0 : _a.map(function (item) {
                        return {
                            label: item.name,
                            value: item.code,
                        };
                    }));
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        getBanks();
    }, []);
    var _g = useMutation({
        mutationFn: function (data) {
            return fetchWalletInfo(data);
        },
        mutationKey: ["fetch_wallet_info"],
        onSuccess: function (data) {
            if (data.status == true) {
                if (activeAccount == "fidelity") {
                    setBeneficiary((data === null || data === void 0 ? void 0 : data.data.surname) +
                        " " +
                        (data === null || data === void 0 ? void 0 : data.data.firstname) +
                        " (" +
                        (data === null || data === void 0 ? void 0 : data.data.account_name) +
                        ")");
                }
                if (activeAccount == "access") {
                    setBeneficiary((data === null || data === void 0 ? void 0 : data.data.WalletName) +
                        " (" +
                        (data === null || data === void 0 ? void 0 : data.data.VirtualAccountName) +
                        ")");
                }
            }
            else {
                setBeneficiary("");
            }
        },
        onError: function (error) {
            setBeneficiary("");
            console.log(error);
        },
    }), mutate = _g.mutate, isPending = _g.isPending;
    var _h = useMutation({
        mutationFn: function (data) {
            if (cashoutType == "wallet") {
                return activeAccount == "access"
                    ? AccessWalletToWallet(data)
                    : FidelityWalletToWallet(data);
            }
            throw new Error("Invalid cashout type or active account");
        },
        mutationKey: ["post_payment"],
        onSuccess: function (data) {
            if (data.response_code == "00") {
                toast.success("Transaction Successful");
                setShowSuccessModal({ show: true, mode: "success" });
            }
            else if (data.response_code == "15") {
                setShowSuccessModal({ show: true, mode: "warning" });
            }
            else {
                toast.error(data.status + ": " + data.message);
                setBeneficiary("");
            }
        },
        onError: function (error) {
            var _a, _b;
            setBeneficiary("");
            toast.error(getErrorMessages((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) ||
                "Error completing transaction");
            console.log(error);
        },
    }), mutateTransfer = _h.mutate, isPendingTransfer = _h.isPending;
    useEffect(function () {
        if (debouncedWalletNo) {
            mutate({ wallet_id: debouncedWalletNo, wallet_type: activeAccount });
        }
    }, [debouncedWalletNo, setValue]);
    var onSubmit = function (reqData) {
        console.log("DATA", reqData);
        mutateTransfer(reqData);
    };
    return (<section className="other-wallet">
      <header>
        <GoBackButton />
        <IndividualTransferWalletCards data={data} activeAccount={activeAccount}/>
      </header>


      {cashoutType == "wallet" && (<form onSubmit={handleSubmitTransferWallet(onSubmit)} className="other-wallet_form">
          {" "}
          <FormTextInput type="number" label={"Beneficiary Wallet"} name="recipient_wallet_no" placeholder={"Enter Beneficiary Wallet ID"} register={registerTransferWallet} validation={{ required: true }} error={errorsTransferWallet.recipient_wallet_no}/>
          {isPending && (<p className="other-wallet_form_beneficiary">
              <SmallLoader />{" "}
            </p>)}
          {beneficiary !== "" && !isPending && (<div className="other-wallet_form_beneficiary">
              <p>{beneficiary}</p>
            </div>)}
          <FormTextInput type="number" label={"Amount"} name={"amount"} placeholder="Enter Amount" register={registerTransferWallet} onChange={onChange} validation={{
                required: "Enter an amount",
                validate: function (value) {
                    var _a, _b;
                    if (activeAccount == "access") {
                        if (value > ((_a = dasboardData === null || dasboardData === void 0 ? void 0 : dasboardData.access) === null || _a === void 0 ? void 0 : _a.wallet_balance)) {
                            return "Insufficient funds in your Access wallet";
                        }
                    }
                    else {
                        if (value > ((_b = dasboardData === null || dasboardData === void 0 ? void 0 : dasboardData.fidelity) === null || _b === void 0 ? void 0 : _b.balance)) {
                            return "Insufficient funds in your Fidelity wallet";
                        }
                    }
                },
            }} error={errorsTransferWallet.amount}/>
          <FormTextInput label={"Description"} name={"desc"} placeholder="Enter Description" register={registerTransferWallet} validation={{ required: true }} error={errorsTransferWallet.desc}/>
          <Button text="Transfer Funds" loading={isPendingTransfer} disabled={isPendingTransfer || beneficiary == ""}/>
        </form>)}

      {showSuccessModal.show == true && showSuccessModal.mode == "success" && (<InformationModal mode="success" icon={<TbSend className="success_icon"/>} maintext={"Money sent successfully"} subtext="Your transaction has been completed successfully. You can check your transaction history in your account." link={"/wallet/transfer/other-wallet"}/>)}

      {showSuccessModal.show == true && showSuccessModal.mode == "warning" && (<InformationModal mode="warning" 
        // icon={<TbSend className="warning_icon" />}
        maintext={"Insufficient funds"} subtext="Insufficient funds in your wallet. Please fund your wallet and try again." link={"/wallet/transfer/other-wallet"}/>)}
    </section>);
};
export default StatementPage;
