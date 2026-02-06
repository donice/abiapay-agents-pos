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
import { fetchOffenceHistory } from "@/src/services/trafficOffences";
import toast from "react-hot-toast";
import { GoVerified } from "react-icons/go";
import { TbLoader } from "react-icons/tb";
import Empty from "@/src/components/common/empty";
// import "./style.scss" // Moved to _app;
import { formatAmount } from "@/src/utils/formatAmount";
import { CustomHeader } from "@/src/components/common/header";
import { GoBackButton } from "@/src/components/common/button";
import { isBrowser } from "@/src/utils/isBrowser";
import { useRouter } from "next/router";
var History = function () {
    var router = useRouter();
    var _a = useState(null), userData = _a[0], setUserData = _a[1];
    var _b = useState([]), products = _b[0], setProducts = _b[1];
    useEffect(function () {
        if (isBrowser) {
            var data = window.sessionStorage.getItem("USER_DATA");
            if (data !== null) {
                try {
                    var parsedData = JSON.parse(data);
                    setUserData(parsedData);
                }
                catch (e) {
                    console.error("Error parsing JSON data:", e);
                    setUserData(null);
                }
            }
        }
    }, [isBrowser]);
    var getProductsData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log(userData, "user data");
                    if (!(userData === null || userData === void 0 ? void 0 : userData.email)) {
                        console.error("Email is required to fetch offence history");
                        return [2 /*return*/];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetchOffenceHistory({ email: userData.email })];
                case 2:
                    response = _b.sent();
                    setProducts(response === null || response === void 0 ? void 0 : response.data);
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    toast.error("Error fetching products");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        if (userData === null || userData === void 0 ? void 0 : userData.email) {
            getProductsData();
        }
    }, [userData]);
    return (<>
      <GoBackButton />
      <header className="bills_comp_header">
        <CustomHeader title="Traffic Ticket History" desc="View Traffic Ticket History"/>
      </header>
      <section className="main-table">
        {products.length > 0 ? (<div className="main-table_form_tickets_container">
            <div className="tickets">
              {products.map(function (transaction, index) { return (<div key={index} className="ticket" onClick={function () {
                    return router.push("/traffic-offence/traffic-ticket-history/".concat(transaction.payment_reference));
                }}>
                  <div>
                    <p> {transaction.plate_number}</p>
                    <p>{transaction.offence_type}</p>
                    <p>{transaction.payment_reference}</p>
                  </div>
                  <div>
                    <p>{transaction.vehicle_type}</p>
                    <p>₦{formatAmount(transaction.amount)}</p>
                    <p className={"".concat(transaction.status === "Completed" ? "completed" : "pending")}>
                      {transaction.status === "Completed" ? <GoVerified /> : <TbLoader />}
                      {transaction.status}
                    </p>
                    <p className="next_date">
                      <span>{transaction.occurrence}</span>
                    </p>
                  </div>
                </div>); })}
            </div>
          </div>) : (<Empty text="No tickets found"/>)}
      </section>
    </>);
};
export default History;
