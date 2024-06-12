import React from "react";

const UnsecuredPagesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div>{children} UnsecuredPagesLayout</div>;
};

export default UnsecuredPagesLayout;
