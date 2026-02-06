import { CustomHeader } from "@/src/components/common/header";
import Link from "next/link";
import React from "react";
import { FcButtingIn, FcStackOfPhotos } from "react-icons/fc";
import "./../../style.scss";
export var metadata = {
    title: "Dependent ABSSIN",
    description: "Create Individual ABSSIN for Infant",
};
var items = [
    {
        link: "identity/create/infant",
        title: "Create Single",
        desc: " Single ABSSIN for dependents",
        icon: <FcButtingIn className="icon"/>,
    },
    {
        link: "identity/infant/bulk-add",
        title: "Create Bulk",
        desc: " Bulk ABSSIN for dependents",
        icon: <FcStackOfPhotos className="icon"/>,
    },
];
var DependentsAbssinPage = function () {
    return (<div className="identity">
      <CustomHeader title="Dependent ABSSIN Dashboard" desc={"Manage Dependents"}/>

      <div className="identity_container">
        <div className="identity_items">
          {items.map(function (item) {
            return item.comingsoon ? (<div key={item.title} className={"identity_item"}>
                <div className="comingsoon">Coming Soon</div>
                <div>
                  <span>{item.icon}</span>
                  <div>
                    <h2>{item.title}</h2>
                    <p>{item.desc}</p>
                  </div>
                </div>
              </div>) : (<Link href={"/".concat(item.link ? item.link : "identity")} key={item.link} className={"identity_item"}>
                <div>
                  <span>{item.icon}</span>
                  <div>
                    <h2>{item.title}</h2>
                    <p>{item.desc}</p>
                  </div>
                </div>
              </Link>);
        })}
        </div>
      </div>
    </div>);
};
export default DependentsAbssinPage;
