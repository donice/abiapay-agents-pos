"use client";
import React, { ReactElement } from "react";
import "./style.scss";
import Link from "next/link";
import getRoute from "@/src/hooks/getRoute";
import { logout } from "@/src/context/authContext";
import {
  TbHome,
  TbTicket,
  TbBasketDown,
  TbLogout2,
} from "react-icons/tb";

interface BottomNavProps {
  name: string;
  title: string;
  icon?: ReactElement;
}

const nav_items: BottomNavProps[] = [
  {
    name: "dashboard",
    title: "Overview",
    icon: <TbHome className="icon" />,
  },
  {
    name: "tickets/transport",
    title: "Transport",
    icon: <TbTicket className="icon" />,
  },
  {
    name: "tickets/market",
    title: "Maket",
    icon: <TbBasketDown className="icon" />,
  },
];

const BottomNav = () => {
  const route = getRoute();

  return (
    <div className="bottom-nav">
      <div className="bottom-nav_items_container">
        <div className="bottom-nav_items">
          {nav_items.map((item) => (
            <Link href={`/${item.name}`} key={item.name} className={`bottom-nav_item ${item.name === route ? "active" : "inactive"}`}>
                <span>{item.icon}</span>
                {/* <span>{item.title}</span> */}
            </Link>
          ))}
          <div key={"logout"} onClick={() => {console.log(); logout}} className="bottom-nav_item logout">
            <span>
              <TbLogout2 className="icon out" />
            </span>
            {/* <span>Sign Out</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
