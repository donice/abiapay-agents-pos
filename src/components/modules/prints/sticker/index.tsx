"use client";
import { CustomHeader } from "@/src/components/common/header";
import React, { useState } from "react";
import BulkPrintForm from "./form";
import BulkComp from "./bulk";

const PrintIDComp = () => {
  const [viewData, setViewData] = useState("form");
  const [bulkData, setBulkData] = useState<[] | null>(null);

  return (
    <div>
      <CustomHeader title="Bulk Stickers" desc="Print bulk stickers" />
      {viewData == "form" ? (
        <BulkPrintForm setViewData={setViewData} setBulkData={setBulkData} />
      ) : viewData == "data" ? (
        <BulkComp bulkData={bulkData} />
      ): null}
    </div>
  );
};

export default PrintIDComp;
