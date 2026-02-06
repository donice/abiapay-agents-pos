"use client";
import React, { useEffect } from "react";
import { CustomFormHeader } from "../../common/header";
// import "./style.scss" // Moved to _app;
import { logout, useAuthDispatch } from "@/src/context/authContext";
import Link from "next/link";
import { FcManager, FcPortraitMode } from "react-icons/fc";
var SigninComponent = function () {
    var dispatch = useAuthDispatch();
    useEffect(function () {
        console.log("[Signin] SigninComponent mounted. Clearing session...");
        handleLogout();
        sessionStorage.clear();
    }, []);
    var handleLogout = function () {
        console.log("[Signin] Handling logout...");
        logout(dispatch);
    };
    var channelArr = [
        {
            name: "Agent",
            link: "/signin/agent",
            icon: <FcPortraitMode className="icon"/>
        },
        {
            name: "MDA",
            link: "/signin/mda",
            icon: <FcManager className="icon"/>
        },
    ];
    return (<div className="sigin_component">
      <CustomFormHeader title="Sign in Options" desc="Sign in to your portal"/>

      <div className="channel_container">
        {channelArr.map(function (item) { return (<Link href={item.link} key={item.name}>
            <a className="channel">
              <span>{item.icon}</span>
              <span>{item.name} login</span>
            </a>
          </Link>); })}

      </div>
    </div>);
};
export default SigninComponent;
