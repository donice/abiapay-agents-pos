import React from 'react';
import Head from 'next/head';
import { CustomHeader } from '@/src/components/common/header';
import Link from 'next/link';
import { FcBriefcase, FcShipped, FcSurvey } from 'react-icons/fc';

const AddTicketsPage = () => {
    const items = [
        {
            link: "tickets/market/add",
            title: "Market Ticket",
            desc: "Add a new market ticket",
            icon: <FcBriefcase className="icon" />,
        },
        {
            link: "tickets/transport/add",
            title: "Transport Ticket",
            desc: "Add a new transport ticket",
            icon: <FcShipped className="icon" />,
        },
        {
            link: "tickets/manifest/add",
            title: "Manifest Ticket",
            desc: "Add a new manifest ticket",
            icon: <FcSurvey className="icon" />,
        },
    ];

    return (
        <div className="identity">
            <Head>
                <title>Add Tickets - ABIAPAY</title>
            </Head>
            <CustomHeader title="Add Tickets" desc="Select ticket type to add" />

            <div className="identity_container">
                <div className="identity_items">
                    {items.map((item) => (
                        <Link href={`/${item.link}`} key={item.title}>
                            <a className="identity_item">
                                <div>
                                    <span>{item.icon}</span>
                                    <div>
                                        <h2>{item.title}</h2>
                                        <p>{item.desc}</p>
                                    </div>
                                </div>
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddTicketsPage;
