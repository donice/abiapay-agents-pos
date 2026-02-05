import MarketTicketComponent from "@/src/components/modules/tickets/market";
import Head from "next/head";
import React from "react";

const MarketTicketsPage = () => {
    return (
        <div>
            <Head>
                <title>Market Levy - Agent Portal</title>
                <meta name="description" content="Agents Portal Tickets Page" />
            </Head>
            <MarketTicketComponent />
        </div>
    );
};

export default MarketTicketsPage;
