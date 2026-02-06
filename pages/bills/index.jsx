import React from 'react';
import Head from 'next/head';
import BillsComponent from '@/src/components/modules/tickets/bills';

const BillsPage = () => {
    return (
        <div>
            <Head>
                <title>Bills - ABIAPAY</title>
            </Head>
            <BillsComponent />
        </div>
    );
};

export default BillsPage;
