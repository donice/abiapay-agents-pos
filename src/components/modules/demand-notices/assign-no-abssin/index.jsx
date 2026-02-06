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
import { Button, GoBackButton } from '@/src/components/common/button';
import Empty from '@/src/components/common/empty';
import { CustomHeader } from '@/src/components/common/header';
import { FormTextInput, SelectInput } from '@/src/components/common/input';
import { fetchLGAData } from '@/src/services/common';
import { assignnoAbssinDemandNotice, fetchDemandNotice } from '@/src/services/demandNotice';
import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
// import "./style.scss" // Moved to _app;
var AssignNoAbssin = function () {
    var _a = React.useState(null), errorMessage = _a[0], setErrorMessage = _a[1];
    var _b = React.useState(null), noticeDetails = _b[0], setNoticeDetails = _b[1];
    var _c = useForm({
        defaultValues: {
            notice_number: "",
            abssin: "",
            taxpayer: "",
            phone: "",
            city: "",
            lga: "",
            merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
        },
    }), register = _c.register, handleSubmit = _c.handleSubmit, reset = _c.reset, errors = _c.formState.errors;
    var lgaData = useQuery({
        queryKey: ["lgaData"],
        queryFn: function () { return fetchLGAData(); },
    }).data;
    // Mutation for searching Demand Notice
    var searchMutation = useMutation({
        mutationFn: function (data) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, fetchDemandNotice(data)];
        }); }); },
        onSuccess: function (data) {
            var _a, _b;
            var res = data === null || data === void 0 ? void 0 : data.data;
            if (res && Object.keys(res).length > 0) {
                setNoticeDetails(res.response_data.notice);
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
    // Mutation for assigning Demand Notice (with extra taxpayer info)
    var assignMutation = useMutation({
        mutationFn: function (data) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, assignnoAbssinDemandNotice(data)];
        }); }); },
        onSuccess: function (data) {
            var _a;
            toast.success(((_a = data.data) === null || _a === void 0 ? void 0 : _a.response_message) || "Notice assigned successfully!");
            reset();
            setNoticeDetails(null);
        },
        onError: function (error) {
            toast.error((error === null || error === void 0 ? void 0 : error.error) || "An error occurred. Please try again.");
        },
    });
    // Step 1: handle search
    var handleSearch = function (formData) {
        searchMutation.mutate({
            notice_number: formData.notice_number,
            merchant_key: formData.merchant_key,
        });
    };
    // Step 2: handle final assign
    var handleAssign = function (formData) {
        assignMutation.mutate(formData);
    };
    return (<section className="verify-tickets">
      <div className="verify-tickets-comp">
        <GoBackButton />
        <header className="verify-tickets-comp_header mb-5">
          <CustomHeader title="Assign Notice (No ABSSIN)" desc=""/>
        </header>

        {/* Step 1: Search Demand Notice */}
        {!noticeDetails && (<form onSubmit={handleSubmit(handleSearch)} className="verify-tickets-comp_form flex flex-col gap-4">
            <FormTextInput label="Notice Number" type="text" name="notice_number" register={register} validation={{ required: true }}/>
            <Button text="Search Demand Notice" loading={searchMutation.isLoading}/>
          </form>)}

        {/* Step 2: Show details + taxpayer inputs */}
        {noticeDetails && (<form onSubmit={handleSubmit(handleAssign)} className="verify-tickets-comp_form flex flex-col gap-4">
            {/* Demand Notice details */}
            <div className="main-table">
              {noticeDetails ? (<div className="main-table_form_tickets_container">
                  <div className="tickets">
                    <div className="ticket">
                      <div>
                        <p>{noticeDetails.notice_number}</p>
                        <p>{noticeDetails.payment_status}</p>
                        <p>{noticeDetails.total_amount}</p>
                      </div>
                    </div>
                  </div>
                </div>) : (<Empty text="No Notice Number Found"/>)}
            </div>

           
            {/* Extra fields for taxpayer */}
            <FormTextInput label="Company Name" type="text" name="company_name" placeholder="Enter Company name" register={register} validation={{ required: true }}/>
            <FormTextInput label="Company Phone Number" type="text" name="company_phone_number" placeholder="Enter Company Phone Number" register={register} validation={{ required: false }}/>
            <FormTextInput label="Company Address Street" type="text" name="company_address_street" placeholder="Enter Company Street Address" register={register} validation={{ required: true }}/>
             <FormTextInput label="Comapy House Number" type="text" name="company_house_no" placeholder="Enter Company House Number" register={register} validation={{ required: true }}/>
            <SelectInput label="LGA" placeholder="LGA" name={"lga"} register={register} validation={{ required: true }} error={!!errors.lga_zone} id={"lga"} options={lgaData
                ? lgaData === null || lgaData === void 0 ? void 0 : lgaData.data.map(function (lga) { return ({
                    label: lga.lgaName,
                    value: lga.lgaID,
                }); })
                : []}/>

            <Button text="Assign Notice with Taxpayer Details" loading={assignMutation.isLoading}/>
          </form>)}
      </div>
    </section>);
};
export default AssignNoAbssin;
