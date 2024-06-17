"use client";

import React, { useEffect } from "react";
import SigninForm from "./form";
import { CustomFormHeader } from "../../common/header";
import "./style.scss";
import { logout, useAuthDispatch } from "@/src/context/authContext";

const SigninComponent = () => {
  const dispatch = useAuthDispatch();
  useEffect(() => {
    handleLogout()
  }, []);

  const handleLogout = () => {
    logout(dispatch);
  };

  return (
    <div className="sigin_component">
      <CustomFormHeader title="Sign in" desc="Signin to your Agents Portal" />
      <SigninForm />
    </div>
  );
};

export default SigninComponent;
