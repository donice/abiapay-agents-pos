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
import { usePathname } from "next/navigation";
import { getLastPathSegment } from "@/src/utils/getLastPathSegment";
import React, { useMemo, useState, useEffect } from "react";
import "./style.scss";
import { formatAmount } from "@/src/utils/formatAmount";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Loading } from "@/src/components/common/loader/redirecting";
import { fetchOffenceHistory } from "@/src/services/trafficOffences";
import { isBrowser } from "@/src/utils/isBrowser";
import { useForm } from "react-hook-form";
import { BackButton } from "@/src/components/common/button";
var Dynamic = function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    var path = usePathname();
    var segment = getLastPathSegment(path);
    var _l = useState(null), userData = _l[0], setUserData = _l[1];
    useEffect(function () {
        if (isBrowser) {
            var data_1 = window.sessionStorage.getItem("USER_DATA");
            if (data_1 !== null) {
                try {
                    var parsedData = JSON.parse(data_1);
                    setUserData(parsedData);
                }
                catch (e) {
                    console.error("Error parsing JSON data:", e);
                    setUserData(null);
                }
            }
        }
    }, [isBrowser]);
    // Fetching offence history using React Query
    var _m = useQuery({
        queryKey: ["get_offences", userData === null || userData === void 0 ? void 0 : userData.email],
        queryFn: function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!(userData === null || userData === void 0 ? void 0 : userData.email))
                    throw new Error("No email provided");
                return [2 /*return*/, fetchOffenceHistory({ email: userData.email })];
            });
        }); },
        enabled: !!(userData === null || userData === void 0 ? void 0 : userData.email), // Ensures query runs only when userData.email exists
    }), data = _m.data, isError = _m.isError, isLoading = _m.isLoading;
    if (isError) {
        toast.error("Something went wrong fetching transactions");
        console.log("Error fetching offences");
    }
    // Filtering ticket based on URL segment
    var ticket = useMemo(function () {
        return ((data === null || data === void 0 ? void 0 : data.data) || []).filter(function (ticket) { return ticket.payment_reference === segment; });
    }, [data, segment]);
    var _o = useForm({
        defaultValues: {
            notice_number: "",
            customer_name: "",
            customer_email: "",
            customer_phone: "",
            account_type: "access",
        },
    }), register = _o.register, handleSubmit = _o.handleSubmit, errors = _o.formState.errors, setValue = _o.setValue;
    return (<div className="receipts-details">
      <h1>Ticket Offence Details</h1>
      {isLoading ? (<Loading />) : ticket.length > 0 ? (<div className="receipts-details_comp">
          <div>
            <p className="font-bold"> Status</p>
            <p>{((_a = ticket[0]) === null || _a === void 0 ? void 0 : _a.status) || "-"}</p>
          </div>
          {/* <div>
              <p className="font-bold">Occurrence</p>
              <p>{ticket[0]?.occurrence || "-"}</p>
            </div> */}
          <div>
            <p className="font-bold">Amount</p>
            <p>₦{formatAmount((_b = ticket[0]) === null || _b === void 0 ? void 0 : _b.amount) || "-"}</p>
          </div>
          <div>
            <p className="font-bold">Plate Number</p>
            <p>{((_c = ticket[0]) === null || _c === void 0 ? void 0 : _c.plate_number) || "-"}</p>
          </div>
          <div>
            <p className="font-bold">Vehicle Type</p>
            <p>{((_d = ticket[0]) === null || _d === void 0 ? void 0 : _d.vehicle_type) || "-"}</p>
          </div>
          <div>
            <p className="font-bold">Offence Type</p>
            <p>{((_e = ticket[0]) === null || _e === void 0 ? void 0 : _e.offence_type) || "-"}</p>
          </div>
          <div>
            <p className="font-bold">TaxPayer Name</p>
            <p>{((_f = ticket[0]) === null || _f === void 0 ? void 0 : _f.taxpayer_phone) || "-"}</p>
          </div>
          <div>
            <p className="font-bold">TaxPayer Name</p>
            <p>{((_g = ticket[0]) === null || _g === void 0 ? void 0 : _g.taxpayer_phone) || "-"}</p>
          </div>
          <div>
            <p className="font-bold">Payment Reference </p>
            <p>{((_h = ticket[0]) === null || _h === void 0 ? void 0 : _h.payment_reference) || "-"}</p>
          </div>
          <div>
            <p className="font-bold">Agent Email</p>
            <p>{((_j = ticket[0]) === null || _j === void 0 ? void 0 : _j.created_by) || "-"}</p>
          </div>
          <div>
            <p className="font-bold">Date Created</p>
            <p>{((_k = ticket[0]) === null || _k === void 0 ? void 0 : _k.created_at) || "-"}</p>
          </div>
        </div>) : (<p>No records found</p>)}
      <BackButton link={"/traffic-offence/traffic-ticket-history"}/>
    </div>);
};
export default Dynamic;
