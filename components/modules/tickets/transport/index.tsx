import React from "react";
import TicketsWalletCard from "../ticketsWalletsCard";
import { SecondaryButton } from "@/components/common/button";
import CustomHeader from "@/components/common/header";
import CustomTable from "@/components/common/table";
import "./style.scss";


const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  // Add more data as needed
  { id: 3, name: 'Michael Brown', email: 'michael@example.com' },
  { id: 4, name: 'Chris Johnson', email: 'chris@example.com' },
  { id: 5, name: 'Patricia Williams', email: 'patricia@example.com' },
  { id: 6, name: 'Linda Martinez', email: 'linda@example.com' },
  { id: 7, name: 'Barbara Davis', email: 'barbara@example.com' },
  { id: 8, name: 'Richard Wilson', email: 'richard@example.com' },
  { id: 9, name: 'Joseph Anderson', email: 'joseph@example.com' },
  { id: 10, name: 'Susan Taylor', email: 'susan@example.com' },
  { id: 11, name: 'Margaret Thomas', email: 'margaret@example.com' },
  { id: 12, name: 'Robert Jackson', email: 'robert@example.com' },
  // Add more data as needed
];

const TransportTicketComponent = () => {
  return (
    <div className="transport">
      <header className="transport_header">
        <CustomHeader title="Transport Ticket" desc="Manage/Create Transport Ticket"/>
        <div className="transport_header_buttons">
          <SecondaryButton text="Add Ticket" link="/tickets/transport/add"/>
        </div>
      </header>
      <TicketsWalletCard />

      <div className="transport_table">
      <CustomTable data={data} />
      </div>
    </div>
  );
};

export default TransportTicketComponent;
