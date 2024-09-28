"use client";
import { usePathname } from "next/navigation";
import { getLastPathSegment } from "@/src/utils/getLastPathSegment";
import React from "react";
import { BackButton } from "@/src/components/common/button";
import "./style.scss";
import { formatAmount } from "@/src/utils/formatAmount";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateTicketPayload } from "@/src/components/types/ticketTypes";
import { getCurrentDateTime } from "@/src/utils/getCurrentDateTime";
import { randomInvoiceGenerator } from "@/src/utils/randomInvoiceGenerator";
import { useMutation, useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { getErrorMessages } from "@/src/utils/helper";
import { fetchTransactions } from "@/src/services/ticketsServices";
import { Loading } from "@/src/components/common/loader/redirecting";

const Dynamic = () => {
  const path = usePathname();
  const segment = getLastPathSegment(path);

  const { data, isError } = useQuery({
    queryKey: ["get_transactions"],
    queryFn: () => {
      return fetchTransactions();
    },
  });

  if (isError) {
    toast.error("Something went wrong fetching transactions");
    console.log("error");
  }

  const ticket = data?.data?.filter(
    (ticket: any) => ticket.idagent_transactions == segment
  );

  return (
    <div className="ticket-details">
      <h1>Transaction Details</h1>
      {data?.data ? (
        <div className="ticket-details_comp">
          <div>
            <p>Transaction Status</p>
            <p>{ticket[0]?.status || "-"}</p>
          </div>
          <div>
            <p>Plate Number</p>
            <p>{ticket[0]?.plate_number || "-"}</p>
          </div>

          <div>
            <p>Amount</p>
            <p>₦ {formatAmount(ticket[0]?.amount) || "-"}</p>
          </div>

          <div>
            <p>Taxpayer Name</p>
            <p>{ticket[0]?.taxpayer_name || "-"}</p>
          </div>

          <div>
            <p>Ticket Type</p>
            <p>{ticket[0]?.revenue_item || "-"}</p>
          </div>

          <div>
            <p>Phone Number</p>
            <p>{ticket[0]?.taxpayer_phone || "-"}</p>
          </div>

          <div>
            <p>Payment Period</p>
            <p>{ticket[0]?.payment_period || "-"}</p>
          </div>
          <div>
            <p>Agent Name</p>
            <p>{ticket[0]?.agent_user || "-"}</p>
          </div>
          <div>
            <p>Created Time</p>
            <p>{ticket[0]?.createtime || "-"}</p>
          </div>
          <div>
            <p>Payment Reference</p>
            <p>{ticket[0]?.payment_ref || "-"}</p>
          </div>
        </div>
      ) : (
        <Loading />
      )}

      <div className="ticket-details_form_btn">
        <BackButton link={"/tickets/transport"} />
      </div>
    </div>
  );
};

export default Dynamic;
