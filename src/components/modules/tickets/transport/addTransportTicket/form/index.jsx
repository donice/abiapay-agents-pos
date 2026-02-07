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
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { fetchProducts } from "@/src/services/common";
import { randomInvoiceGenerator } from "@/src/utils/randomInvoiceGenerator";
import { getCurrentDateTime } from "@/src/utils/getCurrentDateTime";
import toast from "react-hot-toast";
import { isBrowser } from "@/src/utils/isBrowser";
import { useRouter } from "next/router";
import { Button, BackButton } from "@/src/components/common/button";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { SuccessModal, InstantAccountModal } from "@/src/components/common/modal";
import { useDebounce } from "@/src/hooks/useDebounce";
import { createNewTicket, fetchPlateNumberInfo, } from "@/src/services/ticketsServices";
import { useMutation } from "@tanstack/react-query";
import { paymentMethodOptions, walletTypeOptions } from "@/src/lib/app";
import { fetchInstantAccount, confirmInstantAccountPayment } from "@/src/services/billServices";
var AddTransportTicketForm = function (_a) {
    var show = _a.show, setShow = _a.setShow, paymentRef = _a.paymentRef, setPaymentRef = _a.setPaymentRef, selectedPeriod = _a.selectedPeriod, setSelectedPeriod = _a.setSelectedPeriod, selectedProduct = _a.selectedProduct, setSelectedProduct = _a.setSelectedProduct, selectedProductName = _a.selectedProductName, setSelectedProductName = _a.setSelectedProductName;
    var _instantModal = useState({ show: false, details: null }), instantModal = _instantModal[0], setInstantModal = _instantModal[1];
    var _b = useForm({
        defaultValues: {
            merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
            transaction_date: getCurrentDateTime(),
            invoice_id: "INV".concat(randomInvoiceGenerator()),
            paymentPeriod: "",
            productCode: "",
            next_expiration_date: "",
            no_of_days: "",
            amount: "",
            lga: "",
            agentEmail: "",
            plateNumber: "",
            taxPayerPhone: "",
            taxPayerName: "",
            payment_method: "wallet",
            wallet_type: "access",
        },
    }), register = _b.register, watch = _b.watch, handleSubmit = _b.handleSubmit, errors = _b.formState.errors, setValue = _b.setValue;
    var router = useRouter();
    var _c = useState([]), products = _c[0], setProducts = _c[1];
    var _d = useState(false), isAndroidBridge = _d[0], setIsAndroidBridge = _d[1];
    var data = isBrowser && sessionStorage.getItem("USER_DATA");
    var user_data = data && JSON.parse(data);
    var payment_method = watch("payment_method");
    var getProductsData = function () {
        return __awaiter(void 0, void 0, void 0, function () {
            var response, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fetchProducts()];
                    case 1:
                        response = _b.sent();
                        setProducts(response === null || response === void 0 ? void 0 : response.data);
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        toast.error("Error fetching products");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    useEffect(function () {
        setValue("agentEmail", user_data === null || user_data === void 0 ? void 0 : user_data.email);
    }, [setValue, user_data]);
    useEffect(function () {
        getProductsData();
    }, []);
    // Check if running in Android bridge app
    useEffect(function () {
        if (isBrowser) {
            setIsAndroidBridge(typeof window.HydrogenBridge !== 'undefined');
        }
    }, []);
    // Handle payment result from Hydrogen Bridge
    useEffect(function () {
        if (isBrowser) {
            window.handleHydrogenPaymentResult = function (result) {
                console.log('Hydrogen Payment Result:', result);
                if (result.status === 'SUCCESS') {
                    toast.success('Payment Successful!');
                    var paymentData = void 0;
                    try {
                        paymentData = typeof result.data === 'string'
                            ? JSON.parse(result.data)
                            : result.data;
                    }
                    catch (e) {
                        paymentData = result.data;
                    }
                    console.log('Payment Data:', paymentData);
                    var pendingTicket = sessionStorage.getItem("PENDING_TICKET");
                    if (pendingTicket) {
                        var ticketData = JSON.parse(pendingTicket);
                        sessionStorage.setItem("HYDROGEN_PAYMENT", JSON.stringify(paymentData));
                        sessionStorage.setItem("TRANSPORT_INVOICE", JSON.stringify(ticketData));
                        sessionStorage.removeItem("PENDING_TICKET");
                        setPaymentRef(paymentData.reference || paymentData.paymentRef || "N/A");
                        setShow(true);
                    }
                }
                else if (result.status === 'CANCELLED') {
                    toast.error('Payment Cancelled by user');
                    sessionStorage.removeItem("PENDING_TICKET");
                }
                else if (result.status === 'FAILED') {
                    toast.error('Payment Failed: ' + result.data);
                    sessionStorage.removeItem("PENDING_TICKET");
                }
                else if (result.status === 'ERROR') {
                    toast.error('Error: ' + result.message);
                    sessionStorage.removeItem("PENDING_TICKET");
                }
            };
        }
        return function () {
            if (isBrowser) {
                delete window.handleHydrogenPaymentResult;
            }
        };
    }, [setShow, setPaymentRef]);
    var _e = useMutation({
        mutationFn: function (data) {
            return createNewTicket(data);
        },
        onSuccess: function (response) {
            var _a, _b;
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
    }), mutate = _e.mutate, isLoading = _e.isLoading;
    var _f = useMutation({
        mutationFn: function (payload) {
            // Store ticket data in session for later finalization
            if (payload.ticketData) {
                sessionStorage.setItem("PENDING_TICKET", JSON.stringify(payload.ticketData));
            }
            return fetchInstantAccount(payload.instantAccountData);
        },
        onSuccess: function (response) {
            if (response.response_code === "00" || response.response_code === "12") {
                toast.success(response.response_message || "Instant account created");
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
            else {
                toast.error(response.response_message || "Failed to create instant account");
            }
        },
        onError: function () {
            toast.error("Error creating instant account");
        },
    }), mutateInstantAccount = _f.mutate, isLoadingInstantAccount = _f.isLoading;
    var onSubmit = function (data) {
        return __awaiter(void 0, void 0, void 0, function () {
            var formData, paymentMethod, amountInKobo, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 1, , 2]);
                        formData = __assign(__assign({}, data), { transaction_date: getCurrentDateTime(), invoice_id: "INV".concat(randomInvoiceGenerator()) });
                        paymentMethod = data.payment_method;
                        if (paymentMethod === "card") {
                            // Card payment via Hydrogen POS
                            if (!isAndroidBridge || typeof window.HydrogenBridge === 'undefined') {
                                toast.error('Card payment requires Android app with POS hardware');
                                return [2 /*return*/];
                            }
                            amountInKobo = Math.round(((_a = Number(data === null || data === void 0 ? void 0 : data.amount)) !== null && _a !== void 0 ? _a : 0) * 100);
                            // Store pending ticket data
                            sessionStorage.setItem("PENDING_TICKET", JSON.stringify(formData));
                            toast.loading('Launching POS payment...');
                            // Start POS payment
                            window.HydrogenBridge.initiateCardPayment(amountInKobo);
                        }
                        else if (paymentMethod === "transfer") {
                            // Transfer payment - create instant account
                            var instantAccountPayload = {
                                notice_number: formData.invoice_id,
                                customer_name: formData.taxPayerName,
                                customer_phone: formData.taxPayerPhone,
                                customer_email: formData.agentEmail,
                                account_type: "access",
                            };
                            mutateInstantAccount({
                                instantAccountData: instantAccountPayload,
                                ticketData: formData
                            });
                        }
                        else {
                            // Wallet payment
                            sessionStorage.setItem("TRANSPORT_INVOICE", JSON.stringify(formData));
                            mutate(formData);
                        }
                        return [3 /*break*/, 2];
                    case 1:
                        error_1 = _b.sent();
                        console.error('Payment submission error:', error_1);
                        toast.error('Failed to process payment');
                        return [3 /*break*/, 2];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };

    var calculateAmount = function (productCode, period) {
        if (!productCode || !period) return;

        var selectedProductData = products.find(function (product) { return product.productCode === productCode; });
        if (!selectedProductData) return;

        var amount = 0;
        var no_of_days = "0";
        switch (period) {
            case "1 Day":
                no_of_days = "1";
                amount = (selectedProductData === null || selectedProductData === void 0 ? void 0 : selectedProductData.dailyAmount) || 0;
                break;
            case "1 Week":
                no_of_days = "7";
                amount = (selectedProductData === null || selectedProductData === void 0 ? void 0 : selectedProductData.weeklyAmount) || 0;
                break;
            case "1 Month":
                no_of_days = "30";
                amount = (selectedProductData === null || selectedProductData === void 0 ? void 0 : selectedProductData.monthlyAmount) || 0;
                break;
        }

        setValue("amount", amount);
        setValue("no_of_days", no_of_days);

        var transaction_date = new Date();
        var next_expiration_date = new Date(transaction_date.getTime() + parseInt(no_of_days) * 24 * 60 * 60 * 1000);
        setValue("next_expiration_date", next_expiration_date.toISOString());
    };

    var handleProductChange = function (event) {
        var productCode = event.target.value;
        var product = products.find(p => p.productCode === productCode);
        setSelectedProduct(productCode);
        setSelectedProductName(product ? product.productName : "");
        setValue("productCode", productCode);
        if (selectedPeriod) {
            calculateAmount(productCode, selectedPeriod);
        }
    };
    var handlePeriodChange = function (event) {
        var period = event.target.value;
        setSelectedPeriod(period);
        setValue("paymentPeriod", period);
        if (selectedProduct) {
            calculateAmount(selectedProduct, period);
        }
    };
    var plateNumber = watch("plateNumber");
    var debouncedPlateNumber = useDebounce(plateNumber, 500);
    useEffect(function () {
        if (debouncedPlateNumber) {
            var getPlateNumberInfo = function (plateNumber) {
                return __awaiter(void 0, void 0, void 0, function () {
                    var response, error_1;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, fetchPlateNumberInfo(plateNumber)];
                            case 1:
                                response = _b.sent();
                                if (((_a = response.data) === null || _a === void 0 ? void 0 : _a.length) !== 0) {
                                    toast.success(response.message);
                                    setValue("taxPayerName", response.data.Name);
                                    setValue("taxPayerPhone", response.data.Phone);
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
        <SelectInput label="Ticket Type" name="productCode" id="productCode" register={register} validation={{
            required: true,
            onChange: handleProductChange
        }} options={products.map(function (product) {
            return ({
                value: product.productCode,
                label: product.productName,
            });
        })} placeholder="Select Ticket Type" error={!!errors.productCode} />

        <FormTextInput label="Plate Number" type="text" name="plateNumber" placeholder="Enter Plate Number" register={register} validation={{
            required: true,
            setValueAs: function (value) { return value.toUpperCase(); }
        }} error={errors.plateNumber} />

        <FormTextInput label="Taxpayer Phone Number" type="number" name="taxPayerPhone" placeholder="Enter Taxpayer Phone Number" register={register} validation={{
            required: "Field Required",
            minLength: {
                value: 11,
                message: "Length must be above 11 characters",
            },
            maxLength: {
                value: 11,
                message: "Length must be below 13 characters",
            },
        }} error={errors.taxPayerPhone} />

        <FormTextInput label="Taxpayer Name" type="text" name="taxPayerName" placeholder="Enter Taxpayer Name" register={register} validation={{ required: true }} error={errors.taxPayerName} />

        <SelectInput label="Payment Period" name="paymentPeriod" id="paymentPeriod" value={selectedPeriod} onChange={handlePeriodChange} disabled={!selectedProduct} options={[
            { value: "1 Day", label: "1 Day" },
            { value: "1 Week", label: "1 Week" },
            { value: "1 Month", label: "1 Month" },
        ]} placeholder="Select Payment Period" error={!!errors.paymentPeriod} />

        <FormTextInput label="Amount" type="number" name="amount" placeholder="Enter Amount" register={register} readOnly validation={{ required: true }} error={errors.amount} />

        <SelectInput label="Payment Method" name="payment_method" id="payment_method" register={register} validation={{ required: true }} options={paymentMethodOptions} placeholder="Select Payment Method" error={!!errors.payment_method} />

        {payment_method === "wallet" && (<SelectInput label="Choose Wallet" name="wallet_type" id="wallet_type" register={register} validation={{ required: true }} options={walletTypeOptions} placeholder="Select Wallet Type" error={!!errors.wallet_type} />)}

        {isAndroidBridge && payment_method === "card" && (<div style={{
                padding: '12px',
                background: '#e8f5e9',
                borderRadius: '8px',
                marginBottom: '20px',
                border: '1px solid #4caf50'
            }}>
            <p style={{
                margin: 0,
                color: '#2e7d32',
                fontSize: '14px',
                fontWeight: '500'
            }}>
                ✓ POS hardware payment available
            </p>
        </div>)}

        <div className="btn_container">
            <BackButton link="/tickets/transport" />
            <Button text="Process Payment" loading={isLoading || isLoadingInstantAccount} />
        </div>

        {show && (<SuccessModal text="View Receipt" link="/tickets/transport/add/summary" id={"Ref: ".concat(paymentRef, ", Valid for: ").concat(selectedPeriod, ", Payment for: ").concat(selectedProductName)} buttonText="Done" />)}

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
export default AddTransportTicketForm;
