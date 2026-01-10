import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google"; // Switching to Manrope for a modern, tech feel
import "./globals.css";
import Navbar from "@/components/header/navBar";
import Footer from "@/components/footer/footer";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ionworx | Elite Solar Systems & Energy Independence",
  description: "Stop renting your power. Own it. Ionworx provides industrial-grade solar installations, battery storage, and energy intelligence for forward-thinking homes and businesses.",
  keywords: ["Solar Installation", "Tesla Powerwall alternative", "Energy Independence", "Solar Nigeria", "Commercial Solar"],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://ionworx.ng",
    siteName: "Ionworx",
    images: [{ url: "/images/og-elite.jpg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD for Local Business SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EnergyBusiness",
    "name": "Ionworx Solar Limited",
    "description": "Premium solar energy solutions provider.",
    "url": "https://ionworx.ng",
    "telephone": "+2347063000481",
    "priceRange": "$$$"
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${manrope.variable} ${inter.variable} font-sans bg-background text-foreground`}>
        <Navbar />
        <main className="min-h-screen relative overflow-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}