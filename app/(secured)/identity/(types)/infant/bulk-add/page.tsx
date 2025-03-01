"use client";
import { Button } from "@/src/components/common/button";
import { CustomHeader } from "@/src/components/common/header";
import { postRegisterBulkAbssin } from "@/src/services/identityService";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { TbFileDownload } from "react-icons/tb";

const BulkAbssinPage = () => {
  const { handleSubmit } = useForm();
  const [file, setFile] = useState<File | null>(null);

  const csvData = `first_name,middle_name,surname,birth_date,gender,lga,guardian_phone_number,guardian_abssin,school_name,school_address,student_school_id,state_of_origin,state_of_residence,house_no,street\nJohnson,,Mba,1/20/2020,Male,1,9126818976,1624653099,St. Maris,,,901992012,Abia State,,,\nMark,,Mobebe,9/18/2021,Male,8,9130989281,1624653099,Catholic Secondary School,,129102921,,Abia State,,,`;

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

  const { mutate, isPending } = useMutation({
    mutationKey: ["bulk_abssin"],
    mutationFn: async (data: any) => {
      await postRegisterBulkAbssin(data);
    },

    onSuccess: () => {
      toast.success("Bulk ABSSIN created successfully");
    }
  });

  const onSubmit = () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    mutate(formData);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  return (
    <div>
      <CustomHeader title="Bulk Dependent ABSSIN" desc="Create Bulk ABSSIN for dependents" />

      <div
        onClick={downloadCSV}
        className="border-2 border-green-400 bg-green-100 border-dashed p-4 rounded-lg flex items-center gap-2 my-0 md:my-4 cursor-pointer"
      >
        <TbFileDownload className="text-5xl text-green-500" />
        <p className="text-xs text-green-600">Click here to download the example CSV file for bulk upload of dependent ABSSIN</p>
      </div>


      <div
        className="border-2 border-dashed border-gray-400 p-6 rounded-lg text-center cursor-pointer mt-4"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {file ? (
          <p className="text-green-600">{file.name}</p>
        ) : (
          <p className="text-gray-500">Drag & drop a CSV file here or click to select one</p>
        )}
      </div>

      <input
        type="file"
        accept=".csv"
        className="hidden"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="my-4 grid gap-4">
        <Button text="Upload" loading={isPending} disabled={isPending || !file} />
      </form>
    </div>
  );
};

export default BulkAbssinPage;
