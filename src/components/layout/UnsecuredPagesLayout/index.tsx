import React from "react";
import "./style.scss";

const UnsecuredPagesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="unsecured-main">
      <div className="unsecured-main_container">{children}</div>
    </section>
  );
};

export default UnsecuredPagesLayout;
