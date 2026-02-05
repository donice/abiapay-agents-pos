import React from 'react'
import Head from 'next/head';
import AddMarketTicketComponent from '@/src/components/modules/tickets/market/addMarketTicket';

const AddMarketTicketPage = () => {
    return (
        <div>
            <Head>
                <title>Create Market Levy</title>
                <meta name="description" content="Agents Portal Tickets Page" />
            </Head>
            <AddMarketTicketComponent />
        </div>
    )
}

export default AddMarketTicketPage;
