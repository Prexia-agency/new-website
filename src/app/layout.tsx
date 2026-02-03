import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import "./accessibility.css";
import ColorBlindnessFilters from "@/components/ColorBlindnessFilters";
import FooterNew from "@/components/footer-new";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleTagManagerClient from "@/components/GoogleTagManagerClient";
import AccessibilityWidget from "@/components/shared/AccessibilityWidget";
import CookiesBanner from "@/components/shared/CookiesBanner";
import GlassNavbar from "@/components/shared/GlassNavbar";
import LenisProvider from "@/components/shared/LenisProvider";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";

const geistSans = localFont({
  src: "../../public/fonts/Geist-Regular.ttf",
  variable: "--font-geist-sans",
  display: "swap",
});

const ppeiko = localFont({
  src: "../../public/fonts/PPEiko-Light.ttf",
  variable: "--font-ppeiko",
  display: "swap",
});
const geistMono = localFont({
  src: "../../public/fonts/GeistMono-Regular.ttf",
  variable: "--font-geist-mono",
  display: "swap",
});
const davidLibre = localFont({
  src: "../../public/fonts/DavidLibre-Regular.ttf",
  variable: "--font-david-libre",
  display: "swap",
});

const notoSansHebrew = localFont({
  src: "../../public/fonts/NotoSansHebrew-Regular.ttf",
  variable: "--font-noto-hebrew",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.prexia.io"),
  title: {
    default: "PREXIA | Robust Digital Solutions, Built to Last",
    template: "%s | PREXIA",
  },
  description:
    "PREXIA מתמחה בתכנון, בפיתוח ובתחזוקה שוטפת של אתרים ומוצרים דיגיטליים, תוך מתן פתרונות מותאמים אישית וביצוע מלא תחת קורת גג אחת. פתרונות דיגיטליים איכותיים עם תמיכה ארוכת טווח.",
  keywords: [
    "פיתוח אתרים מקצועי",
    "פתרונות דיגיטליים מותאמים אישית",
    "תחזוקה שוטפת אתרים",
    "פיתוח אפליקציות",
    "UI/UX עיצוב",
    "פתרונות בינה מלאכותית",
    "אוטומציה דיגיטלית",
    "Next.js פיתוח",
    "React פיתוח",
    "ניהול פרויקטים דיגיטליים",
  ],
  authors: [{ name: "PREXIA" }],
  creator: "PREXIA",
  publisher: "PREXIA",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: "https://www.prexia.io",
    title: "PREXIA | Robust Digital Solutions, Built to Last",
    description:
      "פתרונות דיגיטליים מותאמים אישית עם תמיכה מלאה. PREXIA מספקת שירותי תכנון, פיתוח ותחזוקה שוטפת תחת קורת גג אחת.",
    siteName: "PREXIA",
    images: [
      {
        url: "/images/LOGO-AK.png",
        width: 1200,
        height: 630,
        alt: "PREXIA - Robust Digital Solutions, Built to Last",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PREXIA | Robust Digital Solutions, Built to Last",
    description: "פתרונות דיגיטליים מותאמים אישית עם ביצוע מלא תחת קורת גג אחת",
    images: ["/images/LOGO-AK.png"],
  },
  alternates: {
    canonical: "https://www.prexia.io",
  },
  other: {
    "theme-color": "#6366F1",
    "msapplication-TileColor": "#6366F1",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansHebrew.variable} ${davidLibre.variable} ${ppeiko.variable} antialiased`}
      >
        {/* Organization Schema - Tells Google about your business */}
        {}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://www.prexia.io/#organization",
              name: "PREXIA",
              url: "https://www.prexia.io",
              logo: {
                "@type": "ImageObject",
                url: "https://www.prexia.io/images/LOGO-AK.png",
                width: 800,
                height: 600,
              },
              description:
                "PREXIA מתמחה בתכנון, בפיתוח ובתחזוקה שוטפת של אתרים ומוצרים דיגיטליים, תוך מתן פתרונות מותאמים אישית וביצוע מלא תחת קורת גג אחת.",
              areaServed: {
                "@type": "Place",
                name: "ישראל",
              },
              serviceType: [
                "פיתוח אתרים מקצועי",
                "עיצוב UI/UX",
                "פיתוח אפליקציות",
                "פתרונות בינה מלאכותית",
                "תחזוקה שוטפת אתרים",
              ],
            }),
          }}
        />

        {/* Website Schema - Tells Google about your website structure */}
        {}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://www.prexia.io/#website",
              url: "https://www.prexia.io",
              name: "PREXIA",
              description: "Robust Digital Solutions, Built to Last",
              publisher: {
                "@id": "https://www.prexia.io/#organization",
              },
              inLanguage: "he-IL",
            }),
          }}
        />

        {/* Google Consent Mode - Default denied state */}
        {}
        <script
          id="google-consent-default"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                ad_storage: 'denied',
                analytics_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                wait_for_update: 500
              });
            `,
          }}
        />

        <GoogleAnalytics />
        <GoogleTagManagerClient />

        <GlassNavbar />

        <LenisProvider>
          <AccessibilityProvider>
            <ColorBlindnessFilters />
            {children}
            <AccessibilityWidget />
          </AccessibilityProvider>
          <FooterNew />
          <CookiesBanner />
        </LenisProvider>
      </body>
    </html>
  );
};

export default RootLayout;
