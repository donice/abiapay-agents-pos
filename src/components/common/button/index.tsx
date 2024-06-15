"use client";
import React from "react";
import { MdOutlineAdd, MdOutlineArrowBackIos } from "react-icons/md";
import { useRouter } from "next/navigation";
import "./style.scss";

interface prop {
  text: string;
  link: string;
  disabled?: boolean;
}

export const FormButton = ({
  text,
  disabled,
}: {
  text: string;
  disabled: true | false;
}) => {
  const router = useRouter();

  return (
    <button
    className={`button ${disabled ? "disabled" : "primary"}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export const DefaultButton = ({ text, link, disabled }: prop) => {
  const router = useRouter();

  const handleClick = (route: string) => {
    if (!disabled) {
      router.push(route);
    }
  };

  return (
    <button
      className={`button ${disabled ? "disabled" : "primary"}`}
      disabled={disabled}
      onClick={() => handleClick(link)}
    >
      {text}
    </button>
  );
};
export const CancelButton = ({ link }: { link: string }) => {
  const router = useRouter();

  const handleClick = (route: string) => {
    return router.push(route);
  };

  return (
    <div className="button secondary" onClick={() => handleClick(link)}>
      Cancel
    </div>
  );
};

export const PrimaryButton = ({ text, link }: prop) => {
  const router = useRouter();

  const handleClick = (route: string) => {
    return router.push(route);
  };

  return (
    <button className="button primary" onClick={() => handleClick(link)}>
      <MdOutlineAdd className="icon" />
      {text}
    </button>
  );
};

export const SecondaryButton = ({ text }: prop) => {
  const router = useRouter();
  return (
    <button className="button secondary">
      <MdOutlineAdd className="icon" />
      {text}
    </button>
  );
};
export const GoBackButton = ({ link }: { link: string }) => {
  const router = useRouter();
  const handleClick = (route: string) => {
    return router.push(route);
  };
  return (
    <button className="go_back" onClick={() => handleClick(link)}>
      <MdOutlineArrowBackIos className="icon" />
      Go Back
    </button>
  );
};
