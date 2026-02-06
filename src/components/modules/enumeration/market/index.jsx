"use client";
import React, { useState } from "react";
import ShopkeepersDetails from "./shopkeepersDetails";
// import "./style.scss" // Moved to _app;
import ProgressBar from "./progressBar";
import EnumerationDetails from "./enumerationDetails";
import { CustomHeader } from "@/src/components/common/header";
var MarketEnumerationComponent = function () {
    var _a = useState(0), stage = _a[0], setStage = _a[1];
    var _b = useState({}), formData = _b[0], setFormData = _b[1];
    console.log(formData);
    return (<section className="enumeration">
      <CustomHeader title={"Market Enumeration"} desc={"Enumerate Shops in the market"}/>
      <ProgressBar stage={stage} setStage={setStage}/>
     
      {stage === 0 && <EnumerationDetails setStage={setStage} formData={formData} setFormData={setFormData}/>}
      {stage === 1 && <ShopkeepersDetails setStage={setStage} formData={formData}/>}
    </section>);
};
export default MarketEnumerationComponent;
