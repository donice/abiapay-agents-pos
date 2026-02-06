"use client";
import { usePathname } from "next/navigation";
import { getLastPathSegment } from "@/src/utils/getLastPathSegment";
import React, { useEffect, useState } from "react";
import { SelectInput } from "@/src/components/common/input";
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
import { SuccessModal } from "@/src/components/common/modal";
import { isBrowser } from "@/src/utils/isBrowser";
import { bankOptions } from "@/src/lib/app";
var Dynamic = function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    var path = usePathname();
    var _t = useState(false), show = _t[0], setShow = _t[1];
    var segment = getLastPathSegment(path);
    var fetched_data = isBrowser ? sessionStorage.getItem("TICKETS_DATA") : null;
    var data = fetched_data && JSON.parse(fetched_data);
    var _u = useState(), userData = _u[0], setUserData = _u[1];
    // Check if running in Android bridge app
    var _v = useState(false), isAndroidBridge = _v[0], setIsAndroidBridge = _v[1];
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
            // Check if HydrogenBridge is available
            setIsAndroidBridge(typeof window.HydrogenBridge !== 'undefined');
        }
    }, []);
    var ticket = data === null || data === void 0 ? void 0 : data.filter(function (ticket) { return ticket.idagent_transactions == segment; });
    var _w = useForm({
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
    }), register = _w.register, handleSubmit = _w.handleSubmit, setValue = _w.setValue, watch = _w.watch, errors = _w.formState.errors;
    useEffect(function () {
        setValue("agentEmail", (userData === null || userData === void 0 ? void 0 : userData.email) || "");
    }, [userData]);
    // Handle payment result from Hydrogen Bridge
    useEffect(function () {
        if (isBrowser) {
            window.handleHydrogenPaymentResult = function (result) {
                console.log('Hydrogen Payment Result:', result);
                if (result.status === 'SUCCESS') {
                    toast.success('Payment Successful!');
                    // Parse the payment data
                    var paymentData = void 0;
                    try {
                        paymentData = typeof result.data === 'string'
                            ? JSON.parse(result.data)
                            : result.data;
                    }
                    catch (e) {
                        paymentData = result.data;
                    }
                    console.log('Payment Data:', paymentData);
                    // Get the pending ticket data
                    var pendingTicket = sessionStorage.getItem("PENDING_TICKET");
                    if (pendingTicket) {
                        var ticketData = JSON.parse(pendingTicket);
                        // Store payment response
                        sessionStorage.setItem("HYDROGEN_PAYMENT", JSON.stringify(paymentData));
                        sessionStorage.setItem("TRANSPORT_INVOICE", JSON.stringify(ticketData));
                        // Clear pending ticket
                        sessionStorage.removeItem("PENDING_TICKET");
                        // Show success modal
                        setShow(true);
                    }
                }
                else if (result.status === 'CANCELLED') {
                    toast.error('Payment Cancelled by user');
                    sessionStorage.removeItem("PENDING_TICKET");
                }
                else if (result.status === 'FAILED') {
                    toast.error('Payment Failed: ' + result.data);
                    sessionStorage.removeItem("PENDING_TICKET");
                }
                else if (result.status === 'ERROR') {
                    toast.error('Error: ' + result.message);
                    sessionStorage.removeItem("PENDING_TICKET");
                }
            };
        }
        // Cleanup
        return function () {
            if (isBrowser) {
                delete window.handleHydrogenPaymentResult;
            }
        };
    }, []);
    var _x = useMutation({
        mutationFn: function (data) {
            sessionStorage.setItem("TRANSPORT_INVOICE", JSON.stringify(data));
            return createNewTicket(data);
        },
        mutationKey: ["fetch_transactions"],
        onSuccess: function (data) {
            data.message && toast.error(getErrorMessages(data.message));
            data.response_code == "00"
                ? toast.success(data.response_message)
                : toast.error(data.response_message);
            setShow(true);
        },
        onError: function (error) {
            console.log(error);
        },
    }), mutate = _x.mutate, isPending = _x.isPending;
    var onSubmit = function (data) {
        var _a;
        try {
            var selectedWallet = data.wallet_type;
            // Check if using Hydrogen payment (Android bridge app)
            if (isAndroidBridge && selectedWallet !== 'fidelity') {
                // Convert amount to kobo (smallest currency unit)
                // If your amount is already in kobo, skip this multiplication
                var amountInKobo = Math.round(((_a = Number(data === null || data === void 0 ? void 0 : data.amount)) !== null && _a !== void 0 ? _a : 0) * 100);
                // Store ticket data for later (after payment succeeds)
                sessionStorage.setItem("PENDING_TICKET", JSON.stringify(data));
                // Trigger appropriate Hydrogen payment method
                if (window.HydrogenBridge) {
                    toast.loading('Launching payment...');
                    switch (selectedWallet) {
                        case 'card':
                        case 'pos':
                            window.HydrogenBridge.initiateCardPayment(amountInKobo);
                            break;
                        case 'breezepay':
                            window.HydrogenBridge.initiateBreezePay(amountInKobo);
                            break;
                        case 'transfer':
                        case 'instantpay':
                            window.HydrogenBridge.initiateTransfer(amountInKobo);
                            break;
                        default:
                            // Default to card payment
                            window.HydrogenBridge.initiateCardPayment(amountInKobo);
                    }
                }
                else {
                    toast.error('Hydrogen Bridge not available');
                }
            }
            else {
                mutate(data);
            }
        }
        catch (error) {
            console.log(error);
            toast.error('Payment initiation failed');
        }
    };
    return (<div className="ticket-details">
      <h1>Ticket Details</h1>

      {/* Show indicator when running in Android app */}
      {isAndroidBridge && (<div style={{
                padding: '12px',
                background: '#e8f5e9',
                borderRadius: '8px',
                marginBottom: '20px',
                border: '1px solid #4caf50'
            }}>
          <p style={{
                margin: 0,
                color: '#2e7d32',
                fontSize: '14px',
                fontWeight: '500'
            }}>
            ✓ Mobile App Mode - Hardware payments available
          </p>
        </div>)}

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
        <SelectInput label={"Choose Wallet"} name={"wallet_type"} id={"wallet_type"} register={register} validation={{ required: true }} options={bankOptions} placeholder="Select Wallet Type" error={!!errors.wallet_type}/>
        <div className="ticket-details_form_btn">
          <Button text={"Re-Vend Ticket"} loading={isPending}/>
          <BackButton link={"/find/using-phone-number"}/>
        </div>
      </form>
      {show && (<SuccessModal text="View Receipt" maintext="Revend Ticket Successful" link="/tickets/transport/add/summary" id={"Valid for: ".concat((_r = ticket[0]) === null || _r === void 0 ? void 0 : _r.payment_period, ", Payment for: ").concat((_s = ticket[0]) === null || _s === void 0 ? void 0 : _s.revenue_item, " ")} buttonText="Done"/>)}
    </div>);
};
export default Dynamic;
