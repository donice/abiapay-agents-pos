import React from 'react';
import { FcAddDatabase, FcNews, FcSearch } from 'react-icons/fc';
import { GoBackButton } from '../../common/button';
import { CustomHeader } from '../../common/header';
import Link from 'next/link';
var items = [
    {
        link: "demand-notices/create",
        title: "Generate New Notice",
        icon: <FcAddDatabase className="icon"/>,
    },
    {
        link: "demand-notices/assign",
        title: "Assign Blank Notice",
        icon: <FcNews className="icon"/>,
    },
    // {
    //   link: "demand-notices/assign-no-abssin",
    //   title: "Assign Blank Notice (without ABSSIN)",
    //   icon:<FcNews className="icon" />,
    // },
    {
        link: "demand-notices/search",
        title: "Search Demand Notice",
        icon: <FcSearch className="icon"/>,
    }
];
var DemandNoticesComponent = function () {
    return (<div>
      <div className="">
        <GoBackButton />
        <CustomHeader title='Demand Notices' desc={"Select an option"}/>

        <div className="bills-stats_container">
          <div className="bills-stats_items">
            {items.map(function (item) { return (<Link href={"/".concat(item.link)} key={item.link}>
                <a className={"bills-stats_item"}>
                  <div>
                    {" "}
                    <span>{item.icon}</span>
                    <div>
                      <h2>{item.title}</h2>
                      {/* <p>{item.desc}</p> */}
                    </div>
                  </div>
                </a>
              </Link>); })}
          </div>
        </div>
      </div>
    </div>);
};
export default DemandNoticesComponent;
