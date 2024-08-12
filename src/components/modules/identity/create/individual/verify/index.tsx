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
  
  console.log(selectedId)

  return (
    <div>
      {path == "verify" ? (
        <EnterDetailsComponent
          setSelectedId={setSelectedId}
          selectedId={selectedId}
        />
      ) : (
        <ValidateOtpComponent selectedId={selectedId} />
      )}
    </div>
  );
};

export default VerifyComponent;
