import React from 'react';
import Head from 'next/head';
import TrafficOffenceAddComponent from '@/src/components/modules/traffic-offence/add';

const TrafficOffencePage = () => {
    return (
        <div>
            <Head>
                <title>Traffic Offence Ticket - ABIAPAY</title>
            </Head>
            <TrafficOffenceAddComponent />
        </div>
    );
};

export default TrafficOffencePage;
