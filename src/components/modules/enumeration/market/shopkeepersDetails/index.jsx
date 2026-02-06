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
import { Button } from "@/src/components/common/button";
import React, { useEffect, useState } from "react";
import { FormTextInput } from "@/src/components/common/input";
// import "../style.scss" // Moved to _app;
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { EnumerationModal } from "@/src/components/common/modal";
import { useDebounce } from "@/src/hooks/useDebounce";
import { fetchABSSINInfo } from "@/src/services/common";
var ShopkeepersDetails = function (_a) {
    var setStage = _a.setStage, formData = _a.formData;
    var _b = useState(false), show = _b[0], setShow = _b[1];
    var _c = useForm({
        defaultValues: {
            shopkeeper_abssin: "",
            shopkeeper_name: "",
            shopkeeper_phone: "",
        },
    }), register = _c.register, handleSubmit = _c.handleSubmit, watch = _c.watch, setValue = _c.setValue, errors = _c.formState.errors;
    var onSubmit = function (reqData) {
        console.log(reqData);
        toast.success("Store keepers Added");
        setShow(true);
    };
    var shopkeepersAbssin = watch("shopkeeper_abssin");
    var debouncedShopkeepersAbssin = useDebounce(shopkeepersAbssin, 300);
    useEffect(function () {
        if (debouncedShopkeepersAbssin) {
            var getPlateNumberInfo = function (req) { return __awaiter(void 0, void 0, void 0, function () {
                var response, error_1;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, fetchABSSINInfo({ id: req })];
                        case 1:
                            response = _b.sent();
                            if (((_a = response.data) === null || _a === void 0 ? void 0 : _a.length) !== 0) {
                                toast.success(response.message);
                                setValue("shopkeeper_name", response.data.firstname +
                                    " " +
                                    response.data.middle_name +
                                    " " +
                                    response.data.lastname);
                                setValue("shopkeeper_phone", response.data.phone_number);
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _b.sent();
                            // toast.error("Error fetching plate number information");
                            console.log(error_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
            getPlateNumberInfo(debouncedShopkeepersAbssin);
        }
    }, [debouncedShopkeepersAbssin, setValue]);
    return (<>
      {(formData === null || formData === void 0 ? void 0 : formData.payment_reference) && (<div className="formdata">
          <p>Paymnet Reference: <span>{formData.payment_reference}</span> </p>
          <p>Enumeration ID: <span>{formData.enumeration_id}</span></p>
        </div>)}
      <form onSubmit={handleSubmit(onSubmit)} className="enumeration-form">
        <FormTextInput label={"Shopkeeper's ABSSIN"} placeholder={"Enter Shopkeeper's ABSSIN"} name={"shopkeeper_abssin"} register={register} validation={{ required: true }} error={errors.shopkeeper_abssin}/>
        <FormTextInput label={"Shopkeeper's Name"} placeholder={"Enter Shopkeeper's Name"} name={"shopkeeper_name"} register={register} validation={{ required: true }} error={errors.shopkeeper_name}/>
        <FormTextInput label={"Shopkeeper's Phone"} placeholder={"Enter Shopkeeper's Phone"} name={"shopkeeper_phone"} register={register} validation={{ required: true }} error={errors.shopkeeper_phone}/>

        <div className="button-container">
          <button className="button secondary" onClick={function () { return setStage(0); }}>
            Go Back
          </button>
          <Button text="Complete"/>
        </div>
      </form>

      {show && (<EnumerationModal id={""} maintext="Shopkeepers Added Successfully" link="/dashboard" text={"Done"}/>)}
    </>);
};
export default ShopkeepersDetails;
