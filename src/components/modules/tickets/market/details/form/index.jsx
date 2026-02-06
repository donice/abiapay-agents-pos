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
import React, { useEffect } from "react";
import { FormButton } from "@/src/components/common/button";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
// import "./style.scss" // Moved to _app;
import { useForm } from "react-hook-form";
import { fetchMarketEnumerationDetails, fetchMarkets, postPayForMarketLevy, } from "@/src/services/ticketsServices";
import { useMutation } from "@tanstack/react-query";
import { formatAmount } from "@/src/utils/formatAmount";
import { PiSealCheckDuotone } from "react-icons/pi";
import { BiLoaderCircle } from "react-icons/bi";
import toast from "react-hot-toast";
import { MarketTicketModal } from "@/src/components/common/modal";
import { FcApproval } from "react-icons/fc";
import { getCurrentYear } from "@/src/utils/getCurrentYear";
var AddMarketTicketForm = function (id) {
    var _a = React.useState([]), markets = _a[0], setMarkets = _a[1];
    var _b = React.useState(null), details = _b[0], setDetails = _b[1];
    var _c = React.useState({
        openModal: false,
        mode: "success",
    }), status = _c[0], setStatus = _c[1];
    var _d = React.useState({
        enumeration_id: "",
        payment_status: "",
        response_message: "",
        payment_ref: "",
    }), modalDetails = _d[0], setModalDetails = _d[1];
    var _e = useForm({
        defaultValues: {
            taxpayer_name: "",
            abssin: "",
            taxpayer_phone: "",
            zone_line: "",
            market_id: "",
            shop_number: "",
            payment_period: getCurrentYear(),
            merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
            wallet_type: "fidelity",
        },
    }), register = _e.register, handleSubmit = _e.handleSubmit, setValue = _e.setValue, errors = _e.formState.errors;
    var getMarkets = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchMarkets()];
                case 1:
                    data = _a.sent();
                    setMarkets(data === null || data === void 0 ? void 0 : data.data.map(function (item) { return ({ label: item.market, value: item.id }); }));
                    return [2 /*return*/, data];
                case 2:
                    error_1 = _a.sent();
                    throw new Error("Error fetching transactions: ".concat(error_1 === null || error_1 === void 0 ? void 0 : error_1.message));
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var mutateFetchMarketLevyDetails = useMutation({
        mutationKey: ["fetchMarketEnumerationDetails"],
        mutationFn: function () {
            return fetchMarketEnumerationDetails({
                enumeration_id: id === null || id === void 0 ? void 0 : id.id,
            });
        },
        onSuccess: function (data) {
            var _a, _b, _c;
            setDetails(data === null || data === void 0 ? void 0 : data.response_data);
            if ((data === null || data === void 0 ? void 0 : data.response_code) == "00") {
                setValue("abssin", (_a = data === null || data === void 0 ? void 0 : data.response_data) === null || _a === void 0 ? void 0 : _a.taxpayer_id);
                setValue("taxpayer_name", (_b = data === null || data === void 0 ? void 0 : data.response_data) === null || _b === void 0 ? void 0 : _b.taxpayer_name);
                setValue("taxpayer_phone", (_c = data === null || data === void 0 ? void 0 : data.response_data) === null || _c === void 0 ? void 0 : _c.taxpayer_phone);
            }
            console.log(data);
        },
    });
    var mutatePayForMarketLevy = useMutation({
        mutationKey: ["payForMarketLevy"],
        mutationFn: function (data) {
            return postPayForMarketLevy(data);
        },
        onSuccess: function (data) {
            console.log(data);
            if ((data === null || data === void 0 ? void 0 : data.response_code) == "00" || (data === null || data === void 0 ? void 0 : data.response_code) == "12") {
                setStatus({ openModal: true, mode: "success" });
                console.log(data);
                setModalDetails({
                    enumeration_id: data === null || data === void 0 ? void 0 : data.enumeration_id,
                    payment_status: data === null || data === void 0 ? void 0 : data.payment_status,
                    response_message: data === null || data === void 0 ? void 0 : data.response_message,
                    payment_ref: data === null || data === void 0 ? void 0 : data.payment_ref,
                });
                toast.success(data === null || data === void 0 ? void 0 : data.response_message);
            }
            else {
                toast.error("Cannot pay for market levy");
            }
        },
        onError: function (error) {
            toast.error("Cannot pay for market levy");
        }
    });
    var onsubmit = function (data) { return mutatePayForMarketLevy.mutate(data); };
    useEffect(function () {
        if (id) {
            mutateFetchMarketLevyDetails.mutate();
        }
    }, [id]);
    useEffect(function () {
        getMarkets();
    }, []);
    return (<div className="add-market-ticket">
      <section className="grid gap-4">
        <div>
          <div className="border-b-2 border-dashed py-3 flex justify-between">
            <p className="text-sm text-gray-400">Enumeration ID:</p>
            <p className="text-sm font-semibold text-gray-600">
              {details === null || details === void 0 ? void 0 : details.enumeration_id}
            </p>
          </div>
          <div className="border-b-2 border-dashed py-3 flex justify-between">
            <p className="text-sm text-gray-400">ABSSIN:</p>
            <p className="text-sm font-semibold text-gray-600">
              {details === null || details === void 0 ? void 0 : details.taxpayer_id}
            </p>
          </div>
          <div className="border-b-2 border-dashed py-3 flex justify-between">
            <p className="text-sm text-gray-400">Taxpayer Name:</p>
            <p className="text-sm font-semibold text-gray-600">
              {details === null || details === void 0 ? void 0 : details.taxpayer_name}
            </p>
          </div>
          <div className="border-b-2 border-dashed py-3 flex justify-between">
            <p className="text-sm text-gray-400">Taxpayer Phone:</p>
            <p className="text-sm font-semibold text-gray-600">
              {details === null || details === void 0 ? void 0 : details.taxpayer_phone}
            </p>
          </div>
          <div className="border-b-2 border-dashed py-3 flex justify-between">
            <p className="text-sm text-gray-400">Amount:</p>
            <p className="text-sm font-semibold text-gray-600">
              {formatAmount(Number(details === null || details === void 0 ? void 0 : details.total_amount))}
            </p>
          </div>
          <div className="border-b-2 border-dashed py-3 flex justify-between">
            <p className="text-sm text-gray-400">Payment Status:</p>
            <p className={"".concat((details === null || details === void 0 ? void 0 : details.items[0].status) == "Completed"
            ? "text-green-500"
            : "text-yellow-500")}>
              {(details === null || details === void 0 ? void 0 : details.items[0].status) == "Completed" ? (<div className="flex items-center gap-1 text-sm font-semibold ">
                  <PiSealCheckDuotone className="text-green-500 text-xl "/>
                  <p>{details === null || details === void 0 ? void 0 : details.items[0].status}</p>
                </div>) : (<div className="flex items-center gap-1 text-sm font-semibold ">
                  <BiLoaderCircle className="text-yellow-400 text-xl animate-spin"/>
                  <p>{details === null || details === void 0 ? void 0 : details.items[0].status}</p>
                </div>)}
            </p>
          </div>
          <div className="py-3 flex justify-between">
            <p className="text-sm text-gray-400">Created:</p>
            <p className="text-sm font-semibold text-gray-600">
              {details === null || details === void 0 ? void 0 : details.created_at}
            </p>
          </div>
          <form onSubmit={handleSubmit(onsubmit)} className="pt-3 flex flex-col gap-2 justify-between">
            <SelectInput label={"Market Name"} name={"market_id"} id={"market_id"} register={register} validation={{ required: true }} error={!!errors.market_id} options={markets}/>
            <FormTextInput label={"Shop Number"} name={"shop_number"} register={register} validation={{ required: true }} error={errors.shop_number}/>
            <FormTextInput label={"Zone Line"} name={"zone_line"} register={register} validation={{ required: true }} error={errors.zone_line}/>

    <SelectInput label={"Payment Period"} name={"payment_period"} id={"payment_period"} register={register} validation={{ required: true }} error={!!errors.payment_period} options={[
            { label: "2025", value: "2025" },
        ]}/>

            <SelectInput label={"Wallet Type"} name={"wallet_type"} id={"wallet_type"} options={[
            { value: "fidelity", label: "Fidelity" },
            { value: "access", label: "Access" },
        ]}/>
            <FormButton text={"Pay Now"} disabled={mutatePayForMarketLevy.isLoading} loading={mutatePayForMarketLevy.isLoading}/>
          </form>

          {status.openModal && status.mode === "success" && (<MarketTicketModal details={{
                enum_id: modalDetails === null || modalDetails === void 0 ? void 0 : modalDetails.enumeration_id,
                payment_status: modalDetails === null || modalDetails === void 0 ? void 0 : modalDetails.payment_status,
                payment_ref: modalDetails === null || modalDetails === void 0 ? void 0 : modalDetails.payment_ref,
            }} text={modalDetails === null || modalDetails === void 0 ? void 0 : modalDetails.response_message} icon={<FcApproval className="my-4 text-[5rem] p-3 bg-green-100 rounded-full"/>} maintext={"Market Ticket Payment Successful"}/>)}
        </div>
      </section>
    </div>);
};
export default AddMarketTicketForm;
