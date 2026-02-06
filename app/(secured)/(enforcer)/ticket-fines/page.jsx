import { CustomHeader } from '@/src/components/common/header';
import Link from 'next/link';
import React from 'react';
import { FcDisclaimer } from 'react-icons/fc';
import './style.scss';
var items = [
    {
        link: "verify-ticket",
        title: "Verify Vehicle Ticket Status",
        icon: <FcDisclaimer className="icon"/>,
    }
];
var TicketFines = function () {
    return (<div>
        <CustomHeader title='Verify Vehicle Status' desc={"Select an option"}/>

        <div className="">
        <div className="traffic-stats_items">
        {items.map(function (item) { return (<Link href={"/".concat(item.link)} key={item.link} className={"traffic-stats_item"}>
            <div>
                {" "}
                <span>{item.icon}</span>
                <div>
                <h2>{item.title}</h2>
                {/* <p>{item.desc}</p> */}
                </div>
            </div>
            </Link>); })}
        </div>
        </div>
    </div>);
};
export default TicketFines;
