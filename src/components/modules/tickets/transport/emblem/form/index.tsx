"use client";
import { Button } from "@/src/components/common/button";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import React, { useEffect, useState } from "react";
import "../style.scss";
import { useForm } from "react-hook-form";
import {
  CreateTransportEmblemType,
  fetchEmblemProductCode,
} from "@/src/services/emblemService";
import { useDebounce } from "@/src/hooks/useDebounce";
import { fetchPlateNumberInfo } from "@/src/services/ticketsServices";
import toast from "react-hot-toast";
import { fetchLGAData } from "@/src/services/common";

const CreateEmblemForm = () => {
  const [embleProductCode, setEmbleProductCode] = useState([]);
  const [lga, setLga] = useState([]);

  const getEmblemProductCode = async () => {
    try {
      const { data } = await fetchEmblemProductCode();
      setEmbleProductCode(
        data?.map((item: any) => {
          return {
            label: item.productName,
            value: item.productCode,
          };
        })
      );
    } catch (error) {}
  };

  const getLgas = async () => {
    try {
      const { data } = await fetchLGAData();
      setLga(
        data?.map((item: any) => {
          return {
            label: item.lgaName,
            value: item.lgaID,
          };
        })
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmblemProductCode();
    getLgas();
  }, []);

  const {
    handleSubmit,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
      product_code: "",
      plate_number: "",
      taxpayer_phone: "",
      customer_name: "",
      customer_email: "",
      description: "",
      amount: "",
      lga: "",
      payment_period: "",
      wallet_type: "Fidelity",
    },
  });

  const plateNumber = watch("plate_number");
  const debouncedPlateNumber = useDebounce(plateNumber, 500);

  useEffect(() => {
    if (debouncedPlateNumber) {
      const getPlateNumberInfo = async (plateNumber: string) => {
        try {
          const response = await fetchPlateNumberInfo(plateNumber);

          if (response.data?.length !== 0) {
            toast.success(response.message);
            setValue("customer_name", response.data.Name);
            setValue("taxpayer_phone", response.data.Phone);
            setValue("customer_email", response.data.Email);
          }
        } catch (error) {
          toast.error("Error fetching plate number information");
        }
      };

      getPlateNumberInfo(debouncedPlateNumber);
    }
  }, [debouncedPlateNumber, setValue]);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="emblem_form">
      <SelectInput
        label={"Emblem Type"}
        name={"product_code"}
        id={"product_code"}
        register={register}
        validation={{ required: true }}
        error={!!errors.product_code}
        options={embleProductCode}
      />

      <FormTextInput
        label={"Plate Number"}
        name={"plate_number"}
        placeholder="Enter Vehicle Plate Number"
        register={register}
        validation={{ required: true }}
        error={errors.plate_number}
      />
      <FormTextInput
        label={"Taxpayer Phone Number"}
        name={"taxpayer_phone"}
        placeholder="Enter Taxpayer Phone Number"
        register={register}
        validation={{ required: true }}
        error={errors.taxpayer_phone}
      />
      <FormTextInput
        label={"Taxpayer Name"}
        name={"customer_name"}
        placeholder="Enter Taxpayer Name"
        register={register}
        validation={{ required: true }}
        error={errors.customer_name}
      />
      <FormTextInput
        label={"Taxpayer Email"}
        name={"customer_email"}
        placeholder="Enter Taxpayer Email"
        register={register}
        validation={{ required: true }}
        error={errors.customer_email}
      />
      <FormTextInput
        label={"Description"}
        name={"description"}
        placeholder="Enter Description"
        register={register}
        validation={{ required: true }}
        error={errors.description}
      />
      <FormTextInput
        label={"Amount"}
        name={"amount"}
        placeholder="Enter Amount"
        register={register}
        validation={{ required: true }}
        error={errors.amount}
      />

      <SelectInput
        label={"Payment Period"}
        name={"payment_period"}
        id={"payment_period"}
        register={register}
        validation={{ required: true }}
        error={!!errors.payment_period}
        options={[
          { label: "2023", value: "2023" },
          { label: "2024", value: "2024" },
        ]}
      />
      <SelectInput
        label={"LGA"}
        name={"lga"}
        id={"lga"}
        register={register}
        validation={{ required: true }}
        error={!!errors.lga}
        options={lga}
      />
      <SelectInput
        label={"Wallet Type"}
        name={"wallet_type"}
        id={"wallet_type"}
        register={register}
        validation={{ required: true }}
        error={!!errors.wallet_type}
        options={[
          { label: "Fidelity", value: "Fidelity" },
          { label: "Access", value: "Access" },
        ]}
      />

      <Button text={"Process Now"} />
    </form>
  );
};

export default CreateEmblemForm;
