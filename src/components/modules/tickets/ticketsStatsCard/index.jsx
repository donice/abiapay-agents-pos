"use client";
import React from "react";
// import "./style.scss" // Moved to _app;
import { fetchCollectionData } from "@/src/services/dashboardService";
import { useQuery } from "@tanstack/react-query";
import LoaderSkeleton from "@/src/components/common/loader-skeleton";
import { formatAmount } from "@/src/utils/formatAmount";
var TicketsStatsCard = function () {
    var _a, _b, _c, _d;
    var _e = useQuery({
        queryKey: ["ticketsWalletData"],
        queryFn: fetchCollectionData,
    }), data = _e.data, isLoading = _e.isLoading, isError = _e.isError;
    if (isLoading) {
        return (<div>
        <LoaderSkeleton height="100px"/>
      </div>);
    }
    if (isError) {
        return (<div>
        <p>Error</p>
      </div>);
    }
    // console.log(data.data, "Data");
    return (<>
      {data ? (<figure className="tickets-wallet">
          <div className="tickets-wallet-card">
            <div className="ticket_container">
              <div className="tickets-wallet-card_balance">
                <span>Today&apos;s Collections</span>
                <span>₦{formatAmount((_a = data.data) === null || _a === void 0 ? void 0 : _a[0].total_amount)}</span>
              </div>

              <div className="tickets-wallet-card_image"></div>

              <div className="tickets-wallet-card_balance">
              <span>{new Date().toDateString()}</span>

                <span>{(_b = data.data) === null || _b === void 0 ? void 0 : _b[0].total_transaction} Tickets</span>
              </div>
            </div>
          </div>
          <div className="tickets-wallet-card">
            <div className="ticket_container">
              <div className="tickets-wallet-card_balance">
                <span>Week&apos;s Collections</span>
                <span>
                  ₦{formatAmount((_c = data.data) === null || _c === void 0 ? void 0 : _c[0].total_amount_weekly)}
                </span>
              </div>

              <div className="tickets-wallet-card_image"></div>

              <div className="tickets-wallet-card_balance">
                <span>Month&apos;s Collection</span>
                <span>{(_d = data.data) === null || _d === void 0 ? void 0 : _d[0].total_transaction_weekly} Tickets</span>
              </div>
            </div>
          </div>
        </figure>) : (<LoaderSkeleton height="200px"/>)}
    </>);
};
export default TicketsStatsCard;
