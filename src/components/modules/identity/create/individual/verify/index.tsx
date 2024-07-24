"use client";
import { CustomHeader } from "@/src/components/common/header";
import type { Metadata } from "next";
import React, { useState } from "react";
import "../style.scss";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { useForm } from "react-hook-form";
import { Button } from "@/src/components/common/button";
import { useMutation } from "@tanstack/react-query";
import { validateID, validateNoID } from "@/src/services/identityService";

export const metadata: Metadata = {
  title: "ABIAPAY Identity",
  description: "Manage all Identities tied to your ABIAPAY account",
};

const VerifyComponent = () => {
  const [selectedId, setSelectedId] = useState("");

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      // id: "",
      // source: "",
      // value: "",
      verify_via: "email",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      if (selectedId === "No ID") {
        validateNoID(data);
      } else {
        validateID(data);
      }
    },
    onSuccess: (data: any) => {
      console.log(data);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);

    mutate({ ...data });
    reset();
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const eventValue = event.target.value;
    setSelectedId(eventValue);
    console.log(eventValue);
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
            { label: "Select ID", value: "" },
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
          <>
            <FormTextInput
              label="Email"
              name="value"
              type="text"
              placeholder="Enter Email"
              register={register}
            />
            <FormTextInput
              label="Phone Number"
              name="value"
              type="number"
              placeholder="Enter Email"
              register={register}
            />
          </>
        )}

        <Button text="Submit" loading={isPending} />
      </form>
    </div>
  );
};

export default VerifyComponent;
