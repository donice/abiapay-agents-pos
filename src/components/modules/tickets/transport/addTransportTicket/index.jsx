"use client";
import React, { useState } from "react";
import { CustomHeader } from "@/src/components/common/header";
// import "./style.scss" // Moved to _app;
import { GoBackButton } from "@/src/components/common/button";
import AddTransportTicketForm from "./form";
import { SuccessModal } from "@/src/components/common/modal";
var AddTransportTicketComponent = function () {
  var _a = useState(false), show = _a[0], setShow = _a[1];
  var _b = useState(""), paymentRef = _b[0], setPaymentRef = _b[1];
  var _c = useState(""), selectedPeriod = _c[0], setSelectedPeriod = _c[1];
  var _d = useState(""), selectedProduct = _d[0], setSelectedProduct = _d[1];
  var _e = useState(""), selectedProductName = _e[0], setSelectedProductName = _e[1];
  return (<section className="transport_add">
    <GoBackButton />
    <div className="transport-comp">
      <header className="transport_add-comp_header">
        <CustomHeader title="Add Transport Ticket" desc="Create Transport Ticket" />
      </header>

      <div className="transport-comp_form">
        <AddTransportTicketForm show={show} setShow={setShow} paymentRef={paymentRef} setPaymentRef={setPaymentRef} selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} selectedProductName={selectedProductName} setSelectedProductName={setSelectedProductName} />
      </div>
    </div>

    {show && (<SuccessModal text="View Receipt" link="/tickets/transport/add/summary" id={"Ref: ".concat(paymentRef, ", Valid for: ").concat(selectedPeriod, ", Payment for: ").concat(selectedProductName)} buttonText="Done" />)}
  </section>);
};
export default AddTransportTicketComponent;
