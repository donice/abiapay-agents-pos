"use client";
import React, { useEffect, useReducer, Reducer } from "react";
import WalletCard from "./WalletCard";
import StatsCard from "./statsCard";
import { PrimaryButton, SecondaryButton } from "@/src/components/common/button";
import "./style.scss";
import { CustomHeader } from "@/src/components/common/header";
import { fetchDashboardData } from "@/src/services/dashboardService";
import toast from "react-hot-toast";
import LoaderSkeleton from "../../common/loader-skeleton";
import { Action, State } from "../../types/dashboardTypes";

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

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        fidelityData: action.payload.fidelityData,
        accessData: action.payload.accessData,
        loading: false,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const DashboardComponent: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getDashboardData = async () => {
    try {
      const res = await fetchDashboardData();
      dispatch({
        type: "FETCH_SUCCESS",
        payload: {
          fidelityData: res.fidelity,
          accessData: res.access,
        },
      });
    } catch (error) {
      toast.error("Error fetching dashboard data");
      dispatch({ type: "FETCH_ERROR" });
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  const { fidelityData, accessData, loading } = state;

  return (
    <div className="dashboard">
      <header className="dashboard_header">
        <CustomHeader title={`Welcome back`} desc="Overview of Dashboard" />
        {!loading ? (
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

export default DashboardComponent;
