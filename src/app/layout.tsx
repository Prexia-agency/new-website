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
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleTagManagerClient from "@/components/GoogleTagManagerClient";

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
  metadataBase: new URL("https://www.atarym.com"),
  title: {
    default: "Atarym | בניית אתרים מקצועית בקוד מלא",
    template: "%s | Atarym",
  },
  description: "לא עוד אתרים מתבניות, אלא אתרים שנכתבים שורה אחרי שורה בקוד מלא, כדי להעניק מהירות, עומק ו-SEO שמתחיל בארכיטקטורה. מערכת ייעודית שנבנית עבורך עם שליטה מלאה בביצועים ואבטחה",
  keywords: [
    "בניית אתרים בקוד מלא",
    "עיצוב אתרים מקצועי",
    "פיתוח אתרים מותאם אישית",
    "אתרים ללא תבניות",
    "Next.js אתרים",
    "אתרי תדמית מתקדמים",
    "אתרים עם אנימציות",
    "פיתוח ווב מקצועי",
    "SEO ארכיטקטורה",
    "אתרים מהירים",
  ],
  authors: [{ name: "Atarym" }],
  creator: "Atarym",
  publisher: "Atarym",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: "https://www.atarym.com",
    title: "Atarym | בניית אתרים מקצועית בקוד מלא",
    description: "לא עוד אתרים מתבניות - מערכת ייעודית שנבנית עבורך. אתרים בקוד מלא עם אנימציות מתקדמות, ביצועים מעולים ו-SEO מנצח",
    siteName: "Atarym",
    images: [
      {
        url: "/images/LOGO-AK.png",
        width: 1200,
        height: 630,
        alt: "Atarym - בניית אתרים מקצועית בקוד מלא",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atarym | בניית אתרים בקוד מלא',
    description: 'לא עוד אתרים מתבניות. פיתוח מקצועי עם שליטה מלאה בביצועים ואבטחה',
    images: ['/images/LOGO-AK.png'],
  },
  alternates: {
    canonical: "https://www.atarym.com",
  },
  other: {
    'theme-color': '#6366F1',
    'msapplication-TileColor': '#6366F1',
  },
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
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansHebrew.variable} antialiased`}
      >
        {/* Organization Schema - Tells Google about your business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://www.atarym.com/#organization",
              "name": "Atarym",
              "url": "https://www.atarym.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.atarym.com/images/LOGO-AK.png",
                "width": 800,
                "height": 600
              },
              "description": "סוכנות מובילה לבניית אתרים מקצועיים בקוד מלא. לא עוד אתרים מתבניות - מערכת ייעודית עם שליטה מלאה בביצועים ואבטחה",
              "areaServed": {
                "@type": "Place",
                "name": "ישראל"
              },
              "serviceType": [
                "בניית אתרים בקוד מלא",
                "עיצוב אתרים מקצועי",
                "פיתוח ווב מותאם אישית",
                "אנימציות ווב מתקדמות",
                "אופטימיזציה למנועי חיפוש"
              ]
            })
          }}
        />
        
        {/* Website Schema - Tells Google about your website structure */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://www.atarym.com/#website",
              "url": "https://www.atarym.com",
              "name": "Atarym",
              "description": "בניית אתרים מקצועית בקוד מלא",
              "publisher": {
                "@id": "https://www.atarym.com/#organization"
              },
              "inLanguage": "he-IL"
            })
          }}
        />

        {/* Google Consent Mode - Default denied state */}
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
