import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import SmoothScroll from "./components/SmoothScroll";
import { CookieProvider } from "./components/CookieConsent";
import MobileFooter from "./components/MobileFooter";

const montserrat = Montserrat({ subsets: ["latin"], variable: '--font-montserrat' });

export const metadata: Metadata = {
  title: "Atelier Kusa",
  description: "Architektonický ateliér",
  icons: {
    icon: '/logo.jpg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body className={`${montserrat.variable} flex flex-col md:flex-row min-h-screen`}>
        <CookieProvider>
          <SmoothScroll>
            <Sidebar />
            <main className="flex-1 mt-16 md:mt-0 md:ml-64 relative">
              {children}
            </main>
            <MobileFooter />
          </SmoothScroll>
        </CookieProvider>
      </body>
    </html>
  );
}
