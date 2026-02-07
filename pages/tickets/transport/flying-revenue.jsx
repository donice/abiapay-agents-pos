import React from 'react';
import Head from 'next/head';
import { haulages } from '@/src/components/modules/tickets/transport/flying-revenue/lib/haulages';
import Link from 'next/link';

var FlyingRevenuePage = function () {
    return (<div className="ticketspage">
        <Head>
            <title>Flying Revenue</title>
        </Head>
        <CustomHeader title="Flying Revenue" desc="Select a haulage category" />

        <div className="ticketspage_container" style={{ paddingBottom: '120px' }}>
            <div className="ticketspage_items">
                {haulages.map((item) => (
                    <Link href={`/${item.name}`} key={item.name}>
                        <a className="ticketspage_item">
                            <div>
                                <span>{item.icon}</span>
                                <div>
                                    <h2>{item.title}</h2>
                                    <p>{item.cat}</p>
                                </div>
                            </div>
                        </a>
                    </Link>
                ))}
            </div>
        </div>
    </div>);
};
export default FlyingRevenuePage;
