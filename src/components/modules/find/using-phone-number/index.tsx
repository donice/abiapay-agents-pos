import { GoBackButton } from "@/src/components/common/button";
import { CustomHeader } from "@/src/components/common/header";
import Form from "./form";
import React from "react";
import "../style.scss";

const UsingPhoneNumberComponent = () => {
  return (
    <section className="find">
      <GoBackButton link="/dasboard" />

      <div className="find-comp">
        <header>
          <CustomHeader
            title="Find Ticket"
            desc="Enter taxpayer phone number to find tickets"
          />
        </header>

        <div className="find-comp_form">
          <Form />
        </div>
      </div>
    </section>
  );
};

export default UsingPhoneNumberComponent;
