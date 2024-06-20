"use client";
import React, { useState, useEffect } from "react";
import { DefaultButton, BackButton } from "@/src/components/common/button";
import { SelectInput, FormTextInput } from "@/src/components/common/input";
import { fetchLGAData, fetchProducts } from "@/src/services/common";
import toast from "react-hot-toast";
import "./style.scss";

interface Product {
  productName: string;
  dailyAmount: number;
  weeklyAmount: number;
  monthlyAmount: number;
}

const AddTransportTicketForm = () => {
  const [formData, setFormData] = useState({
    merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY,
    lga: "",
    transaction_date: "",
    invoice_id: "",
    agentEmail: "",
    plateNumber: "",
    paymentPeriod: "",
    productCode: "",
    taxPayerPhone: "",
    taxPayerName: "",
    next_expiration_date: "",
    no_of_days: "",
    amount: "",
    wallet_type: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [lga, setLga] = useState([{ value: "", label: "" }]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');
  const [amount, setAmount] = useState<number | null>(null);

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

      console.log(response?.data, "Vehicles Data");
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
    setSelectedPeriod(period);

    const selectedProductData = products.find(product => product.productName === selectedProduct);
    if (selectedProductData) {
      switch (period) {
        case '1 Day':
          setAmount(selectedProductData.dailyAmount);
          break;
        case '1 Week':
          setAmount(selectedProductData.weeklyAmount);
          break;
        case '1 Month':
          setAmount(selectedProductData.monthlyAmount);
          break;
        default:
          setAmount(null);
      }
    }
  };

  useEffect(() => {
    getLGAData();
    getProductsData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
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
    <form onSubmit={handleSubmit} className="add-ticket">
      <SelectInput
        label="Vehicle Type"
        name="productCode"
        id="productCode"
        value={formData.productCode}
        onChange={handleChange}
        options={[
          { value: "truck", label: "Truck" },
          { value: "bus", label: "Bus" },
          { value: "car", label: "Car" },
          { value: "bike", label: "Bike" },
        ]}
        placeholder="Select Vehicle Type"
      />
      <SelectInput
        label="Payment Period"
        name="paymentPeriod"
        id="paymentPeriod"
        value={formData.paymentPeriod}
        onChange={handleChange}
        options={[
          { value: "truck", label: "Truck" },
          { value: "bus", label: "Bus" },
          { value: "car", label: "Car" },
          { value: "bike", label: "Bike" },
        ]}
        placeholder="Select Payment Period"
      />

      <SelectInput
        label="L.G.A"
        name="lga"
        id="lga"
        value={formData.lga}
        onChange={handleChange}
        options={lga}
        placeholder="Select L.G.A"
      />

      <FormTextInput
        label="Plate Number"
        type="text"
        name="plateNumber"
        placeholder="Enter Plate Number"
        value={formData.plateNumber}
        onChange={handleChange}
      />
      <FormTextInput
        label="Phone Number"
        type="text"
        name="taxPayerPhone"
        placeholder="Enter Phone Number"
        value={formData.taxPayerPhone}
        onChange={handleChange}
      />
      <FormTextInput
        label="Taxpayer Email"
        type="email"
        name="agentEmail"
        placeholder="Enter Taxpayer Email"
        value={formData.agentEmail}
        onChange={handleChange}
      />
      <FormTextInput
        label="Taxpayer Name"
        type="text"
        name="taxPayerName"
        placeholder="Enter Taxpayer Name"
        value={formData.taxPayerName}
        onChange={handleChange}
      />

      <SelectInput
        label="Payment Period"
        name="paymentPeriod"
        id="paymentPeriod"
        value={formData.paymentPeriod}
        onChange={handleChange}
        options={[
          { value: "truck", label: "Truck" },
          { value: "bus", label: "Bus" },
          { value: "car", label: "Car" },
          { value: "bike", label: "Bike" },
        ]}
        placeholder="Select Payment Period"
      />

      <FormTextInput
        label="Amount"
        type="number"
        name="amount"
        placeholder="Enter Amount"
        value={formData.amount}
        onChange={handleChange}
      />

      <SelectInput
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

<div>
        <label htmlFor="product-select">Product:</label>
        <select id="product-select" value={selectedProduct} onChange={handleProductChange}>
          <option value="">Select a product</option>
          {products.map(product => (
            <option key={product.productName} value={product.productName}>
              {product.productName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="period-select">Payment Period:</label>
        <select id="period-select" value={selectedPeriod} onChange={handlePeriodChange} disabled={!selectedProduct}>
          <option value="">Select a period</option>
          <option value="1 Day">1 Day</option>
          <option value="1 Week">1 Week</option>
          <option value="1 Month">1 Month</option>
        </select>
      </div>
      {selectedPeriod && (
        <div>
          <label htmlFor="amount-input">Amount:</label>
          <input id="amount-input" type="number" value={amount !== null ? amount : ''} readOnly />
        </div>
      )}

      <div className="btn_container">
        <BackButton link="/tickets/transport" />
        <DefaultButton
          text="Save & Continue"
          link={`/tickets/transport/add/summary`}
          disabled={!isFormValid}
        />
      </div>
    </form>
  );
};

export default AddTransportTicketForm;
