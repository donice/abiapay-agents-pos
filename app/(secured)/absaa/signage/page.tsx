import { CustomHeader } from "@/src/components/common/header";
import type { Metadata } from "next";
import Link from "next/link";
import React, { type ReactElement } from "react";
import {
  FcBusinessman,
  FcReading,
  FcShop,
} from "react-icons/fc";
import "./style.scss";

export const metadata: Metadata = {
  title: "ABIAPAY Identity",
  description: "Manage all Identities tied to your ABIAPAY account",
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
    link: "signage/create/individual/verify",
    title: "Create Individual ABSSIN",
    desc: "Create an ABSSIN for individual",
    icon: <FcBusinessman className="icon" />,
    // comingsoon: true
  },
  {
    link: "signage/create/business",
    title: "Create Business ABSSIN",
    desc: "Create an ABSSIN for business",
    icon: <FcShop className="icon" />,
  },
  {
    link: "signage/view/individual",
    title: "View Individuals",
    desc: "View all individual ABSSIN",
    icon: <FcReading className="icon" />,
  },
  // {
  //   link: "signage/view/business",
  //   title: "View Business",
  //   desc: "View all Business ABSSIN",
  //   icon: <FcReading className="icon" />,
  // },
];

const SignagePage = () => {
  return (
    <div className="signage">
      <CustomHeader title="Identity Dashboard" desc={"Manage identities"} />
      

      <div className="signage_container">
        {/* <IdentityStatsCard /> */}
        <div className="signage_items">
          {items.map((item) => (
            <Link
              href={`/${item.link ? item.link : "signage"}`}
              key={item.link}
              className={`signage_item`}
            >
              {item.comingsoon ? (
                <div className="comingsoon">Coming Soon</div>
              ) : null}
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
};

export default SignagePage;
