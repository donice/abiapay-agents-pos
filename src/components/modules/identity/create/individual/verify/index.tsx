"use client";
import { CustomHeader } from "@/src/components/common/header";
import type { Metadata } from "next";
import React, { useState } from "react";
import "../style.scss";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { useForm } from "react-hook-form";
import { Button } from "@/src/components/common/button";

export const metadata: Metadata = {
  title: "ABIAPAY Identity",
  description: "Manage all Identities tied to your ABIAPAY account",
};

const VerifyComponent = () => {
  const [selectedId, setSelectedId] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      source: "",
      value: "",
      verify_via: "email",
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedId(event.target.value);
  };

  return (
    <div className="identity">
      <CustomHeader title="Create ABSSIN" desc={"Start by selecting an ID"} />

      <form onSubmit={handleSubmit(onSubmit)} className="identity-form">
        <SelectInput
          label="Reference Source"
          name="id"
          id="id"
          // register={register}
          options={[
            { label: "No ID", value: "No ID" },
            { label: "BVN", value: "BVN" },
            { label: "NIN", value: "NIN" },
          ]}
          onChange={handleIdChange}
        />
        
        {selectedId !== "No ID" && selectedId && (
          <FormTextInput
            label="Reference ID"
            name="id"
            type="text"
            placeholder="Enter Reference ID"
            register={register}
          />
        )}

        {selectedId === "No ID" && (
          <FormTextInput
            label="Email"
            name="value"
            type="text"
            placeholder="Enter Email"
            register={register}
          />
        )}

        <Button text="Submit" />
      </form>
    </div>
  );
};

export default VerifyComponent;
