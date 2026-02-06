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
import React, { useState, useMemo } from "react";
import { useDebounce } from "@/src/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@/src/components/common/loader/redirecting";
import "./style.scss";
import Empty from "@/src/components/common/empty";
import { formatAmount } from "@/src/utils/formatAmount";
import { useRouter } from "next/navigation";
import { TbSearch } from "react-icons/tb";
import axiosInstance from "@/src/lib/axiosInstance";
var ImpoundmentTable = function () {
    var router = useRouter();
    var _a = useState(""), searchTerm = _a[0], setSearchTerm = _a[1];
    var debouncedSearchTerm = useDebounce(searchTerm, 500);
    var _b = useQuery({
        queryKey: ["get_impoundments"],
        queryFn: function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axiosInstance.get("/impoundment/impoundment-offenses")];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res === null || res === void 0 ? void 0 : res.data];
                }
            });
        }); },
    }), data = _b.data, isError = _b.isError, isLoading = _b.isLoading;
    var fetched_data = (data === null || data === void 0 ? void 0 : data.response_data) || [];
    console.log(fetched_data);
    var filteredTransactions = useMemo(function () {
        if (!debouncedSearchTerm)
            return fetched_data;
        var filtered = fetched_data.filter(function (transaction) {
            var _a;
            return (_a = transaction === null || transaction === void 0 ? void 0 : transaction.offense_category) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
        });
        if (filtered.length === 0) {
            return <Empty text="No tickets found"/>;
        }
        return filtered;
    }, [debouncedSearchTerm, fetched_data]);
    if (isLoading) {
        return (<div className={"loading"}>
        <Loading />
      </div>);
    }
    if (isError) {
        console.log(data);
    }
    if (!data || data.length === 0) {
        return (<div className={"empty"}>
        <Empty />
      </div>);
    }
    return (<section className="main-table">
      <div className="filter-input">
        <label htmlFor="search">
          <TbSearch />
        </label>
        <input type="text" placeholder="Search by Offense Category" value={searchTerm} onChange={function (e) { return setSearchTerm(e.target.value); }} className="search input outline-none"/>
      </div>

      {filteredTransactions.length > 0 ? (<div className="main-table_form_tickets_container">
          <div className="tickets">
            {filteredTransactions.map(function (transaction) { return (<div key={transaction.idagent_transactions} className="border border-teal-500 bg-teal-50/50 rounded-md p-4 my-2 grid grid-cols-2" onClick={function () {
                    return router.push("/tickets/transport/".concat(transaction.idagent_transactions));
                }}>
                <div>
                  <p className="block">
                    <span className="text-[10px] text-gray-500 uppercase ">
                      Offence Category
                    </span>
                    <span className="block font-bold">
                      {transaction.offense_category}
                    </span>{" "}
                  </p>
                </div>
                <div className="flex  flex-col items-end">
                  <p className="text-green-600 font-bold">
                    ₦{formatAmount(transaction.penalty_amount)}
                  </p>
                  <p>{transaction.vehicle_type}</p>
                </div>
              </div>); })}
          </div>
        </div>) : (<Empty text="No tickets found"/>)}
    </section>);
};
export default ImpoundmentTable;
