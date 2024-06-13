"use client"
import React, { useState, useEffect } from "react";
import { DefaultButton, CancelButton } from "@/components/common/button";
import "./style.scss";

const AddTransportTicketForm = () => {
  const [formData, setFormData] = useState({
    ticketType: "",
    lga: "",
    plateNumber: "",
    taxPayerName: "",
    taxPayerPhone: "",
    paymentPeriod: "",
    amount: ""
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every((field) => field !== "");
    setIsFormValid(allFieldsFilled);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="ticketType">Ticket Type</label>
        <select name="ticketType" id="ticketType" className="minimal" value={formData.ticketType} onChange={handleChange}>
          <option disabled value="">Select Ticket Type</option>
          <option value="truck">Truck</option>
          <option value="bus">Bus</option>
          <option value="car">Car</option>
          <option value="bike">Bike</option>
        </select>
      </div>

      <div>
        <label htmlFor="lga">L.G.A</label>
        <select name="lga" id="lga" className="minimal" value={formData.lga} onChange={handleChange}>
          <option disabled value="">Select L.G.A</option>
          <option value="lga1">LGA 1</option>
          <option value="lga2">LGA 2</option>
          <option value="lga3">LGA 3</option>
          <option value="lga4">LGA 4</option>
        </select>
      </div>

      <div>
        <label htmlFor="plateNumber">Vehicle Plate Number</label>
        <input
          type="text"
          name="plateNumber"
          placeholder="Enter Vehicle Plate Number"
          value={formData.plateNumber}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="taxPayerPhone">Taxpayer Phone Number</label>
        <input
          type="text"
          name="taxPayerPhone"
          placeholder="Enter Taxpayer Phone Number"
          value={formData.taxPayerPhone}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="taxPayerName">Taxpayer Name</label>
        <input
          type="text"
          name="taxPayerName"
          placeholder="Enter Taxpayer Name"
          value={formData.taxPayerName}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="paymentPeriod">Payment Period</label>
        <select name="paymentPeriod" id="paymentPeriod" className="minimal" value={formData.paymentPeriod} onChange={handleChange}>
          <option disabled value="">Select Payment Period</option>
          <option value="day">1 Day</option>
          <option value="week">1 Week</option>
          <option value="month">1 Month</option>
        </select>
      </div>
      <div>
        <label htmlFor="amount">Amount</label>
        <input
          type="text"
          name="amount"
          placeholder="Enter Amount"
          value={formData.amount}
          onChange={handleChange}
        />
      </div>

      <div className="btn_container">
        <CancelButton link="/tickets/transport" />
        <DefaultButton text="Proceed to Payment" link="/" disabled={!isFormValid} />
      </div>
    </form>
  );
};

export default AddTransportTicketForm;
