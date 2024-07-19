import React from "react";
import "../style.scss";
import { FormTextInput, SelectInput } from "@/src/components/common/input";

const PersonalData = ({ setFormData }: any) => {
  return (
    <div>
      <SelectInput
        label="Title"
        name="indv_title"
        id="indv_title"
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
      />
      <FormTextInput
        label="Middle Name"
        name="middle_name"
        placeholder="Enter first name"
      />
      <FormTextInput
        label="Last Name"
        name="surname"
        placeholder="Enter first name"
      />
      <SelectInput
        label="Gender"
        name="gender"
        id="gender"
        options={[
          { value: "Female", label: "Female" },
          { value: "Male", label: "Male" },
        ]}
      />
      <SelectInput
        label="Marital Status"
        name="marital_status"
        id="marital_status"
        options={[
          { value: "Single", label: "Single" },
          { value: "Married", label: "Married" },
          { value: "Divorced", label: "Divorced" },
          { value: "Widowed", label: "Widowed" },
        ]}
      />
    </div>
  );
};

export default PersonalData;
