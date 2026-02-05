import React from 'react'
import Head from 'next/head';
import { CustomHeader } from '@/src/components/common/header';

const SportTicketsPage = () => {
    return (
        <div>
            <Head>
                <title>Sport Tickets</title>
            </Head>
            <CustomHeader title="Sport Tickets" desc="Sport ticket management coming soon" />
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>This feature is under development.</p>
            </div>
        </div>
    )
}

export default SportTicketsPage;
