import TransportTicketComponent from '@/src/components/modules/tickets/transport';
import Head from 'next/head';
import React from 'react';

const TransportTicketsPage = () => {
    return (
        <div>
            <Head>
                <title>Transport Tickets - Agent Portal</title>
                <meta name="description" content="Agents Portal Tickets Page" />
            </Head>
            <TransportTicketComponent />
        </div>
    )
}

export default TransportTicketsPage;
