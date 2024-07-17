import React from "react";
import { Button } from "@/src/components/common/button";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  verifyPlateNumber,
  VerifyPlateNumberType,
} from "@/src/services/transportEnumerationService";
import { getErrorMessages } from "@/src/utils/helper";
import toast from "react-hot-toast";

const VehicleData = ({ setStage }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
      plate_number: "",
      phone_number: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: VerifyPlateNumberType) => {
      return verifyPlateNumber(data);
    },
    mutationKey: ["verify_plate_number"],
    onSuccess: (data) => {
      console.log(data);
      data.response_code == "00"
        ? toast.success("Plate Number Verified Successfully")
        : toast.error("Error Verifying Plate Number");
    },
    onError: (error) => {
      toast.error("Error Verifying Plate Number");
      console.log(error);
    },
  });

  const onSubmit = (reqData: any) => {
    mutate(reqData);
    console.log(reqData);
    // setStage(1);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="vehicledata-form">
        <FormTextInput
          label="Driver's Phone Number (e.g 08123456789)"
          type="number"
          name="phone_number"
          placeholder="Enter Driver's Phone Number"
          register={register}
          validation={{ required: true }}
          error={errors.phone_number}
        />
        <FormTextInput
          label="Vehicle Plate Number"
          type="text"
          name="plate_number"
          placeholder="Enter Vehicle Plate Number"
          register={register}
          validation={{ required: true }}
          error={errors.plate_number}
        />
        <SelectInput
          label="Vehicle Category"
          name="vehicle_category"
          id="vehicle_category"
          options={[{ label: "Car", value: "Car" }]}
          placeholder="Select Vehicle Category"
        />
        <SelectInput
          label="Operating Park"
          name="operating_park"
          id="operating_park"
          options={[{ label: "Parks", value: "Parks" }]}
          placeholder="Select Operating Park"
        />
        <SelectInput
          label="Trade Unions"
          name="trade_union"
          id="trade_union"
          options={[{ label: "Trade Unions", value: "Trade Unions" }]}
          placeholder="Select Trade Unions"
        />
        <Button text="Save & Continue" loading={isPending} />
      </form>
    </div>
  );
};

export default VehicleData;
