import React, { useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "@/src/utils/navigation";
import { protectedRoutes } from "../routes";
import { useAuthState } from "../context/authContext";
import Redirecting from "../components/common/loader/redirecting";
var AuthGuard = function (_a) {
    var children = _a.children;
    var token = useAuthState().token;
    var router = useRouter();
    var pathname = usePathname();
    var isProtectedRoute = useMemo(function () {
        return protectedRoutes.some(function (protectedRoute) {
            return pathname.startsWith(protectedRoute);
        });
    }, [pathname]);
    var _b = useState(false), isClient = _b[0], setIsClient = _b[1];
    useEffect(function () {
        // Set a flag indicating the component has mounted
        setIsClient(true);
        if (!token && isProtectedRoute) {
            router.push("/signin");
        }
    }, [token, isProtectedRoute, router]);
    // Ensure the component matches on both server and client
    if (!isClient) {
        return null; // Or a loading indicator
    }
    if (!token && isProtectedRoute) {
        return <Redirecting />;
    }
    return <>{children}</>;
};
export default AuthGuard;
