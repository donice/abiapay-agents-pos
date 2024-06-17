"use client";
import React, { useEffect } from "react";
import WalletCard from "./WalletCard";
import StatsCard from "./statsCard";
import { PrimaryButton, SecondaryButton } from "@/src/components/common/button";
import "./style.scss";
import { CustomHeader } from "@/src/components/common/header";
import { fetchDashboardData } from "@/src/services/dashboardService";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import axiosInstance from "@/src/lib/axiosInstance";

const DashbaordComponent = () => {
  useEffect(() => {
    const res = fetchDashboardData;
  }, []);

  const res = axiosInstance.post("/dashboard/data")

  return (
    <div className="dashboard">
      <header className="dashboard_header">
        <CustomHeader title={`Welcome back`} desc="Overview of Dashboard" />
        <div className="dashboard_header_buttons">
          <SecondaryButton text="Akara Ekwenti" link="/tickets/transport/add" />
          <PrimaryButton text="Smart Tickets" link="/tickets/transport/add" />
        </div>
      </header>
      <div className="dashboard_wallets">
        <WalletCard bank="access" />
        <WalletCard bank="fidelity" />
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
