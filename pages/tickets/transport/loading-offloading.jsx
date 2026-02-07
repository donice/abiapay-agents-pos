import React from 'react';
import Head from 'next/head';
import LoadingOffLoadingPageComponent from '@/src/components/modules/tickets/transport/loading_offloading';
var LoadingOffloadingPage = function () {
    return (<div>
        <Head>
            <title>Loading & Offloading</title>
        </Head>
        <LoadingOffLoadingPageComponent />
    </div>);
};
export default LoadingOffloadingPage;
