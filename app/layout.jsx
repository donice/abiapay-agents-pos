"use client";
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "@/src/components/layout/MainLayout";
import POSCompatibility from '@/components/modules/POSCompatability';
import { initializePolyfills } from '@/lib/polyfills';
if (typeof window !== 'undefined') {
    console.log("[Layout] Initializing polyfills...");
    initializePolyfills();
    console.log("[Layout] Polyfills initialized.");
}
var inter = Inter({ subsets: ["latin"] });
export default function RootLayout(_a) {
    var children = _a.children;
    React.useEffect(function () {
        console.log("[Layout] RootLayout mounted.");
    }, []);
    return (<html lang="en">
      <body className={inter.className}>
        <MainLayout>
          <POSCompatibility />
          {children}
        </MainLayout>
      </body>
    </html>);
}
