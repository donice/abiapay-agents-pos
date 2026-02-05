import { GoBackButton } from '@/src/components/common/button'
import ViewReceiptComponent from '@/src/components/modules/tickets/market/receipt'
import { useRouter } from 'next/router'
import React from 'react'
import Head from 'next/head'

const ViewReceiptPage = () => {
    const router = useRouter();
    const { id } = router.query;

    if (!id) return null;

    return (
        <div>
            <Head>
                <title>View Receipt</title>
            </Head>
            <GoBackButton />
            <ViewReceiptComponent id={id as string} />
        </div>
    )
}

export default ViewReceiptPage
