import React from 'react'
import Head from 'next/head';
import VerifyTicketsComponent from '@/src/components/modules/tickets/verify';

const VerifyTicketsPage = () => {
    return (
        <div>
            <Head>
                <title>Verify Tickets</title>
                <meta name="description" content="Verify agent tickets" />
            </Head>
            <VerifyTicketsComponent />
        </div>
    )
}

export default VerifyTicketsPage;
