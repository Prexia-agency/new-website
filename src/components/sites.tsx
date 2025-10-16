"use client"

import React, { useRef } from 'react';
import PortfolioIcon from './sites-icons/PortfolioIcon';
import BlogIcon from './sites-icons/BlogIcon';
import EcommerceIcon from './sites-icons/EcommerceIcon';
import PortalIcon from './sites-icons/PortalIcon';
import LearningIcon from './sites-icons/LearningIcon';
import SaasIcon from './sites-icons/SaasIcon';
import CommunityIcon from './sites-icons/CommunityIcon';

const items = [
  {
    icon: PortfolioIcon,
    title: 'אתרי תדמית (Portfolio)',
    description:
      'אתרי תדמית משלבים אלמנטים תלת־ממדיים, אנימציות חלקות ומיני-אינטראקציות המגיבות לתנועת עכבר או לגלילה, ליצירת חוויית גלישה חיה ומרשימה. לצד האפקטים הדינמיים מוצגים עמוד אודות מעוצב, גלריית פרויקטים, טפסי יצירת קשר והצגת צוות החברה, כך שהשילוב בין אינטראקטיביות לתוכן ברור מייצר רושם מקצועי ויוקרתי כבר מהרגע הראשון.',
  },
  {
    icon: BlogIcon,
    title: 'אתרי בלוג',
    description:
      'אתרי בלוג מבוססי Next.js ו-CMS מאפשרים לנהל קטגוריות ותגיות, להעלות תמונות, וידאו ומדיה עשירה, להכין טיוטות ולתזמן פרסום פוסטים, להוסיף כותבים עם הרשאות שונות ולנהל מערכת תגובות בצורה מרוכזת.',
  },
  {
    icon: EcommerceIcon,
    title: 'חנויות אונליין (E-Commerce)',
    description:
      'חנות אונליין שנבנית ב-Next.js ומחוברת ל-CMS מספקת ניהול מוצרים, מחירים ומלאי ישירות מתוך הממשק, סל קניות דינמי ותהליך תשלום מלא, שילוב מערכות תשלום כמו Stripe או PayPal, ניהול מבצעים וקופונים ומעקב אחר הזמנות ועדכוני סטטוס ללקוחות',
  },
  {
    icon: PortalIcon,
    title: 'פורטל תוכן / מגזין מקוון',
    description:
      'בפורטל תוכן או מגזין דיגיטלי ניתן לחלק כתבות למדורים וקטגוריות שונות, להפעיל מערכת כותבים עם הרשאות גישה מותאמות, להציג כתבות בעמוד הראשי לפי עדכניות או פופולריות, לאפשר חיפוש וסינון כתבות לפי נושא או תגית ולנהל ספריית מדיה גדולה של תמונות, וידאו וקבצים נלווים',
  },
  {
    icon: LearningIcon,
    title: 'מערכות למידה מקוונות ',
    description:
      'מערכת למידה מקוונת עם Next.js ו-CMS כוללת אפשרות להעלאת שיעורים בווידאו או במסמכים, ניהול הרשמות ותלמידים דרך ממשק הניהול, יצירת מבחנים ובחנים אינטראקטיביים, הפקת תעודות סיום אוטומטיות ומעקב אישי אחר התקדמות כל זה מתוך ממשק CMS ידידותי.',
  },
  {
    icon: SaasIcon,
    title: 'אתרי SaaS / אפליקציות אינטרנט',
    description:
      'אפליקציות ווב בשיטת SaaS שנבנות ב-Next.js עם 3D ANIMATIONS משלבות דשבורד לניהול נתונים דינמי, אינטגרציה עם API חיצוניים, ניהול משתמשים והרשאות, עדכון תכני עזרה ומדריכים ותיעוד פנימי או דפי מוצר שמתעדכנים בקלות',
  },
  {
    icon: CommunityIcon,
    title: 'אתרי קהילה / רשת חברתית קטנה',
    description:
      'אתרי קהילה קטנים מאפשרים למשתמשים להירשם וליצור פרופילים אישיים, לפרסם פוסטים ותגובות, לסמן לייקים, להשתתף בפורומים או קבוצות דיון לפי נושאים, לשלוח הודעות פרטיות או לנהל צאט בזמן אמת ולספק הרשאות מנהלים ומודרטורי',
  },
];

const SiteItem = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => {
  const iconRef = useRef<any>(null);

  const handleMouseEnter = () => {
    iconRef.current?.playHoverAnimation();
  };

  const handleMouseLeave = () => {
    iconRef.current?.playLeaveAnimation();
  };

  return (
    <li 
      className="flex items-start" 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="ml-3.5 mt-1">
        <Icon ref={iconRef} />
      </div>
      <div className="ml-2.5">
        <h3 className="text-lg font-bold font-noto-hebrew text-gray-900 leading-snug lg:text-lg sm:text-lg">
          {title}
        </h3>
        <p className="mt-3 text-[13px] text-gray-600 leading-relaxed lg:mt-2.5 lg:text-sm sm:mt-2.5 sm:text-base">
          {description}
        </p>
      </div>
    </li>
  );
};

const Sites = () => (
  <section className="bg-white py-20 lg:py-16 sm:py-12">
    <div className="max-w-6xl mx-auto px-6 lg:px-8">
      <h2 className="max-w-[700px] text-4xl font-bold font-noto-hebrew text-gray-900 leading-snug lg:max-w-[650px] lg:text-[34px] sm:text-2xl" dir="rtl">
        סוגי אתרים שאנחנו בונים עבורכם:
      </h2>
      <ul className="mt-16 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:mt-14 lg:gap-8 sm:mt-10 sm:gap-10" dir="rtl">
        {items.map((item, index) => (
          <SiteItem key={index} {...item} />
        ))}
      </ul>
    </div>
  </section>
);

export default Sites;