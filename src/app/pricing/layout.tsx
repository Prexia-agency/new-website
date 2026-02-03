import { Metadata } from "next";

export const metadata: Metadata = {
  title: "מחירון שירותים",
  description: "חבילות מחירים לפיתוח דיגיטלי - מאתרי תדמית פשוטים ועד פרויקטים מורכבים עם אנימציות תלת-ממד ואינטגרציות מתקדמות. פתרונות מותאמים אישית עם תמיכה שוטפת",
  keywords: [
    "מחירון פיתוח דיגיטלי",
    "עלות בניית אתר",
    "חבילות פיתוח",
    "מחיר עיצוב UI/UX",
    "מחיר אתר תדמית",
    "עלות פיתוח אפליקציות",
    "מחיר פתרונות דיגיטליים",
    "שירותים מקצועיים מחירים"
  ],
  openGraph: {
    title: "מחירון שירותים | PREXIA",
    description: "חבילות מחירים מותאמות לכל עסק - פתרונות דיגיטליים מותאמים אישית. מאתרי תדמית בסיסיים ועד פרויקטים מורכבים",
    url: "https://www.prexia.com/pricing",
    type: "website",
    images: [
      {
        url: "/images/LOGO-AK.png",
        width: 1200,
        height: 630,
        alt: "מחירון שירותים - PREXIA"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "מחירון שירותים | PREXIA",
    description: "חבילות מחירים מותאמות לכל עסק - פתרונות דיגיטליים מותאמים אישית",
    images: ["/images/LOGO-AK.png"],
  },
  alternates: {
    canonical: "https://www.prexia.com/pricing",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Service Schema for Pricing Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "פיתוח דיגיטלי מקצועי",
            "provider": {
              "@type": "Organization",
              "name": "PREXIA",
              "url": "https://www.prexia.com"
            },
            "url": "https://www.prexia.com/pricing",
            "description": "שירותי פיתוח דיגיטלי מותאמים אישית - מאתרי תדמית פשוטים ועד פרויקטים מורכבים עם אנימציות ואינטגרציות מתקדמות",
            "areaServed": {
              "@type": "Place",
              "name": "ישראל"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "חבילות בניית אתרים",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "חבילת בסיס - אתר תדמית פשוט",
                    "description": "עד 5 עמודים, עיצוב מותאם למובייל, SEO בסיסי, טופס יצירת קשר"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "חבילת מתקדמים - אנימציות ומיקרו אינטראקציות",
                    "description": "אנימציות מתקדמות, רכיבי Spline/React Three Fiber, אלמנטים אינטראקטיביים"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "פרויקטים מורכבים + מיתוג",
                    "description": "חיבור API, אינטגרציות CRM, מיתוג מלא, עיצובי תלת-ממד חדשניים"
                  }
                }
              ]
            }
          })
        }}
      />
      {children}
    </>
  );
}

