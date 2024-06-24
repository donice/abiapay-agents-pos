"use client";
import React, { useState } from "react";
import { TextInput } from "@/src/components/common/input";
import { Button } from "@/src/components/common/button";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  fetchTransactions,
  FetchTransactionsRequest,
} from "@/src/services/findServices";
import "./style.scss";
import { TbSearch } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";

const Form = ({ setTicketsData }: any) => {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FetchTransactionsRequest>({
    defaultValues: {
      merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
      phone_number: "",
      page: 1,
      limit: 5,
    },
  });

  const onSubmit: SubmitHandler<FetchTransactionsRequest> = (data) => {
    fetchTransactions(data);
    console.log(data);
  };

  const { data } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => console.log("hello"),
  });
  
  console.log(data);

  return (
    <>
      <form className="find-ticket" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="*"
          input_icon={<TbSearch />}
          type="number"
          name="phone_number"
          placeholder="Enter Taxpayer Phone Number"
          register={register}
          validation={{
            required: "Field Required",
            minLength: {
              value: 11,
              message: "Length must be above 11 characters",
            },
            maxLength: {
              value: 11,
              message: "Length must be below 13 characters",
            },
          }}
          error={errors.phone_number}
        />

        <Button text={"Search Tickets"} loading={false} />
      </form>

      {transactions.length > 0 && (
        <div>
          <h1>Transactions</h1>
          <ul>
            {transactions.map((transaction: any) => (
              <li key={transaction.idagent_transactions}>
                <p>Transaction ID: {transaction.idagent_transactions}</p>
                <p>Agency: {transaction.agency}</p>
                <p>Agent User: {transaction.agent_user}</p>
                <p>
                  Transaction Date:{" "}
                  {new Date(transaction.trans_date).toLocaleString()}
                </p>
                <p>Amount: {transaction.amount}</p>
                <p>Status: {transaction.status}</p>
                <p>Taxpayer Name: {transaction.taxpayer_name}</p>
                {/* Add more fields as needed */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Form;
