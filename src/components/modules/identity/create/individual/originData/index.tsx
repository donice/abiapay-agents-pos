import React, { useEffect, useState } from "react";
import "../style.scss";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { Button } from "@/src/components/common/button";
import { useForm } from "react-hook-form";
import { fetchStates } from "@/src/services/common";
import {
  createIndividualAbssin,
  createIndividualAbssinPayloadType,
} from "@/src/services/identityService";
import { useMutation } from "@tanstack/react-query";

const OriginData = ({ setStage, setFormData, formData }: any) => {
  const [state, setState] = useState<any>([]);

  const getStates = async () => {
    try {
      const { data } = await fetchStates();
      setState(
        data?.map((item: any) => {
          return {
            label: item.state,
            value: item.idstates,
          };
        })
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStates();
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

  const mutation = useMutation({
    mutationFn: async (data: createIndividualAbssinPayloadType) =>
      createIndividualAbssin(data),
    onSuccess: (data: any) => {
      console.log(data.error);
    },
    onError: (error: any) => {
      console.log("ERROR DATA", error, Object.keys(error));
      return error;
    },
  });

  const onSubmit = async (data: any) => {
    setFormData((prev: any) => {
      return {
        ...prev,
        ...data,
      };
    });

    mutation.mutate(formData);
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
        <div>
          <span className="go_back">Residence Information</span>
        </div>

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
          name="city"
          placeholder="Enter L.G.A"
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
          <Button text={"Create ABSSIN"} loading={mutation.isPending} />
        </div>
      </form>
    </div>
  );
};

export default OriginData;
