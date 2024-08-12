"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import EnterDetailsComponent from "./enterDetails";
import ValidateOtpComponent from "./validateOtp/page";
import { getLastPathSegment } from "@/src/utils/getLastPathSegment";

const VerifyComponent = () => {
  const pathname = usePathname();
  const path = getLastPathSegment(pathname);
  const [selectedId, setSelectedId] = useState("");

  return (
    <div>
      {path == "validate-otp" ? (
        <ValidateOtpComponent selectedId={selectedId} />
      ) : (
        <EnterDetailsComponent setSelectedId={setSelectedId} selectedId={selectedId} />
      )}
    </div>
  );
};

export default VerifyComponent;
