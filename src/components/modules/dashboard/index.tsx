"use client";
import React, {
  useEffect,
  useReducer,
  type Reducer,
  useCallback,
  useState,
} from "react";
import StatsCard from "./statsCard";
import { PrimaryButton, SecondaryButton } from "@/src/components/common/button";
import "./style.scss";
import { CustomHeader } from "@/src/components/common/header";
import {
  fetchDashboardData,
  fetchABSSINData,
  fetchEnumerationData,
  fetchTotalABSSIN,
} from "@/src/services/dashboardService";
import toast from "react-hot-toast";
import LoaderSkeleton from "../../common/loader-skeleton";
import type { Action, State } from "../../types/dashboardTypes";
import useIsBrower from "@/src/hooks/useIsBrower";
import { WalletCard } from "./walletCard";
import { fetchTransactions } from "@/src/services/ticketsServices";
import QuickLink from "./quickLink";

function filterByTodaysDate(transactions: any[]) {
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  return transactions.filter((transaction) => {
    return transaction.trans_date.split("T")[0] === today;
  });
}

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
  const [userData, setUserData] = useState<{
    name?: string;
    user_cat?: string;
  } | null>(null);

  useEffect(() => {
    if (useIsBrower()) {
      const data = window.sessionStorage.getItem("USER_DATA");
      if (data) {
        try {
          setUserData(JSON.parse(data));
        } catch (e) {
          console.error("Error parsing JSON data:", e);
          setUserData({});
        }
      }
    }
  }, []);

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
      toast.error("Cannot fetch abssin data");
    }
  }, []);

  const getTotalABSSIN = useCallback(async () => {
    try {
      const res = await fetchTotalABSSIN();
      setABSSINCount(res?.data.length);
    } catch (error) {
      toast.error("Cannot fetch abssin data");
    }
  }, []);

  const getEnumerationDailyData = useCallback(async () => {
    try {
      const res = await fetchEnumerationData();
      setEnumerationCount(
        res?.response_data?.transport?.thisDay +
          res?.response_data?.market?.thisDay
      );
    } catch (error) {
      toast.error("Cannot fetch enumeration data");
    }
  }, []);

  const getTransportTicketData = useCallback(async () => {
    try {
      const res = await fetchTransactions();
      const todaysTickets = filterByTodaysDate(res?.data);
      setTtCount(todaysTickets.length);
    } catch (error) {
      toast.error("Cannot fetch ticket data");
    }
  }, []);

  useEffect(() => {
    getDashboardData();
    getABSSINData();
    getEnumerationDailyData();
    getTransportTicketData();
    getTotalABSSIN();
  }, []);

  const { fidelityData, accessData, loading } = state;

  return (
    <div className="dashboard">
      <header className="dashboard_header">
        <CustomHeader
          title={`Welcome${userData?.name && `, ${userData?.name}`}`}
          desc="Overview of your dashboard"
        />
        <div className="dashboard_header_buttons">
          <SecondaryButton
            text="Akara Ekwenti"
            link="/find/using-phone-number"
          />
          <PrimaryButton
            text="Sharp Sharp"
            link="/find/using-plate-number"
            addIcon={true}
          />
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
            link="/tickets"
          />
          <StatsCard
            name="ABSSIN"
            amount={abssinCount == null ? 0 : abssinCount.toString()}
            link="identity"
          />
          <StatsCard
            name="Enumeration"
            amount={enumerationCount == null ? 0 : enumerationCount.toString()}
            link="/enumeration"
          />
        </div>
      ) : (
        <div className="dashboard_stats_skeleton">
          <LoaderSkeleton height="70px" />
          <LoaderSkeleton height="70px" />
          <LoaderSkeleton height="70px" />
        </div>
      )}

      <div className="dashboard_quicklinks">
        {userData?.user_cat == "MdaUser" && (
          <QuickLink name="Bills" link="/bills" />
        )}
        <QuickLink name="Bulk Prints" link="/prints" />

      </div>
    </div>
  );
};

export default DashboardComponent;
