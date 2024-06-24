"use client";
import React, { useEffect, useReducer, Reducer, useCallback } from "react";
import WalletCard from "./WalletCard";
import StatsCard from "./statsCard";
import { PrimaryButton, SecondaryButton } from "@/src/components/common/button";
import "./style.scss";
import { CustomHeader } from "@/src/components/common/header";
import {
  fetchDashboardData,
  fetchABSSINData,
  fetchEnumerationData,
  fetchTransportTicketData,
} from "@/src/services/dashboardService";
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
  const [abssinCount, setABSSINCount]: any = React.useState(0);
  const [enumerationCount, setEnumerationCount]: any = React.useState(null);
  const [ttCount, setTtCount]: any = React.useState(null);

  // ! using useCallback to memoize the data coming from the services

  const getDashboardData = useCallback(async () => {
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
  }, []);

  const getABSSINData = useCallback(async () => {
    try {
      const res = await fetchABSSINData();
      setABSSINCount(res?.data.length);
    } catch (error) {
      toast.error("Cannot fetching abssin data");
    }
  }, []);

  const getEnumerationData = useCallback(async () => {
    try {
      const res = await fetchEnumerationData();
      setEnumerationCount(res?.data.length);
    } catch (error) {
      toast.error("Cannot fetching enumeration data");
    }
  }, []);

  const getTransportTicketData = useCallback(async () => {
    try {
      const res = await fetchTransportTicketData();
      setTtCount(res?.data.length);
    } catch (error) {
      toast.error("Cannot fetching enumeration data");
    }
  }, []);

  useEffect(() => {
    getDashboardData();
    getABSSINData();
    getEnumerationData();
    getTransportTicketData();
  }, []);

  const { fidelityData, accessData, loading } = state;

  return (
    <div className="dashboard">
      <header className="dashboard_header">
        <CustomHeader title={`Welcome back`} desc="Overview of Dashboard" />
        <div className="dashboard_header_buttons">
          <SecondaryButton text="Akara Ekwenti" link="/find/using-phone-number" />
          <PrimaryButton text="Sharp Sharp" link="/find/using-plate-number" />
        </div>
      </header>

      {!loading ? (
        <div className="dashboard_wallets">
          <WalletCard bank="access" data={accessData} />
          <WalletCard bank="fidelity" data={fidelityData} />
        </div>
      ) : (
        <div className="dashboard_wallets_skeleton">
          <LoaderSkeleton />
          <LoaderSkeleton />
        </div>
      )}

      {abssinCount != null && enumerationCount != null ? (
        <div className="dashboard_stats">
          <StatsCard
            name="Tickets"
            amount={ttCount == null ? 0 : ttCount.toString()}
          />
          <StatsCard
            name="ABSSIN"
            amount={abssinCount == null ? 0 : abssinCount.toString()}
          />
          <StatsCard
            name="Enumeration"
            amount={enumerationCount == null ? 0 : enumerationCount.toString()}
          />
        </div>
      ) : (
        <div className="dashboard_stats_skeleton">
          <LoaderSkeleton height="70px" />
          <LoaderSkeleton height="70px" />
          <LoaderSkeleton height="70px" />
        </div>
      )}
    </div>
  );
};

export default DashboardComponent;
