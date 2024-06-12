import React from "react";

const SecuredPagesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div>SecuredPagesLayout {children}</div>;
};

export default SecuredPagesLayout;
