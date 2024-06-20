"use client";
import React, { useState, useEffect } from "react";
import { Button, BackButton } from "@/src/components/common/button";
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
    watch,
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

  // console.log(watch("taxPayerPhone"))

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-ticket">
      <FormTextInput
        
        label="Plate Number"
        type="text"
        name="plateNumber"
        placeholder="Enter Plate Number"
        register={register}validation={{ required: true }}
      />
      {errors.plateNumber && <span className="error">Feild Required</span>}

      <FormTextInput
        label="Phone Number"
        type="text"
        name="taxPayerPhone"
        placeholder="Enter Phone Number"
        value={formData.taxPayerPhone}
        onChange={handleChange}
        register={register}validation={{ required: true }}
      />
      {errors.taxPayerPhone && <span className="error">Feild Required</span>}

      <FormTextInput
        label="Taxpayer Email"
        type="email"
        name="agentEmail"
        placeholder="Enter Taxpayer Email"
        value={formData.agentEmail}
        // onChange={handleChange}
        register={register}validation={{ required: true }}
      />
      {errors.agentEmail && <span className="error">Feild Required</span>}

      <FormTextInput
        label="Taxpayer Name"
        type="text"
        name="taxPayerName"
        placeholder="Enter Taxpayer Name"
        value={formData.taxPayerName}
        // onChange={handleChange}
        register={register}validation={{ required: true }}
      />
      {errors.taxPayerName && <span className="error">Feild Required</span>}

      <SelectInput
        label="L.G.A"
        name="lga"
        id="lga"
        value={formData.lga}
        onChange={handleChange}
        register={register}
        validation={{ required: true }}
        options={lga}
        placeholder="Select L.G.A"
      />
      {errors.lga && <span className="error">Feild Required</span>}

      <SelectInput
        label="Vehicle Type"
        name="productCode"
        id="productCode"
        value={selectedProduct}
        onChange={handleProductChange}
        register={register}
        validation={{ required: true }}
        options={products.map((product) => ({
          value: product.productCode,
          label: product.productName,
        }))}
        placeholder="Select Vehicle Type"
      />
      {errors.productCode && <span className="error">Feild Required</span>}

      <SelectInput
        label="Payment Period"
        name="paymentPeriod"
        id="paymentPeriod"
        value={selectedPeriod}
        onChange={handlePeriodChange}
        register={register}
        validation={{ required: true }}
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
      {errors.paymentPeriod && <span className="error">Feild Required</span>}

      {selectedPeriod && (
        <div>
          <FormTextInput
            label="Amount"
            type="number"
            name="amount"
            placeholder="Enter Amount"
            value={formData.amount.toString()}
            register={register}validation={{ required: true }}
          />

          {errors.amount && <span className="error">Feild Required</span>}
        </div>
      )}

      <SelectInput
        label="Wallet Type"
        name="wallet_type"
        id="wallet_type"
        value={formData.wallet_type}
        onChange={handleChange}
        register={register}
        validation={{ required: true }}
        options={[
          { value: "access", label: "Access Bank" },
          { value: "fidelity", label: "Fidelity Bank" },
        ]}
        placeholder="Select Wallet Type"
      />
      {errors.wallet_type && <span className="error">Feild Required</span>}

      <div className="btn_container">
        <BackButton link="/tickets/transport" />
        <Button
          text="Save & Continue"
          // disabled={!isFormValid}
        />
      </div>
    </form>
  );
};

export default AddTransportTicketForm;
