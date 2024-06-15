// SigninForm.tsx

"use client";
import React, { useState, useEffect } from "react";
import { FormButton, CancelButton } from "@/src/components/common/button";
import { TextInput } from "@/src/components/common/input"; // Importing the custom input component
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
  const [showWarnings, setShowWarnings] = useState({
    email: false,
    password: false,
  });

  useEffect(() => {
    setIsFormValid(Object.values(formData).every((field) => field !== ""));
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setShowWarnings((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newWarnings = {
      email: formData.email === "",
      password: formData.password === "",
    };

    setShowWarnings(newWarnings);

    if (!Object.values(newWarnings).includes(true)) {
      console.log(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signin_form">
      <TextInput
        label="Email"
        type="email"
        name="email"
        placeholder="Enter Email"
        value={formData.email}
        onChange={handleChange}
      />
      {showWarnings.email && <div className="warning">Email is required</div>}
      <TextInput
        label="Password"
        type="password"
        name="password"
        placeholder="Enter Password"
        value={formData.password}
        onChange={handleChange}
      />
      {showWarnings.password && (
        <div className="warning">Password is required</div>
      )}

      <div className="btn_container">
        <FormButton loading={true} text="Sign in" disabled={!isFormValid} />
      </div>
    </form>
  );
};

export default SigninForm;
