"use client";
import { Button } from "@/src/components/common/button";
import { CustomHeader } from "@/src/components/common/header";
import { FormTextInput } from "@/src/components/common/input";
import { postRegisterBulkAbssin } from "@/src/services/identityService";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { TbFileDownload } from "react-icons/tb";

const BulkAbssinPage = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      file: "",
    },
  });

  const csvData = `first_name,middle_name,surname,birth_date,gender,lga,guardian_phone_number,guardian_abssin,school_name,school_address,student_school_id,state_of_origin,state_of_residence,house_no,street\nJohnson,,Mba,1/20/2020,Male,1,9126818976,1624653099,St. Maris,,,901992012,Abia State,,,\nMark,,Mobebe,9/18/2021,Male,8,9130989281,1624653099,Catholic Secondary School,,129102921,,Abia State,,,
  `;

  const downloadCSV = () => {
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bulk_abssin_template.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const { mutate, isPending } = useMutation(
    {
      mutationKey: ["bulk_abssin"],
      onMutate: async (data: any) => {
        postRegisterBulkAbssin(data);
      }
    }
  )
  const onSubmit = (data: any) => {
    console.log(data);
    // mutate(data);
  };

  return (
    <div>
      <CustomHeader
        title="Bulk Dependent ABSSIN"
        desc={"Create Bulk ABSSIN for dependents"}
      />

      <div
        onClick={downloadCSV}
        className="border-2 border-green-400 bg-green-100 border-dashed p-4 rounded-lg flex items-center gap-2 my-0 md:my-4 cursor-pointer"
      >
        <TbFileDownload className="text-5xl text-green-500" />
        <p className="text-xs text-green-600">
          Click here to download the example CSV file for bulk upload of
          dependent ABSSIN
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="my-4 grid gap-4">
        <FormTextInput
          label="Click to Select File to Upload CSV"
          type="file"
          name={"file"}
          register={register}
        />
        <Button text={"Upload"} loading={isPending} disabled={isPending} />
      </form>
    </div>
  );
};

export default BulkAbssinPage;
