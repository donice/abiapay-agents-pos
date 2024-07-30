import React, { ReactElement } from "react";
import { Metadata } from "next";
import { CustomHeader } from "@/src/components/common/header";
import {
  FcLock,
  FcLibrary,
  FcOrgUnit,
  FcKey,
  FcCurrencyExchange,
  FcButtingIn,
  FcCapacitor,
  FcCollaboration,
  FcCallback,
  FcInfo,
  FcMoneyTransfer,
} from "react-icons/fc";
import Link from "next/link";
import "./style.scss";

export const metadata: Metadata = {
  title: "Add Ticket",
  description: "Agents Portal Tickets Page",
};

interface WalletItemsProps {
  href: string;
  title: string;
  desc?: string;
  icon: ReactElement;
  cat?: string;
}

const walletItems: WalletItemsProps[] = [
  {
    href: "/wallet/transfer/my-wallet",
    title: "To my wallet",
    icon: <FcMoneyTransfer className="icon" />,
    cat: "wallet",
  },
  {
    href: "/wallet/transfer/other-wallet",
    title: "To Other wallets",
    icon: <FcOrgUnit className="icon" />,
    cat: "wallet",
  },
  {
    href: "/wallet/transfer/to-bank",
    title: "To Bank",
    icon: <FcLibrary className="icon" />,
    cat: "wallet",
  },
];

const dailyServices: WalletItemsProps[] = [
  {
    href: "/services/airtime",
    title: "Airtime",
    icon: <FcCallback className="icon" />,
    cat: "coming soon",
  },
  {
    href: "/services/data",
    title: "Data",
    icon: <FcCollaboration className="icon" />,
    cat: "coming soon",
  },
  {
    href: "/services/loan",
    title: "Loan",
    icon: <FcCurrencyExchange className="icon" />,
    cat: "coming soon",
  },
  {
    href: "/services/electicity",
    title: "Electicity",
    icon: <FcCapacitor className="icon" />,
    cat: "coming soon",
  },
];

const otherServices: WalletItemsProps[] = [
  {
    href: "/settings/about",
    title: "About",
    icon: <FcInfo className="icon" />,
  },
  {
    href: "/settings/change-password",
    title: "Change password",
    icon: <FcKey className="icon" />,
  },
  {
    href: "/settings/support",
    title: "Support",
    icon: <FcButtingIn className="icon" />,
  },
  {
    href: "/signin",
    title: "Logout",
    icon: <FcLock className="icon" />,
  },
];

const UserAccountPage = () => {
  return (
    <div className="settings">
      {/* <CustomHeader
        title="Extras"
        desc={"Explore all extra services available for you"}
      /> */}
      <h2>My Money Transfer</h2>
      <div className="settings_items">
        {walletItems.map((item) => (
          <Link
            href={`/${item.href}`}
            key={item.href}
            className={`settings_item`}
          >
            <div>
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

      <div className="settings_banner">
        <div>
          <em>STAY CONNECTED</em>
          <p>Don’t ever run out of Airtime and Data</p>
        </div>
      </div>

      <h2>Daily Services</h2>
      <div className="settings_items_service">
        {dailyServices.map((item) => (
          <Link
            href={`${
              item.cat === "coming soon" ? "/user/settings" : item.href
            }`}
            key={item.href}
            className={`settings_item`}
          >
            {item.cat === "coming soon" && <span className="soon">soon</span>}
            <div>
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
      <h2>Other Services</h2>
      <div className="settings_items_service">
        {otherServices.map((item) => (
          <Link
            href={`${item.href}`}
            key={item.href}
            className={`settings_item`}
          >
            <div>
              {" "}
              <span className="icon">{item.icon}</span>
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
