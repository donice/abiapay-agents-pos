import { GoBackButton } from '@/src/components/common/button';
import ViewReceiptComponent from '@/src/components/modules/tickets/market/receipt';
import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';
var ViewReceiptPage = function () {
    var router = useRouter();
    var id = router.query.id;
    if (!id)
        return null;
    return (<div>
            <Head>
                <title>View Receipt</title>
            </Head>
            <GoBackButton />
            <ViewReceiptComponent id={id}/>
        </div>);
};
export default ViewReceiptPage;
