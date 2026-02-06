"use client";
import { CustomHeader } from '@/src/components/common/header';
import Link from 'next/link';
import React from 'react';
import './style.scss';
import { FcDisclaimer, FcSearch, FcTimeline } from 'react-icons/fc';
import { GoBackButton } from '@/src/components/common/button';
var items = [
    {
        link: "traffic-offence/create-traffic-offence",
        title: "Create Traffic Offence Ticket",
        // desc: "Confirm License & Vehicle Status",
        icon: <FcDisclaimer className="icon"/>,
    },
    {
        link: "traffic-offence/search-traffic-offence",
        title: "Search for Traffic Ticket",
        // desc: "Confirm Vehicle Enumeration Status",
        icon: <FcSearch className="icon"/>,
    },
    {
        link: "traffic-offence/traffic-ticket-history",
        title: "Traffic Ticket History",
        // desc: "Confirm Vehicle Enumeration Status",
        icon: <FcTimeline className="icon"/>,
    },
];
var UserAccountPage = function () {
    return (<div className=''>
      <GoBackButton />
        <CustomHeader title='Traffic Offences' desc={"Select an option"}/>

        <div className="traffic-stats_container">

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
export default UserAccountPage;
