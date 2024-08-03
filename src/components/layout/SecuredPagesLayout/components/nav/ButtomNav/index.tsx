"use client";
import React, { ReactElement } from "react";
import "./style.scss";
import Link from "next/link";
import getRoute from "@/src/hooks/getRoute";
import {
  TbHome,
  TbHomeFilled,
  TbSquareRoundedPlusFilled,
  TbSquareRoundedPlus,
  TbLineScan,
  TbUserFilled,
  TbUser,
  TbLayoutGridAdd,
  TbLayoutGridFilled,
  TbZoomScanFilled,
  TbTicket,
} from "react-icons/tb";
import { useRouter } from "next/navigation";

interface BottomNavProps {
  name: string;
  title: string;
  icon: ReactElement;
  icon_active?: ReactElement;
}

const nav_items: BottomNavProps[] = [
  {
    name: "dashboard",
    title: "Home",
    icon: <TbHome className="icon" />,
    icon_active: <TbHomeFilled className="icon" />,
  },
  // {
  //   name: "tickets/transport",
  //   title: "Transport",
  //   icon: <TbTicket className="icon" />,
  //   icon_active: <HiTicket className="icon" />,
  // },
  {
    name: "tickets/verify",
    title: "Verify Tickets",
    icon: <TbLineScan className="icon" />,
    icon_active: <TbZoomScanFilled className="icon" />,
  },
  {
    name: "tickets/add",
    title: "Add Tickets",
    icon: <TbSquareRoundedPlus className="icon plus" />,
    icon_active: <TbSquareRoundedPlusFilled className="icon plus" />,
  },
  {
    name: "user/account",
    title: "My Account",
    icon: <TbUser className="icon" />,
    icon_active: <TbUserFilled className="icon" />,
  },
  {
    name: "user/settings",
    title: "Extras",
    icon: <TbLayoutGridAdd className="icon" />,
    icon_active: <TbLayoutGridFilled className="icon" />,
  },
];

const BottomNav = () => {
  const route = getRoute();
  const router = useRouter();

  return (
    <div className="bottom-nav">
      <div className="bottom-nav_items_container">
        <div className="bottom-nav_items">
          {nav_items.map((item) => (
            <Link href={`/${item.name}`} key={item.name} className={`bottom-nav_item ${item.name === route ? "active" : "inactive"}`}>
                <span>{item.name === route ? item.icon_active : item.icon}</span>
            </Link>
          ))}
          {/* <div key={"logout"} onClick={() => {sessionStorage.clear(); router.refresh();}} className="bottom-nav_item logout">
            <span>
              <TbLogout2 className="icon out" />
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
