"use client";
import { Button } from "@/src/components/common/button";
import { CustomHeader } from "@/src/components/common/header";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { TbFileDownload } from "react-icons/tb";
import { downloadCSV } from "./csv";
import toast from "react-hot-toast";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      if (selectedFile.type !== "text/csv") {
        toast.error("❌ Please upload a valid CSV file.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);

    if (event.dataTransfer.files.length > 0) {
      const droppedFile = event.dataTransfer.files[0];
      if (droppedFile.type !== "text/csv") {
        toast.error("❌ Please upload a valid CSV file.");
        return;
      }
      setFile(droppedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.custom("⚠️ Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "https://sandboxmobileapi.abiapay.com/api/v1/abssin/bulk-school-registration",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      toast.success(  `✅ Success: ${data.response_message}, Records: ${data.total_records}`
      );

    } catch (error) {
      toast.error("❌ Upload failed. Please try again.");
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: handleUpload,
  });

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg w-full grid gap-4">
      <CustomHeader
        title="Bulk Dependent ABSSIN"
        desc="Create Bulk ABSSIN for dependents"
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
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition ${
          dragActive ? "border-blue-500 bg-blue-100" : "border-gray-300"
        }`}
      >
        <input
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          className="hidden"
          id="fileInput"
        />
        <label htmlFor="fileInput" className="block cursor-pointer">
          {dragActive ? (
            <p className="text-blue-600">Drop the file here...</p>
          ) : (
            <p className="text-gray-600">
              Drag & drop a CSV file here, or click to select one
            </p>
          )}
        </label>
      </div>

      {file && (
        <p className="mt-2 text-sm text-green-600">
          Selected file: <strong>{file.name}</strong>
        </p>
      )}

      <Button
        onClick={() => mutate()}
        text={isPending ? "Creating Bulk ABSSIN..." : "Create Bulk ABSSIN"}
        loading={isPending}
        disabled={isPending || !file}
      />
    </div>
  );
};

export default FileUpload;
