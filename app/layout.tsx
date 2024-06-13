import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";

const inter = Inter({ subsets: ["latin"] });

const protectedRoutes = ["/dashboard", "/tickets/transport"];
const unprotectedRoutes = ["/signin", "/signup"];

export default function RootLayout({
  children,
  pathname,
}: {
  children: any;
  pathname: any;
}) {
  const isProtected = protectedRoutes.includes(pathname);
  const isUnprotected = unprotectedRoutes.includes(pathname);
  const isNotFound = !isProtected && !isUnprotected;

  return (
    <html lang="en">
      <body className={inter.className}>
        <MainLayout isProtected={isProtected} isNotFound={isNotFound}>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
