import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import FlyingRevenueComponent from '@/src/components/modules/tickets/transport/flying-revenue';

const FlyingRevenueItemPage = () => {
    const router = useRouter();
    const { slug } = router.query;

    return (
        <div>
            <Head>
                <title>Flying Revenue - {slug}</title>
            </Head>
            {slug && <FlyingRevenueComponent slug={slug} />}
        </div>
    );
};

export default FlyingRevenueItemPage;
