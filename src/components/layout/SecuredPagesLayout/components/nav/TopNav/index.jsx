"use client";
import React, { useEffect, useState } from "react";
// import "./style.scss" // Moved to _app;
import { AbiaLogo } from "@/src/components/common/Images";
import { PiUserCircleDuotone } from "react-icons/pi";
import { TbBellRinging } from "react-icons/tb";
import { isBrowser } from "@/src/utils/isBrowser";
import LoaderSkeleton from "@/src/components/common/loader-skeleton";
var TopNav = function () {
    var _a = useState(null), userData = _a[0], setUserData = _a[1];
    useEffect(function () {
        if (isBrowser) {
            var data = window.sessionStorage.getItem("USER_DATA");
            if (data) {
                try {
                    setUserData(JSON.parse(data));
                }
                catch (e) {
                    console.error("Error parsing JSON data:", e);
                    setUserData({});
                }
            }
        }
    }, []);
    return (<div className="top-nav">
      <div className="top-nav_logo">
        <a href="/dashboard" className="logo" aria-label="Abiapay Agents Logo">
          <AbiaLogo />
        </a>
      </div>
      <span className="settings">
        <TbBellRinging className="icon"/>
      </span>
      <div className="top-nav_user">
        {!userData ? (<div className="top-nav_user_skeleton">
            <LoaderSkeleton width="70px" height="10px"/>
            <LoaderSkeleton width="100px" height="10px"/>
          </div>) : (<div className="top-nav_user_data">
            <p>{(userData === null || userData === void 0 ? void 0 : userData.name) || "-"}</p>
            <span>{(userData === null || userData === void 0 ? void 0 : userData.user_cat) || "-"}</span>
          </div>)}

        <a href="/account" className="logo" aria-label="Abiapay Agents Logo">
          <PiUserCircleDuotone className="icon"/>
        </a>
      </div>
    </div>);
};
export default TopNav;
