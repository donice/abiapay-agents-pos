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
import { fetchLGAData, fetchStates } from "@/src/services/common";
var Address = function (_a) {
    var setStage = _a.setStage, setFormData = _a.setFormData, formData = _a.formData;
    var _b = useState([]), state = _b[0], setState = _b[1];
    var _c = useState([]), lga = _c[0], setLga = _c[1];
    var getStates = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchStates()];
                case 1:
                    data = (_a.sent()).data;
                    setState(data === null || data === void 0 ? void 0 : data.map(function (item) {
                        return {
                            label: item.state,
                            value: item.idstates,
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
    var getLgas = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchLGAData()];
                case 1:
                    data = (_a.sent()).data;
                    setLga(data === null || data === void 0 ? void 0 : data.map(function (item) {
                        return {
                            label: item.lgaName,
                            value: item.lgaID,
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
    useEffect(function () {
        getStates();
        getLgas();
    }, []);
    var _d = useForm({
        defaultValues: {
            state: formData.state || "",
            lga: formData.lga || "",
            city: formData.city || "",
            ward: formData.ward || "",
            street: formData.street || "",
            house_no: formData.house_no || "",
        },
    }), register = _d.register, handleSubmit = _d.handleSubmit, errors = _d.formState.errors;
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setFormData(__assign(__assign({}, formData), data));
            setStage(3);
            return [2 /*return*/];
        });
    }); };
    return (<div>
      <form className="identity-form" onSubmit={handleSubmit(onSubmit)}>
        <SelectInput label="State of Origin" name="state" id="state" register={register} error={!!errors.state} validation={{ required: true }} options={state}/>

        <SelectInput label="Business LGA" name="lga" id="lga" register={register} error={!!errors.lga} validation={{ required: true }} options={lga}/>
        <FormTextInput label="City" name="city" placeholder="Enter City" register={register} error={errors.city} validation={{ required: true }}/>
        <FormTextInput label="Ward" name="ward" placeholder="Enter Ward" register={register} error={errors.ward} validation={{ required: true }}/>
        <FormTextInput label="Street" name="street" placeholder="Enter Street" register={register} error={errors.street} validation={{ required: true }}/>
        <FormTextInput type="number" label="House Number" name="house_no" placeholder="Enter House Number" register={register} error={errors.house_no} validation={{ required: true }}/>

        <div className="button-container">
          <button className="button secondary" onClick={function () { return setStage(1); }}>
            Go Back
          </button>
          <Button text={"Proceed"}/>
        </div>
      </form>
    </div>);
};
export default Address;
