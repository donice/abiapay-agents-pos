import React, { useState } from 'react';
import Head from 'next/head';
import SingleSportTicketsComponent from '@/src/components/modules/tickets/sport/single';
import { CustomHeader } from '@/src/components/common/header';
import { Button } from '@/src/components/common/button';

const SportSinglePage = () => {
    const [category, setCategory] = useState(null);

    if (!category) {
        return (
            <div className="ticketspage">
                <Head><title>Single Sport Ticket</title></Head>
                <CustomHeader title="Single Sport Ticket" desc="Select category" />
                <div className="ticketspage_container" style={{ padding: '2rem', gap: '1rem' }}>
                    <Button text="Abian" onClick={() => setCategory('abian')} />
                    <Button text="Guest" onClick={() => setCategory('guest')} />
                </div>
            </div>
        );
    }

    return (
        <div>
            <Head>
                <title>Single Sport Ticket - {category}</title>
            </Head>
            <SingleSportTicketsComponent category={category} />
        </div>
    );
};

export default SportSinglePage;
