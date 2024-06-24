// components/common/Input.tsx

import React, { ReactNode, useState } from "react";
import "./style.scss";
import {
  TbCreditCard,
  TbEye,
  TbEyeOff,
  TbLockCheck,
  // TbMail,
} from "react-icons/tb";
import { MdOutlineAlternateEmail } from "react-icons/md";


interface InputProps {
  input_icon?: ReactNode;
  label: string;
  type?: "text" | "password" | "email" | "number";
  name: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  register?: any;
  validation?: any;
  error?: boolean;
}

export const TextInput: React.FC<InputProps> = ({
  input_icon,
  label,
  type = "text",
  name,
  placeholder = "",
  value,
  onChange,
  register,
  error,
  validation, // Add this line
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div className="input-container">
      <label htmlFor={name}>
        {label}{" "}
      </label>

      {/* To add the icon to the inputs */}
      <span>
        <span className="input_icon">
          {input_icon ? (
            input_icon
          ) : type === "password" ? (
            <TbLockCheck />
          ) : type === "email" ? (
            <MdOutlineAlternateEmail />
          ) : (
            <TbCreditCard />
          )}
        </span>
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
        <span onClick={handleTogglePassword} className="input_toggle_icon">
          {showPassword ? <TbEyeOff /> : <TbEye />}
        </span>
      )}
    </div>
  );
};

export const FormTextInput: React.FC<InputProps> = ({
  label,
  type = "text",
  name,
  placeholder = "",
  value,
  onChange,
  readOnly,
  register,
  error,
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
        readOnly={readOnly}
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
      {error && <span className="error">Field Required</span>}
    </div>
  );
};

interface Option {
  value: string;
  label: string;
}

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectComponentProps {
  label: string;
  name: string;
  id: string;
  className?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  register?: any; // Add this line
  validation?: any; // Add this line
  error?: boolean;
}

export const SelectInput: React.FC<SelectComponentProps> = ({
  label,
  name,
  id,
  className,
  value,
  onChange,
  options,
  placeholder,
  disabled,
  register,
  validation, // Add this line
  error,
}) => {
  return (
    <div className="select-container">
      <label htmlFor={id}>{label}</label>
      <select
        name={name}
        id={id}
        className={`${className} minimal`}
        value={value}
        disabled={disabled}
        onChange={onChange}
        {...(register && register(name, validation))} // Modify this line
      >
        <option disabled  value="Select">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="error">Field Required</span>}
    </div>
  );
};

