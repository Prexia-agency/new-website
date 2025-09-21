import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import NavbarMobile from "@/components/navbar-mb";
import Footer from "@/components/footer";

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
  title: "AK Agency",
  description: "Digital marketing agency specializing in innovative solutions",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
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
        <NavbarMobile />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
