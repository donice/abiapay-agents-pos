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
// import "./style.scss" // Moved to _app;
import { CustomHeader } from "@/src/components/common/header";
import { FormTextInput, SelectSearchInput, SelectInput, } from "@/src/components/common/input";
import { useForm } from "react-hook-form";
import { Button, CancelButton } from "@/src/components/common/button";
import { fetchABSSINInfoWIthPhone, fetchLocationState, fetchLocationStateLGA, fetchSchool, } from "@/src/services/common";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isBrowser } from "@/src/utils/isBrowser";
import { createInfantABSSIN, } from "@/src/services/identityService";
import FaceCam from "./faceCam";
import CustomDialog from "@/src/components/common/modal/CustomDialog";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { useDebounce } from "@/src/hooks/useDebounce";
import toast from "react-hot-toast";
var CreateInfantAbssinModule = function () {
    var _a = useState(), userData = _a[0], setUserData = _a[1];
    useEffect(function () {
        if (isBrowser) {
            var data = window.sessionStorage.getItem("USER_DATA");
            if (data) {
                try {
                    setUserData(JSON.parse(data));
                }
                catch (e) {
                    console.error("Error parsing JSON data:", e);
                    setUserData({});
                }
            }
        }
    }, []);
    var _b = useForm({
        defaultValues: {
            agent_email: (userData === null || userData === void 0 ? void 0 : userData.email) || "",
            state_of_origin: "",
        },
    }), handleSubmit = _b.handleSubmit, register = _b.register, reset = _b.reset, watch = _b.watch, setValue = _b.setValue, control = _b.control, errors = _b.formState.errors;
    var _c = useState(null), capturedImage = _c[0], setCapturedImage = _c[1];
    var handleCapture = function (base64Image) {
        setCapturedImage(base64Image);
    };
    var lgaData = useQuery({
        queryKey: ["lgaData", watch("state_of_origin")],
        queryFn: function () {
            return fetchLocationStateLGA({ stateId: watch("state_of_origin") });
        },
    }).data;
    var schools = useQuery({
        queryKey: ["getSchools"],
        queryFn: fetchSchool,
    }).data;
    var stateData = useQuery({
        queryKey: ["fetchStates"],
        queryFn: function () { return fetchLocationState(); },
    }).data;
    useEffect(function () {
        if (userData) {
            setValue("agent_email", userData.email || "");
        }
    }, [userData, setValue]);
    var phone = watch("guardian_phone_number");
    var debouncedPhoneNumber = useDebounce(phone, 500);
    useEffect(function () {
        if (debouncedPhoneNumber) {
            var getAbssinDetails = function (phone) { return __awaiter(void 0, void 0, void 0, function () {
                var response, error_1;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, fetchABSSINInfoWIthPhone({ phone: phone })];
                        case 1:
                            response = _b.sent();
                            console.log("response", response);
                            if (response.response_data.length !== 0) {
                                toast.success((_a = response.message) !== null && _a !== void 0 ? _a : "ABSSIN information fetched");
                                setValue("guardian_abssin", response.response_data.state_id);
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _b.sent();
                            toast.error("Error fetching ABSSIN information");
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
            getAbssinDetails(debouncedPhoneNumber);
        }
    }, [debouncedPhoneNumber, setValue]);
    var _d = useMutation({
        mutationFn: function (data) { return createInfantABSSIN(data); },
        onError: function (error) { },
        onSuccess: function (data) {
            var _a;
            (_a = document.getElementById("createInfantABSSINDialog")) === null || _a === void 0 ? void 0 : _a.showModal();
        },
    }), mutate = _d.mutate, isLoading = _d.isLoading;
    var onSubmit = function (data) {
        console.log("data", data);
        mutate(__assign(__assign({}, data), { image: capturedImage || "" }));
    };
    var watchSchoolName = watch("school_name");
    useEffect(function () {
        if (watchSchoolName) {
            console.log("watchSchoolName", watchSchoolName);
            var school = schools === null || schools === void 0 ? void 0 : schools.response_data.find(function (item) { return item.id == watchSchoolName; });
            if (school) {
                setValue("school_address", school.adress + ", " + school.lga);
                console.log("school", school);
            }
        }
    }, [watchSchoolName]);
    return (<section>
      <CustomHeader title="Create Dependent ABSSIN" desc={"Ensure to fill all important fields with (*)"}/>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="app-container">
          <FaceCam onCapture={handleCapture}/>
          {capturedImage && (<div className="captured-image mt-4">
              <h2 className="text-lg font-semibold mb-2">Image:</h2>
              <img src={capturedImage} alt="Captured" className="border rounded-lg" style={{ maxWidth: "100%" }}/>
            </div>)}
        </div>
        <FormTextInput label="First Name" placeholder="First Name" name={"first_name"} register={register} validation={{ required: true }} error={errors.first_name}/>
        <FormTextInput label="Middle Name" placeholder="Middle Name" name={"middle_name"} register={register} error={errors.middle_name}/>
        <FormTextInput label="Surname" placeholder="Surname" name={"surname"} register={register} validation={{ required: true }} error={errors.surname}/>
        <FormTextInput type="date" label="Birth Date" placeholder="Birth Date" name={"birth_date"} register={register} validation={{ required: true }} error={errors.birth_date}/>
        <SelectInput label="Gender" placeholder="Gender" name={"gender"} register={register} validation={{ required: true }} error={!!errors.gender} id={"gender"} options={[
            {
                label: "Male",
                value: "male",
            },
            {
                label: "Female",
                value: "female",
            },
        ]}/>
        <SelectInput label="State of Origin" placeholder="State of Origin" name={"state_of_origin"} register={register} validation={{ required: true }} error={!!errors.state_of_origin} id={"state_of_origin"} options={stateData
            ? stateData === null || stateData === void 0 ? void 0 : stateData.data.map(function (state_of_origin) { return ({
                label: state_of_origin.state,
                value: state_of_origin.idstates,
            }); })
            : []}/>

        <SelectInput label="LGA" placeholder="LGA" name={"lga"} register={register} validation={{ required: true }} disabled={!watch("state_of_origin")} error={!!errors.lga} id={"lga"} options={lgaData
            ? lgaData === null || lgaData === void 0 ? void 0 : lgaData.data.map(function (lga) { return ({
                label: lga.name,
                value: lga.idlga,
            }); })
            : []}/>

        <FormTextInput type="text" label="Student School ID" placeholder="Student School ID" name={"student_school_id"} register={register} validation={{ required: true }} error={errors.student_school_id}/>

        <FormTextInput label="Guardian Phone Number" placeholder="Guardian Phone Number" name={"guardian_phone_number"} register={register} validation={{
            required: true,
            pattern: {
                value: /^\d{11}$/,
                message: "Phone number must be 11 digits",
            },
        }} error={errors.guardian_phone_number}/>

        <FormTextInput label="Guardian ABSSIN" placeholder="Guardian ABSSIN" name={"guardian_abssin"} register={register} validation={{
            // required: true,
            pattern: {
                value: /^\d{9,11}$/,
                message: "ABSSIN must be between 9 and 11 digits",
            },
        }} error={errors.guardian_abssin}/>

        <SelectSearchInput name={"school_name"} label={"School Name"} options={schools
            ? schools === null || schools === void 0 ? void 0 : schools.response_data.map(function (item) { return ({
                value: item.id,
                label: item.school_name,
            }); })
            : []} control={control}/>

        <FormTextInput label="School Address" placeholder="School Address" name={"school_address"} register={register} error={errors.school_address}/>

        <Button text="Submit" loading={isLoading} disabled={isLoading}/>
      </form>
      <CustomDialog id="createInfantABSSINDialog" onClose={function () {
            var _a;
            return (_a = document.getElementById("createInfantABSSINDialog")) === null || _a === void 0 ? void 0 : _a.close();
        }}>
        <div className="flex gap-1 items-center justify-center flex-col text-center">
          <TbRosetteDiscountCheckFilled className="text-green-600 text-7xl"/>
          <h1 className="text-lg font-semibold">Created Successfully</h1>
          <p className="text-xs md:text-sm text-gray-400 max-w-[14rem]">
            You have successfully created a Dependent ABSSIN
          </p>
          <div className="w-full grid grid-cols-2 gap-2 mt-4">
            <CancelButton link={"/identity"}/>
            <Button text="Create New" onClick={function () {
            var _a;
            (_a = document.getElementById("createInfantABSSINDialog")) === null || _a === void 0 ? void 0 : _a.close();
            reset();
        }}/>
          </div>
        </div>
      </CustomDialog>
    </section>);
};
export default CreateInfantAbssinModule;
