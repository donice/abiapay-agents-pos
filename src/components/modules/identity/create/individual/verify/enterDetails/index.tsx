"use client";
import { CustomHeader } from "@/src/components/common/header";
import type { Metadata } from "next";
import React, { useState } from "react";
import "../../style.scss";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { useForm } from "react-hook-form";
import { Button } from "@/src/components/common/button";
import { validateID, validateNoID } from "@/src/services/identityService";
import toast from "react-hot-toast";

export const metadata: Metadata = {
  title: "ABIAPAY Identity",
  description: "Manage all Identities tied to your ABIAPAY account",
};

const EnterDetailsComponent = ({selectedId, setSelectedId}: any) => {
  const [isPending, setIsPending] = useState(false);
  // const [selectedId, setSelectedId] = useState("");

  const {
    register: registerID,
    handleSubmit: handleSubmitID,
    setValue: setValueID,
    formState: { errors: errorsID },
  } = useForm({
    defaultValues: {
      id: "",
      source: "",
    },
  });

  const {
    register: registerNoID,
    handleSubmit: handleSubmitNoID,
    formState: { errors: errorsNoID },
  } = useForm({
    defaultValues: {
      value: "",
      verify_via: "",
    },
  });

  const validateOTP = async (data: any) => {
    setIsPending(true);
    try {
      if (selectedId === "No ID") {
        const res = await validateNoID(data);

        res.status == true
          ? toast.success(res.message)
          : toast.error(
              res.message || "Error validating Number, try again later"
            );
      } else {
        const res = await validateID(data);

        res.response_code == "00" 
          ? toast.success(res.response_message)
          : toast.error(
              res.response_message || "Error validating ID, try again later"
            );
      }

      setIsPending(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitID = async (data: any) => {
    validateOTP(data);
  };
  const onSubmitNoID = async (data: any) => {
    validateOTP({ ...data, verify_via: "phone" });
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const eventValue = event.target.value;
    console.log(eventValue);
    setValueID("source", eventValue);
    setSelectedId(eventValue);
  };

  return (
    <div className="identity">
      <CustomHeader title="Create ABSSIN" desc={"Start by selecting an ID"} />

      <form
        onSubmit={
          selectedId === "No ID"
            ? handleSubmitNoID(onSubmitNoID)
            : handleSubmitID(onSubmitID)
        }
        className="identity-form"
      >
        <SelectInput
          label="Reference Source"
          name="id"
          id="id"
          options={[
            { label: "Select ID", value: "" },
            { label: "No ID", value: "No ID" },
            { label: "BVN", value: "bvn" },
            { label: "NIN", value: "nin" },
          ]}
          onChange={handleIdChange}
        />

        {selectedId !== "No ID" && selectedId && (
          <FormTextInput
            label="Reference ID"
            name="id"
            type="number"
            placeholder="Enter Reference ID"
            register={registerID}
            validation={{ required: true }}
            error={errorsID.id}
          />
        )}

        {selectedId === "No ID" && (
          <>
            <FormTextInput
              label="Email"
              name="email"
              type="text"
              placeholder="Enter Email"
            />
            <FormTextInput
              label="Phone Number"
              name="value"
              type="number"
              placeholder="Enter Phone Number"
              register={registerNoID}
              validation={{ required: true }}
              error={errorsNoID.value}
            />
          </>
        )}

        <Button
          text="Submit"
          loading={isPending}
          disabled={isPending || selectedId === ""}
        />
      </form>
    </div>
  );
};

export default EnterDetailsComponent;
