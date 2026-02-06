import React from 'react';
import Head from 'next/head';
import VehicleEnumerationStatusComponent from '@/src/components/modules/vehicle-status/vehicle-enumeration-status';

const EnumerationStatusPage = () => {
    return (
        <div>
            <Head>
                <title>Enumeration Status - ABIAPAY</title>
            </Head>
            <VehicleEnumerationStatusComponent />
        </div>
    );
};

export default EnumerationStatusPage;
