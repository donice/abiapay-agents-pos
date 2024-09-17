import React, { type ReactElement } from "react";
import type { Metadata } from "next";
import { CustomHeader } from "@/src/components/common/header";
import {
  FcShipped,
  FcInTransit,
  FcAcceptDatabase,
  FcMoneyTransfer,
  FcDiploma2,
  FcAutomatic,
  FcFactory,
  FcCloseUpMode,
  FcElectronics,
  FcFinePrint,
  FcGlobe,
  FcLandscape,
  FcShop,
  FcEngineering,
} from "react-icons/fc";
import Link from "next/link";
import "./style.scss";

export const metadata: Metadata = {
  title: "Manage Ticket",
  description: "Agents Portal Tickets Page",
};

interface TicketsProps {
  name: string;
  title: string;
  desc?: string;
  icon: ReactElement;
}

const tickets: TicketsProps[] = [
  {
    name: "tickets/transport/flying-revenue/produce",
    title: "Produce",
    icon: <FcShop className="icon" />,
  },
  {
    name: "tickets/transport/flying-revenue/loading-offloading",
    title: "Scrap Metal",
    icon: <FcInTransit className="icon" />,
  },
  {
    name: "tickets/transport/flying-revenue/flying-revenue",
    title: "Veterinary Inspection/Abattoir Fees",
    icon: <FcAutomatic className="icon" />,
  },
  {
    name: "tickets/transport/flying-revenue/emblem",
    title: "Stone Sites",
    icon: <FcElectronics className="icon" />,
  },
  {
    name: "tickets/transport/flying-revenue",
    title: "Quarry Sites",
    icon: <FcAcceptDatabase className="icon" />,
  },
  {
    name: "tickets/transport/flying-revenue",
    title: "Inter State Haulage & Commerece Levy",
    icon: <FcLandscape className="icon" />,
  },
  {
    name: "tickets/transport/flying-revenue/",
    title: "Bandage & Basket Handling Charge",
    icon: <FcFactory className="icon" />,
  },
  {
    name: "tickets/transport/flying-revenue/",
    title: "Forestry",
    icon: <FcGlobe className="icon" />,
  },
  {
    name: "tickets/transport/flying-revenue/",
    title: "Market Daily Tolls",
    icon: <FcFinePrint className="icon" />,
  },
  {
    name: "tickets/transport/flying-revenue/",
    title: "Palm Produce",
    icon: <FcCloseUpMode className="icon" />,
  },
  {
    name: "tickets/transport/flying-revenue/",
    title: "Sand Beaches",
    icon: <FcShipped className="icon" />,
  },
  {
    name: "tickets/transport/flying-revenue/produce",
    title: "Gate Pass",
    icon: <FcEngineering className="icon" />,
  },
];

const TicketPage = () => {
  return (
    <div className="flying-revenue">
      <CustomHeader title="Flying Revenue" desc={"Manage your haulage items"} />

      <div className="flying-revenue_container">

        <div className="flying-revenue_items">
          {tickets.map((item) => (
            <Link
              href={`/${item.name}`}
              key={item.name}
              className={"flying-revenue_item"}
            >
              <div>
                {" "}
                <span>{item.icon}</span>
                <div>
                  <h2>{item.title}</h2>
                  {/* <p>{item.desc}</p> */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicketPage;
