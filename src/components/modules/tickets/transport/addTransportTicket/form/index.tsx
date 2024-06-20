"use client";
import React, { useState, useEffect } from "react";
import { DefaultButton, BackButton } from "@/src/components/common/button";
import { SelectInput, FormTextInput } from "@/src/components/common/input";
import { fetchLGAData, fetchProducts } from "@/src/services/common";
import { randomInvoiceGenerator } from "@/src/utils/randomInvoiceGenerator";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import "./style.scss";

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

const AddTransportTicketForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const [isFormValid, setIsFormValid] = useState(false);
  const [lga, setLga] = useState([{ value: "", label: "" }]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");

  const [formData, setFormData] = useState({
    merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY,
    lga: "",
    transaction_date: new Date().toISOString().split("T")[0],
    invoice_id: `INV${randomInvoiceGenerator()}`,
    agentEmail: "",
    plateNumber: "",
    paymentPeriod: "",
    productCode: "",
    taxPayerPhone: "",
    taxPayerName: "",
    next_expiration_date: "",
    no_of_days: "",
    amount: 0,
    wallet_type: "",
  });

  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every(
      (field) => field !== ""
    );
    setIsFormValid(allFieldsFilled);
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // console.log(formData);
  };

  const getLGAData = async () => {
    try {
      const { data } = await fetchLGAData();
      const lga_from_api = data.map((item: any) => {
        const new_arry = {
          label: item.lgaName,
          value: item.lgaID,
        };
        return new_arry;
      });
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
      toast.error("Error fetching Vehicles");
    }
  };

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProduct(event.target.value);
  };

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const period = event.target.value;

    console.log(period);
    setFormData((prev: any) => {
      return {
        ...prev,
        paymentPeriod: period,
      };
    });

    console.log(formData.paymentPeriod);

    setSelectedPeriod(period);

    const selectedProductData = products.find(
      (product) => product.productCode == selectedProduct
    );

    if (selectedProductData) {
      switch (period) {
        case "1 Day":
          setFormData({
            ...formData,
            amount: selectedProductData.dailyAmount,
          });
          break;
        case "1 Week":
          setFormData({
            ...formData,
            amount: selectedProductData.weeklyAmount,
          });
          break;
        case "1 Month":
          setFormData({
            ...formData,
            amount: selectedProductData.monthlyAmount,
          });
          break;
        default:
          setFormData({
            ...formData,
            amount: 0,
          });
      }
    }
  };

  useEffect(() => {
    getLGAData();
    getProductsData();
  }, []);

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);
    const isBrowser = typeof window !== "undefined";
    isBrowser &&
      sessionStorage.setItem(
        "TRANSPORT_FORM_DETAILS",
        JSON.stringify(formData)
      );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-ticket">
      <FormTextInput
        {...register("plateNumber", { required: true })}
        label="Plate Number"
        type="text"
        name="plateNumber"
        placeholder="Enter Plate Number"
        value={formData.plateNumber}
        onChange={handleChange}
      />
      {errors.plateNumber && <span>Feild Required</span>}

      <FormTextInput
        {...register("taxPayerPhone", { required: true })}
        label="Phone Number"
        type="text"
        name="taxPayerPhone"
        placeholder="Enter Phone Number"
        value={formData.taxPayerPhone}
        onChange={handleChange}
      />
      {errors.taxPayerPhone && <span>Feild Required</span>}

      <FormTextInput
        {...register("agentEmail", { required: true })}
        label="Taxpayer Email"
        type="email"
        name="agentEmail"
        placeholder="Enter Taxpayer Email"
        value={formData.agentEmail}
        onChange={handleChange}
      />
      {errors.agentEmail && <span>Feild Required</span>}

      <FormTextInput
        {...register("taxPayerName", { required: true })}
        label="Taxpayer Name"
        type="text"
        name="taxPayerName"
        placeholder="Enter Taxpayer Name"
        value={formData.taxPayerName}
        onChange={handleChange}
      />
      {errors.taxPayerName && <span>Feild Required</span>}

      <SelectInput
        {...register("lga", { required: true })}
        label="L.G.A"
        name="lga"
        id="lga"
        value={formData.lga}
        onChange={handleChange}
        options={lga}
        placeholder="Select L.G.A"
      />
      {errors.lga && <span>Feild Required</span>}

      <SelectInput
        {...register("productCode", { required: true })}
        label="Vehicle Type"
        name="productCode"
        id="productCode"
        value={selectedProduct}
        onChange={handleProductChange}
        options={products.map((product) => ({
          value: product.productCode,
          label: product.productName,
        }))}
        placeholder="Select Vehicle Type"
      />
      {errors.productCode && <span>Feild Required</span>}

      <SelectInput
        {...register("paymentPeriod", { required: true })}
        label="Payment Period"
        name="paymentPeriod"
        id="paymentPeriod"
        value={selectedPeriod}
        onChange={handlePeriodChange}
        disabled={!selectedProduct}
        options={[
          {
            value: "1 Day",
            label: "1 Day",
          },
          {
            value: "1 Week",
            label: "1 Week",
          },
          {
            value: "1 Month",
            label: "1 Month",
          },
        ]}
        placeholder="Select Payment Period"
      />
      {errors.paymentPeriod && <span>Feild Required</span>}

      {selectedPeriod && (
        <div>
          <FormTextInput
            {...register("amount", { required: true })}
            label="Amount"
            type="number"
            name="amount"
            placeholder="Enter Amount"
            value={formData.amount.toString()}
          />

          {errors.amount && <span>Feild Required</span>}
        </div>
      )}

      <SelectInput
        {...register("wallet_type", { required: true })}
        label="Wallet Type"
        name="wallet_type"
        id="wallet_type"
        value={formData.wallet_type}
        onChange={handleChange}
        options={[
          { value: "access", label: "Access Bank" },
          { value: "fidelity", label: "Fidelity Bank" },
        ]}
        placeholder="Select Wallet Type"
      />
      {errors.wallet_type && <span>Feild Required</span>}

      <div className="btn_container">
        <BackButton link="/tickets/transport" />
        <DefaultButton
          text="Save & Continue"
          link={`/tickets/transport/add/summary`}
          // disabled={!isFormValid}
        />
      </div>
    </form>
  );
};

export default AddTransportTicketForm;
