"use client";
import { usePathname } from "next/navigation";
import { getLastPathSegment } from "@/src/utils/getLastPathSegment";
import React, { useEffect, useMemo, useState } from "react";
import { BackButton, FormButton, PrimaryButton, } from "@/src/components/common/button";
import "./style.scss";
import { formatAmount } from "@/src/utils/formatAmount";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Loading } from "@/src/components/common/loader/redirecting";
import { confirmInstantAccountPayment, fetchBillPayment, fetchBills, fetchInstantAccount, sendBill, } from "@/src/services/billServices";
import { useForm } from "react-hook-form";
import { SelectInput } from "@/src/components/common/input";
import { InformationModal, InstantAccountModal, } from "@/src/components/common/modal";
import { getErrorMessages } from "@/src/utils/helper";
import { PiReceiptDuotone } from "react-icons/pi";
import { bankOptions } from "@/src/lib/app";
var Dynamic = function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    var path = usePathname();
    var segment = getLastPathSegment(path);
    var _k = useState({}), billIsueeDetails = _k[0], setBillIsueeDetails = _k[1];
    var _l = useState({
        virtual_acct_no: "",
        virtual_acct_name: "",
        request_id: "",
        expiry_datetime: "",
        transaction_amount: "",
        bank_name: "",
    }), instantAccountDetails = _l[0], setInstantAccountDetails = _l[1];
    var _m = useState({
        mode: false,
        state: "",
        message: "",
        sum_message: "",
    }), show = _m[0], setShow = _m[1];
    var _o = useState(false), viewItems = _o[0], setViewItems = _o[1];
    var mutate = useMutation({
        mutationFn: function (data) {
            return fetchBillPayment(data);
        },
        onSuccess: function (data) {
            setBillIsueeDetails(data === null || data === void 0 ? void 0 : data.response_data);
        },
    }).mutate;
    var mutateSendBill = useMutation({
        mutationFn: function (data) {
            return sendBill(data);
        },
        onSuccess: function (data) {
            if (data.response_code == "96") {
                toast.error(data.response_message);
            }
            else {
                toast.success(data.response_message);
            }
        },
    }).mutate;
    var _p = useMutation({
        mutationFn: function (data) {
            console.log(data);
            return confirmInstantAccountPayment(data);
        },
        onSuccess: function (data) {
            if (data.response_code == "00") {
                console.log(data.response_data);
                toast.success(data.response_message);
            }
            else {
                var toastId_1 = toast.loading(data.response_message, {
                    id: "confirm",
                });
                setTimeout(function () {
                    toast.dismiss(toastId_1);
                }, 2000);
            }
        },
    }), mutateConfirmPayment = _p.mutate, isPendingConfirmPayment = _p.isPending;
    var _q = useMutation({
        mutationFn: function (data) {
            return fetchInstantAccount(data);
        },
        onSuccess: function (data) {
            var _a, _b, _c, _d, _e;
            if (data.response_code == "00") {
                setShow({
                    mode: true,
                    state: "success",
                    message: data.response_message,
                    sum_message: "Make payment using your virtual account details provided below.",
                });
                setInstantAccountDetails({
                    virtual_acct_no: ((_a = data === null || data === void 0 ? void 0 : data.response_data) === null || _a === void 0 ? void 0 : _a.virtual_acct_no) || "",
                    virtual_acct_name: ((_b = data === null || data === void 0 ? void 0 : data.response_data) === null || _b === void 0 ? void 0 : _b.virtual_acct_name) || "",
                    expiry_datetime: ((_c = data === null || data === void 0 ? void 0 : data.response_data) === null || _c === void 0 ? void 0 : _c.expiry_datetime) || "",
                    transaction_amount: ((_d = data === null || data === void 0 ? void 0 : data.response_data) === null || _d === void 0 ? void 0 : _d.transaction_amount) || "",
                    bank_name: ((_e = data === null || data === void 0 ? void 0 : data.response_data) === null || _e === void 0 ? void 0 : _e.bank_name) || "",
                });
                console.log(data.response_data);
            }
            else if (data.response_code == "05") {
                setShow({
                    mode: true,
                    state: "warning",
                    message: data.response_message,
                    sum_message: "",
                });
            }
            else {
                setShow({
                    mode: true,
                    state: "error",
                    message: data.response_message || getErrorMessages(data.message),
                    sum_message: "",
                });
            }
        },
    }), mutateGenerateAccount = _q.mutate, isPendingGenerateAccount = _q.isPending;
    var _r = useQuery({
        queryKey: ["get_transactions"],
        queryFn: function () {
            return fetchBills();
        },
    }), data = _r.data, isError = _r.isError;
    if (isError) {
        toast.error("Something went wrong fetching transactions");
        console.log("error");
    }
    var ticket = useMemo(function () {
        var _a;
        return (_a = data === null || data === void 0 ? void 0 : data.response_data) === null || _a === void 0 ? void 0 : _a.filter(function (ticket) { return ticket.transref === segment; });
    }, [data, segment]);
    useEffect(function () {
        var _a;
        if (ticket && ticket.length > 0) {
            mutate({ bill_ref: (_a = ticket[0]) === null || _a === void 0 ? void 0 : _a.transref });
        }
    }, [ticket]);
    var _s = useForm({
        defaultValues: {
            notice_number: "",
            customer_name: "",
            customer_email: "",
            customer_phone: "",
            account_type: "access",
        },
    }), register = _s.register, handleSubmit = _s.handleSubmit, errors = _s.formState.errors, setValue = _s.setValue;
    var onSubmit = function (formData) {
        console.log(formData);
        mutateGenerateAccount(formData);
    };
    useEffect(function () {
        if (billIsueeDetails && ticket && ticket.length > 0) {
            setValue("notice_number", segment);
            setValue("customer_name", billIsueeDetails === null || billIsueeDetails === void 0 ? void 0 : billIsueeDetails.taxpayer_name);
            setValue("customer_email", billIsueeDetails === null || billIsueeDetails === void 0 ? void 0 : billIsueeDetails.agent_email);
            setValue("customer_phone", billIsueeDetails === null || billIsueeDetails === void 0 ? void 0 : billIsueeDetails.taxpayer_phone);
        }
    }, [billIsueeDetails]);
    return (<div className="bill-details">
      <h1>Bill Details</h1>
      {(data === null || data === void 0 ? void 0 : data.response_data) ? (<div className="bill-details_comp">
          <div>
            <p className="font-bold">Bill Status</p>
            <p>{((_a = ticket[0]) === null || _a === void 0 ? void 0 : _a.status) || "-"}</p>
          </div>
          <div>
            <p className="font-bold">Occurrence</p>
            <p>{((_b = ticket[0]) === null || _b === void 0 ? void 0 : _b.occurrence) || "-"}</p>
          </div>

          <div>
            <p className="font-bold">Amount</p>
            <p>₦{formatAmount((_c = ticket[0]) === null || _c === void 0 ? void 0 : _c.amount) || "-"}</p>
          </div>

          <div>
            <p className="font-bold">Taxpayer Name</p>
            <p>{(billIsueeDetails === null || billIsueeDetails === void 0 ? void 0 : billIsueeDetails.taxpayer_name) || "-"}</p>
          </div>

          <div>
            <p className="font-bold">Taxpayer Phone</p>
            <p>{(billIsueeDetails === null || billIsueeDetails === void 0 ? void 0 : billIsueeDetails.taxpayer_phone) || "-"}</p>
          </div>
          <div>
            <p className="font-bold">ABSSIN</p>
            <p>{((_d = ticket[0]) === null || _d === void 0 ? void 0 : _d.taxpayer) || "-"}</p>
          </div>

          <div>
            <p className="font-bold">MDA</p>
            <p>{((_e = ticket[0]) === null || _e === void 0 ? void 0 : _e.mda) || "-"}</p>
          </div>
          <div>
            <p className="font-bold">Revenue Item</p>
            <p>{((_f = ticket[0]) === null || _f === void 0 ? void 0 : _f.rev_item) || "-"}</p>
          </div>
          <div>
            <p className="font-bold">Bill Reference</p>
            <p>{((_g = ticket[0]) === null || _g === void 0 ? void 0 : _g.transref) || "-"}</p>
          </div>
          <div>
            <p className="font-bold">Date Created</p>
            <p>{((_h = ticket[0]) === null || _h === void 0 ? void 0 : _h.transdate) || "-"}</p>
          </div>
        </div>) : (<Loading />)}

      <button className="bill-details_btn" onClick={function () { return setViewItems(!viewItems); }}>
        <PiReceiptDuotone className="icon"/>{" "}
        <span>{!viewItems ? "View Bill Items" : "Hide Bill Items"}</span>
      </button>

      {viewItems &&
            ((_j = billIsueeDetails === null || billIsueeDetails === void 0 ? void 0 : billIsueeDetails.items) === null || _j === void 0 ? void 0 : _j.map(function (item, index) { return (<div className="bill-details_comp" key={index}>
            <div>
              <p className="font-bold">Revenue Item</p>
              <p>{(item === null || item === void 0 ? void 0 : item.revenue_item) || "-"}</p>
            </div>
            <div>
              <p className="font-bold">Amount</p>
              <p>₦{formatAmount(item === null || item === void 0 ? void 0 : item.amount) || "-"}</p>
            </div>
            <div>
              <p className="font-bold">Payment Ref</p>
              <p>{(item === null || item === void 0 ? void 0 : item.payment_ref) || "-"}</p>
            </div>
          </div>); }))}

      <form onSubmit={handleSubmit(onSubmit)} className="">
        <SelectInput label="Choose Wallet" name="account_type" id="account_type" register={register} validation={{ required: true }} options={bankOptions} placeholder="Select Wallet Type" error={!!errors.account_type}/>
        <div className="bill-details_form_btn">
          <FormButton text={"Generate Instant Account"} disabled={isPendingGenerateAccount} loading={isPendingGenerateAccount}/>
        </div>
      </form>
      <div className="w-full grid gap-2 -mt-3">
        <div className="w-full grid " onClick={function () { var _a; return mutateSendBill({ bill_ref: (_a = ticket[0]) === null || _a === void 0 ? void 0 : _a.transref }); }}>
              <PrimaryButton text={"Send Bill"}/>
        </div>
      <BackButton link={"/bills"}/>
      </div>
      {show.mode == true && show.state == "success" && (
        // {show && (
        <InstantAccountModal onClick={function () { var _a; return mutateConfirmPayment((_a = ticket[0]) === null || _a === void 0 ? void 0 : _a.transref); }} mode="success" link="/bills" success_text="Proceed to confirm payment" virtual_acct_no={instantAccountDetails === null || instantAccountDetails === void 0 ? void 0 : instantAccountDetails.virtual_acct_no} virtual_acct_name={instantAccountDetails === null || instantAccountDetails === void 0 ? void 0 : instantAccountDetails.virtual_acct_name} transaction_amount={instantAccountDetails === null || instantAccountDetails === void 0 ? void 0 : instantAccountDetails.transaction_amount} bank_name={instantAccountDetails === null || instantAccountDetails === void 0 ? void 0 : instantAccountDetails.bank_name} expiry_datetime={instantAccountDetails === null || instantAccountDetails === void 0 ? void 0 : instantAccountDetails.expiry_datetime} loading={isPendingConfirmPayment}/>)}
      {show.mode == true && show.state == "warning" && (<InformationModal mode="warning" maintext={show.message} subtext="Cannot proceed this bill instant account creation" link={"/bills"}/>)}
      {show.mode == true && show.state == "error" && (<InformationModal mode="error" maintext={show.message} subtext="Cannot proceed this bill instant account creation" link={"/bills"}/>)}
    </div>);
};
export default Dynamic;
