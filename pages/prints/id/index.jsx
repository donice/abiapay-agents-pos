import React from 'react';
import Head from 'next/head';
import IDPrintsComponent from '@/src/components/modules/prints/id';

const IDPrintsPage = () => {
    return (
        <div>
            <Head>
                <title>ID Prints - ABIAPAY</title>
            </Head>
            <IDPrintsComponent />
        </div>
    );
};

export default IDPrintsPage;
