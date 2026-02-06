import React from 'react';
import Head from 'next/head';
import LicenseVehicleStatusComponent from '@/src/components/modules/vehicle-status/liscence-vehicle-status';

const LicenseStatusPage = () => {
    return (
        <div>
            <Head>
                <title>License Status - ABIAPAY</title>
            </Head>
            <LicenseVehicleStatusComponent />
        </div>
    );
};

export default LicenseStatusPage;
