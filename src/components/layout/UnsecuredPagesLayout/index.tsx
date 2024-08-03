import React from "react";
import "./style.scss";
import { AbiaLogoLarge } from "../../common/Images";

const UnsecuredPagesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (

    <div className="unsecured-main">
      <a href="/dashboard" className="logo" aria-label="Abiapay Agents Logo">
        <AbiaLogoLarge />
      </a>
      <div className="unsecured-main_container">{children}</div>
      <footer >
      © 2024 Abia State Government. <br /> All rights reserved.
      </footer>
    </div>
  );
}

export default UnsecuredPagesLayout;
