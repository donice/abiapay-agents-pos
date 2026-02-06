import React from 'react';
import Head from 'next/head';
import MarketEnumerationComponent from '@/src/components/modules/enumeration/market';

const MarketEnumerationPage = () => {
    return (
        <div>
            <Head>
                <title>Market Enumeration - ABIAPAY</title>
            </Head>
            <MarketEnumerationComponent />
        </div>
    );
};

export default MarketEnumerationPage;
