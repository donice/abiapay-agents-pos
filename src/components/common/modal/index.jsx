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
import React from "react";
import { useRouter } from "next/router";
import { FcDeleteDatabase, FcAcceptDatabase, FcOk } from "react-icons/fc";
// import "./style.scss" // Moved to _app;
import { BackButton, Button, PrimaryButton, SecondaryButton } from "../button";
import { AbiaEnumerationLarge } from "../Images";
import { TbCopy, TbCreditCardOff, TbPasswordMobilePhone, TbProgressCheck, TbRosetteDiscountCheckFilled, TbSquareRoundedCheck, } from "react-icons/tb";
import QRCode from "react-qr-code";
import { LuMailCheck } from "react-icons/lu";
import { MdErrorOutline, MdOutlineWifiTetheringError } from "react-icons/md";
import { BiError } from "react-icons/bi";
import toast from "react-hot-toast";
import AccessBankLogo from "@/src/components/assets/access_bank.png";
import FidelityBankLogo from "@/src/components/assets/fidelity_bank.png";
import Image from "next/image";
import { CountdownTimer } from "@/src/utils/countdownTimer";
var handleCopy = function (acct) { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!acct) {
                    toast.error("Account number is missing");
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, navigator.clipboard.writeText(acct)];
            case 2:
                _a.sent();
                toast.success("Copied!");
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error("Failed to copy:", err_1);
                toast.error("Failed to copy account number. Please try again.");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var SuccessModal = function (_a) {
    var maintext = _a.maintext, id = _a.id, text = _a.text, buttonText = _a.buttonText, link = _a.link, icon = _a.icon;
    var router = useRouter();
    var handleClick = function () {
        if (link) {
            router.push(link);
        }
    };
    return (<div className="modalOverlay">
      <div className="modal">
        {icon ? icon : <FcOk className="success_icon"/>}
        <div className="modalContent">
          <h2>{maintext ? maintext : "Payment Successful"} </h2>
          <p>
            <span>{id ? id : ""}</span>{" "}
          </p>
          {/* {text && <p>{text}</p>} */}
          {link && (<button onClick={handleClick} className="button primary top">
              {buttonText}
            </button>)}

         {text && <SecondaryButton text="Create New" link={link || "/tickets/transport"}/>}
        </div>
      </div>
    </div>);
};
export var MarketTicketModal = function (_a) {
    var maintext = _a.maintext, text = _a.text, icon = _a.icon, details = _a.details;
    var router = useRouter();
    return (<div className="modalOverlay">
      <div className="modal w-full min-w-sm">
        {icon ? icon : <FcOk className="success_icon"/>}
        <div className="modalContent w-full gap-2">
          <div>
            <h2 className="">{maintext ? maintext : "Payment Successful"} </h2>
            <p>{text ? text : "View the details of your transaction below"}</p>
          </div>

          <div className="w-full border-2 p-4 rounded-xl mt-2 grid gap-4">
            <div className="flex justify-between ">
              <span className="block text-xs text-gray-500">
                Payment Reference:
              </span>
              <div className="col-span-2flex flex-col items-start justify-start  text-sm text-gray-600 font-semibold ">
                <span className=" text-sm text-gray-600 font-semibold">
                  {details.payment_ref}
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="block text-xs text-gray-500">
                Enumeration ID:
              </span>
              <div className="col-span-2 flex flex-col items-start justify-start  text-sm text-gray-600 font-semibold ">
                <span className=" text-sm text-gray-600 font-semibold">
                  {details.enum_id}
                </span>
                <div className="flex gap-2 ">
                  <p>Copy</p>
                  <TbCopy className="icon" onClick={function () { return handleCopy(details.enum_id); }} style={{ cursor: "pointer" }}/>
                </div>
              </div>
            </div>
          </div>
          <PrimaryButton text={"View Receipt"} link={"/tickets/market/receipt/".concat(details.enum_id)}/>
        </div>
      </div>
    </div>);
};
export var OtpSuccessModal = function (_a) {
    var mode = _a.mode, maintext = _a.maintext, subtext = _a.subtext, buttontext = _a.buttontext, link = _a.link;
    var router = useRouter();
    var handleClick = function () {
        if (link) {
            router.push(link);
        }
    };
    return (<div className="modalOverlay">
      <div className="modal">
        {mode == "verified" ? (<TbProgressCheck className="success_icon"/>) : (<TbPasswordMobilePhone className="success_icon"/>)}
        <div className="modalContent">
          <h2>{maintext ? maintext : "Otp Sent Successfully"} </h2>
          <p>
            <span>{subtext ? subtext : ""}</span>{" "}
          </p>
          {/* {buttontext && <p>{buttontext}</p>} */}
          {link && (<button onClick={handleClick} className="button primary top">
              {buttontext ? buttontext : "Validate OTP"}
            </button>)}
        </div>
      </div>
    </div>);
};
export var AbssinSuccessModal = function (_a) {
    var mode = _a.mode, maintext = _a.maintext, subtext = _a.subtext, buttontext = _a.buttontext, link = _a.link;
    var router = useRouter();
    var handleClick = function () {
        if (link) {
            router.push(link);
        }
    };
    return (<div className="modalOverlay">
      <div className="modal">
        {mode == "success" ? (<TbSquareRoundedCheck className="success_icon"/>) : (<TbSquareRoundedCheck className="success_icon"/>)}
        <div className="modalContent">
          <h2>{maintext ? maintext : "Congratulations! 🎉"} </h2>
          <p>
            <span>{"Your ABSSIN creation has been successful"}</span>{" "}
          </p>
          <button onClick={function () { return router.push("/dashboard"); }} className="button primary top">
            Done
          </button>
          {link && (<button onClick={handleClick} className="button primary top">
              {buttontext ? buttontext : "Create Another ABSSIN"}
            </button>)}
          <button onClick={function () { return router.push("/enumeration/transport"); }} className="button primary top">
            Enumerate Vehicle
          </button>
        </div>
      </div>
    </div>);
};
export var ChangePasswordModal = function (_a) {
    var maintext = _a.maintext, id = _a.id, text = _a.text, link = _a.link;
    var router = useRouter();
    var handleClick = function () {
        if (link) {
            router.push(link);
        }
    };
    return (<div className="modalOverlay">
      <div className="modal">
        <FcOk className="success_icon"/>
        <div className="modalContent">
          <h2>{maintext ? maintext : "Payment Successful"} </h2>
          <p>
            <span>{id ? id : ""}</span>{" "}
          </p>
          {/* {text && <p>{text}</p>} */}
          {link && (<button onClick={handleClick} className="button primary top">
              {text}
            </button>)}

          {/* <SecondaryButton text="Create New" link={"/settings"} /> */}
        </div>
      </div>
    </div>);
};
export var EmailSuccessModal = function (_a) {
    var text = _a.text, 
    // id,
    message = _a.message, 
    // link,
    buttonText = _a.buttonText, onClick = _a.onClick;
    var router = useRouter();
    return (<div className="modalOverlay">
      <div className="modal">
        <LuMailCheck className="success_icon"/>
        <div className="modalContent">
          <h2>{text ? text : "Email Delievered"} </h2>
          <p>{message ? message : "Email has been sent successfully"} </p>
          <button onClick={onClick} className="button primary top">
            {buttonText}
          </button>
        </div>
      </div>
    </div>);
};
export var EmblemModal = function (_a) {
    var maintext = _a.maintext, exp_date = _a.exp_date, payment_ref = _a.payment_ref, button_text = _a.button_text, onClick = _a.onClick;
    return (<div className="modalOverlay">
      <div className="modal">
        <FcOk className="success_icon"/>
        <div className="modalContent">
          <h2>{maintext ? maintext : "Payment Successful"} </h2>
          <p>
            Payment Reference: <span>{payment_ref ? payment_ref : ""}</span>{" "}
          </p>
          <p>
            Expiration Date: <span>{exp_date ? exp_date : ""}</span>{" "}
          </p>
          <button onClick={onClick} className="button primary top">
            {button_text}
          </button>

          <SecondaryButton text="Create New Emblem" link="/tickets"/>
        </div>
      </div>
    </div>);
};
export var OffloadingModal = function (_a) {
    var maintext = _a.maintext, payment_ref = _a.payment_ref, button_text = _a.button_text, onClick = _a.onClick;
    return (<div className="modalOverlay">
      <div className="modal">
        <FcOk className="success_icon"/>
        <div className="modalContent">
          <h2>{maintext ? maintext : "Payment Successful"} </h2>
          <p>
            Payment Reference: <span>{payment_ref ? payment_ref : ""}</span>{" "}
          </p>
          <button onClick={onClick} className="button primary top">
            {button_text}
          </button>

          <SecondaryButton text="Register New Loading/Offloading" link="/tickets/transport/loading_offloading"/>
        </div>
      </div>
    </div>);
};
export var SportModal = function (_a) {
    var maintext = _a.maintext, payment_ref = _a.payment_ref, button_text = _a.button_text, onClick = _a.onClick;
    return (<div className="modalOverlay">
      <div className="modal">
        <FcOk className="success_icon"/>
        <div className="modalContent">
          <h2>{maintext ? maintext : "Payment Successful"} </h2>
          <p>
            Payment Reference: <span>{payment_ref ? payment_ref : ""}</span>{" "}
          </p>
          <button onClick={onClick} className="button primary top">
            {button_text}
          </button>

          <SecondaryButton text="Create New Sport Ticket" link="/tickets/sport"/>
        </div>
      </div>
    </div>);
};
export var FlyingRevenue = function (_a) {
    var maintext = _a.maintext, payment_ref = _a.payment_ref, button_text = _a.button_text, onClick = _a.onClick;
    return (<div className="modalOverlay">
      <div className="modal">
        <FcOk className="success_icon"/>
        <div className="modalContent">
          <h2>{maintext ? maintext : "Payment Successful"} </h2>
          <p>
            Payment Reference: <span>{payment_ref ? payment_ref : ""}</span>{" "}
          </p>
          <button onClick={onClick} className="button primary top">
            {button_text}
          </button>

          <SecondaryButton text="Create New Flying Revenue" link="/tickets/transport/flying-revenue"/>
        </div>
      </div>
    </div>);
};
export var EnumerationModal = function (_a) {
    var maintext = _a.maintext, id = _a.id, text = _a.text, link = _a.link, onClick = _a.onClick;
    var router = useRouter();
    var handleClick = function () {
        if (link) {
            router.push(link);
        }
    };
    return (<div className="modalOverlay">
      <div className="modal">
        <FcOk className="success_icon"/>
        <div className="modalContent">
          <h2>{maintext ? maintext : "Payment Successful"} </h2>
          <p>
            <span>{id ? id : ""}</span>{" "}
          </p>
          {/* {text && <p>{text}</p>} */}
          {link && (<button onClick={handleClick} className="button primary top">
              {text}
            </button>)}

          <SecondaryButton text="Create New" link="/enumeration"/>
        </div>
      </div>
    </div>);
};
export var InfoModal = function (_a) {
    var text_info = _a.text_info, text_header = _a.text_header, button_text = _a.button_text, link = _a.link;
    var router = useRouter();
    return (<div className="modalOverlay">
      <div className="modal">
        {status === "success" ? (<FcAcceptDatabase className="success_icon"/>) : (<FcDeleteDatabase className="error_icon"/>)}
        <div className="modalContent">
          <h2>{text_header}</h2>
          <p>
            <span>{text_info ? text_info : ""}</span>{" "}
          </p>
          {link && (<PrimaryButton link={link} text={button_text ? button_text : ""}/>)}

          {/* <SecondaryButton text="Create New" link={"/tickets/transport/add"} /> */}
        </div>
      </div>
    </div>);
};
export var ErrorModal = function (_a) {
    var text_info = _a.text_info, text_header = _a.text_header, button_text = _a.button_text, link = _a.link;
    var router = useRouter();
    return (<div className="modalOverlay">
      <div className="modal">
        <TbCreditCardOff className="error_icon"/>
        <div className="modalContent">
          <h2>{text_header ? text_header : "Error Validating Info"}</h2>
          <p className="error_p">
            <span>{text_info ? text_info : ""}</span>{" "}
          </p>
          {link && (<PrimaryButton link={link} text={button_text ? button_text : ""}/>)}

          {/* <SecondaryButton text="Create New" link={"/tickets/transport/add"} /> */}
        </div>
      </div>
    </div>);
};
export var VehicleCheckSuccessModal = function (_a) {
    var text_header = _a.text_header, vehicle_make = _a.vehicle_make, vehicle_model = _a.vehicle_model, vehicle_color = _a.vehicle_color, state_of_registration = _a.state_of_registration, expiry_date = _a.expiry_date, button_text = _a.button_text, onClick = _a.onClick;
    var handleClick = function () { };
    return (<div className="modalOverlay">
      <div className="modal">
        <div className="modal_icon">
          <TbRosetteDiscountCheckFilled className="success_icon"/>
        </div>

        <div className="modalContent">
          <h2>{text_header}</h2>
          <div className="vehicle_items">
            <p>
              Vehicle Make:
              <span>{vehicle_make} </span>
            </p>
            <p>
              Vehicle Model:
              <span>{vehicle_model}</span>{" "}
            </p>
            <p>
              Vehicle Color:
              <span>{vehicle_color}</span>{" "}
            </p>
            <p>
              State Of Registration:
              <span>{state_of_registration}</span>{" "}
            </p>
            <p>
              Registration Expiry Date:
              <span>{expiry_date}</span>{" "}
            </p>
          </div>

          <Button onClick={onClick} text={button_text ? button_text : ""}/>
        </div>
      </div>
    </div>);
};
export var EnumerationSuccessModal = function (_a) {
    var id = _a.id, text = _a.text, link = _a.link, qr_link = _a.qr_link, vehicle_category = _a.vehicle_category, plate_number = _a.plate_number;
    var router = useRouter();
    var handleClick = function () {
        if (link) {
            router.push(link);
        }
    };
    return (<div className="modalOverlay">
      <div className="modal" id="enumeration_modal">
        <AbiaEnumerationLarge />
        <div className="modalHeader">
          <h1>ABIA STATE GOVERNMENT</h1>
          <h2> MINISTRY OF TRANSPORT</h2>
          <h3>ENUMERATION</h3>
        </div>
        <div className="modalContentEnum"></div>
        <div className="modalContentEnumContent">
          <p className="assetCode">{text}</p>
          <div className="custom_vehicle_details">
            <p className="vehicle_cat">COMMERCIAL VEHICLE</p>

            <div className="qr_container">
              <QRCode size={256} style={{ height: "auto", maxWidth: "100%", width: "100%" }} value={qr_link} viewBox={"0 0 256 256"}/>
            </div>

            <p className="vehicle_type">{vehicle_category}</p>
          </div>

          <div>
            <p className="abssin_no">{id}</p>
            <span className="plate_number_title">PLATE NUMBER</span>
            <p className="plate_number">{plate_number}</p>
          </div>
        </div>
        <div className="btn-container">
          {/* <button className="button secondary">
          <TbPrinter /> Share
        </button> */}
          <SecondaryButton text="Create New" link={"/enumeration"}/>
          <PrimaryButton text={"Done"} link={"/dashboard"}/>
        </div>
      </div>
    </div>);
};
export var InformationModal = function (_a) {
    var icon = _a.icon, mode = _a.mode, maintext = _a.maintext, subtext = _a.subtext, link = _a.link, success_text = _a.success_text, success_link = _a.success_link, close = _a.close;
    var router = useRouter();
    var handleClick = function () {
        if (link) {
            router.push(link);
        }
        else if (success_link) {
            // router.push(success_link);
        }
    };
    return (<div className="modalOverlay">
      <div className="modal">
        {icon ? (icon) : mode == "error" ? (<MdOutlineWifiTetheringError className="error_icon"/>) : mode == "warning" ? (<BiError className="warning_icon"/>) : mode == "info" ? (<MdErrorOutline className="success_icon"/>) : (<FcOk className="success_icon"/>)}

        <div className="modalContent">
          <h2>
            {mode == "warning" ? "Warning: " : mode == "error" ? "Error: " : ""}{" "}
            {maintext ? maintext : "Cannot Proceed"}{" "}
          </h2>
          <p>{subtext}</p>
          {link ? (<button onClick={handleClick} className="button primary top">
              Done
            </button>) : (<button onClick={handleClick} className="button primary top">
              Ok
            </button>)}

          {mode == "success" && (<SecondaryButton onClick={close !== null && close !== void 0 ? close : handleClick} text={success_text ? success_text : ""}/>)}
        </div>
      </div>
    </div>);
};
export var InstantAccountModal = function (_a) {
    var onClick = _a.onClick, mode = _a.mode, link = _a.link, virtual_acct_no = _a.virtual_acct_no, virtual_acct_name = _a.virtual_acct_name, transaction_amount = _a.transaction_amount, bank_name = _a.bank_name, expiry_datetime = _a.expiry_datetime, loading = _a.loading;
    return (<div className="modalOverlay">
      <div className="modal">
        {bank_name == "Access Bank" ? (<Image src={AccessBankLogo} width={70} className="logo_icon" alt="access bank logo"/>) : (<Image src={FidelityBankLogo} width={70} className="logo_icon" alt="fidelity bank logo"/>)}

        <div className="modalContent">
          <h2>
            {mode == "warning" ? "Warning: " : mode == "error" ? "Error: " : ""}{" "}
            Instant Account Transfer
          </h2>
          <p>Kindly transfer to the Bank Details shown below</p>

          <div className="account-details">
            <div className="account-details_items">
              <p>Bank Name:</p>
              <p>{bank_name}</p>
            </div>{" "}
            <div className="account-details_items">
              <p>Account Name:</p>
              <p>{virtual_acct_name}</p>
            </div>
            <div className="account-details_items">
              <p>Account Number:</p>
              <p style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <TbCopy className="icon" onClick={function () { return handleCopy(virtual_acct_no); }} style={{ cursor: "pointer" }}/>{" "}
                {virtual_acct_no}
              </p>
            </div>
            <div className="account-details_items">
              <p>Transaction Amount:</p>
              <p style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <TbCopy className="icon" onClick={function () { return handleCopy(transaction_amount); }} style={{ cursor: "pointer" }}/>{" "}
                ₦{transaction_amount}
              </p>
            </div>
          </div>
          <p style={{ marginBottom: "20px" }}>
            This account is only valid for this transaction. It will expire in{" "}
            <CountdownTimer targetDate={expiry_datetime}/>
          </p>

          <div className="modalActions">
            <Button text={"Confirm my Payment"} loading={loading} disabled={loading} onClick={onClick}/>
            <BackButton link={"/bills"}/>
          </div>
        </div>
      </div>
    </div>);
};
