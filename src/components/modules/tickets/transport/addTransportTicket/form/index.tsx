"use client"
import React from "react";
import { Button, BackButton } from "@/src/components/common/button";
import "./style.scss";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { useTransportTicketForm } from "./useTransportTicket";
import { useDebounce } from "@/src/hooks/useDebounce";
import axios from "axios";
import toast from "react-hot-toast";
const AddTransportTicketForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    errors,
    lga,
    products,
    selectedProduct,
    selectedPeriod,
    onSubmit,
    handleProductChange,
    handlePeriodChange,
    
  } = useTransportTicketForm();

  const getPlateNumberDetails = async (plateNumber: string) => {
    try {
      const url = 'https://sandboxmobileapi.abiapay.ng/api/v1/transport/get-plate-number-info'
      const response = await axios.post(url, {plate_number: plateNumber});
      console.log(response);
    } catch {
      toast.error("Error fetching vehicle details");
    }
  };

  // const debouncedGetPlateNumberDetails = useDebounce(getPlateNumberDetails);

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
        onChange={(e: any) => {console.log(e.target.value)}}
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
        label="Wallet Type"
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

