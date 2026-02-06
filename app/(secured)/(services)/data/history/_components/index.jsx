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
import { CustomHeader } from "@/src/components/common/header";
import axiosInstance from "@/src/lib/axiosInstance";
import { formatDate } from "@/src/utils/formatDate";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { RiFileListLine } from "react-icons/ri";
var DataHistoryModule = function () {
    var _a;
    var data = useQuery({
        queryKey: ["airtimeHistory"],
        queryFn: function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, axiosInstance.post("/topup/purchase-history?limit=10&page=1&type=data")];
                    case 1:
                        res = _b.sent();
                        return [2 /*return*/, (_a = res.data) === null || _a === void 0 ? void 0 : _a.response_data];
                }
            });
        }); },
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    }).data;
    console.log(data);
    return (<div>
      <CustomHeader title={"Data History"} desc={"View all history for data"}/>
      <div className="mt-4">
        {(_a = data === null || data === void 0 ? void 0 : data.record) === null || _a === void 0 ? void 0 : _a.map(function (item) { return (<div key={item.id} className="border-b py-3 flex justify-between items-center">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100/70 flex items-center justify-center">
             <RiFileListLine className="text-green-500"/></div>
              <div>
                <p className="capitalize text-gray-500">{item === null || item === void 0 ? void 0 : item.network}</p>
                <p className="text-sm text-gray-400">
                  {formatDate(item === null || item === void 0 ? void 0 : item.created_at)}
                </p>
              </div>
            </div>

            <div>
              <p className="font-semibold text-lg text-gray-400">-₦{item === null || item === void 0 ? void 0 : item.amount_purchased} </p>
            </div>
          </div>); })}
      </div>
    </div>);
};
export default DataHistoryModule;
