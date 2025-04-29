"use client";
import { Button } from "@/src/components/common/button";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import React, { useEffect, useState } from "react";
import "../style.scss";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { fetchLGAData } from "@/src/services/common";
import { useMutation } from "@tanstack/react-query";
import { getErrorMessages } from "@/src/utils/helper";
import {
  fetchBulkPrintsData,
  FetchBulkPrintsPayload,
} from "@/src/services/bulkPrintsService";
import "./style.scss";

interface LGA {
  label: string;
  value: string;
}

const BulkPrintForm = ({ setBulkData, setViewData }: any) => {
  const [lga, setLga] = useState<LGA[]>([]);

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
    getLgas();
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "Transport",
      lga: null,
      card_type: "id card",
      no_of_cards: "",
      page: 1,
      previous_print: "false", 
      start_date: "",
      end_date: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FetchBulkPrintsPayload) => {
      return fetchBulkPrintsData(data);
    },
    onSuccess: (data) => {
      if (data?.response_code) {
        if (data?.response_code == "00") {
          toast.success(data?.response_message || "Data Fetched Successfully");
          setBulkData(data?.response_data.data);
          setViewData("data");
        } else toast.error(data?.response_message);
      } else {
        toast.error(getErrorMessages(data?.message));
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (reqData: any) => {
    reqData.previous_print = reqData.previous_print === "true"; 
    mutate(reqData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="emblem_form">
      <SelectInput
        label={"LGA"}
        name={"lga"}
        id={"lga"}
        register={register}
        validation={{ required: true }}
        error={!!errors.lga}
        options={lga}
      />

      <FormTextInput
        label={"Number of Cards"}
        type="number"
        name={"no_of_cards"}
        placeholder="Enter Number of Cards"
        register={register}
        validation={{ required: true }}
        error={errors.no_of_cards}
      />

      <div className="date_group">
        <FormTextInput
          label={"Start Date"}
          type="date"
          name={"start_date"}
          placeholder="Select Start Date"
          register={register}
          validation={{ required: true }}
          error={errors.start_date}
        />
      
        <FormTextInput
          label={"End Date"}
          type="date"
          name={"end_date"}
          placeholder="Select End Date"
          register={register}
          validation={{ required: true }}
          error={errors.end_date}
        />
      </div>

      <div className="form_group">
        <label className="form_label">Print Type</label>
        <div className="radio_group">
          <label>
            <input
              type="radio"
              value="false"
              {...register("previous_print", { required: true })}
            />
            New Print
          </label>
          <label style={{ marginLeft: "1rem" }}>
            <input
              type="radio"
              value="true"
              {...register("previous_print", { required: true })}
            />
            Reprint
          </label>
        </div>
        {errors.previous_print && (
          <span className="error">Print type is required</span>
        )}
      </div>

      <Button text={"Fetch Data"} loading={isPending} disabled={isPending} />
    </form>
  );
};

export default BulkPrintForm;
