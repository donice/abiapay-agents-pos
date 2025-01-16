"use client";
import { usePathname, useRouter } from "next/navigation";
import { getLastPathSegment } from "@/src/utils/getLastPathSegment";
import React, { useMemo, useState } from "react";
import "./style.scss";
import { formatAmount } from "@/src/utils/formatAmount";
import { useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { Loading } from "@/src/components/common/loader/redirecting";
import { BillPaymentPayload, fetchBills } from "@/src/services/billServices";
import { useForm } from "react-hook-form";
import { fetchReceipts } from "@/src/services/receiptsServices";
import { PrimaryButton } from "@/src/components/common/button";
import { verifyTicket } from "@/src/services/verifyTickets";

const Dynamic = ({ params }: { params: { slug: string } }) => {
  console.log(params.slug);

  interface EmblemVerificationResponse {
    status: boolean;
    message: string;
    data: {
      response_code: string;
      vehicle_type: string;
      driver_phone: string;
      last_ticket_ref: string;
      fines: Record<string, unknown>;
      last_ticket_purchase: string;
      no_of_days: null | number;
      enumeration_status: null | string;
      expiration_date: string;
      response_message: string;
    };
  }

  const {
    data,
    isError,
    isLoading,
  } = useQuery<EmblemVerificationResponse>({
    queryKey: ["get_emblem"],
    queryFn: async () => {
      const response = await verifyTicket({
        agentEmail: "string",
        referenceID: params.slug,
        verifyType: "emblem",
      });
      if ('error' in response) {
        throw new Error(response.error);
      }
      return response.data;
    },
  });

  if (isError) {
    toast.error("Something went wrong fetching transactions");
    console.log("error");
  }

  return (
    <div className="receipts-details">
      <h1>Emblem Receipt Details</h1>
      {!isLoading ? (
        <> <div className="receipts-details_comp">

          <div>
            <p>Fee Type</p>
            <p>{data?.data?.vehicle_type || "-"}</p>
          </div>
          <div>
            <p>Driver Phone</p>
            <p>{data?.data?.driver_phone || "-"}</p>
          </div>
          <div>
            <p>Payment Reference</p>
            <p>{data?.data?.last_ticket_ref || "-"}</p>
          </div>
          <div>
            <p>Last Ticket Purchase</p>
            <p>{data?.data?.last_ticket_purchase || "-"}</p>
          </div>
          <div>
            <p>Next Payment Date</p>
            <p>{data?.data?.expiration_date || "-"}</p>
          </div>
          <div>
            <p>Status Message</p>
            <p>{data?.data?.response_message || "-"}</p>
          </div>
        </div>
        <PrimaryButton
            text={"Download Certificate"}
            link={`/tickets/transport/emblem/${data?.data?.last_ticket_ref }?payment_ref=${data?.data?.last_ticket_ref }`}
          />
        </>

      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Dynamic;
