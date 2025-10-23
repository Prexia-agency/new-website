"use client"

import { useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/accordion';

import TitleAnimation from '@/components/shared/title-animation';

const titleItems = [
  { value: 'שאלות' },
  { value: 'נפוצות' },
];

const faqData = [
  {
    id: 'item-1',
    question: 'מה מייחד את האתרים שאתם מפתחים לעומת המתחרים האחרים?',
    answer: 'רוב האתרים בשוק נבנים על פלטפורמות סגורות כמו WordPress או Wix נוחות, אך מוגבלות בביצועים, באבטחה וביכולת להתאים את האתר בדיוק לעסק. אנחנו בוחרים בדרך אחרת. כל אתר נבנה אצלנו מאפס, מותאם לעסק, למותג ולמטרות שלך, כך שהתוצאה היא אתר שהוא נכס דיגיטלי אמיתי ולא עוד אתר מדף.'
  },
  {
    id: 'item-2',
    question: 'האם ניתן לשלב באתר אלמנטים תלת־ממדיים ואנימציות מותאמות אישית לפי הצרכים שלי?',
    answer: 'בהחלט! אנחנו מתמחים בשילוב אנימציות תלת-ממדיות מתקדמות, מיקרו-אינטראקציות ואלמנטים ויזואליים מותאמים אישית באמצעות טכנולוגיות כמו Spline, React Three Fiber ו-GSAP. כל אלמנט נבנה בקוד מלא ומותאם בדיוק לצרכים ולמותג שלכם.'
  },
  {
    id: 'item-3',
    question: 'כמה זמן לוקח בדרך כלל לסיים פרויקט אתר תדמית מלא?',
    answer: 'בממוצע, פרויקט סטנדרטי נמשך בין שבועיים לשמונה שבועות בפרויקטים יותר מורכבים, בהתאם להיקף התוכן, מספר עמודים, מורכבות האפקטים והיקף האינטראקציות הנדרשות.'
  },
  {
    id: 'item-4',
    question: 'האם ניתן לעדכן את התוכן והעיצוב של האתר לאחר ההשקה באופן עצמאי?',
    answer: 'בהחלט. האתר נבנה כך שתוכלו להוסיף, לערוך או להסיר תכנים בקלות, ולבצע התאמות עיצוב בסיסיות בבסיס הקוד הקיים.'
  },
  {
    id: 'item-5',
    question: 'אילו אפשרויות תחזוקה ותמיכה שוטפת אתם מציעים לאחר סיום הפרויקט?',
    answer: 'אנחנו מציעים חבילת תחזוקה גמישה בעלות של 79 שח לחודש לכל הלקוחות שלנו הכוללות עדכוני תוכן, בדיקות אבטחה, גיבויים שוטפים, שיפורי ביצועים ותמיכה טכנית לכל שאלה או צורך שמתעורר.'
  },
  {
    id: 'item-6',
    question: 'האם ניתן להעביר את הפרויקט לאחר סיום הפיתוח ולנהל אותו אצל צוות אחר?',
    answer: 'כן. עם סיום העבודה תוכלו לקבל את כל קבצי הקוד והגישה למערכות הדרושות, כך שכל צוות מקצועי שתבחרו יוכל להמשיך לפתח, לעדכן ולתחזק את האתר ללא מגבלות.'
  },
   {
    id: 'item-7',
    question: 'האם בניית האתר כוללת מנגנון COOKIES ונגישות לבעלי מוגבלויות?',
    answer: 'כמובן! אצלנו כל החבילות כוללת כפתור נגישות באתר והתאמה לבעלי מוגבלויות, וניהול COOKIES בהסכמת המשתמש בהתאם ל GDPR האירופאי'
  }
];

export default function FAQ() {
  const [contentRef, isContentInView] = useInView({ triggerOnce: true, threshold: 0.8 });
  const titleControls = useAnimation();

  useEffect(() => {
    if (isContentInView) {
      titleControls.start('animate');
    }
  }, [isContentInView, titleControls]);

  // Generate FAQ Schema for Google Rich Results
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="bg-white py-20 pb-32 lg:py-16 lg:pb-24 sm:py-12 sm:pb-16">
      {/* FAQ Schema - Makes FAQs appear in Google as Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12" ref={contentRef}>
          <TitleAnimation
            tag="h2"
            className="with-text-highlight-red max-w-[700px] text-4xl font-normal leading-snug lg:max-w-[650px] lg:text-[32px] sm:text-2xl mx-auto font-noto-hebrew text-gray-900"
            items={titleItems}
            animationName="second"
            controls={titleControls}
          />
        </div>
        <div dir="rtl">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border border-gray-200 rounded-lg px-6 py-4 last:border">
                <AccordionTrigger className="text-right hover:no-underline">
                  <span className="gradient-text font-semibold text-[12px] leading-relaxed sm:text-lg">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-900 leading-relaxed text-[11px] pt-2 sm:text-sm">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}