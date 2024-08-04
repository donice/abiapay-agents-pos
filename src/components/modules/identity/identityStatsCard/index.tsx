"use client";
import React from "react";
import "./style.scss";
import { fetchCollectionData } from "@/src/services/dashboardService";
import { useQuery } from "@tanstack/react-query";
import LoaderSkeleton from "@/src/components/common/loader-skeleton";
import { formatAmount } from "@/src/utils/formatAmount";

const IdentityStatsCard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ticketsWalletData"],
    queryFn: fetchCollectionData,
  });

  if (isLoading) {
    return (
      <div>
        <LoaderSkeleton height="100px" />
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
        <figure className="identity-stats">
          <div className="identity-stats-card">
            <div className="ticket_container">
              <div className="identity-stats-card_balance">
                <span>Today's ABSSIN</span>
                <span>20</span>
              </div>

              <div className="identity-stats-card_image"></div>

              <div className="identity-stats-card_balance">
                <span>This Week's ABSSIN</span>
                <span>34</span>
              </div>
            </div>
          </div>
          {/* <div className="identity-stats-card">
            <div className="ticket_container">
              <div className="identity-stats-card_balance">
                <span>Week's Collections</span>
                <span>
                  ₦{formatAmount(data.data?.[0].total_amount_monthly)}
                </span>
              </div>

              <div className="identity-stats-card_image"></div>

              <div className="identity-stats-card_balance">
                <span>Month's Collection</span>
                <span>{data.data?.[0].total_transaction_weekly}</span>
              </div>
            </div>
          </div> */}
        </figure>
      ) : (
        <LoaderSkeleton height="200px" />
      )}
    </>
  );
};

export default IdentityStatsCard;
