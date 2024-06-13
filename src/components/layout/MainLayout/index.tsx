import React from "react";
import SecuredPagesLayout from "@/src/components/layout/SecuredPagesLayout";
import UnsecuredPagesLayout from "@/src/components/layout/UnsecuredPagesLayout";

export interface RouteConfig {
  path: string;
  element: React.ReactElement;
  meta?: {
    title?: string;
    description?: string;
  };
}

const MainLayout = ({
  children,
  isProtected,
  isUnprotected,
  isNotFound,
}: {
  children: React.ReactNode;
  isProtected: boolean;
  isUnprotected: boolean;
  isNotFound: boolean;
}) => {

  if (!isProtected) {
    return <SecuredPagesLayout>{children}</SecuredPagesLayout>;
  }  else if (isNotFound){
    return <section>Not found</section>;
  }else {
    return <UnsecuredPagesLayout>{children}</UnsecuredPagesLayout>;
  }
};

export default MainLayout;
