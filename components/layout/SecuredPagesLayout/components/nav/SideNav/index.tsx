"use client";
import React, { ReactElement } from "react";
import "./style.scss";
import {
  TbLayoutDashboard,
  TbTicket,
  TbBasketDown,
  TbLogout2,
} from "react-icons/tb";
import { useRouter } from "next/router";
import Link from "next/link";

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
  // const router = useRouter();
  // const { asPath } = router;

  return (
    <nav className="side-nav">
      {/* {asPath} */}
      <div className="side-nav_items_container">
        <ul className="side-nav_items">
          {nav_items.map((item) => (
            <Link href={`/${item.name}`} key={item.name}>
              <li key={item.name} className="active">
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
