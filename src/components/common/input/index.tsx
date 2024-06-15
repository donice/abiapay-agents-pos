// components/common/Input.tsx

import React, { ReactNode, useState } from "react";
import "./style.scss";
import {
  TbCreditCard,
  TbEye,
  TbEyeOff,
  TbLockCheck,
  TbMail,
} from "react-icons/tb";

interface InputProps {
  input_icon?: ReactNode;
  label: string;
  type?: "text" | "password" | "email";
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput: React.FC<InputProps> = ({
  input_icon,
  label,
  type = "text",
  name,
  placeholder = "",
  value,
  onChange,
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
            <TbMail />
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
