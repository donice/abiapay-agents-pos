"use client";
import React, { useEffect, useState } from "react";
// import "./style.scss" // Moved to _app;
import TransferWalletCards from "../components/wallet-cards";
import { FormTextInput } from "@/src/components/common/input";
import { Button } from "@/src/components/common/button";
import { useForm } from "react-hook-form";
import { useDebounce } from "@/src/hooks/useDebounce";
import { AccessWalletToWallet, fetchWalletInfo, FidelityWalletToWallet, } from "@/src/services/walletService";
import { CustomHeader } from "@/src/components/common/header";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SmallLoader } from "@/src/components/common/loader";
import { fetchDashboardData } from "@/src/services/dashboardService";
import { SuccessModal } from "@/src/components/common/modal";
var OtherWalletsTransferComponent = function () {
    var _a = useState(false), showSuccessModal = _a[0], setShowSuccessModal = _a[1];
    var _b = useState("fidelity"), activeAccount = _b[0], setActiveAccount = _b[1];
    var _c = useState(""), beneficiary = _c[0], setBeneficiary = _c[1];
    var _d = useForm({
        defaultValues: {
            merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
            recipient_wallet_no: "",
            amount: "",
            desc: "",
        },
    }), watch = _d.watch, setValue = _d.setValue, register = _d.register, errors = _d.formState.errors, handleSubmit = _d.handleSubmit;
    var onChange = register("amount").onChange;
    var walletNo = watch("recipient_wallet_no");
    var debouncedWalletNo = useDebounce(walletNo, 500);
    var data = useQuery({
        queryKey: ["get_dashboard_data"],
        queryFn: function () {
            return fetchDashboardData();
        },
    }).data;
    var _e = useMutation({
        mutationFn: function (data) {
            return fetchWalletInfo(data);
        },
        mutationKey: ["fetch_wallet_info"],
        onSuccess: function (data) {
            if (data.status == true) {
                setBeneficiary(data.data.VirtualAccountName);
            }
            else {
                setBeneficiary("");
            }
        },
        onError: function (error) {
            setBeneficiary("");
            console.log(error);
        },
    }), mutate = _e.mutate, isLoading = _e.isLoading;
    var _f = useMutation({
        mutationFn: function (data) {
            return activeAccount == "access"
                ? AccessWalletToWallet(data)
                : FidelityWalletToWallet(data);
        },
        mutationKey: ["post_payment"],
        onSuccess: function (data) {
            if (data.response_code == "00") {
                toast.success("Transaction Successful");
                setShowSuccessModal(true);
                setBeneficiary(data.data.VirtualAccountName);
            }
            else {
                toast.error(data.response_message);
                setBeneficiary("");
            }
        },
        onError: function (error) {
            setBeneficiary("");
            console.log(error);
        },
    }), mutateTransfer = _f.mutate, isLoadingTransfer = _f.isLoading;
    useEffect(function () {
        if (debouncedWalletNo) {
            mutate({ wallet_type: activeAccount, wallet_id: debouncedWalletNo });
        }
    }, [debouncedWalletNo, setValue]);
    var onSubmit = function (reqData) {
        mutateTransfer(reqData);
    };
    return (<section className="other-wallet">
      <CustomHeader title={"Transfer"} desc={"Send money to other wallet"}/>
      <TransferWalletCards data={data} activeAccount={activeAccount} setActiveAccount={setActiveAccount}/>

      <form onSubmit={handleSubmit(onSubmit)} className="other-wallet_form">
        <FormTextInput type="number" label={"Beneficiary Wallet"} name="recipient_wallet_no" placeholder={"Enter Beneficiary Wallet ID"} register={register} validation={{ required: true }} error={errors.recipient_wallet_no}/>
        {isLoading && (<p className="other-wallet_form_beneficiary">
            <SmallLoader />{" "}
          </p>)}
        {beneficiary !== "" && !isLoading && (<div className="other-wallet_form_beneficiary">
            <p>{beneficiary}</p>
          </div>)}

        <FormTextInput type="number" label={"Amount"} name={"amount"} placeholder="Enter Amount" register={register} onChange={onChange} validation={{
            required: "Enter an amount",
            validate: function (value) {
                var _a, _b;
                if (activeAccount == "access") {
                    if (value > ((_a = data === null || data === void 0 ? void 0 : data.access) === null || _a === void 0 ? void 0 : _a.wallet_balance)) {
                        return "Insufficient funds in your Access wallet";
                    }
                }
                else {
                    if (value > ((_b = data === null || data === void 0 ? void 0 : data.fidelity) === null || _b === void 0 ? void 0 : _b.balance)) {
                        return "Insufficient funds in your Fidelity wallet";
                    }
                }
            },
        }} error={errors.amount}/>

        <FormTextInput label={"Description"} name={"desc"} placeholder="Enter Description" register={register} validation={{ required: true }} error={errors.desc}/>

        <Button text="Transfer Funds" loading={isLoadingTransfer} disabled={isLoadingTransfer}/>
        {/* <Button text="Transfer Funds" disabled={beneficiary === ""} /> */}
      </form>

      {showSuccessModal && (<SuccessModal maintext={"Transaction completed successfully"} link={"/wallet"} text="You can now proceed to sp" buttonText="Done"/>)}
    </section>);
};
export default OtherWalletsTransferComponent;
