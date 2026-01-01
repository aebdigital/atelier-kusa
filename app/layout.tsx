import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import SmoothScroll from "./components/SmoothScroll";
import { CookieProvider } from "./components/CookieConsent";
import MobileFooter from "./components/MobileFooter";

const montserrat = Montserrat({ subsets: ["latin"], variable: '--font-montserrat' });

export const metadata: Metadata = {
  metadataBase: new URL('https://atelierkusa.sk'),
  title: {
    default: "Atelier Kusa | Architektonický ateliér",
    template: "%s | Atelier Kusa"
  },
  description: "Atelier Kusa - profesionálny architektonický ateliér v Bratislave. Navrhujeme rodinné domy, bytové domy, interiéry a rekonštrukcie s dôrazom na kvalitu a detail.",
  keywords: ["architekt", "architektonický ateliér", "Bratislava", "projekty domov", "interiérový dizajn", "rekonštrukcie", "Atelier Kusa"],
  authors: [{ name: "Atelier Kusa" }],
  openGraph: {
    title: "Atelier Kusa | Architektonický ateliér",
    description: "Profesionálny architektonický ateliér v Bratislave. Projekty na mieru, od štúdie po realizáciu.",
    url: 'https://atelierkusa.sk',
    siteName: 'Atelier Kusa',
    images: [
      {
        url: '/logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Atelier Kusa Logo',
      },
    ],
    locale: 'sk_SK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Atelier Kusa | Architektonický ateliér",
    description: "Profesionálny architektonický ateliér v Bratislave.",
    images: ['/logo.jpg'],
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/logo.jpg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ArchitectureFirm",
    "name": "Atelier Kusa",
    "url": "https://atelierkusa.sk",
    "logo": "https://atelierkusa.sk/logo.jpg",
    "description": "Architektonický ateliér zameraný na komplexné projektovanie stavieb a interiérov.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bratislava",
      "addressCountry": "SK"
    },
    "sameAs": [] // Add social media links here if available
  };

  return (
    <html lang="sk">
      <body className={`${montserrat.variable} flex flex-col md:flex-row min-h-screen`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
