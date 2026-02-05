import React from 'react'
import Head from 'next/head';
import { CustomHeader } from '@/src/components/common/header';

const InfantIdentityPage = () => {
    return (
        <div>
            <Head>
                <title>Infant/Dependent ABSSIN</title>
            </Head>
            <CustomHeader title="Infant/Dependent ABSSIN" desc="Create ABSSIN for dependents" />
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>This feature is under development.</p>
            </div>
        </div>
    )
}

export default InfantIdentityPage;
