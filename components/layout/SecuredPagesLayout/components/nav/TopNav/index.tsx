import React from "react";
import "./style.scss";

const TopNav = () => {
  return (
    <nav className="top-nav">
      <div className="top-nav_logo">
        <a href="/" className="logo">
          Abia Agent Portal
        </a>
      </div>
      <div className="top-nav_user">
        <p>Donice Ubaru</p>
      </div>
    </nav>
  );
};

export default TopNav;
