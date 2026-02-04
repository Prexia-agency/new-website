"use client";

import React, { useState } from "react";

const faqData = [
  {
    id: "item-1",
    question: "מה מייחד את PREXIA לעומת חברות דיגיטל אחרות?",
    answer:
      "PREXIA מתאפיינת בשילוב בין תהליכי עבודה קפדניים ויציבים של ארגון גדול לבין הגישה השירותית והגמישה של סטודיו מומחה. אנו פועלים בסטנדרטים מקצועיים גבוהים – עם צוות מנוסה ותשתית איתנה – ומספקים ללקוחותינו פתרונות מקצה-לקצה תחת קורת גג אחת. המשמעות היא שהפרויקטים מנוהלים באחריות ובראייה ארוכת-טווח, תוך מתן יחס אישי והבנת הצרכים הייחודיים של כל לקוח.",
  },
  {
    id: "item-2",
    question: "מהו לוח הזמנים המשוער לפרויקט טיפוסי?",
    answer:
      "משך הפרויקט משתנה בהתאם להיקף ולמורכבות. לפני ההתחלה, אנו מבצעים תכנון מפורט וקובעים יחד עם הלקוח אבני דרך ריאליות. באופן כללי, פיתוח אתר תדמיתי קטן יכול לארוך מספר שבועות, בעוד שפיתוח מערכת או מוצר דיגיטלי מורכב עשוי להימשך מספר חודשים. לאורך הדרך, אנו מקפידים לעמוד בלוחות הזמנים שנקבעו ומעדכנים את הלקוח באופן שוטף בהתקדמות הפרויקט.",
  },
  {
    id: "item-3",
    question: "האם אתם מציעים תחזוקה שוטפת לאחר השקת הפרויקט?",
    answer:
      "בהחלט. תחזוקה שוטפת והמשך ליווי נחשבים אצלנו לחלק בלתי נפרד מהשירות. לאחר ההשקה, צוות PREXIA ממשיך לוודא שהמוצר הדיגיטלי שלך מעודכן, מאובטח ומתפקד בצורה מיטבית. אנו מציעים עדכוני תוכנה, תיקוני תקלות ושיפורים לפי הצורך, וזמינים למענה שוטף לכל שאלה או בעיה. המטרה שלנו היא שהאתר או האפליקציה ימשיכו להצליח ולשרת אותך לאורך זמן.",
  },
  {
    id: "item-4",
    question: "בסיום הפרויקט, למי שייכות הזכויות והתוצרים?",
    answer:
      "עם סיום הפרויקט, כל הזכויות והתוצרים עוברים לבעלותך המלאה. אנו מקפידים על מסירה מסודרת של הקוד, התכנים והמסמכים הרלוונטיים – הכל יועבר אליך בצורה מאורגנת ושקופה. בנוסף, במידת הצורך, נערוך עבורך הדרכה לגבי תפעול המערכת או האתר, כדי להבטיח מעבר חלק ולתת לך שליטה מלאה במוצר שקיבלת.",
  },
  {
    id: "item-5",
    question: "האם האתרים והאפליקציות שאתם בונים נגישים לאנשים עם מוגבלויות?",
    answer:
      "כן. אנו דואגים לפתח בהתאם לתקני הנגישות (כגון WCAG 2.1) על מנת להבטיח שהמוצר הדיגיטלי יהיה שמיש ונוח לכל משתמש. למשל, אנו משלבים טקסט אלטרנטיבי לתמונות, דואגים לניגודיות צבעים תקינה, ומאפשרים ניווט באתר באמצעות מקלדת – כך שמשתמשים עם מוגבלות יכולים לגלוש בבטחה. מחויבותנו לנגישות היא חלק מהסטנדרט האיכותי שלנו ומותאמת גם לדרישות החוק.",
  },
  {
    id: "item-6",
    question: "איך אתם מתמודדים עם נושא הפרטיות וקבצי Cookies באתרי אינטרנט?",
    answer:
      "אנו מקפידים על עמידה בהנחיות פרטיות והגנת מידע. במידת הצורך, נשלב באתר הודעת Cookies המודיעה למשתמש על השימוש בקבצים אלה ומאפשרת לו בחירה בהעדפותיו. אנו משתמשים רק בקבצי Cookies הנחוצים לתפקוד האתר ובכלי ניתוח מאושרים (כגון Google Analytics במתכונת התואמת לתקנים), וזאת כדי לכבד את פרטיות המשתמשים. כמו כן, אנו מוודאים עמידה בתקנות כגון GDPR בעת הצורך עבור אתרים הפונים לקהל בינלאומי.",
  },
  {
    id: "item-7",
    question: "האם שילוב אנימציות באתר לא יפגע בביצועים או בחוויית המשתמש?",
    answer:
      "אנו מאמינים בשימוש מושכל באנימציות. במקרים בהם אנימציה מוסיפה לחוויית המשתמש – למשל להדגיש פעולה שבוצעה או להנחות את המשתמש – נשלב אותה באופן מתון ויעיל. אנו מקפידים שהאנימציות יהיו קלות משקל ולא יעמיסו על מהירות הטעינה. בנוסף, אנו מתחשבים בנגישות: האנימציות שאנו יוצרים מותאמות גם למשתמשים הרגישים לתנועה, וניתן לעצבן במידת הצורך. בבסיכומו של דבר, נעשה הכל כדי שהאתר יהיה דינמי ומושך, אך לעולם לא על חשבון הביצועים או הנוחות של המשתמשים.",
  },
  {
    id: "item-8",
    question: "לאחר בניית האתר, האם אוכל לעדכן תכנים ולנהל אותו בעצמי?",
    answer:
      "כן. אנו בונים את האתרים עם מערכת ניהול תוכן (CMS) ידידותית, כך שתוכל לעדכן טקסטים, תמונות ותכנים אחרים באופן עצמאי, ללא תלות במתכנת. בסיום הפרויקט נספק לך הדרכה בסיסית לשימוש במערכת הניהול, כדי להבטיח שתהיה בטוח ובקיא בהפעלתה. כמובן, צוות PREXIA ימשיך להיות זמין גם לאחר ההשקה לתמיכה, לייעוץ או לביצוע שינויים מורכבים יותר – בהתאם לצורך שלך.",
  },
];

