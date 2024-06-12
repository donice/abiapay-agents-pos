import React from "react";
import TicketsWalletCard from "../ticketsWalletsCard";
import { PrimaryButton } from "@/components/common/button";
import "./style.scss";

const TransportTicketComponent = () => {
  return (
    <div className="transport">
      <header className="transport_header">
        <div className="transport_header_text">
          <h1>Transport Ticket</h1>
          <p>Manage/Create Transport Tickets</p>
        </div>
        <div className="transport_header_buttons">
          <PrimaryButton text="Add Ticket" />
        </div>
      </header>
      <TicketsWalletCard />
    </div>
  );
};

export default TransportTicketComponent;
