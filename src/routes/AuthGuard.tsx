import React, { useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { protectedRoutes } from "../routes";
import { useAuthState } from "../context/authContext";
import Redirecting from "../components/common/loader/redirecting";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuthState();
  const router = useRouter();
  const pathname = usePathname();

  const isProtectedRoute = useMemo(() => {
    return protectedRoutes.some((protectedRoute) => pathname.startsWith(protectedRoute));
  }, [pathname]);

  useEffect(() => {
    if (!token && isProtectedRoute) {
      router.push("/signin");
    }
  }, [token, isProtectedRoute, router]);

  if (!token && isProtectedRoute) {
    return <Redirecting />;
  }

  return <>{children}</>;
};

export default AuthGuard;
