"use client";
import React, { useState } from "react";
import { CustomHeader } from "@/src/components/common/header";
// import "./style.scss" // Moved to _app;
import { GoBackButton } from "@/src/components/common/button";
import AddManifestForm from "./form";
var AddManifestComp = function () {
    var _a = useState(false), show = _a[0], setShow = _a[1];
    var _b = useState(""), paymentRef = _b[0], setPaymentRef = _b[1];
    var _c = useState(""), selectedPeriod = _c[0], setSelectedPeriod = _c[1];
    var _d = useState(""), selectedProduct = _d[0], setSelectedProduct = _d[1];
    return (<section className="transport_add">
      <GoBackButton />
      <div className="transport-comp">
        <header className="transport_add-comp_header">
          <CustomHeader title="Add Manifest" desc="Create Manifest Ticket"/>
        </header>

        <div className="transport-comp_form">
          <AddManifestForm show={show} setShow={setShow} paymentRef={paymentRef} setPaymentRef={setPaymentRef} selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct}/>
        </div>
      </div>

      {/* {show && (
          <SuccessModal
            text="View Receipt"
            link="/tickets/transport/add/summary"
            id={`Ref: ${paymentRef}, Valid for: ${selectedPeriod}, Payment for: ${selectedProduct}`}
          />
        )} */}
    </section>);
};
export default AddManifestComp;
