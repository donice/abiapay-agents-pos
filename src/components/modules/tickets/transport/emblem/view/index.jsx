var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { CustomHeader } from "@/src/components/common/header";
import React, { useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
import QRCode from "react-qr-code";
import abiaLogo from "@/public/logos/emblem/abia_@33.jpg";
import coaLogo from "@/public/logos/emblem/coat_of_arm.png";
import jtb from "@/public/logos/emblem/jtb.png";
import { isBrowser } from "@/src/utils/isBrowser";
import { Button } from "@/src/components/common/button";
import { downloadEmblem } from "@/src/services/ticketsServices";
import toast from "react-hot-toast";
var ViewTransportEmblemReceipt = function (_a) {
    var plate_no = _a.plate_no, payment_ref = _a.payment_ref;
    var componentRef = useRef(null);
    var _b = useState({
        product_code: "",
    }), data = _b[0], setUserData = _b[1];
    useEffect(function () {
        if (isBrowser) {
            var data_1 = window.sessionStorage.getItem("TRANSPORT_INVOICE");
            if (data_1) {
                try {
                    setUserData(JSON.parse(data_1));
                }
                catch (e) {
                    console.error("Error parsing JSON data:", e);
                    setUserData({
                        product_code: "",
                    });
                }
            }
        }
    }, []);
    var handleDownload = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, downloadEmblem({
                            plate_number: plate_no,
                            payment_ref: payment_ref,
                            product_code: data === null || data === void 0 ? void 0 : data.product_code
                        })];
                case 1:
                    _a.sent();
                    toast.success("Downloading certificate...");
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error downloading PDF:", error_1);
                    toast.error("Failed to download certificate");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (<div>
      <CustomHeader title={"Emblem Receipt"} desc="View Transport Emblem Receipt"/>
      <section className={style.emblem} id="tickets-summary-comp" ref={componentRef}>
        <div className={style.emblem_receipt}>
          <header className={style.emblem_receipt_header}>
            <div className={style.emblem_receipt_header_logos}>
              <img src={abiaLogo.src} alt="obia" width={100} height={100}/>
              <img src={coaLogo.src} alt="coa" width={100} height={100}/>
              <img src={jtb.src} alt="jtb" width={100} height={100}/>
            </div>
            <div className={style.emblem_receipt_header_title}>
              <h1>ABIA STATE GOVERNMENT</h1>
              <h2>2025 CONSOLIDATED EMBLEM</h2>
              <h2>for {data === null || data === void 0 ? void 0 : data.product_code} </h2>
            </div>
            <div className={style.emblem_receipt_header_reference}>
              <p>Plate Number: <br /> {plate_no}</p> <p>Payment Ref:<br /> {payment_ref}</p>
            </div>
          </header>


          <div className={style.emblem_receipt_clearance}>
            <header className={style.emblem_receipt_clearance_header}>
              CLEARANCE CERTIFICATE
            </header>
            <ul className={style.emblem_receipt_clearance_list}>
              <li>1. Board of Internal Revenue (Hackney Carriage)</li>
              <li>2. Sanitation Sticker/Pollution/Effluent Discharge/Emission Control</li>
              <li>3. MOT Sticker</li>
              <li>4. Haulage Permit</li>
              <li>5. Safety Emblem</li>
              <li>6. National Freight</li>
              <li>7. Commodity Sticker</li>
              <li>8. Loading and Off Loading</li>
              <li>9. Route/Inter State/Road Tax Warrant Permit</li>
              <li>10. Ogepa Sticker</li>
              <li>11. Agric Levy</li>
              <li>12. Federal Ocean Terminal</li>
              <li>13. Airport</li>
              <li>14. Mid-Year Sticker</li>
              <li>15. ASPIMSS Yearly Safety Clearance Delivery Permit</li>
              <li>16. Heavy Duty Permit</li>
              <li>17. Intra State and Inter State Route Permit</li>
              <li>18. Mobile Advert</li>
              <li>19. Radio TV License</li>
              <li>20. Oil and Gas Permit</li>
              <li>21. Sale and Distribution Permit</li>
              <li>22. Unified Local Government permit</li>
              <li>23. Niger Delta Sticker</li>
              <li>24. Federal Organ Terminal for Trailers, Lorries, Pickup, Buses and Cars</li>
              <li>25. Other Permit Covered by National Emblem</li>
            </ul>
          </div>

          <div className={style.emblem_receipt_footer}>
            <p className={style.emblem_receipt_footer_text}>
              This is to certify that the vehicle with this sticker has
              satisfied every lawful road permit with respect to the above
              listed items and should be allowed free passage and hence
              protected from any road abuse, touting, illegal block, unlawful
              delay, harassment by any other State Agent Nationwide.
            </p>

            <div className={style.emblem_receipt_footer_signature}>
              <p>Executive Chairman</p>
              <p>Abia State Internal Revenue Service</p>
            </div>

            <div className={style.qr_container}>
              <QRCode size={256} style={{ height: "auto", maxWidth: "100%", width: "100%" }} value={"https://abiapay.com//verify/emblem?=".concat(payment_ref)} viewBox={"0 0 256 256"}/>


            </div>
            <div className="hidden text-[6px] md:text-xs. md:block">
              <p>Scan the above url to verify, or visit:</p> <p className="underline">{"https://abiapay.com//verify/emblem?=".concat(payment_ref)}</p>
            </div>

          </div>
        </div>
      </section>
      <Button text="Download Certificate" 
    // onClick={() => handleDownloadPDF()}
    onClick={handleDownload}/>
    </div>);
};
export default ViewTransportEmblemReceipt;
