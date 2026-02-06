"use client";
import React from "react";
import { usePathname } from "@/src/utils/navigation";
import EnterDetailsComponent from "./enterDetails";
import ValidateOtpComponent from "./validateOtp";
import { getLastPathSegment } from "@/src/utils/getLastPathSegment";
var VerifyComponent = function () {
    var pathname = usePathname();
    var path = getLastPathSegment(pathname);
    return (<div>
      {path == "verify" ? <EnterDetailsComponent /> : <ValidateOtpComponent />}
    </div>);
};
export default VerifyComponent;
