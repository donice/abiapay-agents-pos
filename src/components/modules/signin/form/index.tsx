// SigninForm.tsx

"use client";
import React, { useState, useEffect } from "react";
import { FormButton, CancelButton } from "@/src/components/common/button";
import { TextInput } from "@/src/components/common/input"; // Importing the custom input component
import "./style.scss";
import toast, { Toaster } from 'react-hot-toast';
import { login } from "@/src/context/authContext";

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
  const [loading, setLoading] = useState(false);

  const url = process.env.NEXT_PUBLIC_BASE_URL;
  // console.log(url, "URL");

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
    setLoading(true);

    setTimeout(() => {
      console.log(formData);
      setLoading(false);
      toast.success("Form Saved")
    }, 1000);
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
      <TextInput
        label="Password"
        type="password"
        name="password"
        placeholder="Enter Password"
        value={formData.password}
        onChange={handleChange}
      />

      <div className="btn_container">
        <FormButton loading={loading} text="Sign in" disabled={!isFormValid} />
      </div>

    </form>
  );
};

export default SigninForm;
