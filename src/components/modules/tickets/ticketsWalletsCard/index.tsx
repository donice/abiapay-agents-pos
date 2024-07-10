"use client";
import React from "react";
import "./style.scss";
import { fetchEnumerationData } from "@/src/services/dashboardService";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/(secured)/loading";
import LoaderSkeleton from "@/src/components/common/loader-skeleton";
import { formatAmount } from "@/src/utils/formatAmount";

const TicketsWalletCard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ticketsWalletData"],
    queryFn: fetchEnumerationData,
  });

  if (isLoading) {
    return (
      <div className={"loading"}>
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p>Error</p>
      </div>
    );
  }

  // console.log(data.data, "Data");

  return (
    <>
      {data ? (
        <figure className="tickets-wallet">
          <div className="tickets-wallet-card">
            <div className="tickets-wallet-card_balance">
              <span>Today's Collections</span>
              <span>N{formatAmount(data.data?.[0].total_amount)}</span>
            </div>

            <div className="tickets-wallet-card_image"></div>

            <div className="tickets-wallet-card_balance">
              <span>ePayments Today</span>
              <span>{data.data?.[0].total_transaction}</span>
            </div>
          </div>
          <div className="tickets-wallet-card">
            <div className="tickets-wallet-card_balance">
              <span>Week's Collections</span>
              <span>N{formatAmount(data.data?.[0].total_amount_monthly)}</span>
            </div>

            <div className="tickets-wallet-card_image"></div>

            <div className="tickets-wallet-card_balance">
              <span>ePayments This Week</span>
              <span>{data.data?.[0].total_transaction_weekly}</span>
            </div>
          </div>
        </figure>
      ) : (
        <LoaderSkeleton height="200px" />
      )}
    </>
  );
};

export default TicketsWalletCard;
