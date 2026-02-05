import { CustomHeader } from '@/src/components/common/header'
import Head from 'next/head'
import React from 'react'

const SupportPage = () => {
    return (
        <div>
            <Head>
                <title>Support - ABIAPAY</title>
            </Head>
            <CustomHeader title="Support" desc="Get help and support" />
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>This feature is under development.</p>
            </div>
        </div>
    )
}

export default SupportPage
