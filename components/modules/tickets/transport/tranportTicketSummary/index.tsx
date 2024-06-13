"use client";
import React, { useEffect, useState } from "react";
import CustomHeader from "@/components/common/header";
import { CamelCaseToTitleCase } from "@/components/utils/helper";
import "./style.scss";
import { DefaultButton, CancelButton, GoBackButton } from "@/components/common/button";

const TransportTicketsSummaryComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem("TRANSPORT_FORM_DETAILS");
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    }
  }, []);

  return (
    <div className="tickets">
      <GoBackButton link="/tickets/transport/add"/>
      <CustomHeader
        title="Transport Ticket Details"
        desc="Comfirm the details for your Transport Ticket Purchase"
      />
      <section className="tickets-summary">
        {data ? (
          <div className="tickets-summary_container">
            {Object.entries(data).map(
              ([key, value]: [key: any, value: any]) => (
                <div key={key}>
                  <p>{CamelCaseToTitleCase(key)}:</p>
                  <p>{value}</p>
                </div>
              )
            )}
            
          </div>
        ) : (
          <p>No transport form details available.</p>
        )}<div className="btn_container">
              <CancelButton link="/tickets/transport" />
              <DefaultButton text="Proceed to Payment" link="/" />
            </div>
      </section>
    </div>
  );
};

export default TransportTicketsSummaryComponent;
