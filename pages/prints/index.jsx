import React from 'react';
import Head from 'next/head';
import { CustomHeader } from '@/src/components/common/header';
import Link from 'next/link';
import { FcAddressBook, FcDiploma1 } from 'react-icons/fc';

const PrintsPage = () => {
    const items = [
        {
            link: "prints/id",
            title: "ID Prints",
            desc: "Print identification cards",
            icon: <FcAddressBook className="icon" />,
        },
        {
            link: "prints/sticker",
            title: "Sticker Prints",
            desc: "Print vehicle stickers",
            icon: <FcDiploma1 className="icon" />,
        },
    ];

    return (
        <div className="identity">
            <Head>
                <title>Prints - ABIAPAY</title>
            </Head>
            <CustomHeader title="Prints Dashboard" desc="Select print type" />

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

export default PrintsPage;
