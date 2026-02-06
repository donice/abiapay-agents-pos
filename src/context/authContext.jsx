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
import React, { createContext, useContext, useReducer, useEffect, } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { setToken } from "../services/setToken";
import { isBrowser } from "@/src/utils/isBrowser";
// Initial state
var savedToken = isBrowser && window.sessionStorage.getItem("TOKEN")
    ? window.sessionStorage.getItem("TOKEN")
    : null;
var initialState = {
    isSubmitting: false,
    token: savedToken,
    errors: null,
};
var AuthStateContext = createContext(undefined);
var AuthDispatchContext = createContext(undefined);
var url = process.env.NEXT_PUBLIC_BASE_URL || 'https://sandboxmobileapi.abiapay.ng/api/v1';
var authReducer = function (state, action) {
    switch (action.type) {
        case "SET_LOGIN_SUBMITTING":
            return __assign(__assign({}, state), { isSubmitting: action.payload });
        case "LOGIN":
            return __assign(__assign({}, state), { token: action.payload, errors: null });
        case "SET_LOGIN_ERRORS":
            return __assign(__assign({}, state), { errors: action.payload });
        case "LOGOUT":
            return __assign(__assign({}, state), { token: null });
        default:
            throw new Error("Unhandled action type");
        // throw new Error(`Unhandled action type: ${action.type}`);
    }
};
export var AuthProvider = function (_a) {
    var children = _a.children;
    var _b = useReducer(authReducer, initialState), state = _b[0], dispatch = _b[1];
    useEffect(function () {
        console.log("[Auth] AuthProvider mounted.");
        if (state.token) {
            console.log("[Auth] Setting initial token.");
            setToken(state.token);
        }
    }, [state.token]);
    return (<AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>);
};
export var useAuthState = function () {
    var state = useContext(AuthStateContext);
    if (state === undefined) {
        throw new Error("useAuthState must be used within an AuthProvider");
    }
    return state;
};
export var useAuthDispatch = function () {
    var dispatch = useContext(AuthDispatchContext);
    if (dispatch === undefined) {
        throw new Error("useAuthDispatch must be used within an AuthProvider");
    }
    return dispatch;
};
export var login = function (dispatch, data) { return __awaiter(void 0, void 0, void 0, function () {
    var response, _a, token, body, error_1;
    var _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                console.log("[Auth] Attempting login...", { email: data.email });
                dispatch({ type: "SET_LOGIN_SUBMITTING", payload: true });
                _f.label = 1;
            case 1:
                _f.trys.push([1, 3, 4, 5]);
                return [4 /*yield*/, axios.post("".concat(url, "/user/login"), data)];
            case 2:
                response = _f.sent();
                console.log("[Auth] Login successful response:", response.data);
                _a = response.data, token = _a.token, body = _a.body;
                dispatch({ type: "LOGIN", payload: token });
                setToken(token);
                toast.success((_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.message);
                if (isBrowser) {
                    sessionStorage.setItem("TOKEN", token);
                    sessionStorage.setItem("USER_DATA", JSON.stringify(body));
                    console.log("[Auth] Token and UserData saved to sessionStorage.");
                }
                return [3 /*break*/, 5];
            case 3:
                error_1 = _f.sent();
                console.error("[Auth] Login error:", ((_c = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _c === void 0 ? void 0 : _c.data) || error_1.message);
                dispatch({
                    type: "SET_LOGIN_ERRORS",
                    payload: "Invalid login credentials",
                });
                toast.error((_e = (_d = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.message);
                return [3 /*break*/, 5];
            case 4:
                dispatch({ type: "SET_LOGIN_SUBMITTING", payload: false });
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
export var loginMDA = function (dispatch, data) { return __awaiter(void 0, void 0, void 0, function () {
    var response, _a, token, body, error_2;
    var _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                dispatch({ type: "SET_LOGIN_SUBMITTING", payload: true });
                _e.label = 1;
            case 1:
                _e.trys.push([1, 3, 4, 5]);
                return [4 /*yield*/, axios.post("".concat(url, "/user/mda-login"), data)];
            case 2:
                response = _e.sent();
                _a = response.data, token = _a.token, body = _a.body;
                dispatch({ type: "LOGIN", payload: token });
                setToken(token);
                toast.success((_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.message);
                isBrowser && sessionStorage.setItem("TOKEN", token);
                isBrowser && sessionStorage.setItem("USER_DATA", JSON.stringify(body));
                return [3 /*break*/, 5];
            case 3:
                error_2 = _e.sent();
                dispatch({
                    type: "SET_LOGIN_ERRORS",
                    payload: "Invalid login credentials",
                });
                toast.error((_d = (_c = error_2 === null || error_2 === void 0 ? void 0 : error_2.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message);
                return [3 /*break*/, 5];
            case 4:
                dispatch({ type: "SET_LOGIN_SUBMITTING", payload: false });
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
export var logout = function (dispatch) {
    console.log("[Auth] Performing logout...");
    dispatch({ type: "LOGOUT" });
    setToken(null);
    if (isBrowser) {
        sessionStorage.clear();
        console.log("[Auth] sessionStorage cleared.");
    }
};
