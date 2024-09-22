"use client";
import { CustomHeader } from "@/src/components/common/header";
import React, { useState } from "react";
import BulkPrintForm from "./form";
import { useRouter } from "next/navigation";
import { EmblemModal } from "@/src/components/common/modal";

const PrintIDComp = () => {

  return (
    <div>
      <CustomHeader
        title="Bulk ID Cards"
        desc="Print bulk ID cards"
      />

      <BulkPrintForm  />
     
    </div>
  );
};

export default PrintIDComp;
