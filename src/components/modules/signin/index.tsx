import React from "react";
import SigninForm from "./form";
import { CustomFormHeader } from "../../common/header";

const SigninComponent = () => {
  return (
    <div>
      <CustomFormHeader title="Signin" desc="Manage/Create Transaction" />
      <SigninForm />
    </div>
  );
};

export default SigninComponent;
