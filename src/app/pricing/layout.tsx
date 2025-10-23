import { Metadata } from "next";

export const metadata: Metadata = {
  title: "מחירון אתרים",
  description: "חבילות מחירים לבניית אתרים בקוד מלא - מאתרי תדמית פשוטים ועד פרויקטים מורכבים עם אנימציות תלת-ממד ואינטגרציות מתקדמות. לא עוד אתרים מתבניות, מערכת ייעודית שנבנית עבורך",
  keywords: [
    "מחירון אתרים",
    "עלות בניית אתר",
    "חבילות אתרים",
    "מחיר עיצוב אתר",
    "מחיר אתר תדמית",
    "עלות פיתוח אתר",
    "מחיר אתר עם אנימציות",
    "אתרים מקצועיים מחירים"
  ],
  openGraph: {
    title: "מחירון אתרים | Atarym",
    description: "חבילות מחירים מותאמות לכל עסק - אתרים בקוד מלא ללא תבניות. מאתרי תדמית בסיסיים ועד פרויקטים מורכבים עם אנימציות",
    url: "https://www.atarym.com/pricing",
    type: "website",
    images: [
      {
        url: "/images/LOGO-AK.png",
        width: 1200,
        height: 630,
        alt: "מחירון בניית אתרים - Atarym"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "מחירון אתרים | Atarym",
    description: "חבילות מחירים מותאמות לכל עסק - אתרים בקוד מלא ללא תבניות",
    images: ["/images/LOGO-AK.png"],
  },
  alternates: {
    canonical: "https://www.atarym.com/pricing",
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
            "name": "בניית אתרים מקצועית",
            "provider": {
              "@type": "Organization",
              "name": "Atarym",
              "url": "https://www.atarym.com"
            },
            "url": "https://www.atarym.com/pricing",
            "description": "שירותי בניית אתרים בקוד מלא - מאתרי תדמית פשוטים ועד פרויקטים מורכבים עם אנימציות ואינטגרציות מתקדמות",
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

