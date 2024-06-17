"use client";
import React from "react";
import "./style.scss";
import { AbiaLogo } from "@/src/components/common/Images";
import { PiUserCircleDuotone } from "react-icons/pi";
import { TbBellRinging } from "react-icons/tb";

const TopNav = () => {
  return (
    <nav className="top-nav">
      <div className="top-nav_logo">
        <a href="/dashboard" className="logo" aria-label="Abiapay Agents Logo">
          <AbiaLogo />
        </a>

        
      </div><span className="settings">
          <TbBellRinging className="icon" />
        </span>
      <div className="top-nav_user">
        <div>
          <p>Donice Ubaru</p>
          <span>Agent</span>
        </div>

        <PiUserCircleDuotone className="icon" />
      </div>
    </nav>
  );
};

export default TopNav;
