"use client";
import { GoBackButton } from "@/src/components/common/button";
import { CustomHeader } from "@/src/components/common/header";
import Form from "./form";
import React, { useState } from "react";
import { formatAmount } from "@/src/utils/formatAmount";
import { GoVerified } from "react-icons/go";
import { RiLoaderLine } from "react-icons/ri";
import Empty from "@/src/components/common/empty";
import { useRouter } from "next/router";
// import "../style.scss" // Moved to _app;
var VehicleEnumerationStatusComponent = function () {
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
          <CustomHeader title="Verify Enumeration Status" desc="Enter taxpayer plate number to verify"/>
        </header>

        <div className="find-comp_form">
          <Form setTicketsData={setTicketsData} setSearched={setSearched}/>

          {ticketsData && ticketsData.length > 0 ? (<div className="find-comp_form_tickets_container">
              <div className="tickets">
                {ticketsData.map(function (transaction, index) { return (<div key={index} className="ticket" onClick={function () {
                    return router.push("/vehicle-status/vehicle-enumeration-status/".concat(transaction.PlateNumber));
                }}>
                    <div>
                      <p style={{ textTransform: "uppercase" }}>
                        {transaction.PlateNumber}
                      </p>
                      <p>{transaction.TaxpayerName}</p>
                      <p>ABSSIN: {transaction.TaxpayerID}</p>
                      <p>Enumeration ID: {transaction.EnumerationID}</p>
                      <p>Rev Year: {transaction.RevenueYear}</p>
                      <p>{transaction.phone}</p>
                    </div>
                    <div>
                      
                      <p>{transaction.IncomeCategory}</p><p>{transaction.RevenueItem}</p>
                      <p>N{formatAmount(transaction.EnumerationFee)}</p><p className={"".concat(transaction.Status == "PAID"
                    ? "completed"
                    : "processing")}>
                        {transaction.Status == "PAID" ? (<GoVerified />) : (<RiLoaderLine />)}
                        {transaction.Status}
                      </p>
                      
                    </div>
                  </div>); })}
              </div>
            </div>) : searched ? (<Empty text="No Plate Number Found"/>) : null}
        </div>
      </div>
    </section>);
};
export default VehicleEnumerationStatusComponent;
