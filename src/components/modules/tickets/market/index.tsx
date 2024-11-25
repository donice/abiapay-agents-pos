import React from "react";
import TicketsWalletCard from "../ticketsStatsCard";
import { SecondaryButton } from "@/src/components/common/button";
import { CustomHeader } from "@/src/components/common/header";
import "./style.scss";

const MarketTicketComponent = () => {
  return (
    <div className="market">
      <header className="market_header">
        <CustomHeader
          title="Market Ticket"
          desc="Manage/Create Market Ticket"
        />
        <div className="market_header_buttons">
          <SecondaryButton text="Add Market Ticket" link="/tickets/market/add" />
        </div>
      </header>
      <TicketsWalletCard />
    </div>
  );
};

export default MarketTicketComponent;
