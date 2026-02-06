import ViewBusinessAbssinComponent from '@/src/components/modules/identity/view/business';
import Head from 'next/head';
import React from 'react';
var ViewBusinessAbssinPage = function () {
    return (<div>
            <Head>
                <title>All Business ABSSINs</title>
                <meta name="description" content="Manage all Identities tied to your ABIAPAY account"/>
            </Head>
            <ViewBusinessAbssinComponent />
        </div>);
};
export default ViewBusinessAbssinPage;
