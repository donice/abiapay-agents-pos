"use client";
import React from "react";
import { FormTextInput } from "@/src/components/common/input";
import { Button } from "@/src/components/common/button";
import { useForm } from "react-hook-form";

type Forminput = {
  taxPayerPhone: string;
};
const Form = () => {
  const { register, handleSubmit } = useForm<Forminput>();
  return (
    <form>
      <FormTextInput
        label="Taxpayer Number"
        type="number"
        name="taxPayerPhone"
        placeholder="Enter Taxpayer Phone Number"
        register={register}
        validation={{ required: true }}
      />
      <Button text={"Find Tickets"} />
    </form>
  );
};

export default Form;
