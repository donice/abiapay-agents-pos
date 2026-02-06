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
import { fetchCategory, fetchSector, fetchTaxOffice, } from "@/src/services/common";
import { submitDate, transformDate } from "@/src/utils/formatDate";
import { useSearchParams } from "@/src/utils/navigation";
var UserData = function (_a) {
    var setStage = _a.setStage, setFormData = _a.setFormData, formData = _a.formData;
    var querySearch = useSearchParams();
    var source = querySearch.get("source");
    // NO_ID_DATA
    var _b = useState([]), taxOffice = _b[0], setTaxOffice = _b[1];
    var _c = useState([]), sector = _c[0], setSector = _c[1];
    var _d = useState([]), category = _d[0], setCategory = _d[1];
    var getState = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchTaxOffice()];
                case 1:
                    data = (_a.sent()).data;
                    setTaxOffice(data === null || data === void 0 ? void 0 : data.map(function (item) {
                        return {
                            label: item.name,
                            value: item.name,
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
    var getCategory = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchCategory()];
                case 1:
                    data = (_a.sent()).data;
                    // console.log("CATEGORY", data);
                    setCategory(data === null || data === void 0 ? void 0 : data.map(function (item) {
                        return {
                            label: item.category_name,
                            value: item.category_name,
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
    var getSector = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, error_3;
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
                    error_3 = _a.sent();
                    console.log(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var _e = useForm({
        defaultValues: {
            birth_date: formData.birth_date || "",
            nin: formData.nin || "",
            bvn: formData.bvn || "",
            phone_number: formData.phone_number || "",
            mobile_number: formData.mobile_number || "",
            tax_office: formData.tax_office || "",
            category: formData.category || "",
            sector: formData.sector || "",
            email: formData.email || "",
        },
    }), register = _e.register, handleSubmit = _e.handleSubmit, setValue = _e.setValue, watch = _e.watch, errors = _e.formState.errors;
    console.log(formData.birth_date);
    useEffect(function () {
        //! Please dont touch this
        setValue("birth_date", transformDate(formData.birth_date));
        getState();
        getCategory();
        getSector();
    }, []);
    console.log(watch("birth_date"));
    var onSubmit = function (data) {
        console.log("DATA", data);
        setFormData(function (prev) {
            return __assign(__assign(__assign({}, prev), data), { birth_date: submitDate(watch("birth_date")) });
        });
        setStage(2);
    };
    // console.log(formData.birth_date);
    return (<div>
      <form className="identity-form" onSubmit={handleSubmit(onSubmit)}>
        <FormTextInput label="Date of Birth" name="birth_date" type="date" placeholder="Enter Date of Birth" register={register} error={errors.birth_date} validation={{ required: true }}/>
        {source !== "No ID" && <>
          <FormTextInput type="number" label="NIN" name="nin" placeholder="Enter NIN" register={register}/>
          <FormTextInput type="number" label="BVN" name="bvn" placeholder="Enter BVN" register={register} validation={{
                minLength: {
                    value: 11,
                    message: "Length must be above 11 characters",
                },
                maxLength: {
                    value: 13,
                    message: "Length must be below 13 characters",
                },
            }}/>
        </>}
        <FormTextInput type="number" label="Phone Number" name="phone_number" placeholder="Enter Phone Number" value={formData.phone_number} register={register} error={errors.phone_number} validation={{
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
        <FormTextInput type="number" label="Mobile Number" name="mobile_number" placeholder="Enter Mobile Number" register={register} error={errors.mobile_number} validation={{
            required: true,
            minLength: {
                value: 11,
                message: "Length must be above 11 characters",
            },
            maxLength: {
                value: 11,
                message: "Length must be below 11 characters",
            },
        }}/>
        <FormTextInput label="Email" name="email" placeholder="Enter Email" value={formData.email} register={register} error={errors.email} validation={{ required: true }}/>
        <SelectInput label="Tax Office" name="tax_office" id="tax_office" register={register} error={!!errors.tax_office} validation={{ required: true }} options={taxOffice}/>
        <SelectInput label="Category" name="category" id="category" register={register} error={!!errors.category} validation={{ required: true }} options={category}/>
        <SelectInput label="Occupation Sector" name="sector" id="sector" register={register} error={!!errors.sector} validation={{ required: true }} options={sector}/>
        <div className="button-container">
          <button className="button secondary" onClick={function () { return setStage(0); }}>
            Go Back
          </button>
          <Button text={"Proceed"}/>
        </div>
      </form>
    </div>);
};
export default UserData;
