import React from 'react';
import Head from 'next/head';
import ReceiptsComponent from '@/src/components/modules/tickets/receipts';

const ReceiptsPage = () => {
    return (
        <div>
            <Head>
                <title>Receipts - ABIAPAY</title>
            </Head>
            <ReceiptsComponent />
        </div>
    );
};

export default ReceiptsPage;
