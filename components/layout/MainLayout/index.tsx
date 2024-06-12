import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SecuredPagesLayout from "@/components/layout/SecuredPagesLayout";
import UnsecuredPagesLayout from "@/components/layout/UnsecuredPagesLayout";
import SignUpPage from "@/app/(auth)/signup/page";
import Dashboard from "@/app/(secured)/Dashobard";
import TransportTicketsPage from "@/app/(secured)/Tickets/Transport";
import SiginPage from "@/app/(unsecured)/(auth)/Signin";
import { RouteWithMeta } from "./utils/RouteWithMeta";
export interface RouteConfig {
  path: string;
  element: React.ReactElement;
  meta?: {
    title?: string;
    description?: string;
  };
}
const protectedRoutes: RouteConfig[] = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    meta: { title: "Dashboard", description: "User Dashboard" },
  },
  {
    path: "/tickets/transport",
    element: <TransportTicketsPage />,
    meta: { title: "Transport Tickets", description: "User Transport Tickets" },
  },
];

const unprotectedRoutes: RouteConfig[] = [
  {
    path: "/sign-in",
    element: <SiginPage />,
    meta: { title: "Login", description: "Login Page" },
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
    meta: { title: "Signup", description: "Signup Page" },
  },
];

const MainLayout = () => {
  return (
    <div>
      <Router>
        {/* <nav>
          <ul>
            {protectedRoutes.map((route) => (
              <li key={route.path}>
                <a href={route.path}>{route.meta?.title}</a>
              </li>
            ))}
            {unprotectedRoutes.map((route) => (
              <li key={route.path}>
                <a href={route.path}>{route.meta?.title}</a>
              </li>
            ))}
          </ul>
        </nav> */}
        <Routes>
          {protectedRoutes.map((route) => (
            <Route
              path={route.path}
              key={route.path}
              element={
                <SecuredPagesLayout>
                  <RouteWithMeta route={route} />
                </SecuredPagesLayout>
              }
            />
          ))}
          {unprotectedRoutes.map((route) => (
            <Route
              path={route.path}
              key={route.path}
              element={
                <UnsecuredPagesLayout>
                  <RouteWithMeta route={route} />
                </UnsecuredPagesLayout>
              }
            />
          ))}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default MainLayout;
