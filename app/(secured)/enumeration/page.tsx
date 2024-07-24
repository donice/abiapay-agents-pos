import { CustomHeader } from '@/src/components/common/header';
import TicketsWalletCard from '@/src/components/modules/tickets/ticketsWalletsCard';
import type { Metadata } from 'next';
import Link from 'next/link';
import React, { type ReactElement } from 'react'
import { FcEditImage, FcInTransit, FcLowPriority, FcShop } from 'react-icons/fc';
import "./style.scss";

export const metadata: Metadata = {
  title: "Transport Enumeration",
  description: "Enumerate Vehicles",
};


interface AccountsProps {
  link?: string;
  title: string;
  desc: string;
  icon: ReactElement;
  comingsoon?: boolean;
}

const items: AccountsProps[] = [
  {
    link: "enumeration/transport",
    title: "Transport Enumeration",
    desc: "Enumerate Vehicles",
    icon: <FcInTransit className="icon" />,
  },
  {
    // link: "enumeration/market",
    title: "Market Enumeration",
    desc: "Enumerate market asset",
    icon: <FcShop className="icon" />,
    comingsoon: true
  },
  {
    // link: "enumeration/market",
    title: "Signage Enumeration",
    desc: "Enumerate signages",
    icon: <FcEditImage className="icon" />,
    comingsoon: true
  },
  {
    // link: "enumeration/market",
    title: "Manage Enumeration",
    desc: "Manage all Enumerations",
    icon: <FcLowPriority className="icon" />,
    comingsoon: true
  },
];


const EnumerationPage = () => {
  return (
    <div className="enumeration">
      <CustomHeader title="Enumerations Dashboard" desc={"Explore your enumeration"} />

      <div className="enumeration_container">
        <TicketsWalletCard />

        <div className="enumeration_items">
          {items.map((item) => (
            <Link
              href={`/${item.link? item.link : "enumeration"}`}
              key={item.link}
              className={`enumeration_item`}
            >
              {
                item.comingsoon ? <div className="comingsoon">Coming Soon</div> : null
              }
              <div>
                {" "}
                <span>{item.icon}</span>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EnumerationPage;