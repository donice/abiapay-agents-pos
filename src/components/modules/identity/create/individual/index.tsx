"use client";
import React, { useState } from "react";
import ProgressBar from "./progressBar";
import "./style.scss";
import PersonalData from "./personalData";
import { createIndividualAbssinPayloadType } from "@/src/services/identityService";
import UserData from "./userData";
import OriginData from "./originData";

const CreateIndividualAbssinComponent = () => {
  const [stage, setStage] = useState(0);
  const [formData, setFormData] = useState<createIndividualAbssinPayloadType>({
    indv_title: "",
    first_name: "",
    middle_name: "",
    surname: "",
    birth_date: "",
    email: "",
    gender: "",
    nin: "",
    nationality: "",
    state_of_origin: "",
    state_of_residence: "",
    marital_status: "",
    bvn: "",
    city: "",
    ward: "",
    address: "",
    lga: "",
    phone_number: "",
    sector: "",
    category: "",
    tax_office: "",
    mobile_number: "",
    image: ""
  });
  console.log("FORM DATA", formData);

  return (
    <section>
      <ProgressBar stage={stage} setStage={setStage} />

      {stage === 0 && <PersonalData formData={formData} setFormData={setFormData} setStage={setStage} />}
      {stage === 1 && <UserData formData={formData} setFormData={setFormData} setStage={setStage} />}
      {stage === 2 && <OriginData formData={formData} setFormData={setFormData} setStage={setStage} />}
    </section>
  );
};

export default CreateIndividualAbssinComponent;
