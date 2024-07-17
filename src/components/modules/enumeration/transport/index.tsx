"use client";
import React, { useState } from "react";
import VehicleData from "./vehicleData";
import OwnerData from "./ownerData";
import DriverData from "./driverData";
import "./style.scss";
import ProgressBar from "./progressBar";

const TransportEnumerationComponent = () => {
  const [stage, setStage] = useState(0);
  const [details, setDetails] = useState({});

  console.log(details);

  return (
    <section>
      <ProgressBar stage={stage} setStage={setStage}/>
     
      {stage === 0 && <VehicleData setStage={setStage} setDetails={setDetails}/>}
      {stage === 1 && <OwnerData setStage={setStage} details={details}/>}
      {stage === 2 && <DriverData setStage={setStage} />}
    </section>
  );
};

export default TransportEnumerationComponent;
