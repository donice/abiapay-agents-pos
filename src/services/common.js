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
var portal_url_2 = process.env.NEXT_PUBLIC_PORTAL_URL_2;
var central_api_url = process.env.NEXT_PUBLIC_CENTRAL_URL;
var isToken = isBrowser && window.sessionStorage.getItem("TOKEN")
    ? window.sessionStorage.getItem("TOKEN")
    : null;
setToken(isToken);
export var fetchBanks = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(url, "/banks"))];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.data];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var fetchABSSINInfo = function (reqData) { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(url, "/abssin/abssin-info"), reqData)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.data];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var fetchABSSINInfoWIthPhone = function (reqData) { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(portal_url_2, "/user/individual/phone"), reqData)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.data];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var fetchLGAData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(url, "/state/lga"))];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.data];
            case 2:
                error_4 = _a.sent();
                console.log(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var fetchStates = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(url, "/state"))];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.data];
            case 2:
                error_5 = _a.sent();
                console.log(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var fetchLocationStateLGA = function (_a) {
    var stateId = _a.stateId;
    return __awaiter(void 0, void 0, void 0, function () {
        var res, error_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axiosInstance.get("".concat(portal_url_2, "/location/states/lga?stateId=").concat(stateId))];
                case 1:
                    res = _b.sent();
                    return [2 /*return*/, res.data];
                case 2:
                    error_6 = _b.sent();
                    console.log(error_6);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
export var fetchLocationState = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.get("".concat(portal_url_2, "/location/states"))];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.data];
            case 2:
                error_7 = _a.sent();
                console.log(error_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var fetchVehicleCategories = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.get("".concat(portal_url, "/enumeration/vehicle-category"))];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.data];
            case 2:
                error_8 = _a.sent();
                console.log(error_8);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var fetchParks = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.get("".concat(url, "/parks"))];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.data];
            case 2:
                error_9 = _a.sent();
                console.log(error_9);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var fetchTradeUnions = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.get("".concat(url, "/enumeration/unions"))];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.data];
            case 2:
                error_10 = _a.sent();
                console.log(error_10);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var fetchProducts = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.get("".concat(central_api_url, "/agent/product-code"))];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res];
            case 2:
                error_11 = _a.sent();
                console.log(error_11);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var fetchTaxOffice = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(portal_url, "/user/station"))];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.data];
            case 2:
                error_12 = _a.sent();
                console.log(error_12);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var fetchSchool = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.get("".concat(portal_url_2, "/user/school-list"))];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.data];
            case 2:
                error_13 = _a.sent();
                console.log(error_13);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var fetchCategory = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_14;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.post("".concat(portal_url, "/cdn/category"))];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.data];
            case 2:
                error_14 = _a.sent();
                console.log(error_14);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var fetchVehicleCategory = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_15;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.get("".concat(portal_url, "/enumeration/vehicle-category"))];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.data];
            case 2:
                error_15 = _a.sent();
                console.log(error_15);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var fetchSector = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_16;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.get("".concat(portal_url, "/user/sector"))];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.data];
            case 2:
                error_16 = _a.sent();
                console.log(error_16);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var fetchBusinessType = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_17;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.get("".concat(portal_url, "/user/business-type"))];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.data];
            case 2:
                error_17 = _a.sent();
                console.log(error_17);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var fetchOrganization = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_18;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.get("".concat(portal_url, "/user/sector"))];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.data];
            case 2:
                error_18 = _a.sent();
                console.log(error_18);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