const FAQ = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  // Generate FAQ Schema for Google Rich Results
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section
      className="bg-black py-20 px-6 lg:px-16 min-h-screen flex items-center"
      dir="rtl"
    >
      {/* FAQ Schema - Makes FAQs appear in Google as Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Title - Top on all screens, Right side on desktop */}
          <div className="lg:col-span-4">
            <h2
              className="text-gray-50 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight"
              /* eslint-disable-next-line sonarjs/no-duplicate-string */
              style={{ fontFamily: "var(--font-ppeiko), sans-serif" }}
            >
              <span className="block">Questions</span>
              <span className="block">Answers/</span>
            </h2>
          </div>

          {/* FAQ Items - Left side on desktop */}
          <div className="lg:col-span-8">
            <div className="space-y-0">
              {faqData.map((faq, _index) => (
                <div key={faq.id} className="border-t border-white/40">
                  <button
                    className="w-full flex items-center justify-between py-4 sm:py-6 text-right group hover:opacity-80 transition-opacity"
                    onClick={() => toggleItem(faq.id)}
                  >
                    <span
                      className="text-gray-50 text-sm sm:text-base lg:text-lg font-light pr-4"
                      style={{ fontFamily: "var(--font-ppeiko), sans-serif" }}
                    >
                      {faq.question}
                    </span>
                    <span
                      className="text-gray-50 text-xl sm:text-2xl font-light transition-all duration-1000"
                      style={{
                        transform:
                          openItem === faq.id
                            ? "rotate(45deg)"
                            : "rotate(0deg)",
                        display: "inline-block",
                        transitionTimingFunction:
                          "cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      +
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all ${openItem === faq.id ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
                    style={{
                      transitionDuration: "1000ms",
                      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <div className="pb-6 pr-4">
                      <p
                        className="text-gray-50/80 text-xs sm:text-sm leading-relaxed"
                        style={{ fontFamily: "var(--font-ppeiko), sans-serif" }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t border-white/40"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
