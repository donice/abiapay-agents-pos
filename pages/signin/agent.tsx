import AgentsSigninComponent from '@/src/components/modules/signin/agent';
import Head from 'next/head';
import React from 'react'

const AgentSignInPage = () => {
    return (
        <div>
            <Head>
                <title>Sigin to Agents Portal</title>
                <meta name="description" content="Abia Pay for Agents Portal Dashboard" />
            </Head>
            <AgentsSigninComponent />
        </div>
    )
}

export default AgentSignInPage
