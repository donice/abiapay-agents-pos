"use client";
import React, { useState } from "react";
// import "./style.scss" // Moved to _app;
import ProgressBar from "./progressBar";
import ConfirmEmail from "./confirmEmail";
import ValidateOTP from "./validateOTP";
import ChangePassword from "./changePassword";
// This component is being called in the forgot-password page and the change-password page
var ChangePasswordComponent = function () {
    var _a = useState(0), stage = _a[0], setStage = _a[1];
    var _b = useState({}), formData = _b[0], setFormData = _b[1];
    console.log(formData);
    return (<div className="password">

      <ProgressBar stage={stage} setStage={setStage}/>

      {stage === 0 && <ConfirmEmail setStage={setStage} setFormData={setFormData}/>}
      {stage === 1 && <ValidateOTP setStage={setStage} setFormData={setFormData} formData={formData}/>}
      {stage === 2 && <ChangePassword setStage={setStage} setFormData={setFormData} formData={formData}/>}
      
    </div>);
};
export default ChangePasswordComponent;
