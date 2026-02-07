import React, { useState } from 'react';
import Head from 'next/head';
import GroupSportTicketsComponent from '@/src/components/modules/tickets/sport/group';
import { CustomHeader } from '@/src/components/common/header';
import { Button } from '@/src/components/common/button';

const SportGroupPage = () => {
    const [category, setCategory] = useState(null);

    if (!category) {
        return (
            <div className="ticketspage">
                <Head><title>Group Sport Ticket</title></Head>
                <CustomHeader title="Group Sport Ticket" desc="Select category" />
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
                <title>Group Sport Ticket - {category}</title>
            </Head>
            <GroupSportTicketsComponent category={category} />
        </div>
    );
};

export default SportGroupPage;
