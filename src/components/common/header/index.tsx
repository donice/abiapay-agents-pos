import React from "react";
import "./style.scss"

interface props {
  title: string,
  desc: string
}

const CustomHeader = ({title, desc}: props) => {
  return (
    <div className="custom-header">
      <h1>{title}</h1>
      <p>{desc}</p>
    </div>
  );
};

export default CustomHeader;
