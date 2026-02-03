import { Metadata } from "next";

export const metadata: Metadata = {
  title: "צור קשר",
  description: "מוכנים להתחיל את הפרויקט הבא שלכם? צרו קשר עם PREXIA - נשמח לשמוע על הרעיון שלכם ולספק פתרונות דיגיטליים מותאמים אישית עם תמיכה מלאה",
  keywords: [
    "צור קשר",
    "פנייה לפיתוח דיגיטלי",
    "הצעת מחיר אתר",
    "יצירת קשר PREXIA",
    "פיתוח מותאם אישית",
    "ייעוץ פיתוח דיגיטלי"
  ],
  openGraph: {
    title: "צור קשר | PREXIA",
    description: "בואו נדבר על הפרויקט הבא שלכם - נבנה יחד פתרונות דיגיטליים איכותיים",
    url: "https://www.prexia.com/contact",
    type: "website",
    images: [
      {
        url: "/images/LOGO-AK.png",
        width: 1200,
        height: 630,
        alt: "צור קשר עם PREXIA"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "צור קשר | PREXIA",
    description: "בואו נדבר על הפרויקט הבא שלכם - פתרונות דיגיטליים מותאמים אישית",
    images: ["/images/LOGO-AK.png"],
  },
  alternates: {
    canonical: "https://www.prexia.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* ContactPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "צור קשר",
            "description": "צור קשר עם PREXIA לקבלת הצעת מחיר ויעוץ מקצועי לפיתוח דיגיטלי",
            "url": "https://www.prexia.com/contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "PREXIA",
              "url": "https://www.prexia.com",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Sales",
                "availableLanguage": ["Hebrew", "English"],
                "areaServed": "IL"
              }
            }
          })
        }}
      />
      {children}
    </>
  );
}

