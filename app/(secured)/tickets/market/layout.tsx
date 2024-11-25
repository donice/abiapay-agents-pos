import { GoBackButton } from "@/src/components/common/button";
import { CustomHeader } from "@/src/components/common/header";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={inter.className}>
      <GoBackButton />
      <header className="mt-2">
        <CustomHeader
          title="Add Market Ticket"
          desc="Manage/Create Transaction"
        />
      </header>
      {children}
    </section>
  );
}
