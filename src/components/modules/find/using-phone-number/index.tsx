"use client"
import { GoBackButton } from "@/src/components/common/button";
import { CustomHeader } from "@/src/components/common/header";
import Form from "./form";
import React from "react";
import "../style.scss";

const UsingPhoneNumberComponent = () => {
  const [ticketsData, setTicketsData] = React.useState([]);

  return (
    <section className="find">
      <GoBackButton link="/dasboard" />

      <div className="find-comp">
        <header>
          <CustomHeader
            title="Find Tickets"
            desc="Enter taxpayer phone number to find tickets"
          />
        </header>

        <div className="find-comp_form">
          <Form setTicketsData={setTicketsData}/>
        </div>
      </div>
    </section>
  );
};

export default UsingPhoneNumberComponent;
