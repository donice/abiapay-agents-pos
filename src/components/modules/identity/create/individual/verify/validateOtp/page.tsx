import React from "react";
import { FormTextInput } from "@/src/components/common/input";
import { Button } from "@/src/components/common/button";
import "../../style.scss";
import { CustomHeader } from "@/src/components/common/header";

const ValidateOtpComponent = ({ selectedId }: { selectedId: string }) => {
  console.log(selectedId);
  
  return (
    <div>
      <CustomHeader
        title={"Validate OTP"}
        desc={"Enter token to validate ID"}
      />
      <form className="identity-form">
        <FormTextInput label={"OTP"} name="otp" placeholder={"Enter OTP"} />
        <Button text={"Validate OTP"} />
      </form>
    </div>
  );
};

export default ValidateOtpComponent;
