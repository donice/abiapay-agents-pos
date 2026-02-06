"use client";
import { CustomHeader } from "@/src/components/common/header";
import React, { useState, useRef } from "react";
import BulkPrintForm from "./form";
import BulkComp from "./bulk";
import { Button } from "@/src/components/common/button";
var PrintIDComp = function () {
    var _a = useState("form"), viewData = _a[0], setViewData = _a[1];
    var _b = useState(null), bulkData = _b[0], setBulkData = _b[1];
    var _c = useState(), stickerLga = _c[0], setStickerLga = _c[1];
    var printRef = useRef(null);
    var handlePrint = function () {
        if (printRef.current) {
            var printContents = printRef.current.innerHTML;
            var printWindow_1 = window.open("", "", "width=900,height=600");
            if (printWindow_1) {
                printWindow_1.document.write("\n          <html>\n          <head>\n            <title>Print Stickers</title>\n            <style>\n              @media print {\n                .bulk-print-item {\n                  page-break-after: always;\n                  counter-increment: bulk-item;\n                }\n                .bulk-print-item:nth-child(3n) {\n                  page-break-after: always;\n                }\n              }\n\n              /* Grid Layout for Stickers */\n              .bulk-sticker {\n                display: grid;\n                grid-template-columns: repeat(2, minmax(0, 1fr));\n              }\n\n              @media (max-width: 768px) {\n                .bulk-sticker {\n                  grid-template-columns: repeat(1, minmax(0, 1fr));\n                }\n              }\n\n              .bulk-sticker .card {\n                margin-top: 2rem;\n                display: flex;\n                align-items: flex-end;\n                justify-content: center;\n                position: relative;\n                gap: 1rem;\n                background-image: url(\"/prints/sticker_bg.JPG\");\n                background-repeat: no-repeat;\n                background-position: center;\n                background-size: contain;\n                padding: 1rem;\n                border-radius: 0.5rem;\n                width: 32rem;\n                height: 32rem;\n                border: 2px solid #c6c6c6;\n              }\n\n              .bulk-sticker .card-tag {\n                position: absolute;\n                top: 4.5rem;\n                right: 1.5rem;\n                font-weight: 700;\n                color: red;\n                font-size: 1.25rem;\n                padding: 0.5rem;\n              }\n\n              .bulk-sticker .card-plate_no {\n                position: absolute;\n                top: 9.2rem;\n                left: 50%;\n                transform: translateX(-50%);\n                font-weight: 600;\n                font-family: Tahoma;\n                font-size: 2.25rem;\n                padding: 0.5rem;\n                text-transform: uppercase;\n                color: gray;\n              }\n\n              .bulk-sticker .card-asset_code {\n                 position: absolute;\n                left: 50%;\n                transform: translateX(-50%);\n                font-weight: 800;\n                font-size: 2.75rem;\n                padding: 1.5rem;\n                text-transform: uppercase;\n                color: green;\n                top: 430px;\n              }\n\n              .bulk-sticker .card-lga {\n                position: absolute;\n                 top: .5rem;\n                 left: 1.1rem;\n                color: gray;\n                font-size: 0.75rem;\n                padding: 0.5rem;\n                text-transform: uppercase;\n                color:green;\n              }\n\n              .bulk-sticker .card-cat,\n              .bulk-sticker .card-income {\n                position: absolute;\n                transform: rotate(90deg);\n                top: 50%;\n                font-weight: 600;\n                font-size: 1rem;\n                letter-spacing: 0.25rem;\n                padding: 1.5rem;\n                text-transform: uppercase;\n                color: red;\n              }\n\n              .bulk-sticker .card-cat {\n                left: -2rem;\n              }\n              .bulk-sticker .card-income {\n                right: -2rem;\n              }\n\n              .bulk-sticker .card-enum {\n                position: absolute;\n                font-weight: 600;\n                bottom: 6.5rem;\n                font-size: 1rem;\n                padding: 1.5rem;\n                text-transform: uppercase;\n                color: gray;\n                letter-spacing: 0.3rem;\n              }\n\n\n              .bulk-sticker .card-content {\n                gap: 1rem;\n                display: grid;\n                grid-template-columns: repeat(5, minmax(0, 1fr));\n              }\n\n              .bulk-sticker .card-content .qrcode {\n                position: absolute;\n                top: 37%;\n                left: 50%;\n                transform: translateX(-50%);\n              }\n            </style>\n          </head>\n          <body>".concat(printContents, "</body>\n          </html>\n        "));
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
      <CustomHeader title="Bulk Stickers" desc="Print stickers"/>
      {viewData == "form" ? (<BulkPrintForm setViewData={setViewData} setBulkData={setBulkData} setStickerLga={setStickerLga}/>) : viewData == "data" ? (<div className="print-top">
          <Button text={"Print Stickers"} onClick={handlePrint}/>
          <div ref={printRef}>
            <BulkComp bulkData={bulkData} stickerLga={stickerLga}/>
          </div>
        </div>) : null}
    </div>);
};
export default PrintIDComp;
