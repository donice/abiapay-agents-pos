import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { unprotectedRoutes } from "../routes";
import { useAuthState } from "../context/authContext";
import Redirecting from "../components/common/loader/redirecting";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuthState();
  const router = useRouter();
  const pathname = usePathname();

  // console.log(token)

  useEffect(() => {
    if (!token && !unprotectedRoutes.includes(pathname)) {
      router.push("/signin");
    }
  }, [token, pathname, router]);

  if (!token && !unprotectedRoutes.includes(pathname)) {
    return <Redirecting />;
  }

  return <>{children}</>;
};

export default AuthGuard;
