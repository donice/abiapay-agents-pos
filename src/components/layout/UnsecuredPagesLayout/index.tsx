import React from "react";
import "./style.scss";
import { AbiaLogoLarge } from "../../common/Images";
import * as Toast from '@radix-ui/react-toast';

const UnsecuredPagesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Toast.Provider swipeDirection="right">

    <section className="unsecured-main">
      <a href="/dashboard" className="logo" aria-label="Abiapay Agents Logo">
        <AbiaLogoLarge />
      </a>
      <div className="unsecured-main_container">{children}</div>
    </section>
    </Toast.Provider>
  );
};

export default UnsecuredPagesLayout;
