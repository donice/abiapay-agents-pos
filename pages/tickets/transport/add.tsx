import React from 'react'
import AddTransportTicketComponent from '@/src/components/modules/tickets/transport/addTransportTicket'
import Head from 'next/head';

const AddTransportTicketPage = () => {
    return (
        <div>
            <Head>
                <title>Create Transport Ticket</title>
                <meta name="description" content="Agents Portal Tickets Page" />
            </Head>
            <AddTransportTicketComponent />
        </div>
    )
}

export default AddTransportTicketPage;
