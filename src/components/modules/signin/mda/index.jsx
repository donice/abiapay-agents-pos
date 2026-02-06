"use client";
import React, { useEffect } from "react";
import { CustomFormHeader } from "../../../common/header";
// import "./style.scss" // Moved to _app;
import { logout, useAuthDispatch } from "@/src/context/authContext";
import MDASigninForm from "./form";
var MDASigninComponent = function () {
    var dispatch = useAuthDispatch();
    useEffect(function () {
        handleLogout();
        sessionStorage.clear();
    }, []);
    var handleLogout = function () {
        logout(dispatch);
    };
    return (<div className="sigin_component">
      <CustomFormHeader title="MDA Sign in" desc="Sign in to your agents portal"/>
      <MDASigninForm />
    </div>);
};
export default MDASigninComponent;
