import React from 'react';
import Head from 'next/head';
import TransportEmblemComponent from '@/src/components/modules/tickets/transport/emblem';
var ViewEmblemPage = function () {
    return (<div>
        <Head>
            <title>Transport Emblem</title>
        </Head>
        <TransportEmblemComponent />
    </div>);
};
export default ViewEmblemPage;
