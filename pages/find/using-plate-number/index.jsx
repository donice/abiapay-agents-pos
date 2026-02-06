import React from 'react';
import Head from 'next/head';
import UsingPlateNumberComponent from '@/src/components/modules/find/using-plate-number';

const UsingPlateNumberPage = () => {
    return (
        <div>
            <Head>
                <title>Find using Plate Number - ABIAPAY</title>
            </Head>
            <UsingPlateNumberComponent />
        </div>
    );
};

export default UsingPlateNumberPage;
