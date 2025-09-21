"use client"

import React from 'react';

const items = [
  {
    title: 'אתרי תדמית (Portfolio)',
    description:
      'אתרי תדמית משלבים אלמנטים תלת־ממדיים, אנימציות חלקות ומיני-אינטראקציות המגיבות לתנועת עכבר או לגלילה, ליצירת חוויית גלישה חיה ומרשימה. לצד האפקטים הדינמיים מוצגים עמוד אודות מעוצב, גלריית פרויקטים, טפסי יצירת קשר והצגת צוות החברה, כך שהשילוב בין אינטראקטיביות לתוכן ברור מייצר רושם מקצועי ויוקרתי כבר מהרגע הראשון.',
  },
  {
    title: 'אתרי בלוג',
    description:
      'אתרי בלוג מבוססי Next.js ו-CMS מאפשרים לנהל קטגוריות ותגיות, להעלות תמונות, וידאו ומדיה עשירה, להכין טיוטות ולתזמן פרסום פוסטים, להוסיף כותבים עם הרשאות שונות ולנהל מערכת תגובות בצורה מרוכזת.',
  },
  {
    title: 'חנויות אונליין (E-Commerce)',
    description:
      'חנות אונליין שנבנית ב-Next.js ומחוברת ל-CMS מספקת ניהול מוצרים, מחירים ומלאי ישירות מתוך הממשק, סל קניות דינמי ותהליך תשלום מלא, שילוב מערכות תשלום כמו Stripe או PayPal, ניהול מבצעים וקופונים ומעקב אחר הזמנות ועדכוני סטטוס ללקוחות',
  },
  {
    title: 'פורטל תוכן / מגזין מקוון',
    description:
      'בפורטל תוכן או מגזין דיגיטלי ניתן לחלק כתבות למדורים וקטגוריות שונות, להפעיל מערכת כותבים עם הרשאות גישה מותאמות, להציג כתבות בעמוד הראשי לפי עדכניות או פופולריות, לאפשר חיפוש וסינון כתבות לפי נושא או תגית ולנהל ספריית מדיה גדולה של תמונות, וידאו וקבצים נלווים',
  },
  {
    title: 'מערכות למידה מקוונות ',
    description:
      'מערכת למידה מקוונת עם Next.js ו-CMS כוללת אפשרות להעלאת שיעורים בווידאו או במסמכים, ניהול הרשמות ותלמידים דרך ממשק הניהול, יצירת מבחנים ובחנים אינטראקטיביים, הפקת תעודות סיום אוטומטיות ומעקב אישי אחר התקדמות כל תלמיד—all מתוך ממשק CMS ידידותי.',
  },
  {
    title: 'אתרי SaaS / אפליקציות אינטרנט',
    description:
      'אפליקציות ווב בשיטת SaaS שנבנות ב-Next.js עם 3D ANIMATIONS משלבות דשבורד לניהול נתונים דינמי, אינטגרציה עם API חיצוניים, ניהול משתמשים והרשאות, עדכון תכני עזרה ומדריכים ותיעוד פנימי או דפי מוצר שמתעדכנים בקלות',
  },
  {
    title: 'אתרי קהילה / רשת חברתית קטנה',
    description:
      'אתרי קהילה קטנים מאפשרים למשתמשים להירשם וליצור פרופילים אישיים, לפרסם פוסטים ותגובות, לסמן לייקים, להשתתף בפורומים או קבוצות דיון לפי נושאים, לשלוח הודעות פרטיות או לנהל צאט בזמן אמת ולספק הרשאות מנהלים ומודרטורי',
  },
];

const Sites = () => (
  <section className="bg-white py-20 lg:py-16 sm:py-12">
    <div className="max-w-6xl mx-auto px-6 lg:px-8">
      <h2 className="max-w-[700px] text-4xl font-bold font-noto-hebrew text-gray-900 leading-snug lg:max-w-[650px] lg:text-[34px] sm:text-2xl" dir="rtl">
        סוגי אתרים שאנחנו בונים עבורכם:
      </h2>
      <ul className="mt-16 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:mt-14 lg:gap-8 sm:mt-10 sm:gap-10" dir="rtl">
        {items.map(({ title, description }, index) => (
          <li className="flex items-start" key={index}>
            <span className="text-xl font-semibold leading-snug gradient-text lg:text-2xl md:text-2xl sm:text-2xl ml-3.5">
              {index + 1}.
            </span>
            <div className="ml-2.5">
              <h3 className="text-lg font-bold font-noto-hebrew text-gray-900 leading-snug lg:text-lg sm:text-lg">
                {title}
              </h3>
              <p className="mt-3 text-[13px] text-gray-600 leading-relaxed lg:mt-2.5 lg:text-sm sm:mt-2.5 sm:text-base">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Sites;