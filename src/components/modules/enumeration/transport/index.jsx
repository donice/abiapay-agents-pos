"use client";
import React, { useState } from "react";
import VehicleData from "./vehicleData";
import OwnerData from "./ownerData";
import DriverData from "./driverData";
// import "./style.scss" // Moved to _app;
import ProgressBar from "./progressBar";
var TransportEnumerationComponent = function () {
    var _a = useState(0), stage = _a[0], setStage = _a[1];
    var _b = useState({}), details = _b[0], setDetails = _b[1];
    var _c = useState({}), formData = _c[0], setFormData = _c[1];
    console.log(formData);
    return (<section>
      <ProgressBar stage={stage} setStage={setStage}/>
     
      {stage === 0 && <VehicleData setStage={setStage} setDetails={setDetails} formData={formData} setFormData={setFormData}/>}
      {stage === 1 && <OwnerData setStage={setStage} details={details} formData={formData}/>}
      {stage === 2 && <DriverData setStage={setStage} details={details} formData={formData}/>}
    </section>);
};
export default TransportEnumerationComponent;
