"use client";
import React, { useState } from "react";
import ShopkeepersDetails from "./shopkeepersDetails";
import "./style.scss";
import ProgressBar from "./progressBar";
import EnumerationDetails from "./enumerationDetails";

const MarketEnumerationComponent = () => {
  const [stage, setStage] = useState(0);
  const [formData, setFormData] = useState({});

  console.log(formData);

  return (
    <section>
      <ProgressBar stage={stage} setStage={setStage}/>
     
      {stage === 0 && <EnumerationDetails setStage={setStage} formData={formData} setFormData={setFormData}/>}
      {stage === 1 && <ShopkeepersDetails setStage={setStage} formData={formData}/>}
    </section>
  );
};

export default MarketEnumerationComponent;
