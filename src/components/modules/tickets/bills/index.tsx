import React from "react";
import TicketsWalletCard from "../ticketsStatsCard";
import { SecondaryButton } from "@/src/components/common/button";
import { CustomHeader } from "@/src/components/common/header";
import "./style.scss";
import BillsTable from "./billsTable";


const BillsComponent = () => {
  return (
    <div className="transport">
      <header className="transport_header">
        <CustomHeader
          title="Bills"
          desc="View your bills"
        />
      </header>
      {/* <TicketsWalletCard /> */}

      <div className="transport_table">
        <BillsTable />
      </div>
    </div>
  );
};

export default BillsComponent;
