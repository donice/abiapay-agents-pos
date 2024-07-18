"use client";
import { Button } from "@/src/components/common/button";
import React, { useState } from "react";
import { LuUser } from "react-icons/lu";
import { FormTextInput } from "@/src/components/common/input";
import "../style.scss";

const DriverData = ({ setStage, details }: any) => {

  return (
    <div className="enumeration-form">
      <div className="user-image">
        {details?.driver?.photoUrl ? (
          <img src={details?.driver?.photoUrl} alt="" />
        ) : (
          <LuUser className="user" />
        )}
      </div>
      <FormTextInput
        label={"Driver's Email"}
        name={"abssin"}
        // value={details?.driver.abssin || ""}
      />
      <FormTextInput
        label={"Driver's ABSSIN"}
        name={"abssin"}
        value={details?.driver.abssin || ""}
      />
      <FormTextInput
        label={"Driver's ABSSIN"}
        name={"abssin"}
        value={details?.driver.abssin || ""}
      />
      <FormTextInput
        label={"Driver's Name"}
        name={"driverName"}
        value={details?.driver.driverName || ""}
      />
      <FormTextInput
        label={"Driver's Address"}
        name={"driverAddress"}
        value={details?.driver.driverAddress || ""}
      />
      <FormTextInput
        label={"Phone Number"}
        name={"phoneNumber"}
        value={details?.driver.phoneNumber || ""}
      />

      <div className="button-container">
        <button className="button secondary" onClick={() => setStage(1)}>
          Go Back
        </button>
        <Button onClick={() => setStage(3)} text="Save & Continue" />
      </div>
    </div>
  );
};

export default DriverData;
