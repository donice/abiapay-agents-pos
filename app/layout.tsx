"use client";
import React, { useEffect } from "react";
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


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    console.log("[Layout] RootLayout mounted.");
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <MainLayout>
          <POSCompatibility />
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
