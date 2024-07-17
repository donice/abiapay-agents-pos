import React from "react";
import { Button } from "@/src/components/common/button";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { useForm } from "react-hook-form";

const VehicleData = ({ setStage }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taxpayer_phone: "",
      vehicle_plate_number: "",
      vehicle_category: "",
      operating_park: "",
      trade_union: "",
    },
  });
  const onSubmit = (data: any) => {
    console.log(data);
    setStage(1)
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="vehicledata-form">
        <FormTextInput
          label="Driver's Phone Number (e.g 08123456789)"
          type="number"
          name="taxpayer_phone"
          placeholder="Enter Driver's Phone Number"
          register={register}
          validation={{ required: true }}
          error={errors.taxpayer_phone}
        />
        <FormTextInput
          label="Vehicle Plate Number"
          type="text"
          name="vehicle_plate_number"
          placeholder="Enter Vehicle Plate Number"
          register={register}
          validation={{ required: true }}
          error={errors.vehicle_plate_number}
        />
        <SelectInput
          label="Vehicle Category"
          name="vehicle_category"
          id="vehicle_category"
          options={[
            { label: "Car", value: "Car" },
          ]}
          placeholder="Select Vehicle Category"
        />
        <SelectInput
          label="Operating Park"
          name="operating_park"
          id="operating_park"
          options={[
            { label: "Parks", value: "Parks" },
          ]}
          placeholder="Select Operating Park"
        />
        <SelectInput
          label="Trade Unions"
          name="trade_union"
          id="trade_union"
          options={[
            { label: "Trade Unions", value: "Trade Unions" },
          ]}
          placeholder="Select Trade Unions"
        />
        <Button text="Save & Continue" />
      </form>
    </div>
  );
};

export default VehicleData;
