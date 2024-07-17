"use client";
import React, { useEffect } from "react";
import { Button, BackButton } from "@/src/components/common/button";
import { FormTextInput, SelectInput } from "@/src/components/common/input";
import { useTransportTicketForm } from "./useTransportTicket";
import "./style.scss";
import { useDebounce } from "@/src/hooks/useDebounce";
import toast from "react-hot-toast";
import {SuccessModal} from "@/src/components/common/modal";
import { fetchPlateNumberInfo } from "@/src/services/ticketsServices";

const AddTransportTicketForm: React.FC = () => {
  const {
    register,
    watch,
    handleSubmit,
    errors,
    products,
    selectedProduct,
    selectedPeriod,
    onSubmit,
    handleProductChange,
    handlePeriodChange,
    setValue,
    show,
    paymentRef,
  } = useTransportTicketForm();

  let plateNumber = watch("plateNumber");
  const debouncedPlateNumber = useDebounce(plateNumber, 500);
  const paymentPeriod = watch("paymentPeriod"),
    productCode = watch("productCode");

  const getPlateNumberInfo = async (plateNumber: string) => {
    try {
      const response = await fetchPlateNumberInfo(plateNumber);

      if (response.data?.length !== 0) {
        toast.success(response?.message);
        const { Name, Phone } = response.data;
        setValue("taxPayerName", Name);
        setValue("taxPayerPhone", Phone);
      }
    } catch (error) {
      console.error("Error fetching plate number information:", error);
      toast.error("Error fetching plate number information");
    }
  };

  useEffect(() => {
    if (debouncedPlateNumber) {
      getPlateNumberInfo(debouncedPlateNumber);
    }
  }, [debouncedPlateNumber]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-ticket">
      <SelectInput
        label="Ticket Type"
        name="productCode"
        id="productCode"
        onChange={handleProductChange}
        options={
          products &&
          products.map((product) => ({
            value: product.productCode,
            label: product.productName,
          }))
        }
        placeholder="Select Ticket Type"
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
        error={errors.taxPayerPhone}
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

      <SelectInput
        label="Payment Period"
        name="paymentPeriod"
        id="paymentPeriod"
        value={selectedPeriod}
        onChange={handlePeriodChange}
        disabled={!selectedProduct}
        options={[
          { value: "", label: "Select Payment Period" },
          { value: "1 Day", label: "1 Day" },
          { value: "1 Week", label: "1 Week" },
          { value: "1 Month", label: "1 Month" },
        ]}
        placeholder="Select Payment Period"
        error={!!errors.paymentPeriod}
      />
      <div>
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
      </div>
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
        <Button text="Process Payment" />
      </div>
      {show && (
        <SuccessModal
          text="View Receipt"
          link="/tickets/transport/add/summary"
          id={`Ref: ${paymentRef}, Valid for: ${paymentPeriod}, Payment for: ${productCode} `}
        />
      )}
    </form>
  );
};

export default AddTransportTicketForm;
