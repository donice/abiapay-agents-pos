import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { protectedRoutes } from "../routes";
import { useAuthState } from "../context/authContext";
import Redirecting from "../components/common/loader/redirecting";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuthState();
  const router = useRouter();
  const pathname = usePathname();
  // console.log(token)

  // Function to check if a route is protected
  const isProtectedRoute = (path: string): boolean => {
    return protectedRoutes.some((protectedRoute) => path.startsWith(protectedRoute));
  };

  useEffect(() => {
    if (!token && isProtectedRoute(pathname)) {
      router.push("/signin");
    }
  }, [token, pathname, router]);

  if (!token && isProtectedRoute(pathname)) {
    return <Redirecting />;
  }

  return <>{children}</>;
};

export default AuthGuard;
