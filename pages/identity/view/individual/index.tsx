import ViewIndividualAbssinComponent from '@/src/components/modules/identity/view/individual'
import Head from 'next/head'
import React from 'react'

const ViewIndividualAbssinPage = () => {
    return (
        <div>
            <Head>
                <title>All Individual ABSSINs</title>
                <meta name="description" content="Manage all Identities tied to your ABIAPAY account" />
            </Head>
            <ViewIndividualAbssinComponent />
        </div>
    )
}

export default ViewIndividualAbssinPage
