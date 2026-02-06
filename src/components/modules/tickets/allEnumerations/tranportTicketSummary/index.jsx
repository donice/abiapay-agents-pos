"use client";
import React, { useEffect, useRef, useState } from "react";
import { CustomFormHeader } from "@/src/components/common/header";
// import "./style.scss" // Moved to _app;
import { Button, GoBackButton, SecondaryButton, } from "@/src/components/common/button";
import { Loading } from "@/src/components/common/loader/redirecting";
import { CamelCaseToTitleCase } from "@/src/utils/helper";
import { formatAmount } from "@/src/utils/formatAmount";
import { AbiaStateLogo } from "@/src/components/common/Images";
import { useReactToPrint } from "react-to-print";
var TransportTicketsSummaryComponent = function () {
    var _a = useState(null), data = _a[0], setData = _a[1];
    var componentRef = useRef(null);
    useEffect(function () {
        if (typeof window !== "undefined") {
            var storedData = sessionStorage.getItem("TRANSPORT_INVOICE");
            if (storedData) {
                setData(JSON.parse(storedData));
            }
        }
    }, []);
    var displayKeys = [
        "transaction_date",
        "invoice_id",
        "paymentPeriod",
        "agentEmail",
        "plateNumber",
        "taxPayerPhone",
        "taxPayerName",
        "wallet_type",
    ];
    var amount = data === null || data === void 0 ? void 0 : data.amount;
    // Function to handle printing the receipt
    var handlePrint = useReactToPrint({
        content: function () { return componentRef.current; },
        documentTitle: "receipt_".concat(data === null || data === void 0 ? void 0 : data.invoice_id),
    });
    return (<section className="tickets">
      <GoBackButton />

      {data ? (<div id="tickets-summary-comp" className="tickets-summary-comp">
          <div style={{ width: "100%", maxWidth: "500px" }} ref={componentRef} className="tickets-summary-comp_container">
            <div className="tickets-summary-comp_container_logo">
              <AbiaStateLogo />
              <CustomFormHeader title="Transaction Receipt" desc="View the details for your Purchased Ticket"/>
            </div>
            <div key={"amount"} className="tickets-summary-comp_container_amount">
              <p>{formatAmount(amount)}</p>
            </div>

            <div>
              {Object.entries(data)
                .filter(function (_a) {
                var key = _a[0];
                return displayKeys.includes(key);
            })
                .map(function (_a) {
                var key = _a[0], value = _a[1];
                return (<div key={key} className="line-items">
                    <p>{CamelCaseToTitleCase(key)}:</p>
                    <p>
                      {key === "wallet_type"
                        ? CamelCaseToTitleCase(value)
                        : value}
                    </p>
                  </div>);
            })}
            </div>
          </div>
          <div className="btn_container">
            <SecondaryButton text="Create New" link={"/tickets/transport/add"}/>
            <Button text="Share Receipt" onClick={handlePrint}/>
          </div>
        </div>) : (<Loading />)}
    </section>);
};
export default TransportTicketsSummaryComponent;
