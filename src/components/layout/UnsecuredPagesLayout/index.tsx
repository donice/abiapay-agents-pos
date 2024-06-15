import React from "react";
import "./style.scss";
import { AbiaLogo } from "../../common/Images";

const UnsecuredPagesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="unsecured-main">
      <div className="unsecured-main_container">
      <a href="/dashboard" className="logo" aria-label="Abiapay Agents Logo">
          <AbiaLogo />
        </a>
        {children}</div>
    </section>
  );
};

export default UnsecuredPagesLayout;
