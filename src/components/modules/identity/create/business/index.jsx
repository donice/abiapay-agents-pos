"use client";
import React, { useState } from "react";
import ProgressBar from "./progressBar";
// import "./style.scss" // Moved to _app;
import Basic from "./basic";
import Business from "./business";
import Address from "./address";
import Summary from "./summary";
var BusinessIndividualAbssinComponent = function () {
    var _a = useState(0), stage = _a[0], setStage = _a[1];
    var _b = useState({
        coy_name: "",
        regist_name: "",
        companytin: "",
        rcno: "",
        enterprise_reg_no: "",
        category: "",
        mobile_no: "",
        e_mail: "",
        city: "",
        type_of_organisation: "",
        line_of_business: "",
        date_of_incorporation: "",
        sector: "",
        phone_no: "",
        house_no: "",
        street: "",
        lga: "",
        ward: "",
        state: "",
        date_of_commencement: "",
        tax_office: "",
        cdn_category_id: "",
        password: "",
        enter_by: ""
    }), formData = _b[0], setFormData = _b[1];
    console.log("FORM DATA", formData);
    return (<section>
      <ProgressBar stage={stage} setStage={setStage}/>

      {stage === 0 && <Basic formData={formData} setFormData={setFormData} setStage={setStage}/>}
      {stage === 1 && <Business formData={formData} setFormData={setFormData} setStage={setStage}/>}
      {stage === 2 && <Address formData={formData} setFormData={setFormData} setStage={setStage}/>}
      {stage === 3 && <Summary formData={formData} setStage={setStage}/>}
    </section>);
};
export default BusinessIndividualAbssinComponent;
