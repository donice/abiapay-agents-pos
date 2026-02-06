import React from "react";
import { CustomHeader } from "@/src/components/common/header";
import { FcDeployment, FcPhotoReel } from "react-icons/fc";
import Link from "next/link";
import "./style.scss";
export var metadata = {
    title: "Vehicle Status",
    description: "Verify Vehicle Status",
};
var items = [
    {
        link: "vehicle-status/license-vehicle-status",
        title: "License & Vehicle Status",
        desc: "Confirm License & Vehicle Status",
        icon: <FcDeployment className="icon"/>,
    },
    {
        link: "vehicle-status/vehicle-enumeration-status",
        title: "Vehicle Enumeration Status",
        desc: "Confirm Vehicle Enumeration Status",
        icon: <FcPhotoReel className="icon"/>,
    },
];
var UserAccountPage = function () {
    return (<div className="vehicle-stats">
      <CustomHeader title="Verify Vehicle Status" desc={"Select an option"}/>

      <div className="vehicle-stats_container">

        <div className="vehicle-stats_items">
          {items.map(function (item) { return (<Link href={"/".concat(item.link)} key={item.link} className={"vehicle-stats_item"}>
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
export default UserAccountPage;
