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
var url = process.env.NEXT_PUBLIC_BASE_URL;
var portal_url = process.env.NEXT_PUBLIC_PORTAL_URL;
var centralapi_url = process.env.NEXT_PUBLIC_CENTRAL_URL;
var isToken = isBrowser && window.sessionStorage.getItem("TOKEN")
    ? window.sessionStorage.getItem("TOKEN")
    : null;
setToken(isToken);
export var createNewTicket = function (requestData) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(url, "/transport/create-ticket"), requestData)];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
            case 2:
                error_1 = _a.sent();
                throw new Error("Error fetching transactions: ".concat(error_1 === null || error_1 === void 0 ? void 0 : error_1.message));
            case 3: return [2 /*return*/];
        }
    });
}); };
export var createManifest = function (requestData) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(url, "/transport/create-manifest"), requestData)];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
            case 2:
                error_2 = _a.sent();
                throw new Error("Error fetching transactions: ".concat(error_2 === null || error_2 === void 0 ? void 0 : error_2.message));
            case 3: return [2 /*return*/];
        }
    });
}); };
export var createIndividualSportTicket = function (requestData) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(url, "/sport/create-individual-ticket"), requestData)];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
            case 2:
                error_3 = _a.sent();
                throw new Error("Error fetching transactions: ".concat(error_3 === null || error_3 === void 0 ? void 0 : error_3.message));
            case 3: return [2 /*return*/];
        }
    });
}); };
export var createGroupSportTicket = function (requestData) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(url, "/sport/create-group-ticket"), requestData)];
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
export var resendSMS = function (requestData) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(centralapi_url, "/wallet/resend-sms"), requestData)];
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
export var fetchTransactions = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(url, "/transport/transactions"), {
                        page: 1,
                        limit: 200,
                    })];
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
export var fetchAllEmblem = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(url, "/transport/fetch-emblem"), {
                        page: 1,
                        limit: 200,
                    })];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
            case 2:
                error_7 = _a.sent();
                throw new Error("Error fetching transactions: ".concat(error_7 === null || error_7 === void 0 ? void 0 : error_7.message));
            case 3: return [2 /*return*/];
        }
    });
}); };
export var fetchSingleEmblem = function (ref) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.get("".concat(url, "/transport/search-emblem?ref=").concat(ref))];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
            case 2:
                error_8 = _a.sent();
                throw new Error("Error fetching transactions: ".concat(error_8 === null || error_8 === void 0 ? void 0 : error_8.message));
            case 3: return [2 /*return*/];
        }
    });
}); };
export var retryPayment = function (reqData) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(url, "/wallet/access-reproccess-debit"), {
                        payment_ref: reqData === null || reqData === void 0 ? void 0 : reqData.payment_ref,
                        merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY,
                    })];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
            case 2:
                error_9 = _a.sent();
                throw new Error("Error fetching transactions: ".concat(error_9 === null || error_9 === void 0 ? void 0 : error_9.message));
            case 3: return [2 /*return*/];
        }
    });
}); };
export var fetchPlateNumberInfo = function (plate_number) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(url, "/transport/get-plate-number-info"), { plate_number: plate_number })];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
            case 2:
                error_10 = _a.sent();
                throw new Error("Error fetching transactions: ".concat(error_10 === null || error_10 === void 0 ? void 0 : error_10.message));
            case 3: return [2 /*return*/];
        }
    });
}); };
// MARKET ENUMERATION LEVY
export var fetchMarkets = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.get("".concat(url, "/market"))];
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
export var fetchMarketEnumerationDetails = function (_a) {
    var enumeration_id = _a.enumeration_id;
    return __awaiter(void 0, void 0, void 0, function () {
        var data, error_12;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axiosInstance.post("".concat(portal_url, "/payment/enumeration"), {
                            enumeration_id: enumeration_id,
                        })];
                case 1:
                    data = (_b.sent()).data;
                    return [2 /*return*/, data];
                case 2:
                    error_12 = _b.sent();
                    throw new Error("Error fetching transactions: ".concat(error_12 === null || error_12 === void 0 ? void 0 : error_12.message));
                case 3: return [2 /*return*/];
            }
        });
    });
};
export var postPayForMarketLevy = function (reqData) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(url, "/market/market-ticket"), reqData)];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
            case 2:
                error_13 = _a.sent();
                throw new Error("Error fetching transactions: ".concat(error_13 === null || error_13 === void 0 ? void 0 : error_13.message));
            case 3: return [2 /*return*/];
        }
    });
}); };
export var downloadEmblem = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var response, blob, url_1, a, error_14;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch('/api/emblem', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(payload),
                    })];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error('Failed to download emblem');
                }
                return [4 /*yield*/, response.blob()];
            case 2:
                blob = _a.sent();
                url_1 = window.URL.createObjectURL(blob);
                a = document.createElement('a');
                a.href = url_1;
                a.download = "emblem-receipt-".concat(payload.payment_ref, ".pdf");
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url_1);
                document.body.removeChild(a);
                return [3 /*break*/, 4];
            case 3:
                error_14 = _a.sent();
                console.error('Error downloading emblem:', error_14);
                throw error_14;
            case 4: return [2 /*return*/];
        }
    });
}); };
