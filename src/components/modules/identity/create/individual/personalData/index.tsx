import React from "react";
import "../style.scss";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { Button } from "@/src/components/common/button";
import { useForm } from "react-hook-form";
import { TbCameraPlus } from "react-icons/tb";
import FaceCam from "../faceCam";

const PersonalData = ({ setFormData }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      middle_name: "",
      surname: "",
      indv_title: "",
      gender: "",
      marital_status: "",
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
        {/* <div className="identity-form_image">
          <div className="identity-form_imagecapture"></div>
          <button className="button primary">
            <TbCameraPlus /> Capture{" "}
          </button>
        </div> */}
        <FaceCam />
        <SelectInput
          label="Title"
          name="indv_title"
          id="indv_title"
          register={register}
          error={!!errors.indv_title}
          validation={{ required: true }}
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
          validation={{ required: true }}
        />
        <FormTextInput
          label="Middle Name"
          name="middle_name"
          placeholder="Enter first name"
          register={register}
          error={errors.middle_name}
          validation={{ required: true }}
        />
        <FormTextInput
          label="Last Name"
          name="surname"
          placeholder="Enter first name"
          register={register}
          error={errors.surname}
          validation={{ required: true }}
        />
        <SelectInput
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
        />
        <SelectInput
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
        />
        <Button text={"Proceed"} />
      </form>
    </div>
  );
};

export default PersonalData;
