"use client";
import { useRouter } from "next/navigation";
import { FcOpenedFolder } from "react-icons/fc";
import "./style.scss";
import React from "react";

const Empty = ({ text, link }: { text?: string; link?: string }) => {
  const router = useRouter();
  return (
    <div className="empty">
      <div className="empty-comp">
        <div className="empty-comp_icon">
          <FcOpenedFolder />
        </div>
        <div className="empty-comp_text">{text ? text : "No data"}</div>
      </div>
      {link && <div className="empty-comp_button">
        <button
          className="secondary button"
          onClick={() => router.push(link)}
        >
          Create
        </button>
      </div>}
    </div>
  );
};

export default Empty;
