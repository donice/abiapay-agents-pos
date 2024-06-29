"use client";
import React, { ReactElement } from "react";
import "./style.scss";
import Link from "next/link";
import getRoute from "@/src/hooks/getRoute";
import {
  TbHome,
  TbTicket,
  TbBasketDown,
  TbLogout2,
  TbLineScan,
} from "react-icons/tb";

interface SideNavProps {
  name: string;
  title: string;
  icon?: ReactElement;
}

const nav_items: SideNavProps[] = [
  {
    name: "dashboard",
    title: "Dashboard",
    icon: <TbHome className="icon" />,
  },
  {
    name: "tickets/transport",
    title: "Transport Ticket",
    icon: <TbTicket className="icon" />,
  },
  {
    name: "tickets/verify",
    title: "Verify Ticket",
    icon: <TbLineScan className="icon" />,
  },
  {
    name: "tickets/market",
    title: "Maket Ticket",
    icon: <TbBasketDown className="icon" />,
  },
];

const SideNav = () => {
  const route = getRoute();

  return (
    <div className="side-nav">
      <div className="side-nav_items_container">
        <div className="side-nav_items">
          {nav_items.map((item) => (
            <Link href={`/${item.name}`} key={item.name} className={`side-nav_item ${item.name === route ? "active" : "inactive"}`}>
                <span>{item.icon}</span>
                <span>{item.title}</span>
            </Link>
          ))}
          <div key={"logout"} className="side-nav_item logout">
            <span>
              <TbLogout2 className="icon out" />
            </span>
            <span>Sign Out</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
