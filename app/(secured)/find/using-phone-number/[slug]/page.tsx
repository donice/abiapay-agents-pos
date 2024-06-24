"use client";
import { usePathname } from "next/navigation";
import { getLastPathSegment } from "@/src/utils/getLastPathSegment";
import React from "react";
import { SelectInput } from "@/src/components/common/input";
import {
  BackButton,
  DefaultButton,
} from "@/src/components/common/button";
import "./style.scss";
import { formatAmount } from "@/src/utils/formatAmount";

const Dynamic = () => {
  const path = usePathname();
  const segment = getLastPathSegment(path);
  let fetched_data = sessionStorage.getItem("TICKETS_DATA");
  const data = fetched_data && JSON.parse(fetched_data);

  // console.log(data, segment);

  const ticket = data?.filter(
    (ticket: any) => ticket.idagent_transactions == segment
  );
  // console.log(ticket);

  return (
    <div className="ticket-details">
      <h1>Ticket Details</h1>
      <div className="ticket-details_comp">
        <div>
          <p>Plate Number</p>
          <p>{ticket[0]?.plate_number}</p>
        </div>

        <div>
          <p>Amount</p>
          <p>N {formatAmount(ticket[0]?.amount)}</p>
        </div>

        <div>
          <p>Taxpayer Name</p>
          <p>{ticket[0]?.taxpayer_name}</p>
        </div>

        <div>
          <p>Ticket Type</p>
          <p>{ticket[0]?.revenue_item}</p>
        </div>

        <div>
          <p>Phone Number</p>
          <p>{ticket[0]?.taxpayer_phone}</p>
        </div>

        <div>
          <p>Payment Period</p>
          <p>{ticket[0]?.payment_period}</p>
        </div>
      </div>

      <form className="ticket-details_form">
        <SelectInput
          label={"Choose Wallet"}
          name={"wallet_type"}
          id={"wallet_type"}
          options={[
            { value: "fidelity", label: "Fidelity Bank" },
            { value: "access", label: "Access Bank" }
            ,
          ]}
        />
        <div className="ticket-details_form_btn">
          <DefaultButton text={"Re-Vend Ticket"} link={""} />
          <BackButton link={""} />
        </div>
      </form>
    </div>
  );
};

export default Dynamic;
