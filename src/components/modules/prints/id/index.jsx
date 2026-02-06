"use client";
import { CustomHeader } from "@/src/components/common/header";
import React, { useRef, useState } from "react";
import BulkPrintForm from "./form";
import BulkComp from "./bulk";
import { Button } from "@/src/components/common/button";
var PrintIDComp = function () {
    var _a = useState("form"), viewData = _a[0], setViewData = _a[1];
    var _b = useState(null), bulkData = _b[0], setBulkData = _b[1];
    var printRef = useRef(null);
    var handlePrint = function () {
        if (printRef.current) {
            var printContents = printRef.current.innerHTML;
            var printWindow_1 = window.open("", "", "width=900,height=600");
            if (printWindow_1) {
                printWindow_1.document.write("\n          <html>\n          <head>\n            <title>Print Stickers</title>\n            <style>\n              @media print {\n                .bulk-print-item {\n                  page-break-after: always;\n                  counter-increment: bulk-item;\n                }\n                .bulk-print-item:nth-child(3n) {\n                  page-break-after: always;\n                }\n              }\n\n              /* Grid Layout for Stickers */\n             .bulk-id {\n              display: grid;\n              grid-template-columns: repeat(2, minmax(0, 1fr));\n            }\n\n            @media (max-width: 768px) {\n              .bulk-id {\n                grid-template-columns: repeat(1, minmax(0, 1fr));\n              }\n            }\n\n          .bulk-id .card {\n            margin-top: 2rem;\n            display: flex;\n            align-items: flex-end;\n            justify-content: center;\n            position: relative;\n            gap: 1rem;\n            background-repeat: no-repeat;\n            background-position: center;\n            background-size: cover;\n            padding: 1rem;\n            border-radius: 0.5rem;\n            width: 32rem;\n            height: 19.5rem;\n            border: 2px solid rgb(240, 240, 240);\n            box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);\n            background-image: url(\"/prints/Abia-idbg.png\");\n          }\n\n          .id-card {\n            position: relative;\n            display: flex;\n            gap: 2.75rem;\n            width: 500px;\n            height: 315px;\n            padding: 10px;\n            background: #fff;\n            background: url(\"/prints/Abia-idbg.png\") no-repeat center center;\n            background-size: cover;\n            border-radius: 12px;\n            padding: 20px;\n            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);\n            margin-bottom: 2rem;\n\n            .left-section {\n              height: 100%;\n              display: flex;\n              flex-direction: column;\n              justify-content: flex-end;\n\n              .profile-img {\n                width: 150px;\n                border-radius: 1rem;\n                height: 180px;\n                overflow: hidden;\n\n                img {\n                width: 100%;\n                height: 100%;\n                object-fit: cover;\n                }\n              }\n\n              .enumeration-id {\n                font-family: 'Courier New', Courier, monospace;\n                font-weight: 700;\n                letter-spacing: 0.075rem;\n              }\n\n              .enum-row {\n                display: flex;\n                flex-direction: column;\n                gap: 0.3rem;\n                align-items: center;\n                margin-top: 0.5rem;\n              \n                p {\n                  margin: 0;\n                  line-height: 1;\n                }\n              }\n            }\n\n            .right-section {\n              .personal-details {\n              display: flex !important;\n              flex-direction: column !important;\n              gap: 2rem !important;\n              margin-top: 6.5rem !important;\n              font-weight: 600 !important;\n          }\n\n\n              .profile-img {\n                width: 100px;\n                height: auto;\n                border: 2px solid #fff;\n              }\n            }\n          }\n          .product-tag {\n            position: absolute;\n            right: 2.5rem;\n            top: 9rem;\n            font-weight: 700;\n            color: #fff;\n          }\n\n          .qr-code {\n            position: absolute;\n            right: 0.95rem;\n            bottom: 3.5rem;\n            width: 100px;\n            height: 100px;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n          }\n      \n\n          .abssin_span {\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            position: absolute;\n            bottom: 1.45rem;\n            right: 0.75rem;\n\n            p {\n              margin: 0;\n              line-height: 1.1;\n            }\n\n            .abssin_number {\n              font-weight: bold;\n              font-family: 'Courier New', Courier, monospace;\n              font-weight: 800;\n              letter-spacing: 0.075rem;\n            }\n          }\n            </style>\n          </head>\n          <body>".concat(printContents, "</body>\n          </html>\n        "));
                printWindow_1.document.close();
                printWindow_1.onload = function () {
                    printWindow_1.focus();
                    printWindow_1.print();
                    printWindow_1.close();
                };
            }
            else {
                console.error("Failed to open the print window.");
            }
        }
        else {
            console.error("printRef is null.");
        }
    };
    return (<div>
      <CustomHeader title="Bulk ID Cards" desc="Print bulk ID cards"/>
      {viewData == "form" ? (<BulkPrintForm setViewData={setViewData} setBulkData={setBulkData}/>) : viewData == "data" ? (<div className="print-top">
          <Button text={"Print IDs"} onClick={handlePrint}/>
          <div ref={printRef} style={{ marginTop: "2rem" }}>
            <BulkComp bulkData={bulkData}/>
          </div>
        </div>) : null}
    </div>);
};
export default PrintIDComp;
