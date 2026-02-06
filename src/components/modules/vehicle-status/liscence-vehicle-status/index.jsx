"use client";
import { GoBackButton } from "@/src/components/common/button";
import { CustomHeader } from "@/src/components/common/header";
import Form from "./form";
import React, { useState } from "react";
import { CamelCaseToTitleCase } from "@/src/utils/helper";
import { GoVerified } from "react-icons/go";
import { RiLoaderLine } from "react-icons/ri";
import Empty from "@/src/components/common/empty";
import { useRouter } from "next/router";
// import "../style.scss" // Moved to _app;
function expired(date) {
    var normalizedDate = date;
    if (/\d{2}\/\d{2}\/\d{4}/.test(date)) {
        var _a = date.split('/'), day = _a[0], month = _a[1], year = _a[2];
        normalizedDate = "".concat(year, "-").concat(month, "-").concat(day);
    }
    else if (!/\d{4}-\d{2}-\d{2}/.test(date) && !/\d{4}\/\d{2}\/\d{2}/.test(date)) {
        console.error("Invalid date format");
        return "Invalid date";
    }
    var inputDate = new Date(normalizedDate);
    if (isNaN(inputDate.getTime())) {
        console.error("Invalid date format");
        return "Invalid date";
    }
    var currentDate = new Date();
    if (inputDate < currentDate) {
        var diffInMonths = (currentDate.getFullYear() - inputDate.getFullYear()) * 12 +
            (currentDate.getMonth() - inputDate.getMonth());
        if (diffInMonths > 6) {
            return "Expired";
        }
        else {
            return "Almost Due";
        }
    }
    return "Active";
}
var LicenseVehicleStatusComponent = function () {
    var router = useRouter();
    var _a = useState([]), ticketsData = _a[0], setTicketsData = _a[1];
    var _b = useState(false), searched = _b[0], setSearched = _b[1];
    if (ticketsData) {
        sessionStorage.setItem("TICKETS_DATA", JSON.stringify(ticketsData));
    }
    return (<section className="find">
      <GoBackButton />

      <div className="find-comp">
        <header>
          <CustomHeader title="Verify License & Vehicle Status" desc="Enter taxpayer plate number to verify"/>
        </header>

        <div className="find-comp_form">
          <Form setTicketsData={setTicketsData} setSearched={setSearched}/>

          {ticketsData && ticketsData.length > 0 ? (<div className="find-comp_form_tickets_container">
              <div className="tickets">
                {ticketsData.map(function (transaction, index) { return (<div key={index} className="ticket" onClick={function () {
                    return router.push("/vehicle-status/license-vehicle-status/".concat(transaction.registrationNumber));
                }}>
                    <div>
                      <p>
                        {transaction.registrationNumber +
                    " (" +
                    transaction.vehicleMake +
                    " " +
                    transaction.vehicleModel +
                    " )"}
                      </p>
                      <p>{transaction.ownerName}</p>
                      <p>{CamelCaseToTitleCase(transaction.revenue_item)}</p>
                      <p>{transaction.plate_number}</p>
                      <p>{transaction.expiryDate}</p>
                      <p>{transaction.phone}</p>
                    </div>
                    <div>
                      <p>Asset Code: {transaction.assetCode}</p>
                      <p>{transaction.chassisNumber}</p>
                      <p>{transaction.stateOfRegistration}</p>
                      <p className={"".concat(expired(transaction.expiryDate) === "Almost Due"
                    ? "processing"
                    : expired(transaction.expiryDate) === "Expired"
                        ? "expired"
                        : expired(transaction.expiryDate) === "Active"
                            ? "completed" : null)}>
                        {transaction.status === "Completed" ? (<GoVerified />) : (<RiLoaderLine />)}{expired(transaction.expiryDate)}
                      </p>
                      <p>{transaction.payment_period}</p>
                    </div>
                  </div>); })}
              </div>
            </div>) : searched ? (<Empty text="No Plate Number Found"/>) : null}
        </div>
      </div>
    </section>);
};
export default LicenseVehicleStatusComponent;
