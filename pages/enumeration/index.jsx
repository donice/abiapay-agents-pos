import React from 'react';
import Head from 'next/head';
import { CustomHeader } from '@/src/components/common/header';
import Link from 'next/link';
import { FcShop, FcTruck } from 'react-icons/fc';

const EnumerationPage = () => {
    const items = [
        {
            link: "enumeration/market",
            title: "Market Enumeration",
            desc: "Manage market commerce enumeration",
            icon: <FcShop className="icon" />,
        },
        {
            link: "enumeration/transport",
            title: "Transport Enumeration",
            desc: "Manage transportation enumeration",
            icon: <FcTruck className="icon" />,
        },
    ];

    return (
        <div className="identity">
            <Head>
                <title>Enumeration - ABIAPAY</title>
            </Head>
            <CustomHeader title="Enumeration Dashboard" desc="Select enumeration type" />

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

export default EnumerationPage;
