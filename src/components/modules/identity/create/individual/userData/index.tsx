import React, { useEffect, useState } from "react";
import "../style.scss";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { Button } from "@/src/components/common/button";
import { useForm } from "react-hook-form";
import { fetchTaxOffice } from "@/src/services/common";

const UserData = ({ setStage, setFormData }: any) => {
  const [taxOffice, setTaxOffice] = useState<any>([]);
  const [sector, setSector] = useState<any>([]);
  const [category, setCategory] = useState<any>([]);

  const getTaxOffice = async () => {
    try {
      const { data } = await fetchTaxOffice();
      setTaxOffice(
        data?.map((item: any) => {
          return {
            label: item.name,
            value: item.idstation,
          };
        })
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  const fetchCategory = async () => {
    try {
      const data = await fetchCategory();
      console.log("CATEGORY", data);
      // setCategory(
      //   data?.map((item: any) => {
      //     return {
      //       label: item.name,
      //       value: item.idstation,
      //     };
      //   })
      // );
    } catch (error: any) {
      console.log(error);
    }
  };

  const fetchSector = async () => {
    try {
      const data = await fetchSector();
      console.log("SECTOR", data);
      // setSector(
      //   data?.map((item: any) => {
      //     return {
      //       label: item.name,
      //       value: item.idstation,
      //     };
      //   })
      // );
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTaxOffice();
    fetchCategory();
    fetchSector();
  }, []);

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
      tax_office: "",
      category: "",
      sector: "",
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
        <SelectInput
          label="Tax Office"
          name="tax_office"
          id="tax_office"
          register={register}
          error={!!errors.tax_office}
          validation={{ required: true }}
          options={taxOffice}
        />
        <SelectInput
          label="Category"
          name="category"
          id="category"
          register={register}
          error={!!errors.category}
          validation={{ required: true }}
          options={category}
        />
        <SelectInput
          label="Occupation Sector"
          name="sector"
          id="sector"
          register={register}
          error={!!errors.sector}
          validation={{ required: true }}
          options={sector}
        />
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
