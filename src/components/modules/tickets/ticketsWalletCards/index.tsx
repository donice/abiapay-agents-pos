"use client";
import React from "react";
import { fetchDashboardData } from "@/src/services/dashboardService";
import { useQuery } from "@tanstack/react-query";
import { TicketsWalletCard } from "../../dashboard/walletCard";
import { State } from "@/src/components/types/dashboardTypes";
import "./style.scss";

const initialState: State = {
  fidelityData: {
    total_credit: null,
    total_debit: null,
    balance: null,
    earnings: null,
    account_name: null,
    account_number: null,
    bank_name: null,
  },
  accessData: {
    current_earnings: null,
    wallet_balance: null,
    wallet_id: null,
    wallet_name: null,
  },
  loading: true,
};


const TicketsWalletCards = () => {
  const { data } = useQuery({
    queryKey: ["get_dashboard_data"],
    queryFn: () => {
      return fetchDashboardData();
    },
  });

  console.log(data);

  return (
    <div className="ticketspage_wallet">
      <TicketsWalletCard
        bank={"access"}
        data={{
          total_credit: undefined,
          total_debit: data?.ledger_balance,
          balance: undefined,
          earnings: undefined,
          account_name: data?.access.wallet_name,
          account_number: data?.access?.wallet_id,
          bank_name: "access",
          current_earnings: data?.access?.current_earnings,
          wallet_balance: data?.access?.wallet_balance,
          wallet_id: data?.access?.wallet_id,
          wallet_name: data?.access?.wallet_name,
        }}
      />
      <TicketsWalletCard
        bank={"fidelity"}
        data={{
          total_credit: undefined,
          total_debit: data?.ledger_balance,
          balance: data?.fidelity?.balance,
          earnings: data?.fidelity?.earnings,
          account_name: data?.fidelity.wallet_name,
          account_number: data?.fidelity?.account_number,
          bank_name: "fidelity",
          current_earnings: data?.fidelity?.earnings,
          wallet_balance: data?.fidelity?.balance,
          wallet_id: data?.fidelity?.account_number,
          wallet_name: data?.fidelity?.account_name,
        }}
      />
    </div>
  );
};

export default TicketsWalletCards;
