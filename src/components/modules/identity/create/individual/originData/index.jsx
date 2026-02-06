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
import { createIndividualAbssin, } from "@/src/services/identityService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AbssinSuccessModal } from "@/src/components/common/modal";
var OriginData = function (_a) {
    var setStage = _a.setStage, setFormData = _a.setFormData, formData = _a.formData;
    var _b = useState([]), state = _b[0], setState = _b[1];
    var _c = useState([]), lga = _c[0], setLga = _c[1];
    var _d = useState({
        mode: false,
        message: "",
    }), show = _d[0], setShow = _d[1];
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
                            value: item.state,
                            // value: item.idstates,
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
    var _e = useForm({
        defaultValues: {
            nationality: "Nigerian",
            state_of_origin: formData.state_of_origin || "",
            lga: formData.lga || "",
            state_of_residence: formData.state_of_residence || "",
            address: formData.address || "",
            ward: formData.ward || "",
            sector: formData.sector || "",
            city: formData.city || "",
        },
    }), register = _e.register, handleSubmit = _e.handleSubmit, errors = _e.formState.errors;
    var mutation = useMutation({
        mutationFn: function (data) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, createIndividualAbssin(data)];
        }); }); },
        onSuccess: function (data) {
            console.log(data);
            toast.success("Successfully created");
            setShow({ mode: true, message: data === null || data === void 0 ? void 0 : data.message });
        },
        onError: function (error) {
            console.log("ERROR DATA", error, Object.keys(error));
            return error;
        },
    });
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log(data);
            setFormData(function (prev) {
                return __assign(__assign({}, prev), data);
            });
            console.log(formData);
            mutation.mutate(__assign(__assign({}, formData), data));
            return [2 /*return*/];
        });
    }); };
    return (<div>
      <form className="identity-form" onSubmit={handleSubmit(onSubmit)}>
        <FormTextInput label="Nationality" name="nationality" type="text" placeholder="Enter Nationality" value={"Nigerian"} register={register} error={errors.nationality} validation={{ required: true }}/>
        <SelectInput label="State of Origin" name="state_of_origin" id="state_of_origin" register={register} error={!!errors.state_of_origin} validation={{ required: true }} options={state}/>
        <SelectInput label="L.G.A of Origin" name="lga" id="lga" placeholder="Enter L.G.A" register={register} options={lga} error={!!errors.lga} validation={{ required: true }}/>
        <div>
          <span className="go_back">Residence Information</span>
        </div>

        <SelectInput label="State of Residence" name="state_of_residence" id="state_of_residence" register={register} error={!!errors.state_of_residence} validation={{ required: true }} options={state}/>
        <FormTextInput label="L.G.A of Residence" name="city" placeholder="Enter L.G.A" register={register} error={errors.city} validation={{ required: true }}/>

        <FormTextInput label="Address" name="address" placeholder="Enter Address" register={register} error={errors.address} validation={{ required: true }}/>
        <FormTextInput label="Ward" name="ward" placeholder="Enter Ward" register={register} error={errors.ward} validation={{ required: true }}/>

        <div className="button-container">
          <button className="button secondary" onClick={function () { return setStage(1); }}>
            Go Back
          </button>
          <Button text={"Create ABSSIN"} loading={mutation.isLoading} disabled={mutation.isLoading}/>
        </div>
      </form>

      {show.mode && (<AbssinSuccessModal link={"/identity/create/individual"}/>)}
    </div>);
};
export default OriginData;
