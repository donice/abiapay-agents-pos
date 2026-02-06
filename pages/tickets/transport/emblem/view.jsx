import React from 'react';
import Head from 'next/head';
import { CustomHeader } from '@/src/components/common/header';
var ViewEmblemPage = function () {
    return (<div>
            <Head>
                <title>Transport Emblem</title>
            </Head>
            <CustomHeader title="Transport Emblem" desc="View transport emblems"/>
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>This feature is under development.</p>
            </div>
        </div>);
};
export default ViewEmblemPage;
