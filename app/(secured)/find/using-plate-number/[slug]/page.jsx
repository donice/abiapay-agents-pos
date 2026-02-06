"use client";
import { usePathname } from "next/navigation";
import { getLastPathSegment } from "@/src/utils/getLastPathSegment";
import React, { useEffect, useState } from "react";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { BackButton, Button } from "@/src/components/common/button";
import "./style.scss";
import { formatAmount } from "@/src/utils/formatAmount";
import { useForm } from "react-hook-form";
import { getCurrentDateTime } from "@/src/utils/getCurrentDateTime";
import { randomInvoiceGenerator } from "@/src/utils/randomInvoiceGenerator";
import { useMutation } from "@tanstack/react-query";
import { createNewTicket } from "@/src/services/ticketsServices";
import toast from "react-hot-toast";
import { getErrorMessages } from "@/src/utils/helper";
import { InformationModal, SuccessModal } from "@/src/components/common/modal";
import { isBrowser } from "@/src/utils/isBrowser";
import { bankOptions } from "@/src/lib/app";
var Dynamic = function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    var _v = useState(null), userData = _v[0], setUserData = _v[1];
    useEffect(function () {
        if (isBrowser) {
            var data_1 = window.sessionStorage.getItem("USER_DATA");
            if (data_1) {
                try {
                    setUserData(JSON.parse(data_1));
                }
                catch (e) {
                    console.error("Error parsing JSON data:", e);
                    setUserData({});
                }
            }
        }
    }, []);
    var path = usePathname();
    var _w = useState({
        mode: false,
        state: "",
        message: "",
    }), show = _w[0], setShow = _w[1];
    var segment = getLastPathSegment(path);
    var fetched_data = sessionStorage.getItem("TICKETS_DATA");
    var data = fetched_data && JSON.parse(fetched_data);
    var ticket = data === null || data === void 0 ? void 0 : data.filter(function (ticket) { return ticket.idagent_transactions == segment; });
    // console.log(ticket);
    var _x = useForm({
        defaultValues: {
            merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
            transaction_date: getCurrentDateTime(),
            invoice_id: "INV".concat(randomInvoiceGenerator()),
            paymentPeriod: ((_a = ticket[0]) === null || _a === void 0 ? void 0 : _a.payment_period) || "",
            productCode: ((_b = ticket[0]) === null || _b === void 0 ? void 0 : _b.revenue_item) || "",
            next_expiration_date: ((_c = ticket[0]) === null || _c === void 0 ? void 0 : _c.next_date) || "",
            no_of_days: ((_d = ticket[0]) === null || _d === void 0 ? void 0 : _d.no_of_days) || "",
            amount: ((_e = ticket[0]) === null || _e === void 0 ? void 0 : _e.amount) || 0,
            lga: ((_f = ticket[0]) === null || _f === void 0 ? void 0 : _f.lga) || "",
            agentEmail: (userData === null || userData === void 0 ? void 0 : userData.email) || "",
            plateNumber: ((_g = ticket[0]) === null || _g === void 0 ? void 0 : _g.plate_number) || "",
            taxPayerPhone: ((_h = ticket[0]) === null || _h === void 0 ? void 0 : _h.taxpayer_phone) || "",
            taxPayerName: ((_j = ticket[0]) === null || _j === void 0 ? void 0 : _j.taxpayer_name) || "",
            wallet_type: "fidelity",
        },
    }), register = _x.register, handleSubmit = _x.handleSubmit, setValue = _x.setValue, errors = _x.formState.errors;
    setValue("agentEmail", (userData === null || userData === void 0 ? void 0 : userData.email) || "");
    var _y = useMutation({
        mutationFn: function (data) {
            sessionStorage.setItem("TRANSPORT_INVOICE", JSON.stringify(data));
            return createNewTicket(data);
        },
        mutationKey: ["fetch_transactions"],
        onSuccess: function (data) {
            // data.message && toast.error(getErrorMessages(data.message));
            if (data.response_code == "00") {
                toast.success(data.response_message);
                setShow({
                    mode: true,
                    state: "success",
                    message: data.response_message,
                });
            }
            else if (data.response_code == "12") {
                toast.custom(data.response_message || getErrorMessages(data.message));
                setShow({
                    mode: true,
                    state: "warning",
                    message: data.response_message,
                });
            }
            else {
                toast.error(data.response_message || getErrorMessages(data.message));
                setShow({
                    mode: true,
                    state: "error",
                    message: data.response_message || getErrorMessages(data.message),
                });
            }
        },
        onError: function (error) {
            console.log(error);
        },
    }), mutate = _y.mutate, isPending = _y.isPending;
    var onSubmit = function (data) {
        try {
            // console.log(data);
            mutate(data);
        }
        catch (error) {
            console.log(error);
        }
    };
    return (<div className="ticket-details">
      <h1>Ticket Details</h1>
      <div className="ticket-details_comp">
        <div>
          <p>Plate Number</p>
          <p>{(_k = ticket[0]) === null || _k === void 0 ? void 0 : _k.plate_number}</p>
        </div>

        <div>
          <p>Amount</p>
          <p>₦ {formatAmount((_l = ticket[0]) === null || _l === void 0 ? void 0 : _l.amount)}</p>
        </div>

        <div>
          <p>Taxpayer Name</p>
          <p>{(_m = ticket[0]) === null || _m === void 0 ? void 0 : _m.taxpayer_name}</p>
        </div>

        <div>
          <p>Ticket Type</p>
          <p>{(_o = ticket[0]) === null || _o === void 0 ? void 0 : _o.revenue_item}</p>
        </div>

        <div>
          <p>Phone Number</p>
          <p>{(_p = ticket[0]) === null || _p === void 0 ? void 0 : _p.taxpayer_phone}</p>
        </div>

        <div>
          <p>Payment Period</p>
          <p>{(_q = ticket[0]) === null || _q === void 0 ? void 0 : _q.payment_period}</p>
        </div>
      </div>

      <form className="ticket-details_form" onSubmit={handleSubmit(onSubmit)}>
        {((_r = ticket[0]) === null || _r === void 0 ? void 0 : _r.no_of_days) == "" || ((_s = ticket[0]) === null || _s === void 0 ? void 0 : _s.no_of_days) == null && (<FormTextInput label={"No of Days"} placeholder="Enter No of Days" name={"no_of_days"} register={register} validation={{ required: true }} error={errors.no_of_days}/>)}
        <SelectInput label={"Choose Wallet"} name={"wallet_type"} id={"wallet_type"} register={register} validation={{ required: true }} options={bankOptions} placeholder="Select Wallet Type" error={!!errors.wallet_type}/>
        <div className="ticket-details_form_btn">
          <Button text={"Re-Vend Ticket"} loading={isPending}/>
          <BackButton link={"/find/using-plate-number"}/>
        </div>
      </form>
      {show.mode == true && show.state == "success" && (<SuccessModal text="View Receipt" link="/tickets/transport/add/summary" id={"Valid for: ".concat((_t = ticket[0]) === null || _t === void 0 ? void 0 : _t.payment_period, ", Payment for: ").concat((_u = ticket[0]) === null || _u === void 0 ? void 0 : _u.revenue_item, " ")} buttonText="Done"/>)}
      {show.mode == true && show.state == "warning" && (<InformationModal mode="warning" maintext={show.message} subtext="Cannot proceed the revending of this ticket" link="/find/using-plate-number"/>)}
      {show.mode == true && show.state == "error" && (<InformationModal mode="error" maintext={show.message} subtext="Cannot proceed the revending of this ticket" close={function () { return setShow({ mode: false, state: "", message: "" }); }}/>)}
    </div>);
};
export default Dynamic;
