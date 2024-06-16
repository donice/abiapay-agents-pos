"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/src/context/authContext";
import { protectedRoutes, unprotectedRoutes } from "@/src/routes";
import SecuredPagesLayout from "@/src/components/layout/SecuredPagesLayout";
import UnsecuredPagesLayout from "@/src/components/layout/UnsecuredPagesLayout";
import { Toaster } from "react-hot-toast";


export interface RouteConfig {
  path: string;
  element: React.ReactElement;
  meta?: {
    title?: string;
    description?: string;
  };
}

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isProtectedRoute = protectedRoutes.includes(pathname);
  const isUnprotectedRoute = unprotectedRoutes.includes(pathname);

  return (
    <AuthProvider>
      <div>
        {isProtectedRoute ? (
          <SecuredPagesLayout>{children}</SecuredPagesLayout>
        ) : isUnprotectedRoute ? (
          <UnsecuredPagesLayout>{children}</UnsecuredPagesLayout>
        ) : (
          <div>{children}</div>
        )}
      </div>
      <Toaster />
    </AuthProvider>
  );
};

export default MainLayout;
