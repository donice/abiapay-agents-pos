import React, { useState } from "react";
import "../style.scss";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { Button } from "@/src/components/common/button";
import { useForm } from "react-hook-form";

const UserData = ({ setStage, setFormData }: any) => {
  // const [image, setImage] = useState<string | null>(null);

  // console.log("imageSrc", image);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      birth_date: "",
      nin: "",
      bvn: "",
      phone_number: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    setFormData((prev: any) => {
      return {
        ...prev,
        ...data,
      };
    });
  };

  return (
    <div>
      <form className="identity-form" onSubmit={handleSubmit(onSubmit)}>
        <FormTextInput
          label="Date of Birth"
          name="birth_date"
          type="date"
          placeholder="Enter Date of Birth"
          register={register}
          error={errors.birth_date}
          validation={{ required: true }}
        />
        <FormTextInput
          label="NIN"
          name="nin"
          placeholder="Enter NIN"
          register={register}
          error={errors.nin}
          validation={{ required: true }}
        />
        <FormTextInput
          label="BVN"
          name="bvn"
          placeholder="Enter BVN"
          register={register}
          error={errors.bvn}
          validation={{ required: true }}
        />
        <FormTextInput
          label="Phone Number"
          name="phone_number"
          placeholder="Enter Phone Number"
          register={register}
          error={errors.phone_number}
          validation={{ required: true }}
        />
        {/* <SelectInput
          label="Gender"
          name="gender"
          id="gender"
          register={register}
          error={!!errors.gender}
          validation={{ required: true }}
          options={[
            { value: "Female", label: "Female" },
            { value: "Male", label: "Male" },
          ]}
        /> */}
        {/* <SelectInput
          label="Marital Status"
          name="marital_status"
          id="marital_status"
          register={register}
          error={!!errors.marital_status}
          validation={{ required: true }}
          options={[
            { value: "Single", label: "Single" },
            { value: "Married", label: "Married" },
            { value: "Divorced", label: "Divorced" },
            { value: "Widowed", label: "Widowed" },
          ]}
        /> */}
        <div className="button-container">
          <button className="button secondary" onClick={() => setStage(0)}>
            Go Back
          </button>
          <Button text={"Proceed"} />
        </div>
      </form>
    </div>
  );
};

export default UserData;
