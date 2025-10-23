import { Metadata } from "next";

export const metadata: Metadata = {
  title: "צור קשר",
  description: "מוכנים להתחיל את הפרויקט הבא שלכם? צרו קשר עם Atarym - נשמח לשמוע על הרעיון שלכם ולספק הצעת מחיר מותאמת אישית לבניית אתר בקוד מלא ללא תבניות",
  keywords: [
    "צור קשר",
    "פנייה לבניית אתר",
    "הצעת מחיר אתר",
    "יצירת קשר סוכנות אתרים",
    "פיתוח אתר בהתאמה אישית",
    "ייעוץ בניית אתרים"
  ],
  openGraph: {
    title: "צור קשר | Atarym",
    description: "בואו נדבר על הפרויקט הבא שלכם - נבנה יחד משהו מדהים בקוד מלא",
    url: "https://www.atarym.com/contact",
    type: "website",
    images: [
      {
        url: "/images/LOGO-AK.png",
        width: 1200,
        height: 630,
        alt: "צור קשר עם Atarym"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "צור קשר | Atarym",
    description: "בואו נדבר על הפרויקט הבא שלכם - נבנה יחד משהו מדהים",
    images: ["/images/LOGO-AK.png"],
  },
  alternates: {
    canonical: "https://www.atarym.com/contact",
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
            "description": "צור קשר עם Atarym לקבלת הצעת מחיר ויעוץ מקצועי לבניית אתר",
            "url": "https://www.atarym.com/contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "Atarym",
              "url": "https://www.atarym.com",
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

