"use client";
import { GoBackButton } from "@/src/components/common/button";
import { CustomHeader } from "@/src/components/common/header";
import Form from "./form";
import React, { useState } from "react";
import { formatAmount } from "@/src/utils/formatAmount";
import { CamelCaseToTitleCase } from "@/src/utils/helper";
import { GoVerified } from "react-icons/go";
import Empty from "@/src/components/common/empty";
import { useRouter } from "next/router";
// import "../style.scss" // Moved to _app;
var UsingPhoneNumberComponent = function () {
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
          <CustomHeader title="Find With Phone Number" desc="Enter taxpayer phone number to find tickets"/>
        </header>

        <div className="find-comp_form">
          <Form setTicketsData={setTicketsData} setSearched={setSearched}/>

          {ticketsData.length > 0 ? (<div className="find-comp_form_tickets_container">
              <div className="tickets">
                {ticketsData.map(function (transaction) { return (<div key={transaction.idagent_transactions} className="ticket" onClick={function () { return router.push("/find/using-phone-number/".concat(transaction.idagent_transactions)); }}>
                    <div>
                      <p>{CamelCaseToTitleCase(transaction.revenue_item)}</p>
                      <p>{transaction.plate_number}</p>
                      <p>{new Date(transaction.trans_date).toLocaleString()}</p>
                      <p>{transaction.reference}</p>
                    </div>
                    <div>
                      <p>₦{formatAmount(transaction.amount)}</p>
                      <p className={"".concat(transaction.status === "Completed" ? "completed" : " ")}>
                        {transaction.status === "Completed" && <GoVerified />}
                        {transaction.status}
                      </p>
                      <p>{transaction.payment_period}</p>
                    </div>
                  </div>); })}
              </div>
            </div>) : searched ? (<Empty text="No tickets found"/>) : null}
        </div>
      </div>
    </section>);
};
export default UsingPhoneNumberComponent;
