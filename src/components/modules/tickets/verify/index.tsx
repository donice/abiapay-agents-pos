"use client";
import React, { useEffect, useState } from "react";
import { CustomHeader } from "@/src/components/common/header";
import VerifyTicketsFrom from "./form";
import "./style.scss";
import useIsBrower from "@/src/hooks/useIsBrower";
import Empty from "@/src/components/common/empty";
import { CamelCaseToTitleCase } from "@/src/utils/helper";

interface DetailsType {
  response_code?: string;
  [key: string]: any;
}

const VerifyTicketsComponent = () => {
  const [details, setDetails] = useState<DetailsType>({});
  const [userData, setUserData] = useState<{
    name?: string;
    email?: string;
  } | null>(null);

  useEffect(() => {
    if (useIsBrower()) {
      const data = window.sessionStorage.getItem("USER_DATA");
      if (data) {
        try {
          setUserData(JSON.parse(data));
        } catch (e) {
          console.error("Error parsing JSON data:", e);
          setUserData({});
        }
      }
    }
  }, []);


  const displayKeys = [
    "vehicle_type",
    "driver_phone",
    "last_ticket_ref",
    "no_of_days",

  ];

  return (
    <section className="verify-tickets">
      <div className="verify-tickets-comp">
        <header className="verify-tickets-comp_header">
          <CustomHeader
            title="Verify Ticket"
            desc="Check for your Ticket's validity"
          />
        </header>

        <div className="verify-tickets-comp_form">
          <VerifyTicketsFrom userData={userData} setDetails={setDetails} />
        </div>
      </div>

      <div className="verify-tickets-comp_details">
        {Object.keys(details).length < 1 ? null : details?.response_code ==
          "00" ? (
          <div>
             <div className="line-items">
                <p>Status:</p>
                <p className="success">{details?.response_message}</p>
              </div>
            {Object.entries(details)
            .filter(([key]) => displayKeys.includes(key))
            .map(([key, value]) => (
              <div key={key} className="line-items">
                <p>{CamelCaseToTitleCase(key)}:</p>
                <p>{key === "no_of_days" ? CamelCaseToTitleCase(value) : value}</p>
              </div>
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </section>
  );
};

export default VerifyTicketsComponent;
