"use client";
import React, { useState, useEffect } from "react";
import { DefaultButton, CancelButton } from "@/src/components/common/button";
import "./style.scss";
import "../../tickets/transport/addTransportTicket/form/style.scss";  

const SigninForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every(
      (field) => field !== ""
    );
    setIsFormValid(allFieldsFilled);
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // sessionStorage.setItem("TRANSPORT_FORM_DETAILS", JSON.stringify(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          placeholder="Enter Vehicle Plate Number"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          placeholder="Enter Taxpayer Phone Number"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <div className="btn_container">
        <DefaultButton
          text="Save & Continue"
          link="/tickets/transport/summary"
          // link={`/tickets/transport/summary/${formData?.email}`}
          disabled={!isFormValid}
        />
      </div>
    </form>
  );
};

export default SigninForm;
