import React from "react";
import { DefaultButton, CancelButton } from "@/components/common/button";
import "./style.scss";

const AddTransportTicketForm = () => {
  return (
    <form>
      <div>
        <label htmlFor="ticket-type">Ticket Type</label>
        <select name="ticket-type" id="ticket-type" className="minimal">
          <option disabled>Select Ticket Type</option>
          <option value="truck">Truck</option>
          <option value="truck">Truck</option>
          <option value="truck">Truck</option>
          <option value="truck">Truck</option>
        </select>
      </div>

      <div>
        <label htmlFor="ticket-type">L.G.A</label>
        <select name="ticket-type" id="ticket-type" className="minimal">
          <option disabled>Select L.G.A</option>
          <option value="truck">Truck</option>
          <option value="truck">Truck</option>
          <option value="truck">Truck</option>
          <option value="truck">Truck</option>
        </select>
      </div>

      <div>
        <label htmlFor="plateNumber">Vehicle Plate Number</label>
        <input
          type="text"
          name="plateNumber"
          placeholder="Enter Vehicle Plate Number"
        />
      </div>
      <div>
        <label htmlFor="taxPayerName">Taxpayer Phone Number</label>
        <input
          type="text"
          name="taxPayerName"
          placeholder="Enter Taxpayer Phone Number"
        />
      </div>
      <div>
        <label htmlFor="taxPayerPhone">Taxpayer Phone Number</label>
        <input
          type="text"
          name="taxPayerPhone"
          placeholder="Enter Taxpayer Name"
        />
      </div>
      <div>
        <label htmlFor="taxPayerName">Taxpayer Name</label>
        <input
          type="text"
          name="taxPayerName"
          placeholder="Enter Taxpayer Name"
        />
      </div>

      <div>
        <label htmlFor="ticket-type">Payment Period</label>
        <select name="ticket-type" id="ticket-type" className="minimal">
          <option disabled>Select Payment Period</option>
          <option value="day">1 Day</option>
          <option value="week">1 Week</option>
          <option value="month">1 month</option>
        </select>
      </div>
      <div>
        <label htmlFor="amount">Taxpayer Name</label>
        <input type="text" name="amount" placeholder="Enter Taxpayer Name" />
      </div>

      <div className="btn_container">
        <CancelButton link="/tickets/transport" />
        <DefaultButton text="Proceed to Payment" link="/" />
      </div>
    </form>
  );
};

export default AddTransportTicketForm;
