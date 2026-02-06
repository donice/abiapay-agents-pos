import React from 'react';
import Head from 'next/head';
import SignageComponent from '@/src/components/modules/absaa/signage';

const SignagePage = () => {
    return (
        <div>
            <Head>
                <title>Signage - ABIAPAY</title>
            </Head>
            <SignageComponent />
        </div>
    );
};

export default SignagePage;
