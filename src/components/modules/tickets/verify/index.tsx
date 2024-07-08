"use client";
import React, { useEffect, useState } from "react";
import { CustomHeader } from "@/src/components/common/header";
import VerifyTicketsFrom from "./form";
import "./style.scss";
import useIsBrower from "@/src/hooks/useIsBrower";

const VerifyTicketsComponent = () => {
  const [userData, setUserData] = useState<{
    name?: string;
    email?: string;
  } | null>(null);

  useEffect(() => {
    if (useIsBrower()) {
      const data = window.sessionStorage.getItem("USER_DATA");
      if (data) {
        try {
          setUserData(JSON.parse(data));
        } catch (e) {
          console.error("Error parsing JSON data:", e);
          setUserData({});
        }
      }
    }
  }, []);

  return (
    <section className="verify-tickets">
      <div className="verify-tickets-comp">
        <header className="verify-tickets-comp_header">
          <CustomHeader
            title="Verify Ticket"
            desc="Check for your Ticket's validity"
          />
        </header>

        <div className="verify-tickets-comp_form">
          <VerifyTicketsFrom userData={userData} />
        </div>
      </div>
    </section>
  );
};

export default VerifyTicketsComponent;
