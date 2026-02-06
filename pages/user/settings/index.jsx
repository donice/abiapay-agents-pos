import React from 'react';
import Head from 'next/head';
import UserSettingsComponent from '@/src/components/modules/settings';
var UserSettingsPage = function () {
    return (<div>
            <Head>
                <title>Settings - ABIAPAY</title>
            </Head>
            <UserSettingsComponent />
        </div>);
};
export default UserSettingsPage;
