import React, { ReactElement } from "react";
import { Metadata } from "next";
import { CustomHeader } from "@/src/components/common/header";
import { FcShipped, FcPaid } from "react-icons/fc";
import Link from "next/link";
import "./style.scss";

export const metadata: Metadata = {
  title: "Add Ticket",
  description: "Agents Portal Tickets Page",
};

interface TicketsProps {
  name: string;
  title: string;
  desc: string;
  icon: ReactElement;
}

const tickets: TicketsProps[] = [
  {
    name: "tickets/transport/add",
    title: "Transport Tickets",
    desc: "Create transport ticket",
    icon: <FcShipped className="icon" />,
  },
  {
    name: "tickets/market/add",
    title: "Market Tickets",
    desc: "Create market ticket",
    icon: <FcPaid className="icon" />,
  },
];

const AddTicketPage = () => {
  return (
    <div className="ticketspage">
      <CustomHeader title="Add Ticket" desc={"Select ticket type"} />

      <div className="ticketspage_items">
        {tickets.map((item) => (
          <Link
            href={`/${item.name}`}
            key={item.name}
            className={`ticketspage_item`}
          >
            <div >
              {" "}
              <span>{item.icon}</span>
              <div>
                <h2>{item.title}</h2>
                <p>{item.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AddTicketPage;
