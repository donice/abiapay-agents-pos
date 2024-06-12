import React from "react";
import SecuredPagesLayout from "@/components/layout/SecuredPagesLayout";
import UnsecuredPagesLayout from "@/components/layout/UnsecuredPagesLayout";

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
  isNotFound,
}: {
  children: React.ReactNode;
  isProtected: boolean;
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
