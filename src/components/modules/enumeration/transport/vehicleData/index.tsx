import React, { useEffect, useState } from "react";
import { Button } from "@/src/components/common/button";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  verifyPlateNumber,
  VerifyPlateNumberType,
} from "@/src/services/transportEnumerationService";
import toast from "react-hot-toast";
import { InfoModal } from "@/src/components/common/modal";
import { fetchParks, fetchTradeUnions } from "@/src/services/common";

const VehicleData = ({ setStage, setDetails }: any) => {
  const [parks, setParks] = useState([]);
  const [tradeUnions, setTradeUnions] = useState([]);
  const [show, setShow] = useState({
    mode: false,
    status: "",
  });

  const [formData, setFormData] = useState({
    operating_park: "",
    trade_union: "",
  });

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
      setDetails(data?.response_data);
      if (data.response_code == "00") {
        toast.success("Plate Number Verified Successfully");
        setShow({ mode: true, status: "success" });
        setStage(1);
      } else {
        toast.error("Error Verifying Plate Number");
        setShow({ mode: true, status: "error" });
      }
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

  const getParks = async () => {
    try {
      const data = await fetchParks();
      const res = data?.map((item: any) => {
        return {
          label: item.park,
          value: item.park,
        };
      });
      setParks(res);
    } catch (error: any) {
      console.log(error);
    }
  };

  const getTradeUnions = async () => {
    try {
      const data = await fetchTradeUnions();
      const res = data?.map((item: any) => {
        return {
          label: item.unionCode,
          value: item.unionName,
        };
      });
      setTradeUnions(res);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getParks();
    getTradeUnions();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="enumeration-form">
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
          label="Operating Park"
          name="operating_park"
          id="operating_park"
          options={parks}
          placeholder="Select Operating Park"
          onChange={handleChange}
          register={register}
        />
        <SelectInput
          label="Trade Unions"
          name="trade_union"
          id="trade_union"
          options={tradeUnions}
          placeholder="Select Trade Unions"
          onChange={handleChange}
          register={register}
        />
        <Button text="Save & Continue" loading={isPending} />
      </form>

      {/* {show.mode && show.status == "success" && (
        <InfoModal
          status={show.status}
          text_header="Proceed Enumeration"
          button_text="View Receipt"
          link="/enumeration/save"
          text_info={`Ref: `}
        />
      )} */}
      {show.mode && show.status == "error" && (
        <InfoModal
          status={show.status}
          text_header="Vehicle Information Not Found"
          button_text="Enter Vehicle Details"
          link="/enumeration/transport/save"
          text_info={`Cannot Proceed. Please Register Vehicle Details`}
        />
      )}
    </div>
  );
};

export default VehicleData;
