import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "@/src/components/layout/MainLayout";
import POSCompatibility from '@/components/modules/POSCompatability';
import { initializePolyfills } from '@/lib/polyfills';

if (typeof window !== 'undefined') {
  initializePolyfills();
}


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

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
