"use client";
import { usePathname } from "next/navigation";
import { getLastPathSegment } from "@/src/utils/getLastPathSegment";
import React, { useMemo } from "react";
import "./style.scss";
import { formatAmount } from "@/src/utils/formatAmount";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Loading } from "@/src/components/common/loader/redirecting";
import { useForm } from "react-hook-form";
import { fetchReceipts } from "@/src/services/receiptsServices";
var Dynamic = function () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var path = usePathname();
    var segment = getLastPathSegment(path);
    var _j = useQuery({
        queryKey: ["get_receipts"],
        queryFn: function () {
            return fetchReceipts();
        },
    }), data = _j.data, isError = _j.isError, isLoading = _j.isLoading;
    if (isError) {
        toast.error("Something went wrong fetching transactions");
        console.log("error");
    }
    var ticket = useMemo(function () {
        return data === null || data === void 0 ? void 0 : data.filter(function (ticket) { return ticket.transref === segment; });
    }, [data, segment]);
    var _k = useForm({
        defaultValues: {
            notice_number: "",
            customer_name: "",
            customer_email: "",
            customer_phone: "",
            account_type: "access",
        },
    }), register = _k.register, handleSubmit = _k.handleSubmit, errors = _k.formState.errors, setValue = _k.setValue;
    return (<div className="receipts-details">
      <h1>Receipt Details</h1>
      {data ? (<div className="receipts-details_comp">
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

    </div>);
};
export default Dynamic;
