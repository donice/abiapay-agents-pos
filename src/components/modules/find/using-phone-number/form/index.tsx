"use client";
import React from "react";
import { TextInput } from "@/src/components/common/input";
import { Button } from "@/src/components/common/button";
import { SubmitHandler, useForm } from "react-hook-form";
import "./style.scss";
import { TbSearch } from "react-icons/tb";

type Forminput = {
  merchant_key: string;
  phone_number: string;
  page: number;
  limit: number;
};
const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Forminput>({
    defaultValues: {
      merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
      phone_number: "08140144620",
      page: 1,
      limit: 5,
    },
  });
  const onSubmit: SubmitHandler<Forminput> = (data) => console.log(data);
  return (
    <form className="find-ticket" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="*"
        input_icon={<TbSearch />}
        type="number"
        name="phone_number"
        placeholder="Enter Taxpayer Phone Number"
        register={register}
        validation={{ required: true }}
        error={!!errors. phone_number}
      />
      <Button text={"Search Tickets"} />
    </form>
  );
};

export default Form;
