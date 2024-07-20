"use client";
import React, { useState } from "react";
import ProgressBar from "./progressBar";
import "./style.scss";
import PersonalData from "./personalData";
import { createIndividualAbssinPayloadType } from "@/src/services/identityService";

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

      {stage === 0 && <PersonalData setFormData={setFormData} />}
      {stage === 1 && <div>Stage 2</div>}
      {stage === 2 && <div>Stage 3</div>}
    </section>
  );
};

export default CreateIndividualAbssinComponent;
