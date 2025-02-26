import { TextInput } from "@/src/components/common/input";
import React from "react";
import { TbSearch } from "react-icons/tb";
import { SearchOffencePayload } from "@/src/services/trafficOffences";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { searchOffence } from "@/src/services/trafficOffences";
import toast from "react-hot-toast";
import { Button } from "@/src/components/common/button";


const Form = ({ setTicketsData, setSearched }: any) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<SearchOffencePayload>({
        defaultValues: {
          search_by: "",
          search_value: "",
        },
      });
    
      const { mutate, isPending } = useMutation({
        mutationFn: (data: SearchOffencePayload) => {
          return searchOffence(data);
        },
    
        onSuccess: (data: any) => {
          console.log(data);
    
          if (data?.status == true) {
            setTicketsData(data?.data);
            setSearched(true);
          } else {
            toast.error(data?.response_message);
            setSearched(true);
          }
        },
        onError: (error) => {
          console.log(error);
        },
      });
    
      const onSubmit = (data: any) => {
        try {
          mutate(data);
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <div>
      <form className="find-ticket" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Traffic Ticket Number"
          input_icon={<TbSearch />}
          type="text"
          name="ref"
          placeholder="Enter Taxpayer Plate Number"
            register={register}
          validation={{
            required: "Plate Number is Required",
            minLength: {
              value: 5,
              message: "Length must be above 11 characters",
            },
            maxLength: {
              value: 8,
              message: "Length must be below 13 characters",
            },
          }}
          //   error={errors.ref}
        />
        <Button text={"Search for Traffic Offence "} loading={isPending} />
      </form>
    </div>
  );
};

export default Form;
