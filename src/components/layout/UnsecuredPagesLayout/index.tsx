import React from "react";
import "./style.scss";
import { AbiaLogoLarge } from "../../common/Images";

const UnsecuredPagesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (

    <section className="unsecured-main">
      <a href="/dashboard" className="logo" aria-label="Abiapay Agents Logo">
        <AbiaLogoLarge />
      </a>
      <div className="unsecured-main_container">{children}</div>
    </section>
  );
};

export default UnsecuredPagesLayout;
