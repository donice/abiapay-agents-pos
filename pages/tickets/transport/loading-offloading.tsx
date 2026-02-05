import React from 'react'
import Head from 'next/head';
import { CustomHeader } from '@/src/components/common/header';

const LoadingOffloadingPage = () => {
    return (
        <div>
            <Head>
                <title>Loading & Offloading</title>
            </Head>
            <CustomHeader title="Loading & Offloading" desc="Register Loading & Offloading Vehicles" />
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>This feature is under development.</p>
            </div>
        </div>
    )
}

export default LoadingOffloadingPage;
