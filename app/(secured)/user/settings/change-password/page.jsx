import { CustomHeader } from "@/src/components/common/header";
import ChangePasswordComponent from "@/src/components/modules/user/settings/change-password";
import React from "react";
export var metadata = {
    title: "Change Password",
    description: "Reset Password for agent's account",
};
var ChangePasswordPage = function () {
    return (<div>
      <CustomHeader title="Change Password" desc="Reset agents password"/>
      <ChangePasswordComponent />
    </div>);
};
export default ChangePasswordPage;
