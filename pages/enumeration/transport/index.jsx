import React from 'react';
import Head from 'next/head';
import TransportEnumerationComponent from '@/src/components/modules/enumeration/transport';

const TransportEnumerationPage = () => {
    return (
        <div>
            <Head>
                <title>Transport Enumeration - ABIAPAY</title>
            </Head>
            <TransportEnumerationComponent />
        </div>
    );
};

export default TransportEnumerationPage;
