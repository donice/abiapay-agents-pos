import React from 'react';
import Head from 'next/head';
import { CustomHeader } from '@/src/components/common/header';
var TransfersPage = function () {
    return (<div>
            <Head>
                <title>Transfer History - ABIAPAY</title>
            </Head>
            <CustomHeader title="Transfer History" desc="View your wallet transfer history"/>
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>This feature is under development.</p>
            </div>
        </div>);
};
export default TransfersPage;
