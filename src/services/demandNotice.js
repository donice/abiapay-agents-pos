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
var url = process.env.NEXT_PUBLIC_BASE_URL;
;
;
;
;
export var searchDemandNotice = function (requestData) { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(process.env.NEXT_PUBLIC_CENTRAL_URL, "/cdn/fetch-demand-notice"), requestData)];
            case 1:
                res = _c.sent();
                return [2 /*return*/, res];
            case 2:
                error_1 = _c.sent();
                return [2 /*return*/, {
                        error: ((_b = (_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || "Failed to fetch demand notice",
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var searchCompany = function (requestData) { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_2;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(process.env.NEXT_PUBLIC_CENTRAL_URL, "/cdn/search-company"), requestData)];
            case 1:
                res = _c.sent();
                return [2 /*return*/, res === null || res === void 0 ? void 0 : res.data];
            case 2:
                error_2 = _c.sent();
                return [2 /*return*/, {
                        error: ((_b = (_a = error_2.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || "Failed to search company",
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var assignDemandNotice = function (requestData) { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_3;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(process.env.NEXT_PUBLIC_CENTRAL_URL, "/cdn/assign-abssin-demand-notice"), requestData)];
            case 1:
                res = _c.sent();
                return [2 /*return*/, res];
            case 2:
                error_3 = _c.sent();
                return [2 /*return*/, {
                        error: ((_b = (_a = error_3.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || "Failed to fetch demand notice",
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var assignnoAbssinDemandNotice = function (requestData) { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_4;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(process.env.NEXT_PUBLIC_CENTRAL_URL, "/cdn/assign-demand-notice"), requestData)];
            case 1:
                res = _c.sent();
                return [2 /*return*/, res];
            case 2:
                error_4 = _c.sent();
                return [2 /*return*/, {
                        error: ((_b = (_a = error_4.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || "Failed to fetch demand notice",
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var fetchDemandNotice = function (requestData) { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_5;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(process.env.NEXT_PUBLIC_CENTRAL_URL, "/cdn/fetch-demand-notice"), requestData)];
            case 1:
                res = _c.sent();
                return [2 /*return*/, res];
            case 2:
                error_5 = _c.sent();
                return [2 /*return*/, {
                        error: ((_b = (_a = error_5.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || "Failed to fetch demand notice",
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var fetchBusinessAbssin = function (requestBody) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(url, "/abssin/fetch-business-abssin"), requestBody)];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
            case 2:
                error_6 = _a.sent();
                throw new Error("Error fetching Business Abssin: ".concat(error_6 === null || error_6 === void 0 ? void 0 : error_6.message));
            case 3: return [2 /*return*/];
        }
    });
}); };
export var createDemandNotice = function (requestBody) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(url, "/cdn/create-demand-notice"), requestBody)];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
            case 2:
                error_7 = _a.sent();
                throw new Error("Error creating Demand Notice: ".concat(error_7 === null || error_7 === void 0 ? void 0 : error_7.message));
            case 3: return [2 /*return*/];
        }
    });
}); };
