import React from "react";
import { CustomHeader } from "@/src/components/common/header";
import VerifyTicketsFrom from "./form";
import "./style.scss";

const VerifyTicketsComponent = () => {
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
          <VerifyTicketsFrom />
        </div>
      </div>
    </section>
  );
};

export default VerifyTicketsComponent;
