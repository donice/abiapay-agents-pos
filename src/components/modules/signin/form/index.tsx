// SigninForm.tsx

"use client";
import React, { useState, useEffect } from "react";
import { DefaultButton, CancelButton } from "@/src/components/common/button";
import {TextInput} from "@/src/components/common/input"; // Importing the custom input component
import "./style.scss";
import "../../tickets/transport/addTransportTicket/form/style.scss";

interface FormData {
  email: string;
  password: string;
}

const SigninForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="sign-in_form">
      <TextInput
        label="Email"
        type="email"
        name="email"
        placeholder="Enter Email"
        value={formData.email}
        onChange={handleChange}
      />
      <TextInput
        label="Password"
        type="password"
        name="password"
        placeholder="Enter Password"
        value={formData.password}
        onChange={handleChange}
      />

      <div className="btn_container">
        <DefaultButton
          text="Save & Continue"
          link="/tickets/transport/summary"
          disabled={!isFormValid}
        />
      </div>
    </form>
  );
};

export default SigninForm;
