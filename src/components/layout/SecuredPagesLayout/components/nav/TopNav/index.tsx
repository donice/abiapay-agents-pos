"use client";
import React from "react";
import "./style.scss";
import { AbiaLogo } from "@/src/components/common/Images";
import { TbUserSquareRounded } from "react-icons/tb";

const TopNav = () => {
  return (
    <nav className="top-nav">
      <div className="top-nav_logo">
        <a href="/dashboard" className="logo" aria-label="Abiapay Agents Logo">
          <AbiaLogo />
        </a>
      </div>
      <div className="top-nav_user">
        <p>Donice Ubaru</p>
        <TbUserSquareRounded className="icon" />
      </div>
    </nav>
  );
};

export default TopNav;
