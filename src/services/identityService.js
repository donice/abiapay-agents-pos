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
import axiosInstance from "../lib/axiosInstance";
import { isBrowser } from "@/src/utils/isBrowser";
import { setToken } from "./setToken";
import { https } from "../lib/axiosInstance";
import toast from "react-hot-toast";
import { getErrorMessages } from "../utils/helper";
export var url = process.env.NEXT_PUBLIC_BASE_URL;
var portal_url = process.env.NEXT_PUBLIC_PORTAL_URL;
var isToken = isBrowser && window.sessionStorage.getItem("TOKEN")
    ? window.sessionStorage.getItem("TOKEN")
    : null;
setToken(isToken);
export var validateID = function (requestData) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(url, "/abssin/validate-ids"), requestData)];
            case 1:
                data = (_b.sent()).data;
                return [2 /*return*/, data];
            case 2:
                error_1 = _b.sent();
                console.log(error_1);
                toast.error(getErrorMessages((_a = error_1 === null || error_1 === void 0 ? void 0 : error_1.data) === null || _a === void 0 ? void 0 : _a.message) || "Error validating ID");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var fetchABSSINStats = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.get("".concat(url, "/abssin/statistics"))];
            case 1:
                data = (_b.sent()).data;
                return [2 /*return*/, data];
            case 2:
                error_2 = _b.sent();
                console.log(error_2);
                toast.error(getErrorMessages((_a = error_2 === null || error_2 === void 0 ? void 0 : error_2.data) === null || _a === void 0 ? void 0 : _a.message) || "Error fetching OTP stats");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var validateNoID = function (requestData) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(url, "/user/otp-request-no-id"), requestData)];
            case 1:
                data = (_b.sent()).data;
                return [2 /*return*/, data];
            case 2:
                error_3 = _b.sent();
                console.log(error_3);
                toast.error(getErrorMessages((_a = error_3 === null || error_3 === void 0 ? void 0 : error_3.data) === null || _a === void 0 ? void 0 : _a.message) || "Error validating ID");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var validateIDOtp = function (requestData) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(url, "/abssin/verify-otp"), requestData)];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
            case 2:
                error_4 = _a.sent();
                throw new Error("Error fetching transactions: ".concat(error_4 === null || error_4 === void 0 ? void 0 : error_4.message));
            case 3: return [2 /*return*/];
        }
    });
}); };
export var getBVNInfo = function (requestData) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(url, "/agent/bvn-info"), requestData)];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
            case 2:
                error_5 = _a.sent();
                throw new Error("Error fetching transactions: ".concat(error_5 === null || error_5 === void 0 ? void 0 : error_5.message));
            case 3: return [2 /*return*/];
        }
    });
}); };
export var getNINInfo = function (requestData) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(url, "/agent/nin-info"), requestData)];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
            case 2:
                error_6 = _a.sent();
                throw new Error("Error fetching transactions: ".concat(error_6 === null || error_6 === void 0 ? void 0 : error_6.message));
            case 3: return [2 /*return*/];
        }
    });
}); };
export var validateNoIDOtp = function (requestData) { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_7;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 2, , 3]);
                return [4 /*yield*/, https("".concat(url, "/user/verifying-no-id-otp"), {
                        method: "POST",
                        body: JSON.stringify(requestData),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })];
            case 1:
                res = _d.sent();
                return [2 /*return*/, res];
            case 2:
                error_7 = _d.sent();
                console.log((_a = error_7 === null || error_7 === void 0 ? void 0 : error_7.data) === null || _a === void 0 ? void 0 : _a.message);
                toast.error((_b = error_7 === null || error_7 === void 0 ? void 0 : error_7.data) === null || _b === void 0 ? void 0 : _b.message);
                throw new Error("".concat((_c = error_7 === null || error_7 === void 0 ? void 0 : error_7.data) === null || _c === void 0 ? void 0 : _c.message));
            case 3: return [2 /*return*/];
        }
    });
}); };
export var createIndividualAbssin = function (requestData) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_8;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, https("".concat(url, "/abssin/register-abssin-individual"), {
                        method: "POST",
                        body: JSON.stringify(requestData),
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer ".concat(window.sessionStorage.getItem("TOKEN") || isToken || ""),
                        },
                    })];
            case 1:
                data = _b.sent();
                return [2 /*return*/, data];
            case 2:
                error_8 = _b.sent();
                toast.error(getErrorMessages((_a = error_8 === null || error_8 === void 0 ? void 0 : error_8.data) === null || _a === void 0 ? void 0 : _a.response_message) ||
                    "Error creating individual abssin account");
                console.log(error_8);
                throw new Error("Error fetching transactions: ".concat(error_8));
            case 3: return [2 /*return*/];
        }
    });
}); };
export var createInfantABSSIN = function (requestData) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, https("".concat(portal_url, "/user/create-infant"), {
                        method: "POST",
                        body: JSON.stringify(requestData),
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer ".concat(window.sessionStorage.getItem("TOKEN") || isToken || ""),
                        },
                    })];
            case 1:
                data = _a.sent();
                return [2 /*return*/, data];
            case 2:
                error_9 = _a.sent();
                console.log(error_9 === null || error_9 === void 0 ? void 0 : error_9.data);
                toast.error(getErrorMessages(error_9 === null || error_9 === void 0 ? void 0 : error_9.data) ||
                    "Error creating individual abssin account");
                console.log(error_9);
                throw new Error("Error fetching transactions: ".concat(error_9));
            case 3: return [2 /*return*/];
        }
    });
}); };
export var createBusinessAbssin = function (requestData) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_10;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, https("".concat(url, "/abssin/register-abssin-business"), {
                        method: "POST",
                        body: JSON.stringify(requestData),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })];
            case 1:
                data = _b.sent();
                return [2 /*return*/, data];
            case 2:
                error_10 = _b.sent();
                toast.error(getErrorMessages((_a = error_10 === null || error_10 === void 0 ? void 0 : error_10.data) === null || _a === void 0 ? void 0 : _a.response_message) ||
                    "Error creating individual abssin account");
                console.log(error_10);
                throw new Error("Error fetching transactions: ".concat(error_10));
            case 3: return [2 /*return*/];
        }
    });
}); };
export var getIndividualABSSINs = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(url, "/abssin/manage-individual"))];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
            case 2:
                error_11 = _a.sent();
                throw new Error("Error fetching transactions: ".concat(error_11 === null || error_11 === void 0 ? void 0 : error_11.message));
            case 3: return [2 /*return*/];
        }
    });
}); };
export var getBusinessABSSINs = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(url, "/abssin/manage-business"))];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
            case 2:
                error_12 = _a.sent();
                throw new Error("Error fetching transactions: ".concat(error_12 === null || error_12 === void 0 ? void 0 : error_12.message));
            case 3: return [2 /*return*/];
        }
    });
}); };
export var postRegisterBulkAbssin = function (_a) {
    var file = _a.file;
    return __awaiter(void 0, void 0, void 0, function () {
        var data, error_13;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axiosInstance.post("".concat(url, "/abssin/bulk-school-registration"), {
                            file: file
                        })];
                case 1:
                    data = (_b.sent()).data;
                    return [2 /*return*/, data];
                case 2:
                    error_13 = _b.sent();
                    throw new Error("Error fetching transactions: ".concat(error_13 === null || error_13 === void 0 ? void 0 : error_13.message));
                case 3: return [2 /*return*/];
            }
        });
    });
};
