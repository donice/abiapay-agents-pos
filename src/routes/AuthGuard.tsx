// src/components/AuthGuard.tsx

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { protectedRoutes } from '../routes';
import { useAuthState } from '../context/authContext';

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuthState();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!token && protectedRoutes.includes(pathname)) {
      router.push('/signin');
    }
  }, [token, pathname, router]);

  if (!token && protectedRoutes.includes(pathname)) {
    return <p>Redirecting...</p>; // Or a loading spinner
  }

  return <>{children}</>;
};

export default AuthGuard;
