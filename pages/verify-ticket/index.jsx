import React from 'react';
import Head from 'next/head';
import VerifyTicketStatusComponent from '@/src/components/modules/verify-ticket-status';

const VerifyTicketStatusPage = () => {
    return (
        <div>
            <Head>
                <title>Verify Ticket Status - ABIAPAY</title>
            </Head>
            <VerifyTicketStatusComponent />
        </div>
    );
};

export default VerifyTicketStatusPage;
