"use client";
import React, { useEffect } from "react";
import { FormButton } from "@/src/components/common/button";
import { SelectInput } from "@/src/components/common/input";
import "./style.scss";
import { useForm } from "react-hook-form";
import { fetchMarketEnumerationDetails } from "@/src/services/ticketsServices";
import { useMutation } from "@tanstack/react-query";
import { formatAmount } from "@/src/utils/formatAmount";
import { PiSealCheckDuotone } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { BiLoaderCircle } from "react-icons/bi";

const AddMarketTicketForm = (id: any) => {
  console.log("IDSSSSSS", id);
  const [details, setDetails] = React.useState<any>(null);
  const {
    register: registerRenderForm,
    watch: watchRenderForm,
    handleSubmit: handleRenderFormSubmit,
  } = useForm({
    defaultValues: {
      option: "",
      enumeration_id: "",
    },
  });

  const mutateMarketLevy = useMutation({
    mutationKey: ["fetchMarketEnumerationDetails"],
    mutationFn: () => {
      return fetchMarketEnumerationDetails({
        enumeration_id: id?.id,
      });
    },
    onSuccess: (data) => {
      setDetails(data?.response_data);
      console.log(data);
    },
  });

  const watchOption = watchRenderForm("option");

  console.log("DETAILSSS", details);

  useEffect(() => {
    if (id) {
      mutateMarketLevy.mutate();
    }
  }, [id]);

  return (
    <div className="add-market-ticket">
      <section className="grid gap-4">
        <div>
          <div className="border-b-2 border-dashed py-3 flex justify-between">
            <p className="text-sm text-gray-400">Enumeration ID:</p>
            <p className="text-sm font-semibold text-gray-600">
              {details?.enumeration_id}
            </p>
          </div>
          <div className="border-b-2 border-dashed py-3 flex justify-between">
            <p className="text-sm text-gray-400">ABSSIN:</p>
            <p className="text-sm font-semibold text-gray-600">
              {details?.taxpayer_id}
            </p>
          </div>
          <div className="border-b-2 border-dashed py-3 flex justify-between">
            <p className="text-sm text-gray-400">Taxpayer Name:</p>
            <p className="text-sm font-semibold text-gray-600">
              {details?.taxpayer_name}
            </p>
          </div>
          <div className="border-b-2 border-dashed py-3 flex justify-between">
            <p className="text-sm text-gray-400">Taxpayer Phone:</p>
            <p className="text-sm font-semibold text-gray-600">
              {details?.taxpayer_phone}
            </p>
          </div>
          <div className="border-b-2 border-dashed py-3 flex justify-between">
            <p className="text-sm text-gray-400">Amount:</p>
            <p className="text-sm font-semibold text-gray-600">
              {formatAmount(Number(details?.total_amount))}
            </p>
          </div>
          <div className="border-b-2 border-dashed py-3 flex justify-between">
            <p className="text-sm text-gray-400">Payment Status:</p>
            <p
              className={`${
                details?.items[0].status == "Completed"
                  ? "text-green-500"
                  : "text-yellow-500"
              }`}
            >
              {details?.items[0].status == "Completed" ? (
                <div className="flex items-center gap-1 text-sm font-semibold ">
                  <PiSealCheckDuotone className="text-green-500 text-xl " />
                  <p>{details?.items[0].status}</p>
                </div>
                
              ) : (
                <div className="flex items-center gap-1 text-sm font-semibold ">
                  <BiLoaderCircle className="text-yellow-400 text-xl animate-spin" />
                  <p>{details?.items[0].status}</p>
                </div>
                
              )}
            </p>
          </div>
          <div className="py-3 flex justify-between">
            <p className="text-sm text-gray-400">Created:</p>
            <p className="text-sm font-semibold text-gray-600">
              {details?.created_at}
            </p>
          </div>
          <div className="pt-3">
            <SelectInput
              label={"Wallet Type"}
              name={"wallet_type"}
              id={"wallet_type"}
              options={[
                { value: "fidelity", label: "Fidelity" },
                { value: "access", label: "Access" },
              ]}
            />
          </div>
        </div>

        <FormButton text={"Pay Now"} disabled={false} loading={false} />
      </section>
    </div>
  );
};

export default AddMarketTicketForm;
