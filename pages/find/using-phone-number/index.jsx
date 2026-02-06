import React from 'react';
import Head from 'next/head';
import UsingPhoneNumberComponent from '@/src/components/modules/find/using-phone-number';

const UsingPhoneNumberPage = () => {
    return (
        <div>
            <Head>
                <title>Find using Phone Number - ABIAPAY</title>
            </Head>
            <UsingPhoneNumberComponent />
        </div>
    );
};

export default UsingPhoneNumberPage;
