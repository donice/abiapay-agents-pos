import React from 'react'
import Head from 'next/head';
import { CustomHeader } from '@/src/components/common/header';

const AddManifestPage = () => {
    return (
        <div>
            <Head>
                <title>Create Manifest</title>
            </Head>
            <CustomHeader title="Create Manifest" desc="Manifest creation coming soon" />
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>This feature is under development.</p>
            </div>
        </div>
    )
}

export default AddManifestPage;
