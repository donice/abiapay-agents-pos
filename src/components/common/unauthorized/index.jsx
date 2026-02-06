"use client";
import { useRouter } from "next/router";
import { FcBinoculars } from "react-icons/fc";
// import "./style.scss" // Moved to _app;
import React from "react";
var Unauthorized = function (_a) {
    var text = _a.text, link = _a.link;
    var router = useRouter();
    return (<div className="unauthorized">
      <div className="unauthorized-comp">
        <div className="unauthorized-comp_icon">
          <FcBinoculars />
        </div>
        <div className="unauthorized-comp_text">{text ? text : "No data"}</div>
      </div>
      {link && <div className="unauthorized-comp_button">
        <button className="secondary button" onClick={function () { return router.push(link); }}>
          Create
        </button>
      </div>}
    </div>);
};
export default Unauthorized;
