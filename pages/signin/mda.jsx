import MDASigninComponent from '@/src/components/modules/signin/mda';
import Head from 'next/head';
import React from 'react';
var MDASignInPage = function () {
    return (<div>
            <Head>
                <title>Sigin to Agents Portal</title>
                <meta name="description" content="Abia Pay for Agents Portal Dashboard"/>
            </Head>
            <MDASigninComponent />
        </div>);
};
export default MDASignInPage;
