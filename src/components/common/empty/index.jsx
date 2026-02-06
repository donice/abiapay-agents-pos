"use client";
import { useRouter } from "next/router";
// import "./style.scss" // Moved to _app;
import React from "react";
import Image from "next/image";
import emptySVG from "@/public/images/empty.svg";
var Empty = function (_a) {
    var text = _a.text, link = _a.link;
    var router = useRouter();
    return (<div className="empty">
      <div className="empty-comp">
        <div className="empty-comp_icon">
          {/* <FcOpenedFolder /> */}
          <Image src={emptySVG} width={150} alt="empty"/>
        </div>
        <div className="empty-comp_text">{text ? text : "No data"}</div>
      </div>
      {link && <div className="empty-comp_button">
        <button className="secondary button" onClick={function () { return router.push(link); }}>
          Create
        </button>
      </div>}
    </div>);
};
export default Empty;
