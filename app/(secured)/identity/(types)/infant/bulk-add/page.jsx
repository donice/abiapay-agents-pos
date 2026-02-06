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
import { Button, CancelButton } from "@/src/components/common/button";
import { CustomHeader } from "@/src/components/common/header";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { TbCloudUpload, TbFileDownload, TbRosetteDiscountCheckFilled, } from "react-icons/tb";
import { downloadCSV } from "./csv";
import toast from "react-hot-toast";
import CustomDialog from "@/src/components/common/modal/CustomDialog";
var FileUpload = function () {
    var _a = useState(null), file = _a[0], setFile = _a[1];
    var _b = useState(false), dragActive = _b[0], setDragActive = _b[1];
    var _c = useState(0), totalRecords = _c[0], setTotalRecords = _c[1];
    var handleFileSelect = function (event) {
        if (event.target.files && event.target.files.length > 0) {
            var selectedFile = event.target.files[0];
            if (selectedFile.type !== "text/csv") {
                toast.error("❌ Please upload a valid CSV file.");
                return;
            }
            setFile(selectedFile);
        }
    };
    var handleDragOver = function (event) {
        event.preventDefault();
        setDragActive(true);
    };
    var handleDragLeave = function () {
        setDragActive(false);
    };
    var handleDrop = function (event) {
        event.preventDefault();
        setDragActive(false);
        if (event.dataTransfer.files.length > 0) {
            var droppedFile = event.dataTransfer.files[0];
            if (droppedFile.type !== "text/csv") {
                toast.error("❌ Please upload a valid CSV file.");
                return;
            }
            setFile(droppedFile);
        }
    };
    var handleUpload = function () { return __awaiter(void 0, void 0, void 0, function () {
        var formData, response, data, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!file) {
                        toast.custom("⚠️ Please select a file first.");
                        return [2 /*return*/];
                    }
                    formData = new FormData();
                    formData.append("file", file);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("https://sandboxmobileapi.abiapay.com/api/v1/abssin/bulk-school-registration", {
                            method: "POST",
                            body: formData,
                        })];
                case 2:
                    response = _b.sent();
                    if (!response.ok)
                        throw new Error("Upload failed");
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _b.sent();
                    setTotalRecords(data.total_records);
                    setFile(null);
                    toast.success("\u2705 Success: ".concat(data.response_message, ", Records: ").concat(data.total_records));
                    (_a = document.getElementById("createInfantABSSINDialog")) === null || _a === void 0 ? void 0 : _a.showModal();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _b.sent();
                    toast.error("❌ Upload failed. Please try again.");
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var _d = useMutation({
        mutationFn: handleUpload,
    }), mutate = _d.mutate, isPending = _d.isPending;
    return (<div className="max-w-md mx-auto bg-white rounded-lg w-full grid gap-4">
      <CustomHeader title="Bulk Dependent ABSSIN" desc="Create Bulk ABSSIN for dependents"/>
      <div onClick={downloadCSV} className="border-2 border-green-400 bg-green-100 p-4 rounded-lg flex items-center gap-2 my-0 md:my-4 cursor-pointer">
        <TbFileDownload className="text-5xl text-green-500"/>
        <p className="text-xs text-green-600">
          Click here to download the example CSV file for bulk upload of
          dependent ABSSIN
        </p>
      </div>
      <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={"p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition\n          border-blue-500 bg-blue-100\n        "}>
        <input type="file" accept=".csv" onChange={handleFileSelect} className="hidden" id="fileInput"/>
        <label htmlFor="fileInput" className="block cursor-pointer">
          {dragActive ? (<p className="text-blue-600">Drop the file here...</p>) : (<p className="text-gray-600 flex flex-col items-center justify-center">
              <TbCloudUpload className="text-4xl text-blue-500 "/>
              <br />
              Drag & drop a CSV file here, or click to select one. Only .csv
              files are allowed.
            </p>)}
        </label>
      </div>

      {file && (<p className="mt-2 text-sm text-green-600">
          Selected file: <strong>{file.name}</strong>
        </p>)}

      <Button onClick={function () { return mutate(); }} text={isPending ? "Creating Bulk ABSSIN..." : "Create Bulk ABSSIN"} loading={isPending} disabled={isPending || !file}/>

      <CustomDialog id="createInfantABSSINDialog" onClose={function () {
            var _a;
            return (_a = document.getElementById("createInfantABSSINDialog")) === null || _a === void 0 ? void 0 : _a.close();
        }}>
        <div className="flex gap-1 items-center justify-center flex-col text-center">
          <TbRosetteDiscountCheckFilled className="text-green-600 text-7xl"/>
          <h1 className="text-lg font-semibold">Created Successfully</h1>
          <p className="text-xs md:text-sm text-gray-400 max-w-[14rem]">
            You have successfully created {totalRecords} Infant ABSSINs
          </p>
          <div className="w-full grid grid-cols-2 gap-2 mt-4">
            <CancelButton link={"/identity"}/>
            <Button text="Create New" onClick={function () {
            var _a;
            (_a = document.getElementById("createInfantABSSINDialog")) === null || _a === void 0 ? void 0 : _a.close();
        }}/>
          </div>
        </div>
      </CustomDialog>
    </div>);
};
export default FileUpload;
