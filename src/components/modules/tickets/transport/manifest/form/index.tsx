"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { fetchProducts } from "@/src/services/common";
import { randomInvoiceGenerator } from "@/src/utils/randomInvoiceGenerator";
import { getCurrentDateTime } from "@/src/utils/getCurrentDateTime";
import toast from "react-hot-toast";
import useIsBrower from "@/src/hooks/useIsBrower";
import { useRouter } from "next/navigation";
import { Button, BackButton } from "@/src/components/common/button";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { SuccessModal } from "@/src/components/common/modal";
import { useDebounce } from "@/src/hooks/useDebounce";
import "./style.scss";
import { CreateManifestPayloadType } from "@/src/components/types/ticketTypes";
import {
  Product,
  createManifest,
  fetchPlateNumberInfo,
} from "@/src/services/ticketsServices";
import { useMutation } from "@tanstack/react-query";

const AddManifestForm = ({
  show,
  setShow,
  paymentRef,
  setPaymentRef,
  selectedPeriod,
  setSelectedPeriod,
  selectedProduct,
  setSelectedProduct,
}: any) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateManifestPayloadType>({
    defaultValues: {
      merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
      vehiclePlateNumber: "",
      taxpayer_phone: "",
      taxpayer_name: "",
      wallet_type: "fidelity",
      destination: "",
      passengers: [
        {
          name: "",
          phone_number: 0,
          next_of_kin_name: "",
          next_of_kin_phone: ""
        }
      ],
      amount: 0
    },
  });

  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  const data = useIsBrower() && sessionStorage.getItem("USER_DATA");
  const user_data = data && JSON.parse(data);
  const getProductsData = async () => {
    try {
      const response = await fetchProducts();
      setProducts(response?.data);
    } catch {
      toast.error("Error fetching products");
    }
  };


  useEffect(() => {
    getProductsData();
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateManifestPayloadType) => {
      return createManifest(data);
    },
    onSuccess: (response: any) => {
      if (response.response_code === "00") {
        toast.success(response.response_message);
        setPaymentRef(response.payment_ref);
        setShow(true);
      } else if (response.response_code === "74") {
        toast.error(response.response_message);
        router.push("/tickets/transport");
      } else {
        toast.error(`${response.response_message}, Try again`);
      }
    },
    onError: () => {
      toast.error("Error Creating Ticket");
    },
  });

  const onSubmit = async (data: CreateManifestPayloadType) => {
    const formData = {
      ...data,
      transaction_date: getCurrentDateTime(),
      invoice_id: `INV${randomInvoiceGenerator()}`,
    };

    sessionStorage.setItem("TRANSPORT_INVOICE", JSON.stringify(formData));

    mutate(formData);
  };

  const vehiclePlateNumber = watch("vehiclePlateNumber");
  const debouncedPlateNumber = useDebounce(vehiclePlateNumber, 500);

  useEffect(() => {
    if (debouncedPlateNumber) {
      const getPlateNumberInfo = async (vehiclePlateNumber: string) => {
        try {
          const response = await fetchPlateNumberInfo(vehiclePlateNumber);

          if (response.data?.length !== 0) {
            toast.success(response.message);
            setValue("taxpayer_name", response.data.Name);
            setValue("taxpayer_phone", response.data.Phone);
          }
        } catch (error) {
          toast.error("Error fetching plate number information");
        }
      };

      getPlateNumberInfo(debouncedPlateNumber);
    }
  }, [debouncedPlateNumber, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-ticket">

    <FormTextInput
      label="Plate Number"
      type="text"
      name="vehiclePlateNumber"
      placeholder="Enter Plate Number"
      register={register}
      validation={{
        required: true,
        setValueAs: (value: string) => value.toUpperCase()
      }}
      error={errors.vehiclePlateNumber}
      />

      <FormTextInput
        label="Taxpayer Phone Number"
        type="number"
        name="taxpayer_phone"
        placeholder="Enter Taxpayer Phone Number"
        register={register}
        validation={{
          required: "Field Required",
          minLength: {
            value: 11,
            message: "Length must be above 11 characters",
          },
          maxLength: {
            value: 11,
            message: "Length must be below 13 characters",
          },
        }}
        error={errors.taxpayer_phone}
      />

      <FormTextInput
        label="Taxpayer Name"
        type="text"
        name="taxpayer_name"
        placeholder="Enter Taxpayer Name"
        register={register}
        validation={{ required: true }}
        error={errors.taxpayer_name}
      />

      <FormTextInput
        label="Amount"
        type="number"
        name="amount"
        placeholder="Enter Amount"
        register={register}
        readOnly
        validation={{ required: true }}
        error={errors.amount}
      />

      <SelectInput
        label="Choose Wallet"
        name="wallet_type"
        id="wallet_type"
        register={register}
        validation={{ required: true }}
        options={[
          { value: "fidelity", label: "Fidelity Bank" },
          { value: "access", label: "Access Bank" },
        ]}
        placeholder="Select Wallet Type"
        error={!!errors.wallet_type}
      />

      <div className="btn_container">
        <BackButton link="/tickets/transport" />
        <Button text="Process Payment" loading={isPending} />
      </div>

      {show && (
        <SuccessModal
          text="View Receipt"
          link="/tickets/transport/add/summary"
          id={`Ref: ${paymentRef}, Valid for: ${selectedPeriod}, Payment for: ${selectedProduct}`}
        />
      )}
    </form>
  );
};

export default AddManifestForm;
