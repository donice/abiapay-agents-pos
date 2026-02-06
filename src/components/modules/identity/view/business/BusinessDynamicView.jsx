"use client";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { CustomFormHeader } from "@/src/components/common/header";
import LargeLoader from "@/src/components/common/loader";
import { getBusinessABSSINs } from "@/src/services/identityService";
import { transformStringWithUnderscores } from "@/src/utils/transformStringWithUnderscores";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { isBrowser } from "@/src/utils/isBrowser";

const BusinessDynamicView = function (_a) {
    var id = _a.id;
    var _b = useState(null), abssinView = _b[0], setAbssinView = _b[1];
    var _c = useState(null), businessData = _c[0], setBusinessData = _c[1];
    var _d = useState("profile"), activeTab = _d[0], setActiveTab = _d[1];

    var formatDate = function (dateString) {
        if (!dateString)
            return "N/A";
        return new Date(dateString).toISOString().split("T")[0];
    };

    var _e = useQuery({
        queryKey: ["businessABSSINData"],
        queryFn: getBusinessABSSINs,
    }), data = _e.data, isLoading = _e.isLoading;

    var _f = useState(null), userData = _f[0], setUserData = _f[1];

    useEffect(function () {
        if (isBrowser) {
            var data_1 = window.sessionStorage.getItem("USER_DATA");
            if (data_1) {
                try {
                    setUserData(JSON.parse(data_1));
                }
                catch (e) {
                    console.error("Error parsing JSON data:", e);
                    setUserData({});
                }
            }
        }
    }, []);

    useEffect(function () {
        if (data) {
            var res = data === null || data === void 0 ? void 0 : data.data;
            setBusinessData(res);
            var abssin = res.find(function (item) { return item.state_id === id; });
            if (abssin) {
                var nonNullFields = Object.entries(abssin)
                    .filter(function (_a) {
                        var _ = _a[0], value = _a[1];
                        return value !== null;
                    })
                    .reduce(function (acc, _a) {
                        var _b;
                        var key = _a[0], value = _a[1];
                        return (__assign(__assign({}, acc), (_b = {}, _b[key] = value, _b)));
                    }, {});
                setAbssinView(nonNullFields);
            }
        }
    }, [data, id]);

    var tabs = __spreadArray([
        { label: "Profile", key: "profile" },
        { label: "Demand Notices", key: "demandNotices" }
    ], ((userData === null || userData === void 0 ? void 0 : userData.user_cat) === "MdaUser"
        ? [{ label: "Bills", key: "bills" }]
        : []), true);

    return isLoading ? (<div className="flex justify-center items-center h-screen">
        <LargeLoader />
    </div>) : abssinView ? (<div className="rounded-lg items-center flex flex-col">
        <CustomFormHeader title="Business ABSSIN Details" desc={"View all details associated with ".concat(id)} />

        <div className="card">
            <div className="overlay" />
            <div className="content">
                <div className="header">
                    <div></div>
                    <div className="title">
                        <p>{abssinView === null || abssinView === void 0 ? void 0 : abssinView.business_name}</p>
                        <p className="abssin">ABSSIN: {(abssinView === null || abssinView === void 0 ? void 0 : abssinView.state_id) || "N/A"}</p>
                    </div>
                    <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Seal_of_the_Senate_of_Nigeria.svg/900px-Seal_of_the_Senate_of_Nigeria.svg.png" alt="Seal" />
                </div>
                <div className="body">
                    <p style={{ fontSize: 18 }}>Business Information</p>
                    <hr />
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <p style={{ fontWeight: 500, color: "black" }}>Status</p>
                                    <p>{(abssinView === null || abssinView === void 0 ? void 0 : abssinView.status) || "N/A"}</p>

                                    <p style={{ fontWeight: 500, color: "black" }}>TIN</p>
                                    <p>{(abssinView === null || abssinView === void 0 ? void 0 : abssinView.tin) || "N/A"}</p>
                                </td>

                                <td>
                                    <p style={{ fontWeight: 500, color: "black" }}>Mobile</p>
                                    <p>{(abssinView === null || abssinView === void 0 ? void 0 : abssinView.mobile) || "N/A"}</p>

                                    <p style={{ fontWeight: 500, color: "black" }}>Business Type</p>
                                    <p>{(abssinView === null || abssinView === void 0 ? void 0 : abssinView.business_type) || "N/A"}</p>
                                </td>

                                <td>
                                    <p style={{ fontWeight: 500, color: "black" }}>Sector</p>
                                    <p>{(abssinView === null || abssinView === void 0 ? void 0 : abssinView.sector) || "N/A"}</p>

                                    <p style={{ fontWeight: 500, color: "black" }}>Date Created</p>
                                    <p>{formatDate((abssinView === null || abssinView === void 0 ? void 0 : abssinView.createtime) || "N/A")}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div className="tabs">
            {tabs.map(function (tab) {
                return (<button key={tab.key} className={"tab ".concat(activeTab === tab.key ? "active" : "")} onClick={function () { return setActiveTab(tab.key); }}>
                    {tab.label}
                </button>);
            })}
        </div>

        <div className="tab-content">
            {activeTab === "profile" && (<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(abssinView).map(function (_a) {
                    var key = _a[0], value = _a[1];
                    return (<div key={key} className="py-4 bg-white rounded-lg shadow-sm flex items-center justify-between border-b-2 border-dashed border-gray-100 p-4">
                        <p className="text-sm font-medium text-gray-600">
                            {transformStringWithUnderscores(key)}
                        </p>
                        <p className="text-sm font-semibold text-gray-800">{String(value)}</p>
                    </div>);
                })}
            </div>)}

            {activeTab === "demandNotices" && (<div className="text-gray-600 p-4">
                <p>Coming Soon.....</p>
            </div>)}

            {activeTab === "bills" && (userData === null || userData === void 0 ? void 0 : userData.user_cat) === "MdaUser" && (<div className="text-gray-600 p-4">
                <p>No bills available....</p>
            </div>)}
        </div>
    </div>) : (<div className="text-center mt-10 text-gray-600">
        <p>No data found for the provided ID.</p>
    </div>);
};

export default BusinessDynamicView;

