"use client";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import ProgressBar from "./progressBar";
// import "./style.scss" // Moved to _app;
import PersonalData from "./personalData";
import { getBVNInfo, getNINInfo, } from "@/src/services/identityService";
import UserData from "./userData";
import OriginData from "./originData";
import { useSearchParams } from "@/src/utils/navigation";
import { useMutation } from "@tanstack/react-query";
import { isBrowser } from "@/src/utils/isBrowser";
var CreateIndividualAbssinComponent = function () {
    var noIdDetails = isBrowser && window.sessionStorage.getItem("NO_ID_DATA")
        ? window.sessionStorage.getItem("NO_ID_DATA")
        : null;
    var details = noIdDetails && JSON.parse(noIdDetails);
    var querySearch = useSearchParams();
    var source = querySearch.get("source");
    var _id = querySearch.get("_id");
    console.log("NO_ID_DATA", details);
    var _a = useState(0), stage = _a[0], setStage = _a[1];
    var _b = useState({
        indv_title: "",
        first_name: "",
        middle_name: "",
        surname: "",
        birth_date: "",
        email: details && details.email || "",
        gender: "",
        nin: "",
        nationality: "",
        state_of_origin: "",
        state_of_residence: "",
        marital_status: "",
        bvn: "",
        city: "",
        ward: "",
        address: "",
        lga: "",
        phone_number: details && details.value || "",
        sector: "",
        category: "",
        tax_office: "",
        mobile_number: "",
        image: "",
    }), formData = _b[0], setFormData = _b[1];
    var mutate = useMutation({
        mutationFn: source === "bvn"
            ? function (data) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getBVNInfo(data)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); }
            : source === "nin"
                ? function (data) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, getNINInfo(data)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); }
                : function (data) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, console.log(data)];
                    });
                }); },
        onSuccess: function (data) {
            if (source === "bvn") {
                setFormData(function (prev) {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
                    return __assign(__assign({}, prev), { indv_title: (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.title, first_name: (_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.firstname, middle_name: (_c = data === null || data === void 0 ? void 0 : data.data) === null || _c === void 0 ? void 0 : _c.middlename, surname: (_d = data === null || data === void 0 ? void 0 : data.data) === null || _d === void 0 ? void 0 : _d.lastname, birth_date: (_e = data === null || data === void 0 ? void 0 : data.data) === null || _e === void 0 ? void 0 : _e.birthdate, email: (_f = data === null || data === void 0 ? void 0 : data.data) === null || _f === void 0 ? void 0 : _f.email, gender: (_g = data === null || data === void 0 ? void 0 : data.data) === null || _g === void 0 ? void 0 : _g.gender, nin: (_h = data === null || data === void 0 ? void 0 : data.data) === null || _h === void 0 ? void 0 : _h.nin, nationality: (_j = data === null || data === void 0 ? void 0 : data.data) === null || _j === void 0 ? void 0 : _j.nationality, state_of_origin: (_k = data === null || data === void 0 ? void 0 : data.data) === null || _k === void 0 ? void 0 : _k.state_of_origin, state_of_residence: (_l = data === null || data === void 0 ? void 0 : data.data) === null || _l === void 0 ? void 0 : _l.state_of_residence, marital_status: (_m = data === null || data === void 0 ? void 0 : data.data) === null || _m === void 0 ? void 0 : _m.marital_status, bvn: (_o = data === null || data === void 0 ? void 0 : data.data) === null || _o === void 0 ? void 0 : _o.bvn, address: (_p = data === null || data === void 0 ? void 0 : data.data) === null || _p === void 0 ? void 0 : _p.residential_address, lga: (_q = data === null || data === void 0 ? void 0 : data.data) === null || _q === void 0 ? void 0 : _q.lga_of_origin, phone_number: (_r = data === null || data === void 0 ? void 0 : data.data) === null || _r === void 0 ? void 0 : _r.phone, mobile_number: (_s = data === null || data === void 0 ? void 0 : data.data) === null || _s === void 0 ? void 0 : _s.phone2, image: (_t = data === null || data === void 0 ? void 0 : data.data) === null || _t === void 0 ? void 0 : _t.photo });
                });
            }
        },
        onError: function (error) {
            console.log(error);
        },
    }).mutate;
    useEffect(function () {
        mutate({ id: _id });
    }, []);
    return (<section>
      <ProgressBar stage={stage} setStage={setStage}/>

      {stage === 0 && (<PersonalData formData={formData} setFormData={setFormData} setStage={setStage}/>)}
      {stage === 1 && (<UserData formData={formData} x setFormData={setFormData} setStage={setStage}/>)}
      {stage === 2 && (<OriginData formData={formData} setFormData={setFormData} setStage={setStage}/>)}
    </section>);
};
export default CreateIndividualAbssinComponent;
