import { CustomHeader } from '@/src/components/common/header';
import Link from 'next/link';
import React from 'react';
import { FcRules } from 'react-icons/fc';
import "./style.scss";
import EnumerationStatsCard from '@/src/components/modules/enumeration/enumerationStatsCard';
export var metadata = {
    title: "My Account",
    description: "Enumerate Vehicles",
};
var items = [
    {
        link: "account/statement",
        title: "My Statement",
        desc: "View my account statement",
        icon: <FcRules className="icon"/>,
        // comingsoon: true
    },
];
var EnumerationPage = function () {
    return (<div className="account">
      <CustomHeader title="My Account" desc={"Explore your account"}/>

      <div className="account_container">
        <EnumerationStatsCard />

        <div className="account_items">
          {items.map(function (item) { return (<Link href={"/".concat(item.link ? item.link : "account")} key={item.link} className={"account_item"}>
              {item.comingsoon ? <div className="comingsoon">Coming Soon</div> : null}
              <div>
                {" "}
                <span>{item.icon}</span>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.desc}</p>
                </div>
              </div>
            </Link>); })}
        </div>
      </div>
    </div>);
};
export default EnumerationPage;
