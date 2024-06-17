"use client";
import React, { useEffect } from "react";
import WalletCard from "./WalletCard";
import StatsCard from "./statsCard";
import { PrimaryButton, SecondaryButton } from "@/src/components/common/button";
import "./style.scss";
import { CustomHeader } from "@/src/components/common/header";
import { fetchDashboardData } from "@/src/services/dashboardService";
import toast from "react-hot-toast";
import LoaderSkeleton from "../../common/loader-skeleton";

const DashbaordComponent = () => {
  const fidelityData: {
    current_earnings: string | null;
    wallet_balance: string | null;
    wallet_id: string | null;
    wallet_name: string | null;
  } = {
    current_earnings: null,
    wallet_balance: null,
    wallet_id: null,
    wallet_name: null,
  };

  const accessData: {
    account_name: string | null;
    account_number: string | null;
    balance: string | null;
    bank_name: string | null;
    earnings: string | null;
    total_credit: string | null;
    total_debit: string | null;
  } = {
    account_name: null,
    account_number: null,
    balance: null,
    bank_name: null,
    earnings: null,
    total_credit: null,
    total_debit: null,
  };

  const getDashboardData = async () => {
    try {
      const res = await fetchDashboardData();
      console.log(res, "Response");
    } catch (error) {
      toast.error("Error fetching dashboard data");
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard_header">
        <CustomHeader title={`Welcome back`} desc="Overview of Dashboard" />

        {accessData && fidelityData ? (
          <div className="dashboard_header_buttons">
            <SecondaryButton
              text="Akara Ekwenti"
              link="/tickets/transport/add"
            />
            <PrimaryButton text="Smart Tickets" link="/tickets/transport/add" />
          </div>
        ) : (
          <div>
            <LoaderSkeleton />
            <LoaderSkeleton />
          </div>
        )}
      </header>
      <div className="dashboard_wallets">
        <WalletCard bank="access" data={accessData} />
        <WalletCard bank="fidelity" data={fidelityData} />
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
