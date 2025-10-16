import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "./accessibility.css";
import Navbar from "@/components/navbar";
import NavbarMobile from "@/components/navbar-mb";
import Footer from "@/components/footer";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import AccessibilityWidget from "@/components/shared/AccessibilityWidget";
import ColorBlindnessFilters from "@/components/ColorBlindnessFilters";
import CookiesBanner from "@/components/shared/CookiesBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansHebrew = localFont({
  src: "../../public/fonts/NotoSansHebrew-Regular.ttf",
  variable: "--font-noto-hebrew",
  display: "swap",
});

export const metadata: Metadata = {
  title: "סוכנות אתרים",
  description: "סוכנות אתרים בונה ומעצבת אתרים שמותאמים לצרכים של העסק שלך עם עיצוב מקצועי, חווית משתמש מתקדמת ו - SEO שמביא תוצאות",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansHebrew.variable} antialiased`}
      >
        <AccessibilityProvider>
          <ColorBlindnessFilters />
          <NavbarMobile />
          <Navbar />
          {children}
          <AccessibilityWidget />
        </AccessibilityProvider>
        <Footer />
        <CookiesBanner />
      </body>
    </html>
  );
}
