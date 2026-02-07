import React from 'react';
import Head from 'next/head';
import AddManifestComp from '@/src/components/modules/tickets/transport/manifest';
var AddManifestPage = function () {
    return (<div>
        <Head>
            <title>Create Manifest</title>
        </Head>
        <AddManifestComp />
    </div>);
};
export default AddManifestPage;
