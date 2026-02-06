"use client";
import React, { useEffect, useState } from "react";
import { FcLibrary, FcOrgUnit, FcKey, FcCurrencyExchange, FcButtingIn, FcCapacitor, FcCollaboration, FcCallback, FcInfo, FcMoneyTransfer, FcExport, } from "react-icons/fc";
import toast from "react-hot-toast";
import Link from "next/link";
// import "./style.scss" // Moved to _app;
import { isBrowser } from "@/src/utils/isBrowser";
var walletItems = [
  {
    href: "/wallet/transfer/earnings-to-wallet",
    title: "Earnings To Wallet",
    icon: <FcMoneyTransfer className="icon" />,
    cat: "wallet",
  },
  {
    href: "/wallet/transfer/other-wallet",
    title: "To Other Wallets",
    icon: <FcOrgUnit className="icon" />,
    cat: "wallet",
  },
  {
    href: "/wallet/transfer/bank",
    title: "To Bank",
    icon: <FcLibrary className="icon" />,
    cat: "wallet",
  },
];
var dailyServices = [
  {
    href: "/airtime",
    title: "Airtime",
    icon: <FcCallback className="icon" />,
    // cat: "coming soon",
  },
  {
    href: "/data",
    title: "Data",
    icon: <FcCollaboration className="icon" />,
    // cat: "coming soon",
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
var otherServices = [
  {
    href: "/user/settings/about",
    title: "About",
    icon: <FcInfo className="icon" />,
  },
  {
    href: "/user/settings/change-password",
    title: "Change Password",
    icon: <FcKey className="icon" />,
  },
  {
    href: "/user/settings/support",
    title: "Support",
    icon: <FcButtingIn className="icon" />,
  },
  {
    href: "/signin",
    title: "Logout",
    icon: <FcExport className="icon" />,
  },
];
var UserSettingsComponent = function () {
  var _a = useState(null), userData = _a[0], setUserData = _a[1];
  useEffect(function () {
    if (isBrowser) {
      var data = window.sessionStorage.getItem("USER_DATA");
      if (data) {
        try {
          setUserData(JSON.parse(data));
        }
        catch (e) {
          console.error("Error parsing JSON data:", e);
          setUserData({});
        }
      }
    }
  }, []);
  return (<div className="settings">
    {/* <CustomHeader
          title="Extras"
          desc={"Explore all extra services available for you"}
        /> */}
    <div className="userdata">
      <h1>{userData === null || userData === void 0 ? void 0 : userData.name}</h1>
      <p>
        Number: <span>{userData === null || userData === void 0 ? void 0 : userData.phone}</span>
      </p>
    </div>
    <h2>My Wallet Transfer</h2>
    <div className="settings_items">
      {walletItems.map(function (item) {
        return (<Link href={"".concat(item.cat === "coming soon" ? "/user/settings" : item.href)} key={item.href}>
          <a className={"settings_item"}>
            <div>
              {" "}
              <span>{item.icon}</span>
              <div>
                <h2>{item.title}</h2>
                <p>{item.desc}</p>
              </div>
            </div>
          </a>
        </Link>);
      })}
    </div>

    <div className="settings_banner">
      <div>
        <em>STAY CONNECTED</em>
        <p>Don’t ever run out of Airtime and Data</p>
      </div>
    </div>

    <h2>Daily Services</h2>
    <div className="settings_items_service">
      {dailyServices.map(function (item) {
        var isSoon = item.cat === "coming soon";
        return (<Link href={"".concat(isSoon ? "/user/settings" : item.href)} key={item.href}>
          <a
            className={"settings_item"}
            onClick={function (e) {
              if (isSoon) {
                e.preventDefault();
                toast.success("Coming Soon!");
              }
            }}
          >
            {isSoon && <span className="soon">soon</span>}
            <div>
              {" "}
              <span>{item.icon}</span>
              <div>
                <h2>{item.title}</h2>
                <p>{item.desc}</p>
              </div>
            </div>
          </a>
        </Link>);
      })}
    </div>
    <h2>Other Services</h2>
    <div className="settings_items_service">
      {otherServices.map(function (item) {
        return (<Link href={"".concat(item.href)} key={item.href}>
          <a className={"settings_item"}>
            <div>
              {" "}
              <span className="icon">{item.icon}</span>
              <div>
                <h2>{item.title}</h2>
                <p>{item.desc}</p>
              </div>
            </div>
          </a>
        </Link>);
      })}
    </div>
  </div>);
};
export default UserSettingsComponent;
