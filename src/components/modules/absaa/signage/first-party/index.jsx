"use client";
import React, { useState } from "react";
import { CustomHeader } from "@/src/components/common/header";
// import "./style.scss" // Moved to _app;
import { GoBackButton } from "@/src/components/common/button";
import CreateFirstPartySignageForm from "./form";
import { SuccessModal } from "@/src/components/common/modal";
var FirsPartySignageComponent = function () {
    var _a = useState(false), show = _a[0], setShow = _a[1];
    var _b = useState(""), paymentRef = _b[0], setPaymentRef = _b[1];
    var _c = useState(""), selectedPeriod = _c[0], setSelectedPeriod = _c[1];
    var _d = useState(""), selectedProduct = _d[0], setSelectedProduct = _d[1];
    return (<section className="firstparty_add">
      <GoBackButton />
      <div className="firstparty-comp">
        <header className="firstparty_add-comp_header">
          <CustomHeader title="First Party Signage" desc="Create first party signage"/>
        </header>

        <div className="firstparty-comp_form">
          <CreateFirstPartySignageForm show={show} setShow={setShow} paymentRef={paymentRef} setPaymentRef={setPaymentRef} selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct}/>
        </div>
      </div>

      {show && (<SuccessModal text="View Receipt" link="/tickets/transport/add/summary" id={"Ref: ".concat(paymentRef, ", Valid for: ").concat(selectedPeriod, ", Payment for: ").concat(selectedProduct)} buttonText="Done"/>)}
    </section>);
};
export default FirsPartySignageComponent;
