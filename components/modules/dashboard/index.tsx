"use client";
import React from "react";
import WalletCard from "./WalletCard";
import StatsCard from "./statsCard";
import { PrimaryButton, SecondaryButton } from "@/components/common/button";
import "./style.scss";

const DashbaordComponent = () => {

  return (
    <div className="dashboard">
      <header className="dashboard_header">
        <div className="dashboard_header_text">
          <h1>Dashboard</h1>
          <p>Overview of Dashboard</p>
        </div>
        <div className="dashboard_header_buttons">
          <SecondaryButton text="Akara Ekwenti" />
          <PrimaryButton text="Smart Tickets" />
        </div>
      </header>
      <div className="dashboard_wallets">
        <WalletCard bank="access" />
        <WalletCard bank="fidelity"/>
      </div>
      <div className="dashboard_stats">
        <StatsCard name="Tickets" amount="30" />
        <StatsCard name="ABSSIN" amount="30" />
        <StatsCard name="Enumeration" amount="30" />
      </div>
    </div>
  );
};

export default DashbaordComponent;
