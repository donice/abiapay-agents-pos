import React from "react";
import { CustomHeader } from "@/src/components/common/header";
import "./style.scss";
import { GoBackButton } from "@/src/components/common/button";
import AddTransportTicketForm from "./form";

const AddTransportTicketComponent = () => {
  return (
    <section className="transport_add">
      <GoBackButton link="/tickets/transport" />
      <div className="transport-comp">
        <header className="transport-comp_header">
          <CustomHeader
            title="Add Transport Ticket"
            desc="Manage/Create Transaction"
          />
        </header>

        <div className="transport-comp_form">
          <AddTransportTicketForm />
        </div>
      </div>
    </section>
  );
};

export default AddTransportTicketComponent;
