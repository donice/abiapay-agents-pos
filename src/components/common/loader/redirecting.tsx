import React from "react";
import { LargeLoader } from "../loader";
import "./style.scss";

const Redirecting = () => {
  return (
    <section className="redirecting">
      <div className="redirecting_container">
        <LargeLoader />
        <p>Redirecting</p>
      </div>
    </section>
  );
};

export default Redirecting;
