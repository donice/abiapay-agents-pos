"use client";
import { usePathname } from "next/navigation";
import { getLastPathSegment } from "@/src/utils/getLastPathSegment";
import React from "react";
import { BackButton, Button } from "@/src/components/common/button";
import "./style.scss";
import { formatAmount } from "@/src/utils/formatAmount";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchTransactions, retryPayment, resendSMS, } from "@/src/services/ticketsServices";
import { Loading } from "@/src/components/common/loader/redirecting";
import { TbSend } from "react-icons/tb";
var Dynamic = function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var path = usePathname();
    var segment = getLastPathSegment(path);
    var _o = useQuery({
        queryKey: ["get_transactions"],
        queryFn: function () {
            return fetchTransactions();
        },
    }), data = _o.data, isError = _o.isError;
    if (isError) {
        toast.error("Something went wrong fetching transactions");
        console.log("error");
    }
    var ticket = (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.filter(function (ticket) { return ticket.idagent_transactions == segment; });
    var _p = useMutation({
        mutationFn: function (data) {
            return retryPayment({
                payment_ref: data.payment_ref,
            });
        },
        onSuccess: function (data) {
            if ((data === null || data === void 0 ? void 0 : data.response_code) == "00") {
                toast.success(data === null || data === void 0 ? void 0 : data.response_message);
            }
            else {
                toast.error(data === null || data === void 0 ? void 0 : data.response_message);
            }
        },
    }), mutate = _p.mutate, isPending = _p.isPending;
    var _q = useMutation({
        mutationFn: function (data) { return resendSMS(data); },
        onSuccess: function (data) {
            if ((data === null || data === void 0 ? void 0 : data.response_code) == "00") {
                toast.success(data === null || data === void 0 ? void 0 : data.response_message);
            }
            else {
                toast.error(data === null || data === void 0 ? void 0 : data.response_message);
            }
        },
    }), mutateResendSM = _q.mutate, isPendingResendSM = _q.isPending;
    var retryPaymentFn = function () {
        var _a;
        var paymentRef = (_a = ticket[0]) === null || _a === void 0 ? void 0 : _a.payment_ref;
        if (paymentRef) {
            mutate({ payment_ref: paymentRef });
        }
        else {
            console.error("Payment reference is missing.");
        }
    };
    var resendSMSFn = function () {
        var _a;
        var paymentRef = (_a = ticket[0]) === null || _a === void 0 ? void 0 : _a.payment_ref;
        if (paymentRef) {
            mutateResendSM({ payment_ref: paymentRef });
        }
        else {
            console.error("Payment reference is missing.");
        }
    };
    return (<div className="ticket-details">
      <h1>Ticket Transaction Details</h1>
      {(data === null || data === void 0 ? void 0 : data.data) ? (<>
          {((_b = ticket[0]) === null || _b === void 0 ? void 0 : _b.status) == "Processing" && (<Button text={"Reprocess Ticket"} loading={isPending} onClick={retryPaymentFn}/>)}
          <div className="ticket-details_comp">
            <div>
              <p>Transaction Status</p>
              <p>{((_c = ticket[0]) === null || _c === void 0 ? void 0 : _c.status) || "-"}</p>
            </div>
            <div>
              <p>Plate Number</p>
              <p>{((_d = ticket[0]) === null || _d === void 0 ? void 0 : _d.plate_number) || "-"}</p>
            </div>

            <div>
              <p>Amount</p>
              <p>₦ {formatAmount((_e = ticket[0]) === null || _e === void 0 ? void 0 : _e.amount) || "-"}</p>
            </div>

            <div>
              <p>Taxpayer Name</p>
              <p>{((_f = ticket[0]) === null || _f === void 0 ? void 0 : _f.taxpayer_name) || "-"}</p>
            </div>

            <div>
              <p>Ticket Type</p>
              <p>{((_g = ticket[0]) === null || _g === void 0 ? void 0 : _g.revenue_item) || "-"}</p>
            </div>

            <div>
              <p>Phone Number</p>
              <p>{((_h = ticket[0]) === null || _h === void 0 ? void 0 : _h.taxpayer_phone) || "-"}</p>
            </div>

            <div>
              <p>Payment Period</p>
              <p>{((_j = ticket[0]) === null || _j === void 0 ? void 0 : _j.payment_period) || "-"}</p>
            </div>
            <div>
              <p>Agent Name</p>
              <p>{((_k = ticket[0]) === null || _k === void 0 ? void 0 : _k.agent_user) || "-"}</p>
            </div>
            <div>
              <p>Created Time</p>
              <p>{((_l = ticket[0]) === null || _l === void 0 ? void 0 : _l.createtime) || "-"}</p>
            </div>
            <div>
              <p>Payment Reference</p>
              <p>{((_m = ticket[0]) === null || _m === void 0 ? void 0 : _m.payment_ref) || "-"}</p>
            </div>
          </div>{" "}
        </>) : (<Loading />)}

      <div className="ticket-details_form_btn">
        <Button text={"Resend SMS"} onClick={function () { return resendSMSFn(); }} loading={isPendingResendSM} children={<TbSend style={{ marginRight: "0.25rem" }} className="icon"/>}/>
        <BackButton link={"/tickets/transport"}/>
      </div>
    </div>);
};
export default Dynamic;
