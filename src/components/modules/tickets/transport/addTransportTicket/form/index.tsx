"use client"
import React from "react";
import { Button, BackButton } from "@/src/components/common/button";
import "./style.scss";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { useTransportTicketForm } from "./useTransportTicket";

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
    handlePeriodChange
  } = useTransportTicketForm();


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-ticket">
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
      
      <FormTextInput
        label="Plate Number"
        type="text"
        name="plateNumber"
        placeholder="Enter Plate Number"
        register={register}
        validation={{ required: true }}
        error={errors.plateNumber}
      />
      
      <SelectInput
        label="Vehicle Type"
        name="productCode"
        id="productCode"
        onChange={        handleProductChange}
        options={products.map((product) => ({
          value: product.productCode,
          label: product.productName,
        }))}
        placeholder="Select Vehicle Type"
        error={!!errors.productCode}
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

