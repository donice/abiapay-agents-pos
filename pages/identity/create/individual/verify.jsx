import React from 'react';
import Head from 'next/head';
import VerifyIndividualComponent from '@/src/components/modules/identity/create/individual/verify';
var VerifyIndividualPage = function () {
    return (<div>
            <Head>
                <title>Verify Individual ABSSIN</title>
            </Head>
            <VerifyIndividualComponent />
        </div>);
};
export default VerifyIndividualPage;
