import React from "react";
import SigninForm from "./form";
import { CustomFormHeader } from "../../common/header";
import "./style.scss";

const SigninComponent = () => {
  return (
    <div className="sigin_component">
      <CustomFormHeader title="Sign in" desc="Signin to your Agents Portal" />
      <SigninForm />
    </div>
  );
};

export default SigninComponent;
