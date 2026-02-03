import { Metadata } from "next";
import HeroV from "@/components/herov";
import FAQ from "@/components/faq";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import FeaturedWorkGallery from "@/components/featured-work/FeaturedWorkGallery";
import SecondWork from "@/components/second-work";
import GalaxySection from "@/components/GalaxySection";

export const metadata: Metadata = {
  title: "PREXIA | Robust Digital Solutions, Built to Last",
  description: "PREXIA מתמחה בתכנון, בפיתוח ובתחזוקה שוטפת של אתרים ומוצרים דיגיטליים, תוך מתן פתרונות מותאמים אישית וביצוע מלא תחת קורת גג אחת. פתרונות דיגיטליים איכותיים עם תמיכה ארוכת טווח.",
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
    "ניהול פרויקטים דיגיטליים"
  ],
  openGraph: {
    title: "PREXIA | Robust Digital Solutions, Built to Last",
    description: "פתרונות דיגיטליים מותאמים אישית עם תמיכה מלאה. PREXIA מספקת שירותי תכנון, פיתוח ותחזוקה שוטפת תחת קורת גג אחת.",
    url: "https://www.prexia.com",
    type: "website",
    images: [
      {
        url: "/images/LOGO-AK.png",
        width: 1200,
        height: 630,
        alt: "PREXIA - Robust Digital Solutions, Built to Last"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PREXIA | Robust Digital Solutions, Built to Last",
    description: "פתרונות דיגיטליים מותאמים אישית עם ביצוע מלא תחת קורת גג אחת",
    images: ["/images/LOGO-AK.png"],
  },
  alternates: {
    canonical: "https://www.prexia.com",
  },
};

export default function Home() {
  return (
   <div className="overflow-x-hidden">
      <GoogleAnalytics />
      <HeroV />
      <SecondWork />
      <GalaxySection />
      <FeaturedWorkGallery />
      <FAQ />
    </div>
  );
}
