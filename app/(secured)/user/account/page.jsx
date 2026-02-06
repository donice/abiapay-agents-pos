import React from "react";
import { CustomHeader } from "@/src/components/common/header";
import { FcMoneyTransfer, FcAcceptDatabase } from "react-icons/fc";
import Link from "next/link";
import "./style.scss";
import TicketsWalletCard from "@/src/components/modules/tickets/ticketsStatsCard";
export var metadata = {
    title: "Add Ticket",
    description: "Agents Portal Tickets Page",
};
var items = [
    {
        link: "tickets/transport",
        title: "Transaction History",
        desc: "Tickets Transactions History",
        icon: <FcAcceptDatabase className="icon"/>,
    },
    {
        link: "transfers",
        title: "Transfer History",
        desc: "Wallet Transfer History",
        icon: <FcMoneyTransfer className="icon"/>,
    },
];
var UserAccountPage = function () {
    return (<div className="account">
      <CustomHeader title="My Account" desc={"Explore your account"}/>

      <div className="account_container">
        <TicketsWalletCard />

        <div className="account_items">
          {items.map(function (item) { return (<Link href={"/".concat(item.link)} key={item.link} className={"account_item"}>
              <div>
                {" "}
                <span>{item.icon}</span>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.desc}</p>
                </div>
              </div>
            </Link>); })}
        </div>
      </div>
    </div>);
};
export default UserAccountPage;
