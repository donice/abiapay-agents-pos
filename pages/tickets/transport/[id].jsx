import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import TransportTicketDetails from '@/src/components/modules/tickets/transport/details';

const TransportTicketDetailsPage = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <Head>
                <title>Transport Ticket Details</title>
                <meta name="description" content="View transport ticket details" />
            </Head>
            {id && <TransportTicketDetails ticketId={id} />}
        </div>
    );
};

export default TransportTicketDetailsPage;
