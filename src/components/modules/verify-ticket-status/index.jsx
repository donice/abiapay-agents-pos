"use client";
import React, { useEffect, useState } from "react";
import { CustomHeader } from "@/src/components/common/header";
import VerifyTicketsFrom from "./form";
// import "./style.scss" // Moved to _app;
import { isBrowser } from "@/src/utils/isBrowser";
import Empty from "@/src/components/common/empty";
import { CamelCaseToTitleCase } from "@/src/utils/helper";
import { formatDate } from "@/src/utils/formatDate";
var VeifyTicketStatusComponent = function () {
    var _a = useState({}), details = _a[0], setDetails = _a[1];
    var displayDetails = details;
    var _b = useState(null), userData = _b[0], setUserData = _b[1];
    useEffect(function () {
        if (isBrowser) {
            var data = window.sessionStorage.getItem("USER_DATA");
            if (data) {
                try {
                    setUserData(JSON.parse(data));
                }
                catch (e) {
                    console.error("Error parsing JSON data:", e);
                    setUserData({});
                }
            }
        }
    }, []);
    var displayKeys = [
        "vehicle_type",
        // "no_of_days",
        "driver_phone",
        "last_ticket_ref",
        "last_ticket_purchase",
    ];
    return (<section className="verify-tickets">
      <div className="verify-tickets-comp">
        <header className="verify-tickets-comp_header">
          <CustomHeader title="Verify Payment" desc="Check for Ticket's validity"/>
        </header>

        <div className="verify-tickets-comp_form">
          <VerifyTicketsFrom userData={userData} setDetails={setDetails}/>
        </div>
      </div>

      <div className="verify-tickets-comp_details">
        {displayDetails !== null &&
            displayDetails !== undefined &&
            Object.keys(displayDetails).length <
                1 ? null : ((displayDetails === null || displayDetails === void 0 ? void 0 : displayDetails.response_code) &&
            (displayDetails === null || displayDetails === void 0 ? void 0 : displayDetails.response_code) == "00") ||
            ((displayDetails === null || displayDetails === void 0 ? void 0 : displayDetails.response_code) &&
                (displayDetails === null || displayDetails === void 0 ? void 0 : displayDetails.response_code) == "97") ? (<div className="border-2 border-dashed rounded-xl px-4">
            <div className="line-items">
              <p>Status:</p>
              {(displayDetails === null || displayDetails === void 0 ? void 0 : displayDetails.response_code) == "00" ? (<p className="success">{(displayDetails === null || displayDetails === void 0 ? void 0 : displayDetails.response_message) || "Valid Ticket"}</p>) : (<p className="failure">{(displayDetails === null || displayDetails === void 0 ? void 0 : displayDetails.response_message) || "Invalid Ticket"}</p>)}
            </div>
            {Object.entries(displayDetails)
                .filter(function (_a) {
                var key = _a[0];
                return displayKeys.includes(key);
            })
                .map(function (_a) {
                var key = _a[0], value = _a[1];
                return (<div key={key} className="line-items">
                  <p>{CamelCaseToTitleCase(key)}:</p>
                  <p>
                    {key === "no_of_days"
                        ? CamelCaseToTitleCase(value)
                        : key === "last_ticket_purchase"
                            ? formatDate(value)
                            : value}
                  </p>
                </div>);
            })}
          </div>) : (<Empty text="No matching vehicle found"/>)}
      </div>
    </section>);
};
export default VeifyTicketStatusComponent;
