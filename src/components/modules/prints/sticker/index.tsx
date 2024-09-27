"use client";
import { CustomHeader } from "@/src/components/common/header";
import React, { useState, useRef } from "react";
import BulkPrintForm from "./form";
import BulkComp from "./bulk";
import { Button } from "@/src/components/common/button";

const PrintIDComp = () => {
  const [viewData, setViewData] = useState("form");
  const [bulkData, setBulkData] = useState<[] | null>(null);

  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;

      const printWindow = window.open("", "", "width=900,height=600");

      if (printWindow) {
        printWindow.document.write(`
          <html>
          <head>
            <title>Print Stickers</title>
            <style>
              @media print {
                .bulk-print-item {
                  page-break-after: always;
                  counter-increment: bulk-item;
                }
                .bulk-print-item:nth-child(3n) {
                  page-break-after: always;
                }
              }
  
              /* Grid Layout for Stickers */
              .bulk-sticker {
                display: grid;
                grid-template-columns: repeat(2, minmax(0, 1fr));
              }
  
              @media (max-width: 768px) {
                .bulk-sticker {
                  grid-template-columns: repeat(1, minmax(0, 1fr));
                }
              }
  
              .bulk-sticker .card {
  margin-top: 2rem;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  gap: 1rem;
  background-image: url("../../../../../../public/prints/sticker-bg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  padding: 1rem;
  border-radius: 0.5rem;
  width: 32rem;
  height: 32rem;
  border: 2px solid rgb(240, 240, 240);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}

  
              .bulk-sticker .card-tag {
  position: absolute;
  top: 5rem;
  right: 2.5rem;
  font-weight: 700;
  color: red;
  font-size: 1rem;
  padding: 0.5rem;
}
  
             .bulk-sticker .card-id {
  position: absolute;
  top: 10rem;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 600;
  font-family: serif;
  font-size: 2.5rem;
  padding: 0.5rem;
}

.bulk-sticker .card-vehicle {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 600;
  font-family: serif;
  font-size: 2.9rem;
  padding: 1.5rem;
}
  
              .bulk-sticker .card-content {
                gap: 1rem;
                display: grid;
                grid-template-columns: repeat(5, minmax(0, 1fr));
              }
  
              .bulk-sticker .card-content .qrcode {
                position: absolute;
                top: 40%;
                left: 50%;
                transform: translateX(-50%);
              }
            </style>
          </head>
          <body>${printContents}</body>
          </html>
        `);
        printWindow.document.close();

        printWindow.onload = () => {
          printWindow.focus();
          printWindow.print();
          printWindow.close();
        };
      } else {
        console.error("Failed to open the print window.");
      }
    } else {
      console.error("printRef is null.");
    }
  };

  return (
    <div>
      <CustomHeader title="Bulk Stickers" desc="Print bulk stickers" />
      {viewData == "form" ? (
        <BulkPrintForm setViewData={setViewData} setBulkData={setBulkData} />
      ) : viewData == "data" ? (
        <div className="print-top">
          <Button text={"Print Stickers"} onClick={handlePrint} />
          <div ref={printRef}>
            <BulkComp bulkData={bulkData} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PrintIDComp;
