import { CustomHeader } from '@/src/components/common/header'
import Head from 'next/head'
import React from 'react'

const AboutPage = () => {
    return (
        <div>
            <Head>
                <title>About - ABIAPAY</title>
            </Head>
            <CustomHeader title="About" desc="About ABIAPAY Agents Portal" />
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>This feature is under development.</p>
            </div>
        </div>
    )
}

export default AboutPage
