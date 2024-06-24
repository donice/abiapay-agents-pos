"use client";
import React, { useEffect, useState } from "react";
import { CustomHeader } from "@/src/components/common/header";
import "./style.scss";
import {
  Button,
  BackButton,
  GoBackButton,
} from "@/src/components/common/button";
import { Loading } from "@/src/components/common/loader/redirecting";
import { CamelCaseToTitleCase } from "@/src/utils/helper";
import { formatAmount } from "@/src/utils/formatAmount";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import SuccessModal from "@/src/components/common/modal";

interface TicketData {
  [key: string]: any;
}

const TransportTicketsSummaryComponent: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<TicketData | null>(null);
  const [show, setShow] = useState(false);

  const [paymentRef, setPaymentRef] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem("TRANSPORT_INVOICE");
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    }
  }, []);

  const handleSubmit = async () => {
    const storedData = sessionStorage.getItem("TRANSPORT_INVOICE");

    if (!storedData) {
      toast.error("Error Creating Ticket");
      return;
    }

    const formData = JSON.parse(storedData);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/transport/create-ticket`,
        formData
      );

      const response = res?.data;

      if (response.response_code == "00") {
        toast.success(response.response_message);
        setPaymentRef(response.payment_ref);
        console.log(response.payment_ref);
        setShow(true);
      } else if (response.response_code === "74") {
        toast.error(response.response_message);
        router.push("/tickets/transport");
      } else {
        toast.error(`${response.response_message}, Try again`);
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      toast.error("Error Creating Ticket");
    }
  };

  const displayKeys = [
    "transaction_date",
    "invoice_id",
    "paymentPeriod",
    "agentEmail",
    "plateNumber",
    "taxPayerPhone",
    "taxPayerName",
    "wallet_type",
  ];

  const amount = data?.amount;

  return (
    <section className="tickets">
      <GoBackButton link="/tickets/transport/add" />

      {data ? (
        <div className="tickets-summary-comp">
          <div className="tickets-summary-comp_header">
            <CustomHeader
              title="Transport Ticket Details"
              desc="Confirm the details for your Ticket Purchase"
            />
          </div>

          <div className="tickets-summary-comp_container">
            <div>
               {Object.entries(data)
                .filter(([key]) => displayKeys.includes(key))
                .map(([key, value]) => (
                <div key={key} className="line-items">
                  <p>{CamelCaseToTitleCase(key)}:</p>
                  <p>{value}</p>
                </div>
              ))}
               
                <div key={"amount"} className="line-items">
                  <p>Amount:</p>
                  <p>{formatAmount(amount)}</p>
                </div>
            </div>
          </div>
          <div className="btn_container">
            <BackButton link="/tickets/transport/add" />
            <Button text="Proceed to Payment" onClick={handleSubmit} />
          </div>
        </div>
      ) : (
        <Loading />
      )}

      {show && <SuccessModal text="Go to transport" link="/tickets/transport" id={paymentRef}/>}
    </section>
  );
};

export default TransportTicketsSummaryComponent;
