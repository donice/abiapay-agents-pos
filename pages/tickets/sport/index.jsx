import React from 'react';
import Head from 'next/head';
import { FcSportsMode, FcConferenceCall } from "react-icons/fc";
import Link from 'next/link';
import { CustomHeader } from '@/src/components/common/header';

var SportTicketsPage = function () {
    const sportOptions = [
        { name: "tickets/sport/single", title: "Single Sport Ticket", icon: <FcSportsMode className="icon" /> },
        { name: "tickets/sport/group", title: "Group Sport Ticket", icon: <FcConferenceCall className="icon" /> },
    ];

    return (<div className="ticketspage">
        <Head>
            <title>Sport Tickets</title>
        </Head>
        <CustomHeader title="Sport Tickets" desc="Select sport ticket type" />

        <div className="ticketspage_container" style={{ paddingBottom: '120px' }}>
            <div className="ticketspage_items">
                {sportOptions.map((item) => (
                    <Link href={`/${item.name}`} key={item.name}>
                        <a className="ticketspage_item">
                            <div>
                                <span>{item.icon}</span>
                                <div>
                                    <h2>{item.title}</h2>
                                    <p>Create {item.title}</p>
                                </div>
                            </div>
                        </a>
                    </Link>
                ))}
            </div>
        </div>
    </div>);
};
export default SportTicketsPage;
