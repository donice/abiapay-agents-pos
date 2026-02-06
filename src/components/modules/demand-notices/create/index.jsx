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
import { Button, GoBackButton } from "@/src/components/common/button";
import Empty from "@/src/components/common/empty";
import { CustomHeader } from "@/src/components/common/header";
import { FormTextInput } from "@/src/components/common/input";
import { createDemandNotice, fetchBusinessAbssin, } from "@/src/services/demandNotice";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
// import "./style.scss" // Moved to _app;
import { SuccessModal } from "@/src/components/common/modal";
var CreateDemandNoticeComponent = function () {
    var _a = useForm({
        defaultValues: {
            state_id: "",
        },
    }), register = _a.register, handleSubmit = _a.handleSubmit, reset = _a.reset, errors = _a.formState.errors;
    var router = useRouter();
    var _b = React.useState(null), displayDetails = _b[0], setDisplayDetails = _b[1];
    var _c = useState(false), show = _c[0], setShow = _c[1];
    var _d = useState(false), loading = _d[0], setLoading = _d[1];
    var _e = useState(""), noticeNumber = _e[0], setNoticeNumber = _e[1];
    var onSubmit = function (formData) { return __awaiter(void 0, void 0, void 0, function () {
        var requestBody, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    console.log("formData", formData);
                    requestBody = {
                        state_id: formData.stateID,
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, fetchBusinessAbssin(requestBody)];
                case 2:
                    response = _a.sent();
                    console.log("response", response.data);
                    setDisplayDetails(response.data);
                    toast.success("Business ABSSIN fetched successfully");
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    toast.error(error_1.message || "Failed to fetch Business ABSSIN");
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleGenerateDemandNotice = function () { return __awaiter(void 0, void 0, void 0, function () {
        var payload, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!displayDetails || !displayDetails.length) {
                        toast.error("No ABSSIN details available.");
                        return [2 /*return*/];
                    }
                    payload = {
                        taxpayer_id: [
                            {
                                id: displayDetails[0].state_id,
                            },
                        ],
                        cdn_category_id: displayDetails[0].cdn_category_id,
                        fiscal_year: "2025",
                        createdby: displayDetails[0].createtime,
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, createDemandNotice(payload)];
                case 2:
                    response = _a.sent();
                    console.log("response", response.data.notice_number);
                    setNoticeNumber(response.data.notice_number);
                    toast.success(response.message || "Demand notice generated successfully");
                    setShow(true);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    toast.error(error_2.message || "Failed to generate demand notice");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (<div>
      <GoBackButton />
      <section>
        <div className="">
          <header className="verify-tickets-comp_header">
            <CustomHeader title="Generate New Notice" desc=""/>
          </header>
        </div>

       
        <div className="find-comp-form ">
        <form onSubmit={handleSubmit(onSubmit)} className="verify-tickets-form mb-4">
          <FormTextInput label="ABSSIN" type="text" name="stateID" placeholder="Enter Corporate ABSSIN" register={register} validation={{
            required: true,
            minLength: {
                value: 7,
                message: "Length must be above 7 characters",
            },
        }} error={errors.state_id}/>
          <div className="mt-4"> 
          <Button text="Verify ABSSIN" loading={loading}/>
          </div>
         
        </form>

               <div className="main-table">
               {displayDetails && displayDetails.length ? (<div className="">
            <div className="main-table_form_tickets_container">
              <div className="tickets">
                {displayDetails.map(function (item, index) { return (<div key={index} className="ticket">
                    <div>
                    <p>{item.coy_name}</p>
                    <p>{item.phone_no}</p>
                      <p>{item.street}</p>
                    </div>
                    <div>
                    <p>{item.type_of_organisation}</p>
                    <p>{item.sector}</p>
                    <p>{item.tax_office}</p>
                    </div>
                  </div>); })}
              </div>
            </div>

        <div className="generate-notice-button" style={{ marginTop: "1rem" }}>
        <Button text="Generate Demand Notice" onClick={handleGenerateDemandNotice}/>
        </div>
        </div>) : displayDetails ? (<Empty text="No Plate Number Found"/>) : null}


               </div>

             
            </div>

            {show && (<SuccessModal text="Demand Notice Generated" maintext="Demand Notice Generated Successfully" 
        // link="/demand-notices/create"
        id={"Notice Number: ".concat(noticeNumber)} onClick={function () {
                setShow(false);
                router.push("/demand-notices/create");
            }}/>)}
      </section>
    </div>);
};
export default CreateDemandNoticeComponent;
