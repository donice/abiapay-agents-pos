import React, { ReactElement } from "react";
import { Metadata } from "next";
import { CustomHeader } from "@/src/components/common/header";
import { FcShipped, FcPaid, FcMoneyTransfer } from "react-icons/fc";
import Link from "next/link";
import "./style.scss";

export const metadata: Metadata = {
  title: "Add Ticket",
  description: "Agents Portal Tickets Page",
};

interface AccountsProps {
  name: string;
  title: string;
  desc: string;
  icon: ReactElement;
}

const items: AccountsProps[] = [
  {
    name: "items/transport",
    title: "Transaction History",
    desc: "View History",
    icon: <FcMoneyTransfer className="icon" />,
  },

];

const UserAccountPage = () => {
  return (
    <div className="account">
      <CustomHeader title="User Account" desc={"Explore your account"} />

      <div className="account_items">
        {items.map((item) => (
          <Link
            href={`/${item.name}`}
            key={item.name}
            className={`account_item`}
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

export default UserAccountPage;
