import React from "react";
import "../style.scss";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { Button } from "@/src/components/common/button";
import { useForm } from "react-hook-form";

const PersonalData = ({ setFormData }: any) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      first_name: "",
      middle_name: "",
      surname: "",
      indv_title: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  }
  return (
    <div>
      <form className="identity-form" onSubmit={handleSubmit(onSubmit)}>
        <SelectInput
          label="Title"
          name="indv_title"
          id="indv_title"
          register={register}
          options={[
            { value: "Mr", label: "Mr" },
            { value: "Mrs", label: "Mrs" },
            { value: "Miss", label: "Miss" },
            { value: "Dr", label: "Dr" },
            { value: "Chief", label: "Chief" },
          ]}
        />
        <FormTextInput
          label="First Name"
          name="first_name"
          placeholder="Enter first name"
          register={register}
          error={errors.first_name}
        />
        <FormTextInput
          label="Middle Name"
          name="middle_name"
          placeholder="Enter first name"
          register={register}
          error={errors.middle_name}
        />
        <FormTextInput
          label="Last Name"
          name="surname"
          placeholder="Enter first name"
          register={register}
          error={errors.surname}
        />
        <SelectInput
          label="Gender"
          name="gender"
          id="gender"
          register={register}
          options={[
            { value: "Female", label: "Female" },
            { value: "Male", label: "Male" },
          ]}
        />
        <SelectInput
          label="Marital Status"
          name="marital_status"
          id="marital_status"
          register={register}
          options={[
            { value: "Single", label: "Single" },
            { value: "Married", label: "Married" },
            { value: "Divorced", label: "Divorced" },
            { value: "Widowed", label: "Widowed" },
          ]}
        />
        <Button text={"Proceed"} />
      </form>
    </div>
  );
};

export default PersonalData;
