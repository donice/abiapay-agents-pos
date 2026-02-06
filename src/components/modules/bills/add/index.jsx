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
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { useDebounce } from "@/src/hooks/useDebounce";
import { fetchBillProducts } from "@/src/services/billServices";
import { fetchABSSINInfo, fetchTaxOffice } from "@/src/services/common";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
// import "./style.scss" // Moved to _app;
import { createBill } from "@/src/services/billServices";
import { useRouter } from "next/router";
var CreateBillModule = function () {
    var _a = useForm(), register = _a.register, handleSubmit = _a.handleSubmit, setValue = _a.setValue, watch = _a.watch;
    var router = useRouter();
    var onSubmit = function (formData) { return __awaiter(void 0, void 0, void 0, function () {
        var requestBody, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!selectedProduct) {
                        toast.error("Please select a product");
                        return [2 /*return*/];
                    }
                    console.log(selectedProduct);
                    requestBody = {
                        taxpayer_id: formData.taxpayer_id,
                        full_name: formData.full_name,
                        email: formData.email || "",
                        phone_number: formData.phone_number,
                        revenue_office: formData.revenue_office,
                        occurrence: selectedProduct.paymentFrequency,
                        items: selectedProduct.items.map(function (item) { return ({
                            rev_item_name: item.productname || "Unknown",
                            amount: Number(item.amount) || 0,
                            rev_code: item.rev_code || "N/A",
                        }); }),
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, createBill(requestBody)];
                case 2:
                    _a.sent();
                    toast.success("Bill created successfully");
                    router.push('/bills');
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    toast.error(error_1.message || "Failed to create bill");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var abssin = watch("taxpayer_id");
    var debouncedAbssin = useDebounce(abssin, 300);
    var _b = useState([]), products = _b[0], setProducts = _b[1];
    var _c = useState(null), selectedProduct = _c[0], setSelectedProduct = _c[1];
    var revenueOfficesData = useQuery({
        queryKey: ["revenue_offices"],
        queryFn: function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetchTaxOffice()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
    }).data;
    var _d = useQuery({
        queryKey: ["get_bills_products"],
        queryFn: function () { return fetchBillProducts(); },
    }), data = _d.data, isError = _d.isError, isLoading = _d.isLoading;
    var selectedProductId = watch("product");
    useEffect(function () {
        console.log("Products List:", products);
        console.log("Selected Product ID:", selectedProductId);
        var foundProduct = products.find(function (p) { return p.id === Number(selectedProductId); });
        console.log("Found Product:", foundProduct);
        setSelectedProduct(foundProduct || null);
    }, [selectedProductId, products]);
    useEffect(function () {
        if (data === null || data === void 0 ? void 0 : data.response_data) {
            console.log("data", data.response_data.map(function (bill) { return ({
                items: bill.productname
            }); }));
            var extractedBills = data.response_data.map(function (bill) { return ({
                id: bill.id,
                productname: bill.productname || "No product",
                totalamount: bill.totalamount || "0",
                collectionTitle: bill.collectionTitle || "N/A",
                paymentFrequency: bill.paymentFrequency || "N/A",
                items: bill.items || [],
                amount: (bill === null || bill === void 0 ? void 0 : bill.totalamount) || "0",
                occurrence: bill.occurrence || "N/A",
            }); });
            console.log("extractedBills", extractedBills);
            setProducts(extractedBills);
        }
    }, [data]);
    useEffect(function () {
        if (debouncedAbssin) {
            var getPlateNumberInfo = function (req) { return __awaiter(void 0, void 0, void 0, function () {
                var response, error_2;
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
                                setValue("full_name", response.data.firstname +
                                    " " +
                                    response.data.middle_name +
                                    " " +
                                    response.data.lastname);
                                setValue("phone_number", response.data.phone_number);
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _b.sent();
                            console.log(error_2);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
            getPlateNumberInfo(debouncedAbssin);
        }
    }, [debouncedAbssin, setValue]);
    return (<form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 mb-40">
      <SelectInput label={"Taxpayer Type"} name={"taxpayer_type"} id={"taxpayer_type"} register={register} options={[
            {
                label: "Individual",
                value: "individual",
            },
            {
                label: "Corporate",
                value: "corporate",
            },
        ]}/>

      <FormTextInput label="ABSSIN" name="taxpayer_id" register={register} validation={{ required: true }} placeholder="Enter ABSSIN"/>
      <FormTextInput label="Taxpayer Name" name="full_name" register={register} validation={{ required: true }} placeholder="Enter Taxpayer Name"/>
      <FormTextInput label="Taxpayer Phone" name="phone_number" register={register} validation={{ required: true }} placeholder="Enter Taxpayer Phone"/>

      <SelectInput label={"Revenue Office"} name={"revenue_office"} id={"revenue_office"} register={register} options={revenueOfficesData === null || revenueOfficesData === void 0 ? void 0 : revenueOfficesData.data.map(function (office) { return ({
            label: office.name,
            value: office.idstation,
        }); })}/>

      <SelectInput label={"Bill Product"} name={"product"} id={"product"} register={register} options={products === null || products === void 0 ? void 0 : products.map(function (product) { return ({
            label: "".concat(product.productname, " - ").concat(product.amount),
            value: product.id,
        }); })}/>

      


        {selectedProduct && (<>
  
   
        <div className="bill-details">
          {/* <h3>Bill Details</h3> */}
          <p>
            <strong>Collection Title:</strong> {selectedProduct.productname}
          </p>
          <p>
            <strong>Payment Frequency:</strong> {selectedProduct.occurrence}
          </p>

          {/* Bill Revenue Items */}
          <h4>Bill Revenue Items</h4>
          <table>
            <thead>
              <tr>
                <th>Revenue Code</th>
                <th>Revenue Item</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {selectedProduct.items.map(function (item, index) { return (<tr key={index}>
                  <td>{item.rev_code}</td>
                  <td>{item.rev_item}</td>
                  <td>₦{item.amount}</td>
                </tr>); })}
            </tbody>
          </table>
          <p>
            <strong>Total Bill Amount: ₦</strong>{selectedProduct.totalamount}
          </p>
        </div>
        </>)}

      
        <Button text={"Create Bill"}/>
    </form>);
};
export default CreateBillModule;
