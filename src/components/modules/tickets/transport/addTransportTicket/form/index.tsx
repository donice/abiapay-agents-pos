"use client";
import React, { useState, useEffect } from "react";
import { Button, BackButton } from "@/src/components/common/button";
import { SelectInput, FormTextInput } from "@/src/components/common/input";
import { fetchLGAData, fetchProducts } from "@/src/services/common";
import { randomInvoiceGenerator } from "@/src/utils/randomInvoiceGenerator";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { getCurrentDateTime } from "@/src/utils/getCurrentDateTime";
import "./style.scss";
import axios from "axios";

interface Product {
  productCode: string;
  productName: string;
  dailyAmount: number;
  weeklyAmount: number;
  monthlyAmount: number;
}

interface Inputs {
  merchant_key: string;
  lga: string;
  transaction_date: string;
  invoice_id: string;
  agentEmail: string;
  plateNumber: string;
  paymentPeriod: string;
  productCode: string;
  taxPayerPhone: string;
  taxPayerName: string;
  next_expiration_date: string;
  no_of_days: string;
  amount: number;
  wallet_type: string;
}

const AddTransportTicketForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    defaultValues: {
      merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
      transaction_date: getCurrentDateTime(),
      invoice_id: `INV${randomInvoiceGenerator()}`,
      paymentPeriod: "",
      productCode: "",
      next_expiration_date: "",
      no_of_days: "",
      amount: 0,
      lga: "",
      agentEmail: "",
      plateNumber: "",
      taxPayerPhone: "",
      taxPayerName: "",
      wallet_type: "",
    },
  });

  const [lga, setLga] = useState([{ value: "", label: "" }]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = {
      ...data,
      transaction_date: getCurrentDateTime(),
      invoice_id: `INV${randomInvoiceGenerator()}`,
    };
    console.log(formData);
    try {
      const res = await axios.post(
        "https://sandboxmobileapi.abiapay.ng/api/v1/transport/create-ticket",
        formData
      );
      toast.success("Ticket Created Successfully");
    } catch {
      toast.error("Error Creating Ticket");
    }
  };

  const getLGAData = async () => {
    try {
      const { data } = await fetchLGAData();
      const lga_from_api = data.map((item: any) => ({
        label: item.lgaName,
        value: item.lgaID,
      }));
      setLga(lga_from_api);
    } catch (error) {
      toast.error("Error fetching LGA data");
    }
  };

  const getProductsData = async () => {
    try {
      const response = await fetchProducts();
      setProducts(response?.data);
    } catch (error) {
      toast.error("Error fetching vehicles");
    }
  };

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const productCode = event.target.value;
    setSelectedProduct(productCode);
    setValue("productCode", productCode);
  };

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const period = event.target.value;
    setSelectedPeriod(period);
    setValue("paymentPeriod", period);
  
    const selectedProductData = products.find(
      (product) => product.productCode === selectedProduct
    );
  
    let amount = 0;
    let no_of_days = "0";
    switch (period) {
      case "1 Day":
        no_of_days = "1";
        amount = selectedProductData?.dailyAmount || 0;
        break;
      case "1 Week":
        no_of_days = "7";
        amount = selectedProductData?.weeklyAmount || 0;
        break;
      case "1 Month":
        no_of_days = "30";
        amount = selectedProductData?.monthlyAmount || 0;
        break;
    }
    setValue("no_of_days", no_of_days);
  
    const transaction_date = new Date();
    const next_expiration_date = new Date(transaction_date.getTime() + parseInt(no_of_days) * 24 * 60 * 60 * 1000);
  
    setValue("next_expiration_date", next_expiration_date.toISOString());
    setValue("amount", amount);
  };
  

  useEffect(() => {
    getLGAData();
    getProductsData();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-ticket">
      <FormTextInput
        label="Plate Number"
        type="text"
        name="plateNumber"
        placeholder="Enter Plate Number"
        register={register}
        validation={{ required: true }}
      />
      {errors.plateNumber && <span className="error">Field Required</span>}

      <FormTextInput
        label="Phone Number"
        type="text"
        name="taxPayerPhone"
        placeholder="Enter Phone Number"
        register={register}
        validation={{ required: true }}
      />
      {errors.taxPayerPhone && <span className="error">Field Required</span>}

      <FormTextInput
        label="Taxpayer Email"
        type="email"
        name="agentEmail"
        placeholder="Enter Taxpayer Email"
        register={register}
        validation={{ required: true }}
      />
      {errors.agentEmail && <span className="error">Field Required</span>}

      <FormTextInput
        label="Taxpayer Name"
        type="text"
        name="taxPayerName"
        placeholder="Enter Taxpayer Name"
        register={register}
        validation={{ required: true }}
      />
      {errors.taxPayerName && <span className="error">Field Required</span>}

      <SelectInput
        label="L.G.A"
        name="lga"
        id="lga"
        register={register}
        validation={{ required: true }}
        options={lga}
        placeholder="Select L.G.A"
      />
      {errors.lga && <span className="error">Field Required</span>}

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
      />
      {errors.productCode && <span className="error">Field Required</span>}

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
      />
      {errors.paymentPeriod && <span className="error">Field Required</span>}

      {selectedPeriod && (
        <div>
          <FormTextInput
            label="Amount"
            type="number"
            name="amount"
            placeholder="Enter Amount"
            register={register}
            validation={{ required: true }}
          />
          {errors.amount && <span className="error">Field Required</span>}
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
      />
      {errors.wallet_type && <span className="error">Field Required</span>}

      <div className="btn_container">
        <BackButton link="/tickets/transport" />
        <Button text="Save & Continue" />
      </div>
    </form>
  );
};

export default AddTransportTicketForm;
