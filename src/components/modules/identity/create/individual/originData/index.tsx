import React, { useEffect, useState } from "react";
import "../style.scss";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { Button } from "@/src/components/common/button";
import { useForm } from "react-hook-form";
import {
  fetchCategory,
  fetchSector,
  fetchTaxOffice,
} from "@/src/services/common";

const OriginData = ({ setStage, setFormData }: any) => {
  const [state, setState] = useState<any>([]);
  const [sector, setSector] = useState<any>([]);
  const [category, setCategory] = useState<any>([]);

  const getStates = async () => {
    try {
      const { data } = await fetchTaxOffice();
      setState(
        data?.map((item: any) => {
          return {
            label: item.name,
            value: item.name,
          };
        })
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  const getCategory = async () => {
    try {
      const {data} = await fetchCategory();
      // console.log("CATEGORY", data);
      setCategory(
        data?.map((item: any) => {
          return {
            label: item.category_name,
            value: item.category_name,
          };
        })
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  const getSector = async () => {
    try {
      const {data} = await fetchSector();
      // console.log("SECTOR", data);
      setSector(
        data?.map((item: any) => {
          return {
            label: item.sector_name,
            value: item.sector_name,
          };
        })
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStates();
    getCategory();
    getSector();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nationality: "Nigerian",
      state_of_origin: "",
      lga: "",
      state_of_residence: "",
      address: "",
      ward: "",
      sector: "",
      city: "",
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
          label="Nationality"
          name="nationality"
          type="text"
          placeholder="Enter Nationality"
          value={"Nigerian"}
          register={register}
          error={errors.nationality}
          validation={{ required: true }}
        />
        <SelectInput
          label="State of Origin"
          name="state_of_origin"
          id="state_of_origin"
          register={register}
          error={!!errors.state_of_origin}
          validation={{ required: true }}
          options={state}
        />
        <FormTextInput
          label="L.G.A of Origin"
          name="lga"
          placeholder="Enter L.G.A"
          register={register}
          error={errors.lga}
          validation={{ required: true }}
        />
       
       <SelectInput
          label="State of Residence"
          name="state_of_residence"
          id="state_of_residence"
          register={register}
          error={!!errors.state_of_residence}
          validation={{ required: true }}
          options={state}
        />
        <FormTextInput
          label="L.G.A of Residence"
          name="lga"
          placeholder="Enter L.G.A"
          register={register}
          error={errors.lga}
          validation={{ required: true }}
        />
        <FormTextInput
          label="City"
          name="city"
          placeholder="Enter City"
          register={register}
          error={errors.city}
          validation={{ required: true }}
        />
        <FormTextInput
          label="Address"
          name="address"
          placeholder="Enter Address"
          register={register}
          error={errors.address}
          validation={{ required: true }}
        />
        <FormTextInput
          label="Ward"
          name="ward"
          placeholder="Enter Ward"
          register={register}
          error={errors.ward}
          validation={{ required: true }}
        />

        <div className="button-container">
          <button className="button secondary" onClick={() => setStage(1)}>
            Go Back
          </button>
          <Button text={"Proceed"} />
        </div>
      </form>
    </div>
  );
};

export default OriginData;
