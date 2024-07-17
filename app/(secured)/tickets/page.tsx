import React, { type ReactElement } from "react";
import type { Metadata } from "next";
import { CustomHeader } from "@/src/components/common/header";
import { FcShipped, FcPaid, FcAcceptDatabase, FcMoneyTransfer } from "react-icons/fc";
import Link from "next/link";
import "./style.scss";

export const metadata: Metadata = {
  title: "Manage Ticket",
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
    name: "tickets/transport",
    title: "Transaction History",
    desc: "View your Tickets Transactions History",
    icon: <FcAcceptDatabase className="icon" />,
  },
  {
    name: "transfers",
    title: "Transfer History",
    desc: "View your Wallet Transfer History",
    icon: <FcMoneyTransfer className="icon" />,
  },
];

const TicketPage = () => {
  return (
    <div className="ticketspage">
      <CustomHeader title="Manage Ticket" desc={"Manage your tickets"} />

      <div className="ticketspage_items">
        {tickets.map((item) => (
          <Link
            href={`/${item.name}`}
            key={item.name}
            className={"ticketspage_item"}
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

export default TicketPage;
