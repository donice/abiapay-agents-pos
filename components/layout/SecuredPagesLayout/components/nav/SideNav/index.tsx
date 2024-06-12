"use client";
import React, { ReactElement } from "react";
import "./style.scss";
import Link from "next/link";
import getRoute from "@/hooks/getRoute";
import {
  TbLayoutDashboard,
  TbTicket,
  TbBasketDown,
  TbLogout2,
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
    icon: <TbLayoutDashboard className="icon" />,
  },
  {
    name: "tickets/transport",
    title: "Transport Ticket",
    icon: <TbTicket className="icon" />,
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
    <nav className="side-nav">
      <div className="side-nav_items_container">
        <ul className="side-nav_items">
          {nav_items.map((item) => (
            <Link href={`/${item.name}`} key={item.name}>
              <li key={item.name} className={`${item.name === route ? "active" : "inactive"}`}>
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </li>
            </Link>
          ))}
          <li key={"logout"} className="logout">
            <span>
              <TbLogout2 className="icon out" />
            </span>
            <span>Sign Out</span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SideNav;
