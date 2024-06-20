"use client"
import React, { useState } from "react";
import { TbEye, TbEyeOff } from "react-icons/tb"; // Assuming you are using these icons

interface InputProps {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: any;
  validation?: any; // Add this line
}

export const FormTextInput: React.FC<InputProps> = ({
  label,
  type = "text",
  name,
  placeholder = "",
  value,
  onChange,
  register,
  validation, // Add this line
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="form-input-container">
      <span>
        <label className="form-input_icon">
          {label}
        </label>
      </span>
      <input
        type={type === "password" && showPassword ? "text" : type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...(register && register(name, validation))} // Modify this line
        {...rest}
      />
      <span></span>
      {type === "password" && (
        <span onClick={handleTogglePassword} className="form-input_toggle_icon">
          {showPassword ? <TbEyeOff /> : <TbEye />}
        </span>
      )}
    </div>
  );
};

import { useForm } from "react-hook-form";

const MyForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormTextInput
        label="Username"
        name="username"
        placeholder="Enter your username"
        register={register}
        validation={{ required: true }}
      />
      {errors.username && <span>This field is required</span>}
      
      <FormTextInput
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        register={register}
        validation={{ required: true }}
      />
      {errors.password && <span>This field is required</span>}
      
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
