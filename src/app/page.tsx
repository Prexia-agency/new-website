import { Metadata } from "next";
import Hero from "@/components/hero";
import HeroMobile from "@/components/hero mobile";
import SecondSection from "@/components/second-section";
import SecondSectionMobile from "@/components/second-section-mobile";
import Stack from "@/components/stack";
import Sites from "@/components/sites";
import Portfolio from "@/components/portfolio";
import FAQ from "@/components/faq";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  title: "Atarym | בניית אתרים מקצועית בקוד מלא - לא עוד תבניות",
  description: "לא עוד אתרים מתבניות, אלא אתרים שנכתבים שורה אחרי שורה בקוד מלא. מערכת ייעודית שנבנית עבורך עם שליטה מלאה בביצועים, אבטחה ו-SEO שמתחיל בארכיטקטורה. אתר קל משקל, מותאם לגוגל ונבנה בדיוק לצרכים שלך",
  keywords: [
    "בניית אתרים בקוד מלא",
    "אתרים ללא תבניות",
    "עיצוב אתרים מקצועי",
    "פיתוח אתרים מותאם אישית",
    "אתרים עם אנימציות תלת ממד",
    "Next.js אתרים",
    "React אתרים",
    "אתרים מהירים",
    "SEO ארכיטקטורה",
    "פיתוח ווב מתקדם"
  ],
  openGraph: {
    title: "Atarym | בניית אתרים בקוד מלא - לא עוד תבניות",
    description: "מערכת ייעודית שנבנית עבורך. אתרים בקוד מלא עם אנימציות מתקדמות, ביצועים מעולים ו-SEO מנצח. אתר קל משקל ומותאם לגוגל",
    url: "https://www.atarym.com",
    type: "website",
    images: [
      {
        url: "/images/LOGO-AK.png",
        width: 1200,
        height: 630,
        alt: "Atarym - בניית אתרים מקצועית בקוד מלא"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atarym | בניית אתרים בקוד מלא",
    description: "לא עוד אתרים מתבניות. מערכת ייעודית עם שליטה מלאה בביצועים ואבטחה",
    images: ["/images/LOGO-AK.png"],
  },
  alternates: {
    canonical: "https://www.atarym.com",
  },
};

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <GoogleAnalytics />
      <HeroMobile />
      <Hero />
       <Stack />
      <SecondSectionMobile />
      <SecondSection />
      <Sites />
      <Portfolio />
      <FAQ/>
    </div>
  );
}
