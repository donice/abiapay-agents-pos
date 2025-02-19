"use client";
import React, { useEffect, useState } from "react";
import "./style.scss";
import { CustomHeader } from "@/src/components/common/header";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { useForm } from "react-hook-form";
import { Button, CancelButton } from "@/src/components/common/button";
import {
  fetchLGAData,
  fetchStates,
  fetchTaxOffice,
} from "@/src/services/common";
import { useMutation, useQuery } from "@tanstack/react-query";
import useIsBrower from "@/src/hooks/useIsBrower";
import {
  createInfantABSSIN,
  InfantFormData,
} from "@/src/services/identityService";
import FaceCam from "./faceCam";
import CustomDialog from "@/src/components/common/modal/CustomDialog";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";

const CreateInfantAbssinModule = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleCapture = (base64Image: string) => {
    setCapturedImage(base64Image);
  };

  const [userData, setUserData] = useState<{
    name?: string;
    email?: string;
  } | null>();

  useEffect(() => {
    if (useIsBrower()) {
      const data = window.sessionStorage.getItem("USER_DATA");
      if (data) {
        try {
          setUserData(JSON.parse(data));
        } catch (e) {
          console.error("Error parsing JSON data:", e);
          setUserData({});
        }
      }
    }
  }, []);

  const { data: lgaData } = useQuery({
    queryKey: ["lgaData"],
    queryFn: fetchLGAData,
  });
  const { data: stateData } = useQuery({
    queryKey: ["stateData"],
    queryFn: fetchStates,
  });
  const { data: taxOffice } = useQuery({
    queryKey: ["taxOffice"],
    queryFn: fetchTaxOffice,
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<InfantFormData>({
    defaultValues: {
      nationality: "Nigerian",
      agent_email: userData?.email || "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: InfantFormData) => createInfantABSSIN(data),
    onError: (error: any) => {
      // console.error("Error creating infant ABSSIN", error);
    },

    onSuccess: (data: any) => {
      // console.log("Dependent (Minor) ABSSIN created", data);
      (
        document.getElementById("createInfantABSSINDialog") as HTMLDialogElement
      )?.showModal();
    },
  });

  const onSubmit = (data: InfantFormData) => {
    console.log("data", data);
    mutate({ ...data, image: capturedImage || "" });
  };

  return (
    <section>
      <CustomHeader
        title="Create Dependent (Minor) ABSSIN"
        desc={"Ensure to fill all important fields with (*)"}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
        <div className="app-container">
          {/* <h1 className="text-xl font-bold mb-4">FaceCam Demo</h1> */}
          <FaceCam onCapture={handleCapture} />
          {capturedImage && (
            <div className="captured-image mt-4">
              <h2 className="text-lg font-semibold mb-2">Image:</h2>
              <img
                src={capturedImage}
                alt="Captured"
                className="border rounded-lg"
                style={{ maxWidth: "100%" }}
              />
            </div>
          )}
        </div>
        <FormTextInput
          label="First Name"
          placeholder="First Name"
          name={"first_name"}
          register={register}
          validation={{ required: true }}
          error={errors.first_name}
        />
        <FormTextInput
          label="Middle Name"
          placeholder="Middle Name"
          name={"middle_name"}
          register={register}
          // validation={{ required: true }}
          error={errors.middle_name}
        />
        <FormTextInput
          label="Surname"
          placeholder="Surname"
          name={"surname"}
          register={register}
          validation={{ required: true }}
          error={errors.surname}
        />
        <FormTextInput
          type="date"
          label="Birth Date"
          placeholder="Birth Date"
          name={"birth_date"}
          register={register}
          validation={{ required: true }}
          error={errors.birth_date}
        />
        <FormTextInput
          label="Birth Place"
          placeholder="Birth Place"
          name={"birth_place"}
          register={register}
          validation={{ required: true }}
          error={errors.birth_place}
        />
        <SelectInput
          label="Gender"
          placeholder="Gender"
          name={"gender"}
          register={register}
          validation={{ required: true }}
          error={!!errors.gender}
          id={"gender"}
          options={[
            {
              label: "Male",
              value: "male",
            },
            {
              label: "Female",
              value: "female",
            },
          ]}
        />
        <SelectInput
          label="State of Origin"
          placeholder="State of Origin"
          name={"state_of_origin"}
          register={register}
          validation={{ required: true }}
          error={!!errors.state_of_origin}
          id={"state_of_origin"}
          options={
            stateData
              ? stateData?.data.map((item: any) => ({
                  label: item.state,
                  value: item.idstates,
                }))
              : []
          }
        />
        <SelectInput
          label="Tax Office"
          placeholder="Tax Office"
          name={"tax_office"}
          register={register}
          validation={{ required: true }}
          error={!!errors.tax_office}
          options={
            taxOffice
              ? taxOffice?.data.map((station: any) => ({
                  label: station.name,
                  value: station.idstation,
                }))
              : []
          }
          id={"tax_office"}
        />
        <SelectInput
          label="State of Residence"
          placeholder="State of Residence"
          name={"state_of_residence"}
          register={register}
          validation={{ required: true }}
          error={!!errors.state_of_residence}
          id={"state_of_residence"}
          options={
            stateData
              ? stateData?.data.map((item: any) => ({
                  label: item.state,
                  value: item.idstates,
                }))
              : []
          }
        />
        <SelectInput
          label="LGA"
          placeholder="LGA"
          name={"lga"}
          register={register}
          validation={{ required: true }}
          error={!!errors.lga}
          id={"lga"}
          options={
            lgaData
              ? lgaData?.data.map((lga: any) => ({
                  label: lga.lgaName,
                  value: lga.lgaID,
                }))
              : []
          }
        />
        <FormTextInput
          type="number"
          label="House No"
          placeholder="House No"
          name={"house_no"}
          register={register}
          validation={{ required: true }}
          error={errors.house_no}
        />
        <FormTextInput
          label="City"
          placeholder="City"
          name={"city"}
          register={register}
          validation={{ required: true }}
          error={errors.city}
        />
        <FormTextInput
          label="Ward"
          placeholder="Ward"
          name={"ward"}
          register={register}
          validation={{ required: true }}
          error={errors.ward}
        />
        <FormTextInput
          label="Street"
          placeholder="Street"
          name={"street"}
          register={register}
          validation={{ required: true }}
          error={errors.street}
        />
        <FormTextInput
          label="Guardian Phone Number"
          placeholder="Guardian Phone Number"
          name={"guardian_phone_number"}
          register={register}
          validation={{
            required: true,
            pattern: {
              value: /^\d{11}$/,
              message: "Phone number must be 11 digits",
            },
          }}
          error={errors.guardian_phone_number}
        />
        <FormTextInput
          label="Guardian ABSSIN"
          placeholder="Guardian ABSSIN"
          name={"guardian_abssin"}
          register={register}
          validation={{
            required: true,
            pattern: {
              value: /^\d{9,11}$/,
              message: "ABSSIN must be between 9 and 11 digits",
            },
          }}
          error={errors.guardian_abssin}
        />
        <FormTextInput
          label="School Name"
          placeholder="School Name"
          name={"school_name"}
          register={register}
          validation={{ required: true }}
          error={errors.school_name}
        />
        <FormTextInput
          label="School Address"
          placeholder="School Address"
          name={"school_address"}
          register={register}
          validation={{ required: true }}
          error={errors.school_address}
        />

        <Button text="Submit" loading={isPending} disabled={isPending} />
      </form>
      <CustomDialog
        id="createInfantABSSINDialog"
        onClose={() =>
          (
            document.getElementById(
              "createInfantABSSINDialog"
            ) as HTMLDialogElement
          )?.close()
        }
      >
        <div className="flex gap-1 items-center justify-center flex-col text-center">
          <TbRosetteDiscountCheckFilled className="text-green-600 text-7xl" />
          <h1 className="text-lg font-semibold">Created Successfully</h1>
          <p className="text-xs md:text-sm text-gray-400 max-w-[14rem]">
            You have successfully created an Infant ABSSIN
          </p>
          <div className="w-full grid grid-cols-2 gap-2 mt-4">
            <CancelButton link={"/identity"}              />
            <Button
              text="Create New"
              onClick={() => {
                (
                  document.getElementById(
                    "createInfantABSSINDialog"
                  ) as HTMLDialogElement
                )?.close();
                reset();
              }}
            />
          </div>
        </div>
      </CustomDialog>
    </section>
  );
};

export default CreateInfantAbssinModule;
