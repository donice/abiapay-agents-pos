"use client";
import {
  Button,
} from "@/src/components/common/button";
import React from "react";
import { LuUser } from "react-icons/lu";
import { FormTextInput } from "@/src/components/common/input";
import "../style.scss";

const DriverData = ({ setStage, details }: any) => {
  return (
    <div className="enumeration-form">
      <div className="user-image">
        {details?.vehicle_owner?.photoUrl ? (
          <img src={details?.vehicle_owner?.photoUrl} alt="" />
        ) : (
          <LuUser className="user" />
        )}
      </div>
      <FormTextInput
        label={"Owner's ABSSIN"}
        name={"abssin"}
        value={details?.vehicle_owner.abssin || ""}
      />
      <FormTextInput
        label={"Owner's Name"}
        name={"ownerName"}
        value={details?.vehicle_owner.ownerName || ""}
      />
      <FormTextInput
        label={"Owner's Address"}
        name={"ownerAddress"}
        value={details?.vehicle_owner.ownerAddress || ""}
      />
      <FormTextInput
        label={"Phone Number"}
        name={"phoneNumber"}
        value={details?.vehicle_owner.phoneNumber || ""}
      />

      <div className="button-container">
        <button className="button secondary" onClick={() => setStage(1)}>Go Back</button>
        <Button onClick={() => setStage(3)} text="Save & Continue" />
      </div>
    </div>
  );
};

export default DriverData;
