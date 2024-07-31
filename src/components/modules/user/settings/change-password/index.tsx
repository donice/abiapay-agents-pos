"use client";
import { CustomHeader } from "@/src/components/common/header";
import React, { useState } from "react";
import "./style.scss";
import ProgressBar from "./progressBar";
import ConfirmEmail from "./confirmEmail";

const ChangePasswordComponent = () => {
  const [stage, setStage] = useState(0);
  const [formData, setFormData] = useState({});


  return (
    <div>
      <CustomHeader title="Change Password" desc="Reset agents password" />

      <ProgressBar />

      {stage === 0 && <ConfirmEmail setStage={setStage} formData={formData}/>}
      
    </div>
  );
};

export default ChangePasswordComponent;
