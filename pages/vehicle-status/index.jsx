import React from 'react';
import Head from 'next/head';
import { CustomHeader } from '@/src/components/common/header';
import Link from 'next/link';
import { FcSearch, FcAutomotive } from 'react-icons/fc';

const VehicleStatusPage = () => {
    const items = [
        {
            link: "vehicle-status/license",
            title: "License Status",
            desc: "Verify driver and vehicle license status",
            icon: <FcSearch className="icon" />,
        },
        {
            link: "vehicle-status/enumeration",
            title: "Enumeration Status",
            desc: "Verify vehicle enumeration registration",
            icon: <FcAutomotive className="icon" />,
        },
    ];

    return (
        <div className="identity">
            <Head>
                <title>Vehicle Status - ABIAPAY</title>
            </Head>
            <CustomHeader title="Vehicle Status Dashboard" desc="Select verification type" />

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

export default VehicleStatusPage;
