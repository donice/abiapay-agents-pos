"use client";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
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
import React, { useEffect, useReducer, useCallback, useState, } from "react";
import StatsCard from "./statsCard";
import { SecondaryButton } from "@/src/components/common/button";
// import "./style.scss" // Moved to _app;
import { CustomHeader } from "@/src/components/common/header";
import { fetchDashboardData, fetchABSSINData, fetchEnumerationData, fetchTotalABSSIN, } from "@/src/services/dashboardService";
import toast from "react-hot-toast";
import LoaderSkeleton from "../../common/loader-skeleton";
import { isBrowser } from "@/src/utils/isBrowser";
import { WalletCard } from "./walletCard";
import { fetchTransactions } from "@/src/services/ticketsServices";
import QuickLink from "./quickLink";
import MdaCard from "./mdaCard";
import { useQuery } from "@tanstack/react-query";
import { fetchReceipts } from "@/src/services/receiptsServices";
import { fetchBills } from "@/src/services/billServices";
import EnforcerCard from "./enforcerCard";
import { appMetadata } from "@/src/lib/app";
var MDA_KEYS = {
    ministry_of_transport: "29001001",
    absaa: "11100104",
    board_of_iternal_revenue: "20008001",
};
function filterByTodaysDate(transactions) {
    var today = new Date().toISOString().split("T")[0];
    return transactions.filter(function (transaction) {
        return transaction.trans_date.split("T")[0] === today;
    });
}
var initialState = {
    fidelityData: {
        total_credit: null,
        total_debit: null,
        balance: null,
        earnings: null,
        account_name: null,
        account_number: null,
        bank_name: null,
    },
    accessData: {
        current_earnings: null,
        wallet_balance: null,
        wallet_id: null,
        wallet_name: null,
    },
    loading: true,
};
var reducer = function (state, action) {
    switch (action.type) {
        case "FETCH_SUCCESS":
            return __assign(__assign({}, state), { fidelityData: action.payload.fidelityData, accessData: action.payload.accessData, loading: false });
        case "FETCH_ERROR":
            return __assign(__assign({}, state), { loading: false });
        default:
            return state;
    }
};
var DashboardComponent = function () {
    var _a, _b;
    var _c = useReducer(reducer, initialState), state = _c[0], dispatch = _c[1];
    var _d = React.useState(0), abssinCount = _d[0], setABSSINCount = _d[1];
    var _e = React.useState(null), enumerationCount = _e[0], setEnumerationCount = _e[1];
    var _f = React.useState(null), ttCount = _f[0], setTtCount = _f[1];
    var _g = useState(null), userData = _g[0], setUserData = _g[1];
    useEffect(function () {
        console.log("[Dashboard] Initializing data from sessionStorage...");
        if (isBrowser) {
            var data = window.sessionStorage.getItem("USER_DATA");
            if (data) {
                try {
                    var parsedData = JSON.parse(data);
                    console.log("[Dashboard] Parsed user data:", parsedData);
                    setUserData(parsedData);
                }
                catch (e) {
                    console.error("[Dashboard] Error parsing USER_DATA from sessionStorage:", e);
                    setUserData({});
                }
            }
            else {
                console.warn("[Dashboard] No USER_DATA found in sessionStorage.");
            }
        }
    }, []);
    useEffect(function () {
        if (isBrowser) {
            var data = window.sessionStorage.getItem("USER_DATA");
            if (data) {
                try {
                    // setUserData(JSON.parse(data)); // Duplicate call?
                    // Get location once user logs in
                    if (navigator.geolocation) {
                        console.log("[Dashboard] Requesting geolocation...");
                        navigator.geolocation.getCurrentPosition(function (pos) {
                            var geoString = "".concat(pos.coords.latitude, ",").concat(pos.coords.longitude);
                            console.log("[Dashboard] Geolocation obtained:", geoString);
                            sessionStorage.setItem("USER_GEOLOCATION", geoString);
                        }, function (err) {
                            console.error("[Dashboard] Geolocation error:", err);
                            toast.error("Unable to fetch location. Please allow location access.");
                        });
                    }
                }
                catch (e) {
                    console.error("[Dashboard] Error during initialization:", e);
                }
            }
        }
    }, []);
    // ! using useCallback to memoize the data coming from the services
    const getDashboardData = useCallback(function () {
        return __awaiter(void 0, void 0, void 0, function () {
            let res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("[Dashboard] Fetching dashboard data...");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fetchDashboardData()];
                    case 2:
                        res = _a.sent();
                        console.log("[Dashboard] Dashboard data fetched successfully:", res);
                        dispatch({
                            type: "FETCH_SUCCESS",
                            payload: {
                                fidelityData: res.fidelity,
                                accessData: res.access,
                            },
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("[Dashboard] Error fetching dashboard data:", error_1);
                        // toast.error("Error fetching dashboard data");
                        dispatch({type: "FETCH_ERROR"});
                        return [3 /*break*/, 4];
                    case 4:
                        return [2 /*return*/];
                }
            });
        });
    }, []);
    var getABSSINData = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchABSSINData()];
                case 1:
                    res = _a.sent();
                    setABSSINCount(res === null || res === void 0 ? void 0 : res.data.length);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    toast.error("Cannot fetch abssin data");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }, []);
    var getTotalABSSIN = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchTotalABSSIN()];
                case 1:
                    res = _a.sent();
                    setABSSINCount(res === null || res === void 0 ? void 0 : res.data.length);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    toast.error("Cannot fetch abssin data");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }, []);
    const getEnumerationDailyData = useCallback(function () {
        return __awaiter(void 0, void 0, void 0, function () {
            var res, error_4;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fetchEnumerationData()];
                    case 1:
                        res = _e.sent();
                        setEnumerationCount(((_b = (_a = res === null || res === void 0 ? void 0 : res.response_data) === null || _a === void 0 ? void 0 : _a.transport) === null || _b === void 0 ? void 0 : _b.thisDay) +
                            ((_d = (_c = res === null || res === void 0 ? void 0 : res.response_data) === null || _c === void 0 ? void 0 : _c.market) === null || _d === void 0 ? void 0 : _d.thisDay));
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _e.sent();
                        toast.error("Cannot fetch enumeration data");
                        return [3 /*break*/, 3];
                    case 3:
                        return [2 /*return*/];
                }
            });
        });
    }, []);
    const getTransportTicketData = useCallback(function () {
        return __awaiter(void 0, void 0, void 0, function () {
            var res, todaysTickets, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fetchTransactions()];
                    case 1:
                        res = _a.sent();
                        todaysTickets = filterByTodaysDate(res === null || res === void 0 ? void 0 : res.data);
                        setTtCount(todaysTickets.length);
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        toast.error("Cannot fetch ticket data");
                        return [3 /*break*/, 3];
                    case 3:
                        return [2 /*return*/];
                }
            });
        });
    }, []);
    const _h = useQuery({
        queryKey: ["get_receipts"],
        queryFn: function () {
            return fetchReceipts();
        },
    }), receiptData = _h.data, receiptLoading = _h.isLoading;
    var _j = useQuery({
        queryKey: ["get_bills"],
        queryFn: function () {
            return fetchBills();
        },
    }), billsData = _j.data, billsLoading = _j.isLoading;
    var fetched_data = (billsData === null || billsData === void 0 ? void 0 : billsData.response_data) || [];
    // console.log(receiptData, "RECEIPT DATA");
    useEffect(function () {
        console.log("[Dashboard] Component mounted. Starting aggregate data fetch...");
        getDashboardData();
        getABSSINData();
        getEnumerationDailyData();
        getTransportTicketData();
        getTotalABSSIN();
    }, []);
    var fidelityData = state.fidelityData, accessData = state.accessData, loading = state.loading;
    console.log("userData", userData);
    return (<div className="dashboard">
      <header className="dashboard_header">
        <CustomHeader title={"Welcome".concat((userData === null || userData === void 0 ? void 0 : userData.name) && ", ".concat(userData === null || userData === void 0 ? void 0 : userData.name))} desc={(userData === null || userData === void 0 ? void 0 : userData.user_cat) == "MdaUser"
            ? "".concat(userData === null || userData === void 0 ? void 0 : userData.mda_name, " Dashboard")
            : "Overview of your dashboard"}/>
        {(userData === null || userData === void 0 ? void 0 : userData.user_cat) == "MdaUser" ||
            (userData === null || userData === void 0 ? void 0 : userData.user_cat) == "Enforcer" ||
            (userData === null || userData === void 0 ? void 0 : userData.user_cat) == "Enforcer" ? null : (<div className="dashboard_header_buttons">
            <SecondaryButton text="Akara Ekwenti" link="/find/using-phone-number"/>
            {/* <PrimaryButton
              text="Sharp Sharp"
              link="/find/using-plate-number"
              addIcon={true}
            /> */}
          </div>)}
      </header>

      {(userData === null || userData === void 0 ? void 0 : userData.user_cat) == "MdaUser" ||
            (userData === null || userData === void 0 ? void 0 : userData.user_cat) == "Enforcer" ? null : !loading ? (<div className="dashboard_wallets">
            {((_a = appMetadata.banksAllowed.find(function (b) { return b.value === "access"; })) === null || _a === void 0 ? void 0 : _a.allowed) && <WalletCard bank="access" data={accessData}/>}

            {((_b = appMetadata.banksAllowed.find(function (b) { return b.value === "fidelity"; })) === null || _b === void 0 ? void 0 : _b.allowed) && <WalletCard bank="fidelity" data={fidelityData}/>}
          </div>) : (<div className="dashboard_wallets_skeleton">
          <LoaderSkeleton />
          <LoaderSkeleton />
        </div>)}

      {(userData === null || userData === void 0 ? void 0 : userData.user_cat) == "MdaUser" ? (<div className="dashboard_mda_stats">
          <MdaCard name="Bills" amount={(billsData === null || billsData === void 0 ? void 0 : billsData.response_data) == null
                ? 0
                : billsData === null || billsData === void 0 ? void 0 : billsData.response_data.length.toString()} link="/bills"/>
          <MdaCard name="Receipts" amount={receiptData == null ? 0 : receiptData.length.toString()} link="/receipts"/>
        </div>) : (userData === null || userData === void 0 ? void 0 : userData.user_cat) == "Enforcer" ? (<div className="dashboard_enf_stats">
          <EnforcerCard name="Fines" amount={(billsData === null || billsData === void 0 ? void 0 : billsData.response_data) == null
                ? 0
                : billsData === null || billsData === void 0 ? void 0 : billsData.response_data.length.toString()} link="/bills"/>
        </div>) : abssinCount != null && enumerationCount != null ? (<div className="dashboard_stats">
          <StatsCard name="Tickets" amount={ttCount == null ? 0 : ttCount.toString()} link="/tickets"/>
          <StatsCard name="ABSSIN" amount={abssinCount == null ? 0 : abssinCount.toString()} link="identity"/>
          <StatsCard name="Enumeration" amount={enumerationCount == null ? 0 : enumerationCount.toString()} link="/enumeration"/>
        </div>) : (<div className="dashboard_stats_skeleton">
          <LoaderSkeleton height="100px"/>
          <LoaderSkeleton height="100px"/>
          <LoaderSkeleton height="100px"/>
        </div>)}

      <div className="dashboard_quicklinks">
        {(userData === null || userData === void 0 ? void 0 : userData.mda) == MDA_KEYS.absaa && (<>
            <QuickLink name="ABSSAA" link="/absaa/signage"/>
          </>)}
        {((userData === null || userData === void 0 ? void 0 : userData.mda) == MDA_KEYS.ministry_of_transport ||
            (userData === null || userData === void 0 ? void 0 : userData.mda) == MDA_KEYS.board_of_iternal_revenue) && (<>
              <QuickLink name="Bulk Prints" link="/prints"/>
            </>)}
        {(userData === null || userData === void 0 ? void 0 : userData.user_cat) == "MdaUser" && (<>
            {" "}
            <QuickLink name="Identity" link="/identity"/>{" "}
            <QuickLink name="Contract Management" link="/contract"/>
            <QuickLink name="Bills" link="/bills"/>{" "}
            {/* {userData?.mda =="20008001" && */}
            <QuickLink name="Demand Notices" comingSoon={false} link="/demand-notices"/>
            {/* } */}
            <QuickLink name="Receipts" link="/receipts"/>
          </>)}

        {(userData === null || userData === void 0 ? void 0 : userData.user_cat) == "Enforcer" && (<>
            <QuickLink name="Verify Vehicle Status" link="/vehicle-status"/>
            <QuickLink name="Traffic Offence Ticket" link="/traffic-offence"/>
            <QuickLink name="Verify Ticket Status" link="/verify-ticket"/>
            {/* <QuickLink name="Vehicle Impound" link="/vehicle-impound"  /> */}
          </>)}
      </div>
    </div>);
};
export default DashboardComponent;
