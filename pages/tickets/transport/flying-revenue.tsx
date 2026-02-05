import React from 'react'
import Head from 'next/head';
import { CustomHeader } from '@/src/components/common/header';

const FlyingRevenuePage = () => {
    return (
        <div>
            <Head>
                <title>Flying Revenue</title>
            </Head>
            <CustomHeader title="Flying Revenue" desc="Register Flying Revenue Vehicles" />
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>This feature is under development.</p>
            </div>
        </div>
    )
}

export default FlyingRevenuePage;
