import React from "react";
import TicketsWalletCard from "../ticketsWalletsCard";
import { PrimaryButton } from "@/components/common/button";
import CustomHeader from "@/components/common/header";
import "./style.scss";

const TransportTicketComponent = () => {
  return (
    <div className="transport">
      <header className="transport_header">
        <CustomHeader title="Transport Ticket" desc="Manage/Create Transport Ticket"/>
        <div className="transport_header_buttons">
          <PrimaryButton text="Add Ticket" link="/tickets/transport/add"/>
        </div>
      </header>
      <TicketsWalletCard />
    </div>
  );
};

export default TransportTicketComponent;
