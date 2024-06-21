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
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [lga, setLga] = useState([{ value: "", label: "" }]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");

  const [formData, setFormData] = useState<Inputs>({
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
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log({ ...formData, ...data });
    try {
      const res = await axios.post(
        "https://sandboxmobileapi.abiapay.ng/api/v1/transport/create-ticket",
        { ...formData, ...data }
      );
    } catch {
      toast.error("Error Creating Ticket");
    }

    // Example: Saving to sessionStorage
    // if (typeof window !== "undefined") {
    //   sessionStorage.setItem("TRANSPORT_FORM_DETAILS", JSON.stringify(data));
    // }
  };

  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      productCode: productCode,
    }));
  };

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const period = event.target.value;
    setSelectedPeriod(period);
    setFormData((prevFormData) => ({
      ...prevFormData,
      paymentPeriod: period,
    }));

    const selectedProductData = products.find(
      (product) => product.productCode === selectedProduct
    );

    if (selectedProductData) {
      let amount = 0;
      switch (period) {
        case "1 Day":
          amount = selectedProductData.dailyAmount;
          break;
        case "1 Week":
          amount = selectedProductData.weeklyAmount;
          break;
        case "1 Month":
          amount = selectedProductData.monthlyAmount;
          break;
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        amount,
      }));
    }
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
        onChange={handleChange}
      />
      {errors.taxPayerPhone && <span className="error">Field Required</span>}

      <FormTextInput
        label="Taxpayer Email"
        type="email"
        name="agentEmail"
        placeholder="Enter Taxpayer Email"
        register={register}
        validation={{ required: true }}
        onChange={handleChange}
      />
      {errors.agentEmail && <span className="error">Field Required</span>}

      <FormTextInput
        label="Taxpayer Name"
        type="text"
        name="taxPayerName"
        placeholder="Enter Taxpayer Name"
        register={register}
        validation={{ required: true }}
        onChange={handleChange}
      />
      {errors.taxPayerName && <span className="error">Field Required</span>}

      <SelectInput
        label="L.G.A"
        name="lga"
        id="lga"
        register={register}
        validation={{ required: true }}
        onChange={handleChange}
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
            value={formData.amount}
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
        onChange={handleChange}
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
