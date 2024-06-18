"use client";
import React, { useState, useEffect } from "react";
import { DefaultButton, CancelButton } from "@/src/components/common/button";
import { SelectInput, TextInput } from "@/src/components/common/input";
import "./style.scss";
import { fetchLGAData } from "@/src/services/common";
import toast from "react-hot-toast";

const AddTransportTicketForm = () => {
  const [formData, setFormData] = useState({
    ticketType: "",
    lga: "",
    plateNumber: "",
    taxPayerName: "",
    taxPayerPhone: "",
    paymentPeriod: "",
    amount: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [lga, setLga] = useState([{ value: "", label: "" }]);

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
      }
      return new_arry;
    });
    setLga(lga_from_api);
    } catch (error) {
      toast.error("Error fetching LGA data");
    }
   
  };

  useEffect(() => {
    getLGAData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
        label="Ticket Type"
        name="ticketType"
        id="ticketType"
        value={formData.ticketType}
        onChange={handleChange}
        options={[
          { value: "truck", label: "Truck" },
          { value: "bus", label: "Bus" },
          { value: "car", label: "Car" },
          { value: "bike", label: "Bike" },
        ]}
        placeholder="Select Ticket Type"
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

      <TextInput
        label="Plate Nummber"
        type="text"
        name="plateNumber"
        placeholder="Enter Plate Number"
        value={formData.plateNumber}
        onChange={handleChange}
      />
      <TextInput
        label="Phone Number"
        type="text"
        name="taxPayerPhone"
        placeholder="Enter Phone Number"
        value={formData.taxPayerPhone}
        onChange={handleChange}
      />
      <TextInput
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

      <TextInput
        label="Amount"
        type="number"
        name="amount"
        placeholder="Enter Amount"
        value={formData.amount}
        onChange={handleChange}
      />

      <div className="btn_container">
        <CancelButton link="/tickets/transport" />
        <DefaultButton
          text="Save & Continue"
          link={`/tickets/transport/summary/${formData?.plateNumber}`}
          disabled={!isFormValid}
        />
      </div>
    </form>
  );
};

export default AddTransportTicketForm;
