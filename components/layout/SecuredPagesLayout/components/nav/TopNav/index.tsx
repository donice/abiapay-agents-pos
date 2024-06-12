"use client"
import React from "react";
import "./style.scss";
import { TbUserSquareRounded } from "react-icons/tb";

const TopNav = () => {

  return (
    <nav className="top-nav">
      <div className="top-nav_logo">
        <a href="/" className="logo">
        Agent Portal
        </a>
      </div>
      <div className="top-nav_user">

        <p>Donice Ubaru</p>
        <TbUserSquareRounded className="icon"/>
      </div>
    </nav>
  );
};

export default TopNav;
