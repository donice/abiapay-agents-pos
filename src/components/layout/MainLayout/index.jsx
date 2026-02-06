"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { AuthProvider } from "@/src/context/authContext";
import { protectedRoutes, unprotectedRoutes } from "@/src/routes";
import SecuredPagesLayout from "@/src/components/layout/SecuredPagesLayout";
import UnsecuredPagesLayout from "@/src/components/layout/UnsecuredPagesLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
var MainLayout = function (_a) {
    var children = _a.children;
    var router = useRouter();
    var pathname = router.pathname;
    var isProtectedRoute = protectedRoutes.includes(pathname);
    var isPartOfProtectedRoute = protectedRoutes.some(function (route) {
        return pathname.startsWith(route);
    });
    var isUnprotectedRoute = unprotectedRoutes.includes(pathname);
    var queryClient = useState(function () { return new QueryClient(); })[0];
    console.log("pathname", pathname);
    return (<AuthProvider>
      <QueryClientProvider client={queryClient}>
        {pathname == "/gateway" || pathname.includes("/gateway") ? (<section>{children}</section>) : isProtectedRoute ? (<SecuredPagesLayout>{children}</SecuredPagesLayout>) : isUnprotectedRoute ? (<UnsecuredPagesLayout>{children}</UnsecuredPagesLayout>) : isPartOfProtectedRoute ? (<SecuredPagesLayout>{children}</SecuredPagesLayout>) : (<section>{children}</section>)}
        <Toaster />
        {/* <ReactQueryDevtools/> */}
      </QueryClientProvider>
    </AuthProvider>);
};
export default MainLayout;
