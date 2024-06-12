import React from "react";
import SideNav from "./components/nav/SideNav";
import TopNav from "./components/nav/TopNav";
import "./style.scss";

const SecuredPagesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section>
      <TopNav />
      <section>
        <SideNav /> 
        <section className="main-section">
          {children}
          </section> 
      </section>
    </section>
  );
};

export default SecuredPagesLayout;
