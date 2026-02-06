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
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { fetchBulkPrintsData, searchBulkPrintsData, searchBulkPrintsGroupData, } from "@/src/services/bulkPrintsService";
import { fetchLGAData } from "@/src/services/common";
import { Button } from "@/src/components/common/button";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
var BulkPrintForm = function (_a) {
    var setBulkData = _a.setBulkData, setViewData = _a.setViewData, setStickerLga = _a.setStickerLga;
    var _b = useState("bulk"), selectedOption = _b[0], setSelectedOption = _b[1];
    var _c = useState(""), searchTerm = _c[0], setSearchTerm = _c[1];
    var _d = useState(""), multiSearchInput = _d[0], setMultiSearchInput = _d[1];
    var _e = useState([]), lga = _e[0], setLga = _e[1];
    var getLgas = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchLGAData()];
                case 1:
                    data = (_a.sent()).data;
                    setLga(data === null || data === void 0 ? void 0 : data.map(function (item) { return ({
                        label: item.lgaName,
                        value: item.lgaID,
                    }); }));
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        getLgas();
    }, []);
    var _f = useForm({
        defaultValues: {
            category: "Transport",
            lga: null,
            card_type: "sticker",
            no_of_cards: "",
            page: 1,
            previous_print: "false",
            start_date: "",
            end_date: "",
        },
    }), handleSubmit = _f.handleSubmit, register = _f.register, errors = _f.formState.errors;
    var _g = useMutation({
        mutationFn: function (data) { return fetchBulkPrintsData(data); },
        onSuccess: function (data) {
            if ((data === null || data === void 0 ? void 0 : data.response_code) === "00") {
                toast.success((data === null || data === void 0 ? void 0 : data.response_message) || "Data Fetched Successfully");
                setBulkData(data === null || data === void 0 ? void 0 : data.response_data.data);
                setStickerLga(data === null || data === void 0 ? void 0 : data.response_data.lga_name);
                setViewData("data");
            }
            else {
                toast.error(data === null || data === void 0 ? void 0 : data.response_message);
            }
        },
        onError: function (error) {
            console.log(error);
        },
    }), mutate = _g.mutate, isLoading = _g.isLoading;
    var _h = useMutation({
        mutationFn: function (data) { return searchBulkPrintsData(data); },
        onSuccess: function (data) {
            var _a;
            if ((data === null || data === void 0 ? void 0 : data.response_code) === "00") {
                var result = data === null || data === void 0 ? void 0 : data.response_data;
                var normalized = Array.isArray(result) ? result : [result];
                setBulkData(normalized);
                setStickerLga(((_a = data === null || data === void 0 ? void 0 : data.response_data) === null || _a === void 0 ? void 0 : _a.lga_name) || "");
                setViewData("data");
                toast.success("Search successful");
            }
            else {
                toast.error(data === null || data === void 0 ? void 0 : data.response_message);
            }
        },
        onError: function () { return toast.error("Search failed"); },
    }), searchMutate = _h.mutate, isSearching = _h.isLoading;
    var handleSearch = function () {
        if (!searchTerm.trim()) {
            toast.error("Enter ABSSIN");
            return;
        }
        searchMutate({ ref: searchTerm });
    };
    var _j = useMutation({
        mutationFn: function (data) { return searchBulkPrintsGroupData(data); },
        onSuccess: function (data) {
            if ((data === null || data === void 0 ? void 0 : data.response_code) === "00") {
                var result = data.response_data.data;
                var normalized = Array.isArray(result) ? result : [result];
                setBulkData(normalized);
                setViewData("data");
                toast.success("Multi-search successful");
            }
            else {
                toast.error((data === null || data === void 0 ? void 0 : data.response_message) || "Multi-search failed");
            }
        },
        onError: function () { return toast.error("Error performing multi-search"); },
    }), multiSearchMutate = _j.mutate, isMultiSearching = _j.isLoading;
    var handleMultiSearch = function () {
        var ids = multiSearchInput
            .split(",")
            .map(function (id) { return id.trim(); })
            .filter(Boolean);
        if (ids.length === 0) {
            toast.error("Please enter ABSSINs separated by commas");
            return;
        }
        var payload = {
            plate_number: ids.join(","),
            card_type: "sticker",
            no_of_cards: 0,
            page: 1,
        };
        multiSearchMutate(payload);
    };
    var onSubmit = function (reqData) {
        reqData.previous_print = reqData.previous_print === "true";
        mutate(reqData);
    };
    return (<div className="bulk_print_page">
      {/* ---- TABS ---- */}
      <div className="tab_selector">
        <button className={selectedOption === "bulk" ? "active" : ""} onClick={function () { return setSelectedOption("bulk"); }}>
          Bulk Print
        </button>

        <button className={selectedOption === "search" ? "active" : ""} onClick={function () { return setSelectedOption("search"); }}>
          Search
        </button>

        <button className={selectedOption === "multi" ? "active" : ""} onClick={function () { return setSelectedOption("multi"); }}>
          Multi Search
        </button>
      </div>


      {selectedOption === "search" && (<div className="search_wrapper">
          <FormTextInput label="Search by ABSSIN" type="text" name="searchTerm" value={searchTerm} onChange={function (e) { return setSearchTerm(e.target.value); }} onKeyDown={function (e) {
                if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearch();
                }
            }}/>
          <Button text="Search" onClick={handleSearch} loading={isSearching}/>
        </div>)}

      {selectedOption === "multi" && (<div className="multi_search_wrapper">
          <label className="form_label">Search Multiple ABSSINs</label>

          <FormTextInput label="Enter ABSSINs separated by commas (e.g. 12345, 77889, 99001)" type="text" name="searchTerm" value={multiSearchInput} onChange={function (e) { return setMultiSearchInput(e.target.value); }} onKeyDown={function (e) {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleMultiSearch();
                }
            }}/>

          <Button text="Search" onClick={handleMultiSearch} loading={isMultiSearching}/>
        </div>)}

      {selectedOption === "bulk" && (<form onSubmit={handleSubmit(onSubmit)} className="emblem_form">
          <SelectInput label="LGA" name="lga" id="lga" register={register} validation={{ required: true }} error={!!errors.lga} options={lga}/>

          <FormTextInput label="Number of Cards" type="number" name="no_of_cards" placeholder="Enter Number of Cards" register={register} validation={{ required: true }} error={errors.no_of_cards}/>

          <FormTextInput label="Page" type="number" name="page" placeholder="Enter Page Number" register={register} validation={{ required: true }} error={errors.page}/>

          <div className="date_group">
            <FormTextInput label="Start Date" type="date" name="start_date" placeholder="Select Start Date" register={register} validation={{ required: true }} error={errors.start_date}/>

            <FormTextInput label="End Date" type="date" name="end_date" placeholder="Select End Date" register={register} validation={{ required: true }} error={errors.end_date}/>
          </div>

          <div className="form_group">
            <label className="form_label">Print Type</label>
            <div className="radio_group">
              <label>
                <input type="radio" value="false" {...register("previous_print", { required: true })}/>
                New Print
              </label>
              <label style={{ marginLeft: "1rem" }}>
                <input type="radio" value="true" {...register("previous_print", { required: true })}/>
                Reprint
              </label>
            </div>
            {errors.previous_print && (<span className="error">Print type is required</span>)}
          </div>

          <Button text="Fetch Data" loading={isLoading} disabled={isLoading}/>
        </form>)}
    </div>);
};
export default BulkPrintForm;
