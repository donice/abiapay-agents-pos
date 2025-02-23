


import { CustomHeader } from '@/src/components/common/header';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { FcDisclaimer, FcSearch, FcTimeline } from 'react-icons/fc';
import './style.scss';

interface TicketFinesProps {
      link: string;
      title: string;
      icon: ReactElement;
}

const items: TicketFinesProps[] = [
  {
    link: "traffic-offence/create-traffic-offence",
    title: "Create Ticket Fines",
    icon:<FcDisclaimer className="icon" />,
  },
  {
    link: "traffic-offence/search-traffic-offence",
    title: "Ticket Fines History",
    icon:<FcSearch className="icon" />,
  }

];

const TicketFines = () => {
  return (
    <div>
        <CustomHeader
            title='Ticket Fines'
            desc={"Select an option"}
        />

        <div className="">
        <div className="traffic-stats_items">
        {items.map((item) => (
            <Link
            href={`/${item.link}`}
            key={item.link}
            className={`traffic-stats_item`}
            >
            <div>
                {" "}
                <span>{item.icon}</span>
                <div>
                <h2>{item.title}</h2>
                {/* <p>{item.desc}</p> */}
                </div>
            </div>
            </Link>
        ))}
        </div>
        </div>
    </div>
  )
}

export default TicketFines;