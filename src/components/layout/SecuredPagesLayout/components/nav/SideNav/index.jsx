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
import React, { useEffect, useState } from "react";
// import "./style.scss" // Moved to _app;
import Link from "next/link";
import useGetRoute from "@/src/hooks/useGetRoute";
import { TbHome, TbTicket, TbLogout2, TbLineScan, TbUser, TbSquareRoundedPlus, TbLayoutGridAdd, } from "react-icons/tb";
import { isBrowser } from "@/src/utils/isBrowser";
var nav_items = [
    {
        name: "dashboard",
        title: "Dashboard",
        icon: <TbHome className="icon"/>,
        access: ["Agent", "Enforcer", "MdaUser"],
    },
    {
        name: "tickets/transport",
        title: "Transport Ticket",
        icon: <TbTicket className="icon"/>,
        access: ["Agent"],
    },
    {
        name: "tickets/verify",
        title: "Verify Ticket",
        icon: <TbLineScan className="icon"/>,
        access: ["Agent"],
    },
    {
        name: "tickets/add",
        title: "Add Tickets",
        icon: <TbSquareRoundedPlus className="icon plus"/>,
        access: ["Agent"],
    },
    {
        name: "user/account",
        title: "My Account",
        icon: <TbUser className="icon"/>,
    },
    {
        name: "user/settings",
        title: "Extras",
        icon: <TbLayoutGridAdd className="icon"/>,
    },
];
var SideNav = function () {
    var route = useGetRoute();
    var _a = useState(null), userData = _a[0], setUserData = _a[1];
    useEffect(function () {
        if (isBrowser) {
            var data = window.sessionStorage.getItem("USER_DATA");
            if (data) {
                try {
                    var parsedData = JSON.parse(data);
                    setUserData(__assign(__assign({}, parsedData), { user_cat: parsedData.user_cat }));
                }
                catch (e) {
                    console.error("Error parsing JSON data:", e);
                    setUserData({});
                }
            }
        }
    }, []);
    return (<div className="side-nav">
      <div className="side-nav_items_container">
        <div className="side-nav_items">
          {nav_items
            .filter(function (item) {
            return !item.access || ((userData === null || userData === void 0 ? void 0 : userData.user_cat) && item.access.includes(userData.user_cat));
        })
            .map(function (item) { return (<Link href={"/".concat(item.name)} key={item.name}>
                <a className={"side-nav_item ".concat(item.name === route ? "active" : "inactive")}>
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </a>
              </Link>); })}
          <Link href={"/signin"} key={"logout"}>
            <a className="side-nav_item logout">
              <span>
                <TbLogout2 className="icon out"/>
              </span>
              <span>Sign Out</span>
            </a>
          </Link>
        </div>
      </div>
    </div>);
};
export default SideNav;
