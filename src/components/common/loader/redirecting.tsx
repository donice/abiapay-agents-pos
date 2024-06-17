import React from "react";
import { LargeLoader } from "../loader";
import "./style.scss";

const Redirecting = () => {
  return (
    <div className="redirecting">
      <div className="redirecting_container">
        <LargeLoader />
        <p>Redirecting...</p>
      </div>
    </div>
  );
};

export default Redirecting;
