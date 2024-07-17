"use client";
import React, { useState } from "react";
import VehicleData from "./vehicleData";
import OwnerData from "./ownerData";
import DriverData from "./driverData";
import "./style.scss";
import ProgressBar from "./progressBar";

const TransportEnumerationComponent = () => {
  const [stage, setStage] = useState(0);

  return (
    <section>
      <ProgressBar stage={stage} setStage={setStage}/>
     
      {stage === 0 && <VehicleData setStage={setStage} />}
      {stage === 1 && <OwnerData setStage={setStage} />}
      {stage === 2 && <DriverData setStage={setStage} />}
    </section>
  );
};

export default TransportEnumerationComponent;
