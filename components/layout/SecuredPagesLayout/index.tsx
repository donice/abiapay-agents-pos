import React from "react";
import SideNav from "./components/nav/SideNav";
import TopNav from "./components/nav/TopNav";
import "./style.scss";

const SecuredPagesLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <section>
      <TopNav />
      <section>
        <SideNav />
        <section className="main-section">{children}</section>
      </section>
    </section>
  );
};

export default SecuredPagesLayout;
