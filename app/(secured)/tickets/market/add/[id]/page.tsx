import React from 'react'
import { Metadata } from 'next';
import AddMarketTicketComponent from '@/src/components/modules/tickets/market/addMarketTicket';

export const metadata: Metadata = {
  title: "Create Market Ticket",
  description: "Agents Portal Tickets Page",
};


const MarketTicketDetailsPage = ({params}: {params: {slug: string}}) => {
  const slug = params.slug
  return (
    <div>
      <AddMarketTicketComponent/>
    </div>
  )
}

export default MarketTicketDetailsPage;