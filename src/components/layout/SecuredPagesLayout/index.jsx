import React, { useState } from "react";
import SideNav from "./components/nav/SideNav";
import TopNav from "./components/nav/TopNav";
import BottomNav from "./components/nav/ButtomNav";
import AuthGuard from "@/src/routes/AuthGuard";
// import "./style.scss" // Moved to _app;
import { getCurrentYear } from "@/src/utils/getCurrentYear";

var SecuredPagesLayout = function (_a) {
  var children = _a.children;
  var _b = useState(false), isCollapsed = _b[0], setIsCollapsed = _b[1];

  var toggleCollapse = function () {
    setIsCollapsed(!isCollapsed);
  };

  return (<AuthGuard>
    <div className="layout-root">
      <TopNav isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />
      <div className="layout-body">
        <SideNav isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />
        <section className={"main-section ".concat(isCollapsed ? "collapsed" : "")}>
          <div className="content-wrapper">
            {children}
          </div>
          <footer>
            © {getCurrentYear()} Abia State Government. <br /> All rights reserved.
          </footer>
        </section>
      </div>
      <BottomNav />
    </div>
  </AuthGuard>);
};

export default SecuredPagesLayout;

