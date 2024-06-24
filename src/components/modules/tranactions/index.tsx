"use client"
import React, { useState } from "react";
import { CustomHeader } from "../../common/header";
import { formatAmount } from "@/src/utils/formatAmount";
import { CamelCaseToTitleCase } from "@/src/utils/helper";
import router from "next/router";
import { GoVerified } from "react-icons/go";
import { GoBackButton } from "../../common/button";
import Empty from "../../common/empty";
import "./style.scss";
import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "@/src/services/transactions";
import { Loading } from "../../common/loader/redirecting";
import toast from "react-hot-toast";

const TransactionsComponent = () => {
  // const [transactions, setTransactions] = useState(null || []);

const { data, isError, isLoading } = useQuery({
  queryKey: ["transactions"],
  queryFn: () => {
    return fetchTransactions();
  },
});
 if (isError) {
  toast.error("Something went wrong fetching transactions");
    console.log("error");
  }

  return (
    <div className="tranactions">
      <GoBackButton link="/dashboard" />

      <div className="tranactions-comp">
        <header>
          <CustomHeader
            title="Wallet Transactions"
            desc="View all tranactions"
          />
        </header>

        <div className="tranactions-comp_form">
          {data && data.length > 0 ? (
            <div className="tranactions-comp_form_tickets_container">
              <div className="tickets">
                {data.map((transaction: any) => (
                  <div
                    key={transaction.idagent_transactions}
                    className="ticket"
                    onClick={() =>
                      router.push(
                        `/tranactions/using-phone-number/${transaction.idagent_transactions}`
                      )
                    }
                  >
                    <div>
                      <p>{CamelCaseToTitleCase(transaction.revenue_item)}</p>
                      <p>{transaction.agency}</p>
                      <p>{new Date(transaction.trans_date).toLocaleString()}</p>
                      <p>{transaction.reference}</p>
                    </div>
                    <div>
                      <p>N{formatAmount(transaction.amount)}</p>
                      <p
                        className={`${
                          transaction.status === "Completed" ? "completed" : " "
                        }`}
                      >
                        {transaction.status === "Completed" && <GoVerified />}
                        {transaction.status}
                      </p>
                      <p>{transaction.payment_period}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : isLoading ? <Loading /> : (
            <Empty text="No Transactions found" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionsComponent;
