import React from "react";
// import "./style.scss" // Moved to _app;
import { AbiaLogoLarge } from "../../common/Images";
import { getCurrentYear } from "@/src/utils/getCurrentYear";
var UnsecuredPagesLayout = function (_a) {
    var children = _a.children;
    return (<div className="unsecured-main">
      <a href="/dashboard" className="logo" aria-label="Abiapay Agents Logo">
        <AbiaLogoLarge />
      </a>
      <div className="unsecured-main_container">{children}</div>
      <footer>
      © {getCurrentYear()} Abia State Government. <br /> All rights reserved.
      </footer>
    </div>);
};
export default UnsecuredPagesLayout;
