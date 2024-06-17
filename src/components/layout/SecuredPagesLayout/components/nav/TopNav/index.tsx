"use client";
import React from "react";
import "./style.scss";
import { AbiaLogo } from "@/src/components/common/Images";
import { PiUserCircleDuotone } from "react-icons/pi";
import { TbBellRinging } from "react-icons/tb";
import useIsBrower from "@/src/hooks/useIsBrower";

const TopNav = () => {
  const data: string | null =
    useIsBrower() && window.sessionStorage.getItem("USER_DATA")
      ? window.sessionStorage.getItem("USER_DATA")
      : null;

  let user_data: {
    name?: string
    user_cat?: string
  } = {};

  if (data) {
    try {
      user_data = JSON.parse(data);
    } catch (e) {
      console.error("Error parsing JSON data:", e);
      user_data = {};
    }
  }

  return (
    <nav className="top-nav">
      <div className="top-nav_logo">
        <a href="/dashboard" className="logo" aria-label="Abiapay Agents Logo">
          <AbiaLogo />
        </a>
      </div>
      <span className="settings">
        <TbBellRinging className="icon" />
      </span>
      <div className="top-nav_user">
        <div>
          <p>{user_data.name}</p>
          <span>{user_data.user_cat}</span>
        </div>

        <PiUserCircleDuotone className="icon" />
      </div>
    </nav>
  );
};

export default TopNav;
