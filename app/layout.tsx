import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import SmoothScroll from "./components/SmoothScroll";

const montserrat = Montserrat({ subsets: ["latin"], variable: '--font-montserrat' });

export const metadata: Metadata = {
  title: "Atelier Kusa",
  description: "Architektonický ateliér",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body className={`${montserrat.variable} flex min-h-screen`}>
        <SmoothScroll>
          <Sidebar />
          <main className="flex-1 mt-16 md:mt-0 md:ml-64 relative">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
