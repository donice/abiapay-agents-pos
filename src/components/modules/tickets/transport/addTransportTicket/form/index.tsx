"use client";
import React, { useState, useEffect } from "react";
import { DefaultButton, CancelButton } from "@/src/components/common/button";
import { SelectInput, TextInput } from "@/src/components/common/input";
import "./style.scss";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem("TRANSPORT_FORM_DETAILS", JSON.stringify(formData));
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
          { value: 'truck', label: 'Truck' },
          { value: 'bus', label: 'Bus' },
          { value: 'car', label: 'Car' },
          { value: 'bike', label: 'Bike' },
        ]}
        placeholder="Select Ticket Type"
      />

      <div>
        <label htmlFor="lga">L.G.A</label>
        <select
          name="lga"
          id="lga"
          className="minimal"
          value={formData.lga}
          onChange={handleChange}
        >
          <option disabled value="">
            Select L.G.A
          </option>
          <option value="lga1">LGA 1</option>
          <option value="lga2">LGA 2</option>
          <option value="lga3">LGA 3</option>
          <option value="lga4">LGA 4</option>
        </select>
      </div>

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

      <div>
        <label htmlFor="paymentPeriod">Payment Period</label>
        <select
          name="paymentPeriod"
          id="paymentPeriod"
          className="minimal"
          value={formData.paymentPeriod}
          onChange={handleChange}
        >
          <option disabled value="">
            Select Payment Period
          </option>
          <option value="day">1 Day</option>
          <option value="week">1 Week</option>
          <option value="month">1 Month</option>
        </select>
      </div>
      <TextInput
        label="Amount"
        type="number"
        name="Amount"
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
