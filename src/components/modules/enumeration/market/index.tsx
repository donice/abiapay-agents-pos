"use client";
import React, { useState } from "react";
import EnumerationDetails from "./enumerationDetails";
import "./style.scss";
import ProgressBar from "./progressBar";
import ShopDetails from "./shopDetails";

const MarketEnumerationComponent = () => {
  const [stage, setStage] = useState(0);
  const [formData, setFormData] = useState({});

  console.log(formData);

  return (
    <section>
      <ProgressBar stage={stage} setStage={setStage}/>
     
      {stage === 0 && <ShopDetails setStage={setStage} formData={formData} setFormData={setFormData}/>}
      {stage === 1 && <EnumerationDetails setStage={setStage} formData={formData}/>}
    </section>
  );
};

export default MarketEnumerationComponent;
