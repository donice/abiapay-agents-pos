"use client"
import React, { useEffect, useState } from "react";
import { Button, BackButton } from "@/src/components/common/button";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { useTransportTicketForm } from "./useTransportTicket";
import "./style.scss";
import { useDebounce } from "@/src/hooks/useDebounce";
import axios from "axios";
import toast from "react-hot-toast";

interface PlateNumberInfoResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    State: string;
    Email: string;
    Ref: string;
    Name: string;
    Phone: string;
    PlateNumber: string;
    contact_type: string | null;
    datecreated: string;
  };
}

const AddTransportTicketForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    errors,
    products,
    selectedProduct,
    selectedPeriod,
    onSubmit,
    handleProductChange,
    handlePeriodChange,
    setValue,
  } = useTransportTicketForm();

  const [plateNumber, setPlateNumber] = useState<string>("");
  const debouncedPlateNumber = useDebounce(plateNumber, 500);

  const fetchPlateNumberInfo = async (plateNumber: string) => {
    try {
      const response = await axios.post<PlateNumberInfoResponse>(
        "https://sandboxmobileapi.abiapay.ng/api/v1/transport/get-plate-number-info",
        { plateNumber }
      );
      if (response.data.status) {
        const { Name, Phone } = response.data.data;
        setValue("taxPayerName", Name);
        setValue("taxPayerPhone", Phone);
      } else {
        toast.error("Failed to retrieve plate number information");
      }
    } catch (error) {
      toast.error("Error fetching plate number information");
    }
  };

  useEffect(() => {
    if (debouncedPlateNumber) {
      fetchPlateNumberInfo(debouncedPlateNumber);
    }
  }, [debouncedPlateNumber]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-ticket">
      <SelectInput
        label="Vehicle Type"
        name="productCode"
        id="productCode"
        onChange={handleProductChange}
        options={products.map((product) => ({
          value: product.productCode,
          label: product.productName,
        }))}
        placeholder="Select Vehicle Type"
        error={!!errors.productCode}
      />
      <FormTextInput
        label="Plate Number"
        type="text"
        name="plateNumber"
        placeholder="Enter Plate Number"
        register={register}
        validation={{ required: true }}
        error={errors.plateNumber}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlateNumber(e.target.value)}
      />
      <FormTextInput
        label="Taxpayer Name"
        type="text"
        name="taxPayerName"
        placeholder="Enter Taxpayer Name"
        register={register}
        validation={{ required: true }}
        error={errors.taxPayerName}
      />
      <FormTextInput
        label="Taxpayer Phone Number"
        type="number"
        name="taxPayerPhone"
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
        error={errors.agentEmail}
      />
      <SelectInput
        label="Payment Period"
        name="paymentPeriod"
        id="paymentPeriod"
        value={selectedPeriod}
        onChange={handlePeriodChange}
        disabled={!selectedProduct}
        options={[
          { value: "1 Day", label: "1 Day" },
          { value: "1 Week", label: "1 Week" },
          { value: "1 Month", label: "1 Month" },
        ]}
        placeholder="Select Payment Period"
        error={!!errors.paymentPeriod}
      />
      {selectedPeriod && (
        <div>
          <FormTextInput
            label="Amount"
            type="number"
            name="amount"
            placeholder="Enter Amount"
            register={register}
            validation={{ required: true }}
            error={errors.amount}
          />
        </div>
      )}
      <SelectInput
        label="Choose Wallet"
        name="wallet_type"
        id="wallet_type"
        register={register}
        validation={{ required: true }}
        options={[
          { value: "access", label: "Access Bank" },
          { value: "fidelity", label: "Fidelity Bank" },
        ]}
        placeholder="Select Wallet Type"
        error={!!errors.wallet_type}
      />
      <div className="btn_container">
        <BackButton link="/tickets/transport" />
        <Button text="Save & Continue" />
      </div>
    </form>
  );
};

export default AddTransportTicketForm;
