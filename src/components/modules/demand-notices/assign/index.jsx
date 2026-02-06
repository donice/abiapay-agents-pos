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
import { Button, GoBackButton } from "@/src/components/common/button";
import { CustomHeader } from "@/src/components/common/header";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { fetchCategory, fetchLGAData } from "@/src/services/common";
import { assignDemandNotice, assignnoAbssinDemandNotice, fetchDemandNotice, searchCompany, } from "@/src/services/demandNotice";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
// import "./style.scss" // Moved to _app;
import { InformationModal } from "@/src/components/common/modal";
import { useRouter } from "next/router";
var AssignNotice = function () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var router = useRouter();
    var _j = React.useState(null), errorMessage = _j[0], setErrorMessage = _j[1];
    var _k = React.useState(null), noticeDetails = _k[0], setNoticeDetails = _k[1];
    var _l = React.useState(false), showModal = _l[0], setShowModal = _l[1];
    var _m = React.useState(null), modalProps = _m[0], setModalProps = _m[1];
    var _o = React.useState(""), noticeNumber = _o[0], setNoticeNumber = _o[1];
    var _p = React.useState(""), taxpayerId = _p[0], setTaxpayerId = _p[1];
    var _q = React.useState(""), mode = _q[0], setMode = _q[1];
    var _r = React.useState([]), companySuggestions = _r[0], setCompanySuggestions = _r[1];
    var _s = React.useState(false), searchLoading = _s[0], setSearchLoading = _s[1];
    var _t = React.useState(""), searchTerm = _t[0], setSearchTerm = _t[1];
    var _u = useForm({
        defaultValues: {
            notice_number: "",
            abssin: "",
            company_name: "",
            company_phone_number: "",
            company_address_street: "",
            company_house_no: "",
            lga: "",
            merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
        },
    }), register = _u.register, handleSubmit = _u.handleSubmit, reset = _u.reset, setValue = _u.setValue, errors = _u.formState.errors;
    var lgaData = useQuery({
        queryKey: ["lgaData"],
        queryFn: function () { return fetchLGAData(); },
    }).data;
    var lgaCategory = useQuery({
        queryKey: ["lgaCategory"],
        queryFn: function () { return fetchCategory(); },
    }).data;
    // Search Company Handler
    var handleCompanySearch = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var value, res, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    value = e.target.value;
                    setSearchTerm(value);
                    if (value.length < 2) {
                        setCompanySuggestions([]);
                        return [2 /*return*/];
                    }
                    setSearchLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, searchCompany({ search_term: value })];
                case 2:
                    res = _a.sent();
                    console.log("Company search result:", res);
                    if (res === null || res === void 0 ? void 0 : res.response_data) {
                        setCompanySuggestions(res.response_data);
                    }
                    else {
                        setCompanySuggestions([]);
                    }
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    console.error("Error searching company:", err_1);
                    setCompanySuggestions([]);
                    return [3 /*break*/, 5];
                case 4:
                    setSearchLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    // Demand Notice Search Mutation
    var searchMutation = useMutation({
        mutationFn: function (data) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, fetchDemandNotice(data)];
        }); }); },
        onSuccess: function (data) {
            var _a, _b;
            var res = data === null || data === void 0 ? void 0 : data.data;
            if (res && Object.keys(res).length > 0) {
                var notice = res.response_data.notice;
                setNoticeNumber(notice.notice_number);
                var normalizedNotice = Array.isArray(notice) ? notice[0] : notice;
                setNoticeDetails(normalizedNotice);
                setErrorMessage(null);
                toast.success(res.response_message || "Demand notice found!");
            }
            else {
                setNoticeDetails(null);
                setErrorMessage(((_a = data.data) === null || _a === void 0 ? void 0 : _a.response_message) || "No record found");
                toast.error(((_b = data.data) === null || _b === void 0 ? void 0 : _b.response_message) || "No record found");
            }
        },
        onError: function (error) {
            setNoticeDetails(null);
            setErrorMessage((error === null || error === void 0 ? void 0 : error.error) || "An error occurred while searching.");
            toast.error((error === null || error === void 0 ? void 0 : error.error) || "An error occurred while searching.");
        },
    });
    // Assign with ABSSIN
    var assignWithAbssinMutation = useMutation({
        mutationFn: function (data) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, assignDemandNotice(data)];
        }); }); },
        onSuccess: function (data) { return handleAssignResponse(data); },
        onError: function (error) {
            toast.error((error === null || error === void 0 ? void 0 : error.error) || "An error occurred. Please try again.");
        },
    });
    // Assign without ABSSIN
    var assignWithoutAbssinMutation = useMutation({
        mutationFn: function (data) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, assignnoAbssinDemandNotice(data)];
        }); }); },
        onSuccess: function (data) { return handleAssignResponse(data); },
        onError: function (error) {
            toast.error((error === null || error === void 0 ? void 0 : error.error) || "An error occurred. Please try again.");
        },
    });
    var handleAssignResponse = function (data) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var responseCode = (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.response_code;
        console.log("Assign Response Data:", (_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.response_message);
        var responseMessage = ((_c = data === null || data === void 0 ? void 0 : data.data) === null || _c === void 0 ? void 0 : _c.response_message) || "";
        var assignedNoticeNumber = ((_e = (_d = data === null || data === void 0 ? void 0 : data.data) === null || _d === void 0 ? void 0 : _d.response_data) === null || _e === void 0 ? void 0 : _e.notice_number) || "";
        if (responseCode !== "00") {
            setModalProps({
                mode: "warning",
                maintext: responseMessage,
                subtext: "Please check and try again.",
                link: "/demand-notices",
            });
            setShowModal(true);
            return;
        }
        toast.success(responseMessage);
        reset();
        setNoticeDetails(null);
        setNoticeNumber(assignedNoticeNumber);
        setTaxpayerId(((_g = (_f = data === null || data === void 0 ? void 0 : data.data) === null || _f === void 0 ? void 0 : _f.response_data) === null || _g === void 0 ? void 0 : _g.taxpayer_id) || "");
        setModalProps({
            mode: "success",
            maintext: responseMessage,
            subtext: "Taxpayer Name: ".concat((_h = data === null || data === void 0 ? void 0 : data.data) === null || _h === void 0 ? void 0 : _h.response_data.taxpayer_name),
            success_text: "Assign Another",
            link: "/demand-notices",
        });
        setShowModal(true);
    };
    var handleSearch = function (formData) {
        searchMutation.mutate({
            notice_number: formData.notice_number,
            merchant_key: formData.merchant_key,
        });
    };
    var handleAssign = function (formData) {
        var geoString = typeof window !== "undefined"
            ? sessionStorage.getItem("USER_GEOLOCATION")
            : "";
        var payload = __assign(__assign({}, formData), { geolocation: geoString || "" });
        if (mode === "abssin") {
            assignWithAbssinMutation.mutate(payload);
        }
        else {
            assignWithoutAbssinMutation.mutate(payload);
        }
    };
    return (<section className="verify-tickets">
      <div className="verify-tickets-comp">
        <GoBackButton />
        <header className="verify-tickets-comp_header mb-5">
          <CustomHeader title="Assign Demand Notice" desc=""/>
        </header>

        {/* Mode Selector */}
        <div className="verify-tickets-comp_form flex flex-col gap-4">
          <SelectInput label="Select Option" placeholder="Choose..." name="mode" id="mode" value={mode} onChange={function (e) { return setMode(e.target.value); }} options={[
            { label: "Assign with ABSSIN", value: "abssin" },
            { label: "Assign without ABSSIN", value: "no_abssin" },
        ]}/>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit(handleSearch)} className="verify-tickets-comp_form flex flex-col gap-4 mt-4">
          <FormTextInput label="Notice Number" type="text" name="notice_number" register={register} validation={{ required: true }}/>
          <Button text="Search Demand Notice" loading={searchMutation.isLoading}/>
        </form>

        {/* Notice Details */}
        {noticeDetails && (<>
            <div className="main-table">
              <div className="main-table_form_tickets_container">
                <div className="tickets">
                  <div className="ticket">
                    <div>
                      <p>{noticeDetails.notice_number}</p>
                      <p style={{
                color: ((_a = noticeDetails.status) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "pending"
                    ? "green"
                    : "red",
                fontWeight: "bold",
            }}>
                        {((_b = noticeDetails.status) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === "pending"
                ? "Pending..."
                : noticeDetails.status}
                      </p>
                      <p>
                        ₦
                        {parseFloat(noticeDetails.total_amount).toLocaleString()}
                      </p>
                      <p>
                        {((_d = (_c = lgaData === null || lgaData === void 0 ? void 0 : lgaData.data) === null || _c === void 0 ? void 0 : _c.find(function (lga) { return lga.lgaID === noticeDetails.lga; })) === null || _d === void 0 ? void 0 : _d.lgaName) ||
                noticeDetails.lga ||
                "N/A"}
                      </p>
                      <p>
                        <strong>Business Category: </strong>
                        {((_f = (_e = lgaCategory === null || lgaCategory === void 0 ? void 0 : lgaCategory.data) === null || _e === void 0 ? void 0 : _e.find(function (cat) { return cat.id === noticeDetails.cdn_category; })) === null || _f === void 0 ? void 0 : _f.category_name) || "N/A"}
                      </p>
                    </div>
                    <div>
                    <p>{" "}</p>
                    <p>{" "}</p>
                    <p>{""}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Conditional Inputs */}
            {((_g = noticeDetails.status) === null || _g === void 0 ? void 0 : _g.toLowerCase()) !== "served" && (<form onSubmit={handleSubmit(handleAssign)} className="verify-tickets-comp_form flex flex-col gap-4 mt-6">
                {mode === "abssin" ? (<FormTextInput label="ABSSIN" type="text" name="abssin" placeholder="Enter Corporate ABSSIN" register={register} validation={{ required: true }}/>) : (<>
                    {/* Company Name with Suggestions */}
                    <div className="relative">
                      <FormTextInput label="Company Name" type="text" name="company_name" placeholder="Enter Company Name" register={register} validation={{
                        required: true,
                        onChange: function (e) {
                            return handleCompanySearch(e);
                        },
                    }}/>
                      {searchLoading && (<p className="text-sm text-gray-400">Searching...</p>)}
                      {companySuggestions.length > 0 && (<ul className="absolute bg-white border border-gray-200 rounded-md shadow-md mt-1 w-full z-10 max-h-48 overflow-y-auto">
                          {companySuggestions.map(function (company, idx) { return (<li key={idx} className="px-3 py-2 cursor-pointer hover:bg-gray-100" onClick={function () {
                                setValue("company_name", company.company_name);
                                setValue("company_phone_number", company.phone_number);
                                setValue("company_address_street", company.street);
                                setValue("company_house_no", company.company_house_no);
                                setValue("lga", company.lga);
                                setCompanySuggestions([]);
                            }}>
                              {company.company_name}
                            </li>); })}
                        </ul>)}
                    </div>

                    <FormTextInput label="Company Phone Number" type="text" name="company_phone_number" placeholder="Enter Company Phone Number" register={register}/>
                    <FormTextInput label="Company Address Street" type="text" name="company_address_street" placeholder="Enter Company Street Address" register={register} validation={{ required: true }}/>
                    <FormTextInput label="Company House Number" type="text" name="company_house_no" placeholder="Enter Company House Number" register={register} validation={{ required: true }}/>
                    <SelectInput label="LGA" placeholder="LGA" name="lga" register={register} validation={{ required: true }} error={!!errors.lga} id="lga" options={((_h = lgaData === null || lgaData === void 0 ? void 0 : lgaData.data) === null || _h === void 0 ? void 0 : _h.map(function (lga) { return ({
                        label: lga.lgaName,
                        value: lga.lgaID,
                    }); })) || []}/>
                  </>)}

                <Button text={mode === "abssin"
                    ? "Assign Notice with ABSSIN"
                    : "Assign Notice with Taxpayer Details"} loading={mode === "abssin"
                    ? assignWithAbssinMutation.isLoading
                    : assignWithoutAbssinMutation.isLoading}/>
              </form>)}
          </>)}

        {/* Modal */}
        {showModal && modalProps && (<InformationModal {...modalProps} close={function () { return setShowModal(false); }}/>)}
      </div>
    </section>);
};
export default AssignNotice;
