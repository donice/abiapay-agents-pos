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
import { CustomHeader } from "@/src/components/common/header";
import React, { useState } from "react";
// import "../../style.scss" // Moved to _app;
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { useForm } from "react-hook-form";
import { Button } from "@/src/components/common/button";
import { validateID, validateNoID } from "@/src/services/identityService";
import toast from "react-hot-toast";
import { OtpSuccessModal } from "@/src/components/common/modal";
import { usePathname } from "@/src/utils/navigation";
export var metadata = {
    title: "ABIAPAY Identity",
    description: "Manage all Identities tied to your ABIAPAY account",
};
var EnterDetailsComponent = function () {
    var pathname = usePathname();
    var _a = useState({
        mode: false,
        message: "",
    }), show = _a[0], setShow = _a[1];
    var _b = useState(false), isLoading = _b[0], setIsPending = _b[1];
    var _c = useState(""), selectedId = _c[0], setSelectedId = _c[1];
    var _d = useForm({
        defaultValues: {
            id: "",
            source: "",
        },
    }), registerID = _d.register, handleSubmitID = _d.handleSubmit, setValueID = _d.setValue, watchID = _d.watch, errorsID = _d.formState.errors;
    var id_type = watchID("id");
    var _e = useForm({
        defaultValues: {
            value: "",
            verify_via: "",
        },
    }), registerNoID = _e.register, handleSubmitNoID = _e.handleSubmit, errorsNoID = _e.formState.errors;
    var validateOTP = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var res, res, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("DATA", data);
                    sessionStorage.setItem("NO_ID_DATA", JSON.stringify(data));
                    setIsPending(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    if (!(selectedId === "No ID")) return [3 /*break*/, 3];
                    return [4 /*yield*/, validateNoID({ value: data.value, verify_via: data.verify_via })];
                case 2:
                    res = _a.sent();
                    res.status == true
                        ? toast.success(res.message) &&
                            setShow({ mode: true, message: res.message })
                        : toast.error(res.message || "Error validating Number, try again later");
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, validateID(data)];
                case 4:
                    res = _a.sent();
                    res.response_code == "00"
                        ? toast.success(res.response_message) &&
                            setShow({ mode: true, message: res.response_message })
                        : toast.error(res.response_message || "Error validating ID, try again later");
                    _a.label = 5;
                case 5:
                    setIsPending(false);
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    var onSubmitID = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            validateOTP(data);
            return [2 /*return*/];
        });
    }); };
    var onSubmitNoID = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            validateOTP(__assign(__assign({}, data), { verify_via: "phone" }));
            return [2 /*return*/];
        });
    }); };
    var handleIdChange = function (event) {
        var eventValue = event.target.value;
        setValueID("source", eventValue);
        setSelectedId(eventValue);
    };
    return (<div className="identity">
      <CustomHeader title="Create ABSSIN" desc={"Start by selecting an ID"}/>

      <form onSubmit={selectedId === "No ID"
            ? handleSubmitNoID(onSubmitNoID)
            : handleSubmitID(onSubmitID)} className="identity-form">
        <SelectInput label="Select ID Type" name="id" id="id" options={[
            { label: "Select ID", value: "" },
            { label: "No ID", value: "No ID" },
            { label: "BVN", value: "bvn" },
            { label: "NIN", value: "nin" },
        ]} onChange={handleIdChange}/>

        {selectedId !== "No ID" && selectedId && (<FormTextInput label="Reference ID" name="id" type="number" placeholder="Enter Reference ID" register={registerID} validation={{ required: true }} error={errorsID.id}/>)}

        {selectedId === "No ID" && (<>
            <FormTextInput label="Email" name="email" type="text" placeholder="Enter Email" register={registerNoID}/>
            <FormTextInput label="Phone Number" name="value" type="number" placeholder="Enter Phone Number" register={registerNoID} validation={{ required: true }} error={errorsNoID.value}/>
          </>)}

        <Button text="Submit" loading={isLoading} disabled={isLoading || selectedId === ""}/>
      </form>

      {show.mode && (<OtpSuccessModal maintext={show === null || show === void 0 ? void 0 : show.message} subtext="Click the button below to validate the OTP sent to you" buttontext="Validate OTP" link={"".concat(pathname, "/validate-otp?source=").concat(selectedId, "&_id=").concat(id_type)}/>)}
    </div>);
};
export default EnterDetailsComponent;
