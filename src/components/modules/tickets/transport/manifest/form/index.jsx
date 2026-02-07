"use client";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
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
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
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
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { randomInvoiceGenerator } from "@/src/utils/randomInvoiceGenerator";
import { getCurrentDateTime } from "@/src/utils/getCurrentDateTime";
import toast from "react-hot-toast";
import { isBrowser } from "@/src/utils/isBrowser";
import { useRouter } from "next/router";
import { Button, BackButton } from "@/src/components/common/button";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { SuccessModal, InstantAccountModal } from "@/src/components/common/modal";
import { useDebounce } from "@/src/hooks/useDebounce";
import { createManifest, fetchPlateNumberInfo, } from "@/src/services/ticketsServices";
import { useMutation } from "@tanstack/react-query";
import { RiAddLine, RiDeleteBin2Line } from "react-icons/ri";
import { bankOptions } from "@/src/lib/app";
var AddManifestForm = function (_a) {
    var show = _a.show, setShow = _a.setShow, paymentRef = _a.paymentRef, setPaymentRef = _a.setPaymentRef, selectedPeriod = _a.selectedPeriod, selectedProduct = _a.selectedProduct;
    var _instantModal = useState({ show: false, details: null }), instantModal = _instantModal[0], setInstantModal = _instantModal[1];
    var _b = useForm({
        defaultValues: {
            merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
            vehiclePlateNumber: "",
            taxpayer_phone: "",
            taxpayer_name: "",
            wallet_type: "fidelity",
            destination: "",
            passengers: [
                {
                    name: "",
                    phone_number: null,
                    next_of_kin_name: "",
                    next_of_kin_phone: "",
                },
            ],
            amount: null,
        },
    }), register = _b.register, watch = _b.watch, handleSubmit = _b.handleSubmit, errors = _b.formState.errors, setValue = _b.setValue, control = _b.control;
    var _c = useFieldArray({
        control: control,
        name: "passengers",
    }), fields = _c.fields, append = _c.append, remove = _c.remove;
    var router = useRouter();
    var data = isBrowser && sessionStorage.getItem("USER_DATA");
    var user_data = data && JSON.parse(data);
    var _d = useMutation({
        mutationFn: function (data) {
            return createManifest(data);
        },
        onSuccess: function (response) {
            if (response.response_code === "00") {
                toast.success(response.response_message);
                setPaymentRef(response.payment_ref || response.paymentRef || "N/A");
                setShow(true);
            }
            else if (response.response_code === "12") {
                toast.success(response.response_message);
                var details = response.data || response;
                setInstantModal({
                    show: true,
                    details: {
                        virtual_acct_no: details.virtual_acct_no || details.account_number || details.Account_Number,
                        virtual_acct_name: details.virtual_acct_name || details.account_name || details.Account_Name,
                        transaction_amount: details.transaction_amount || details.amount || details.Amount,
                        bank_name: details.bank_name || details.Bank_Name || "Bank",
                        expiry_datetime: details.expiry_datetime || details.Expiry_Date,
                        payment_ref: details.payment_ref || details.paymentRef
                    }
                });
            }
            else if (response.response_code === "74") {
                toast.error(response.response_message);
                router.push("/tickets/transport");
            }
            else {
                toast.error("".concat(response.response_message, ", Try again"));
            }
        },
        onError: function () {
            toast.error("Error Creating Ticket");
        },
    }), mutate = _d.mutate, isLoading = _d.isLoading;
    var onSubmit = function (data) {
        return __awaiter(void 0, void 0, void 0, function () {
            var formData;
            return __generator(this, function (_a) {
                formData = __assign(__assign({}, data), { transaction_date: getCurrentDateTime(), invoice_id: "INV".concat(randomInvoiceGenerator()) });
                sessionStorage.setItem("TRANSPORT_INVOICE", JSON.stringify(formData));
                mutate(formData);
                return [2 /*return*/];
            });
        });
    };
    var vehiclePlateNumber = watch("vehiclePlateNumber");
    var debouncedPlateNumber = useDebounce(vehiclePlateNumber, 500);
    useEffect(function () {
        if (debouncedPlateNumber) {
            var getPlateNumberInfo = function (vehiclePlateNumber) {
                return __awaiter(void 0, void 0, void 0, function () {
                    var response, error_1;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, fetchPlateNumberInfo(vehiclePlateNumber)];
                            case 1:
                                response = _b.sent();
                                if (((_a = response.data) === null || _a === void 0 ? void 0 : _a.length) !== 0) {
                                    toast.success(response.message);
                                    setValue("taxpayer_name", response.data.Name);
                                    setValue("taxpayer_phone", response.data.Phone);
                                }
                                return [3 /*break*/, 3];
                            case 2:
                                error_1 = _b.sent();
                                toast.error("Error fetching plate number information");
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            getPlateNumberInfo(debouncedPlateNumber);
        }
    }, [debouncedPlateNumber, setValue]);
    return (<form onSubmit={handleSubmit(onSubmit)} className="add-ticket">
        <FormTextInput label="Plate Number" type="text" name="vehiclePlateNumber" placeholder="Enter Plate Number" register={register} validation={{
            required: true,
            setValueAs: function (value) { return value.toUpperCase(); },
        }} error={errors.vehiclePlateNumber} />

        <FormTextInput label="Taxpayer Phone Number" type="number" name="taxpayer_phone" placeholder="Enter Taxpayer Phone Number" register={register} validation={{
            required: "Field Required",
            minLength: {
                value: 11,
                message: "Length must be above 11 characters",
            },
            maxLength: {
                value: 11,
                message: "Length must be below 13 characters",
            },
        }} error={errors.taxpayer_phone} />

        <FormTextInput label="Taxpayer Name" type="text" name="taxpayer_name" placeholder="Enter Taxpayer Name" register={register} validation={{ required: true }} error={errors.taxpayer_name} />

        <FormTextInput label="Destination" type="text" name="destination" placeholder="Enter Destination" register={register} validation={{ required: true }} error={errors.destination} />

        <FormTextInput label="Amount" type="number" name="amount" placeholder="Enter Amount" register={register} validation={{ required: true }} error={errors.amount} />

        <SelectInput label="Choose Wallet" name="wallet_type" id="wallet_type" register={register} validation={{ required: true }} options={bankOptions} placeholder="Select Wallet Type" error={!!errors.wallet_type} />

        <div className="passengers-section">
            <h4>{"Passenger".concat(fields.length > 1 ? "s" : "")}</h4>
            {fields.map(function (field, index) {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                return (<div key={field.id} className="add-ticket">
                    <FormTextInput label={"Passenger ".concat(index + 1, " Name")} type="text" name={"passengers.".concat(index, ".name")} placeholder="Enter Name" register={register} validation={{ required: "Passenger name required" }} error={(_b = (_a = errors.passengers) === null || _a === void 0 ? void 0 : _a[index]) === null || _b === void 0 ? void 0 : _b.name} />

                    <FormTextInput label="Phone Number" type="number" name={"passengers.".concat(index, ".phone_number")} placeholder="Enter Phone Number" register={register} validation={{ required: "Phone number required" }} error={(_d = (_c = errors.passengers) === null || _c === void 0 ? void 0 : _c[index]) === null || _d === void 0 ? void 0 : _d.phone_number} />

                    <FormTextInput label="Next of Kin Name" type="text" name={"passengers.".concat(index, ".next_of_kin_name")} placeholder="Enter Next of Kin Name" register={register} validation={{ required: "Next of Kin name required" }} error={(_f = (_e = errors.passengers) === null || _e === void 0 ? void 0 : _e[index]) === null || _f === void 0 ? void 0 : _f.next_of_kin_name} />

                    <FormTextInput label="Next of Kin Phone" type="number" name={"passengers.".concat(index, ".next_of_kin_phone")} placeholder="Enter Next of Kin Phone" register={register} validation={{ required: "Next of Kin phone required" }} error={(_h = (_g = errors.passengers) === null || _g === void 0 ? void 0 : _g[index]) === null || _h === void 0 ? void 0 : _h.next_of_kin_phone} />

                    {fields.length > 1 && (<button type="button" onClick={function () { return remove(index); }} className="remove-btn">
                        <RiDeleteBin2Line /> <span>Remove Passenger</span>
                    </button>)}
                </div>);
            })}

            <button type="button" onClick={function () {
                var _a;
                var lastPassenger = (_a = watch("passengers")) === null || _a === void 0 ? void 0 : _a[fields.length - 1];
                if ((lastPassenger === null || lastPassenger === void 0 ? void 0 : lastPassenger.name) &&
                    (lastPassenger === null || lastPassenger === void 0 ? void 0 : lastPassenger.phone_number) &&
                    (lastPassenger === null || lastPassenger === void 0 ? void 0 : lastPassenger.next_of_kin_name) &&
                    (lastPassenger === null || lastPassenger === void 0 ? void 0 : lastPassenger.next_of_kin_phone)) {
                    append({
                        name: "",
                        phone_number: null,
                        next_of_kin_name: "",
                        next_of_kin_phone: "",
                    });
                }
                else {
                    toast.error("Please fill all fields for the current passenger before adding a new one.");
                }
            }} className="add-btn">
                <RiAddLine /> <span>Add Passenger</span>
            </button>
        </div>

        <div className="btn_container">
            <BackButton link="/tickets" />
            <Button text="Create Manifest" loading={isLoading} />
        </div>

        {show && (<SuccessModal maintext="Transaction completed successfully" link="/tickets" buttonText="Close" id={"Manifest with Ref: ".concat(paymentRef, " was successfully created")} />)}

        {instantModal.show && (<InstantAccountModal
            virtual_acct_no={instantModal.details.virtual_acct_no}
            virtual_acct_name={instantModal.details.virtual_acct_name}
            transaction_amount={instantModal.details.transaction_amount}
            bank_name={instantModal.details.bank_name}
            expiry_datetime={instantModal.details.expiry_datetime}
            onClick={() => {
                setInstantModal({ show: false, details: null });
                router.push("/tickets/transport");
            }}
        />)}
    </form>);
};
export default AddManifestForm;
