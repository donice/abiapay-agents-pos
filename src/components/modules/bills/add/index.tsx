"use client";
import { Button } from "@/src/components/common/button";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { useDebounce } from "@/src/hooks/useDebounce";
import { fetchABSSINInfo, fetchTaxOffice } from "@/src/services/common";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CreateBillModule = () => {
  const { register, handleSubmit, setValue, watch } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    toast.success("Bill created successfully");
  };

  const abssin = watch("abssin");
  const debouncedAbssin = useDebounce(abssin, 300);

  const { data: revenueOfficesData } = useQuery({
    queryKey: ["revenue_offices"],
    queryFn: async () => {
      return await fetchTaxOffice();
    },
  });


  useEffect(() => {
    if (debouncedAbssin) {
      const getPlateNumberInfo = async (req: string) => {
        try {
          const response = await fetchABSSINInfo({ id: req });

          if (response.data?.length !== 0) {
            toast.success(response.message);
            setValue(
              "taxpayer_name",
              response.data.firstname +
                " " +
                response.data.middle_name +
                " " +
                response.data.lastname
            );
            setValue("taxpayer_phone", response.data.phone_number);
          }
        } catch (error) {
          console.log(error);
        }
      };

      getPlateNumberInfo(debouncedAbssin);
    }
  }, [debouncedAbssin, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 mb-40">
      <SelectInput
        label={"Taxpayer Type"}
        name={"taxpayer_type"}
        id={"taxpayer_type"}
        register={register}
        options={[
          {
            label: "Individual",
            value: "individual",
          },
          {
            label: "Corporate",
            value: "corporate",
          },
        ]}
      />

      <FormTextInput
        label="ABSSIN"
        name="abssin"
        register={register}
        validation={{ required: true }}
        placeholder="Enter ABSSIN"
      />
      <FormTextInput
        label="Taxpayer Name"
        name="taxpayer_name"
        register={register}
        validation={{ required: true }}
        placeholder="Enter Taxpayer Name"
      />
      <FormTextInput
        label="Taxpayer Phone"
        name="taxpayer_phone"
        register={register}
        validation={{ required: true }}
        placeholder="Enter Taxpayer Phone"
      />

      <SelectInput
        label={"Revenue Office"}
        name={"rev_office"}
        id={"rev_office"}
        register={register}
        options={revenueOfficesData?.data.map((office: any) => ({
          label: office.name,
          value: office.idstation,
        }))}
      />

      <SelectInput
        label={"Product"}
        name={"product"}
        id={"product"}
        register={register}
        options={[
          {
            label: "Product 1",
            value: "product1",
          },
          {
            label: "Product 2",
            value: "product2",
          },
        ]}
      />

      <SelectInput
        label={"Occurrence"}
        name={"occurrence"}
        id={"occurrence"}
        register={register}
        options={[
          {
            label: "Daily",
            value: "Daily",
          },
          {
            label: "Weekly",
            value: "Weekly",
          },
        ]}
      />

      <SelectInput
        label={"Payment Channel"}
        name={"payment_channel"}
        id={"payment_channel"}
        register={register}
        options={[
          {
            label: "Payment Channel 1",
            value: "occurrence1",
          },
          {
            label: "Payment Channel 2",
            value: "occurrence2",
          },
        ]}
        />
        <Button text={"Create Bill"}  />
    </form>
  );
};

export default CreateBillModule;
