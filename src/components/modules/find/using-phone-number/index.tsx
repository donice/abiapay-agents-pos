"use client";
import { GoBackButton } from "@/src/components/common/button";
import { CustomHeader } from "@/src/components/common/header";
import Form from "./form";
import React, { useState } from "react";
import { formatAmount } from "@/src/utils/formatAmount";
import { CamelCaseToTitleCase } from "@/src/utils/helper";
import { GoVerified } from "react-icons/go";
import Empty from "@/src/components/common/empty";
import "../style.scss";

const UsingPhoneNumberComponent = () => {
  const [ticketsData, setTicketsData] = useState(null || []);
  const [searched, setSearched] = useState(false);

  console.log(ticketsData);

  return (
    <section className="find">
      <GoBackButton link="/dasboard" />

      <div className="find-comp">
        <header>
          <CustomHeader
            title="Find Tickets"
            desc="Enter taxpayer phone number to find tickets"
          />
        </header>

        <div className="find-comp_form">
          <Form setTicketsData={setTicketsData} setSearched={setSearched}/>

          {ticketsData.length > 0 ? (
            <div className="find-comp_form_tickets_container">
              <div className="tickets">
                {ticketsData.map((transaction: any) => (
                  <div
                    key={transaction.idagent_transactions}
                    className="ticket"
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
          ) : searched ? (
            <Empty text="No tickets found" />
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default UsingPhoneNumberComponent;
