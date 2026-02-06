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
// import "../style.scss" // Moved to _app;
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { Button } from "@/src/components/common/button";
import { useForm } from "react-hook-form";
import { fetchBusinessType, fetchCategory, fetchSector } from "@/src/services/common";
var Business = function (_a) {
    var setStage = _a.setStage, setFormData = _a.setFormData, formData = _a.formData;
    var _b = useState([]), sector = _b[0], setSector = _b[1];
    var _c = useState([]), businessType = _c[0], setBusinessType = _c[1];
    var _d = useState([]), category = _d[0], setCategory = _d[1];
    var getOrganisation = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchCategory()];
                case 1:
                    data = (_a.sent()).data;
                    setCategory(data === null || data === void 0 ? void 0 : data.map(function (item) {
                        return {
                            label: item.category_name,
                            value: item.id,
                        };
                    }));
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var getSector = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchSector()];
                case 1:
                    data = (_a.sent()).data;
                    // console.log("SECTOR", data);
                    setSector(data === null || data === void 0 ? void 0 : data.map(function (item) {
                        return {
                            label: item.sector_name,
                            value: item.sector_name,
                        };
                    }));
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var getBusinessType = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchBusinessType()];
                case 1:
                    data = (_a.sent()).data;
                    // console.log("SECTOR", data);
                    setBusinessType(data === null || data === void 0 ? void 0 : data.map(function (item) {
                        return {
                            label: item.business_type,
                            value: item.business_type,
                        };
                    }));
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.log(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        getOrganisation();
        getSector();
        getBusinessType();
    }, []);
    var _e = useForm({
        defaultValues: {
            type_of_organisation: formData.type_of_organisation || "",
            sector: formData.sector || "",
            line_of_business: formData.line_of_business || "",
            companytin: formData.companytin || "",
            rcno: formData.rcno || "",
            mobile_no: formData.mobile_no || "",
            enterprise_reg_no: formData.enterprise_reg_no || "",
            date_of_incorporation: formData.date_of_incorporation || "",
            date_of_commencement: formData.date_of_commencement || "",
        },
    }), register = _e.register, handleSubmit = _e.handleSubmit, errors = _e.formState.errors;
    var onSubmit = function (data) {
        setFormData(function (prev) {
            return __assign(__assign({}, prev), data);
        });
        setStage(3);
    };
    return (<div>
      <form className="identity-form" onSubmit={handleSubmit(onSubmit)}>
        <SelectInput label="Organization Type" name="type_of_organisation" id="type_of_organisation" register={register} error={!!errors.type_of_organisation} validation={{ required: true }} options={category}/>

        <SelectInput label="Occupation Sector" name="sector" id="sector" register={register} error={!!errors.sector} validation={{ required: true }} options={sector}/>
        <SelectInput label="Occupation Sector" name="line_of_business" id="line_of_business" register={register} error={!!errors.line_of_business} validation={{ required: true }} options={businessType}/>
        <FormTextInput label="Company TIN (Tax Identification Number)" name="companytin" placeholder="Enter Company Tax Identification Number" register={register} error={errors.companytin} validation={{ required: true }}/>
        <FormTextInput label="RC Number" name="rcno" placeholder="Enter RC Number" register={register} error={errors.rcno} validation={{ required: true }}/>
        <FormTextInput type="number" label="Business Phone Number" name="mobile_no" placeholder="Enter Business Phone Number" register={register} error={errors.mobile_no} validation={{
            required: true,
            minLength: {
                value: 11,
                message: "Length must be above 11 characters",
            },
            maxLength: {
                value: 11,
                message: "Length must be below 13 characters",
            },
        }}/>
        <FormTextInput label="Enterprise Registration Number" name="enterprise_reg_no" placeholder="Enter Enterprise Registration Number" register={register} error={errors.enterprise_reg_no} validation={{ required: true }}/>
        <FormTextInput type="date" label="Date of Incorporation" name="date_of_incorporation" placeholder="Enter Date of Incorporation" register={register} error={errors.date_of_incorporation} validation={{ required: true }}/>
        <FormTextInput type="date" label="Date of Commencement" name="date_of_commencement" placeholder="Enter Date of Commencement" register={register} error={errors.date_of_commencement} validation={{ required: true }}/>
        

        <div className="button-container">
          <button className="button secondary" onClick={function () { return setStage(0); }}>
            Go Back
          </button>
          <Button text={"Proceed"}/>
        </div>
      </form>
    </div>);
};
export default Business;
