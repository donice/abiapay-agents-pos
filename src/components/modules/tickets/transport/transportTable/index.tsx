"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@/src/components/common/loader/redirecting";
import "./style.scss";
import { Transaction } from "@/src/components/types/ticketTypes";
import Empty from "@/src/components/common/empty";
import { formatAmount } from "@/src/utils/formatAmount";
import { CamelCaseToTitleCase } from "@/src/utils/helper";
import { useRouter } from "next/navigation";
import { GoVerified } from "react-icons/go";
import { fetchTransactions } from "@/src/services/ticketsServices";
import toast from "react-hot-toast";
import { TbLoader } from "react-icons/tb";
import addEllipses from "@/src/utils/addElipses";


const TransactionsTable: React.FC = () => {
  const router = useRouter();
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  const fetced_data = data?.data || [];

  // console.log(data?.data, "DATATATATA");

  if (isLoading) {
    return (
      <div className={"loading"}>
        <Loading />
      </div>
    );
  }

  if (isError) {
    toast.error(error instanceof Error ? error.message : "Unknown error")
  }

  if (!data || data.length === 0) {
    return (
      <div className={"empty"}>
        <Empty />
      </div>
    );
  }

  return (
    <section className="main-table">
      {fetced_data.length > 0 ? (
        <div className="main-table_form_tickets_container">
          <div className="tickets">
            {fetced_data.map((transaction: any) => (
              <div
                key={transaction.idagent_transactions}
                className="ticket"
                // onClick={() =>
                //   router.push(
                //     `/find/using-phone-number/${transaction.idagent_transactions}`
                //   )
                // }
              >
                <div>
                  <p>{transaction.revenue_item}</p>
                  <p>{transaction.agency}</p>
                  <p>{new Date(transaction.trans_date).toLocaleString()}</p>
                  <p>{addEllipses(transaction?.reference, 20)}</p>
                </div>
                <div>
                  <p>N{formatAmount(transaction.amount)}</p>
                  <p
                    className={`${
                      transaction.status === "Completed" ? "completed" : "pending"
                    }`}
                  >
                    {transaction.status === "Completed" ? <GoVerified /> : <TbLoader /> }
                    {transaction.status}
                  </p>
                  <p>{transaction.payment_period}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Empty text="No tickets found" />
      )}
    </section>
  );
};

export default TransactionsTable;
