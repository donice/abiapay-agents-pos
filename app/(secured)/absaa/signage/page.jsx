import { CustomHeader } from "@/src/components/common/header";
import Link from "next/link";
import React from "react";
import { FcDiploma1, FcDisplay, FcLeave, } from "react-icons/fc";
import "./style.scss";
export var metadata = {
    title: "ABSSAA Signages",
    description: "Manage all signages done by ABSSAA",
};
var items = [
    {
        link: "absaa/signage/first-party",
        title: "First Party Signs",
        desc: "Create first party signages",
        icon: <FcDisplay className="icon"/>,
        // comingsoon: true
    },
    {
        link: "absaa/signage/second-party",
        title: "Second Party Signs",
        desc: "Create second party signages",
        icon: <FcLeave className="icon"/>,
        comingsoon: true
    },
    {
        link: "absaa/signage/third-party",
        title: "Third Party Signs",
        desc: "Create third party signages",
        icon: <FcDiploma1 className="icon"/>,
        comingsoon: true
    },
    // {
    //   link: "absaa/signage/signage-enumeration",
    //   title: "Signage Enumeration",
    //   desc: "Create enumeration for signage",
    //   icon: <FcDiploma1 className="icon" />,
    // },
    // {
    //   link: "absaa/signage/signage-road",
    //   title: "Signage Road",
    //   desc: "Create enumeration for road",
    //   icon: <FcHighPriority className="icon" />,
    // },
    // {
    //   link: "absaa/signage/signage-rate",
    //   title: "Signage Rate",
    //   desc: "Create enumeration for rate",
    //   icon: <FcDonate className="icon" />,
    // },
    // {
    //   link: "absaa/signage/signage-road-category",
    //   title: "Road Category",
    //   desc: "Create road category",
    //   icon: <FcCircuit className="icon" />,
    // },
    // {
    //   link: "absaa/signage/signage-category",
    //   title: "Signage Category",
    //   desc: "Create category for signage",
    //   icon: <FcElectroDevices className="icon" />,
    // },
];
var SignagePage = function () {
    return (<div className="signage">
      <CustomHeader title="ABSSAA Dashboard" desc={"Manage all signages done by ABSSAA"}/>
      

      <div className="signage_container">
        {/* <IdentityStatsCard /> */}
        <div className="signage_items">
          {items.map(function (item) { return (<Link href={"/".concat(item.link ? item.link : "absaa/signage")} key={item.link} className={"signage_item"}>
              {item.comingsoon ? (<div className="comingsoon">Coming Soon</div>) : null}
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
export default SignagePage;
