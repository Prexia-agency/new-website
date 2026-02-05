"use client";

import { motion } from "framer-motion";

const AccessibilityStatement = () => {
  return (
    <div
      className="min-h-screen pt-24 pb-12 px-6 sm:pt-24 sm:pb-12 md:px-12 lg:pt-28 lg:pb-16 lg:px-24"
      dir="rtl"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="font-ppeiko text-5xl lg:text-6xl font-light mb-2 mt-15 text-white">
            Accessibility Statement
          </h1>
          <h1 className="font-noto-hebrew text-5xl lg:text-6xl font-black mb-4 text-white">
            הצהרת נגישות
          </h1>
          <p className="text-lg sm:text-xl text-white">
            התחייבותנו לנגישות עבור כלל הציבור
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="rounded-2xl p-10 space-y-8 prose prose-lg max-w-none">
            <section>
              <div className="bg-white/5 p-6 rounded-lg border-r-4 border-ocean-sky mb-6">
                <p className="text-white leading-relaxed text-sm sm:text-base mb-4">
                  האתר בכתובת{" "}
                  <strong className="text-white">www.prexia.io</strong> מופעל
                  במסגרת המותג PREXIA ומנוהל על ידי קיניגמאה בע״מ (להלן:
                  &quot;החברה&quot;).
                </p>
                <p className="text-white leading-relaxed text-sm sm:text-base">
                  החברה רואה חשיבות רבה בהנגשת השירותים הדיגיטליים ואתר האינטרנט
                  לאנשים עם מוגבלות, מתוך מחויבות לשוויון, כבוד, נגישות ושילוב
                  חברתי.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white text-ocean-sky">
                כתובת האתר
              </h2>
              <p className="text-white leading-relaxed text-sm sm:text-base mb-4">
                החברה פועלת להנגיש את אתר האינטרנט שבניהולה, שכתובתו:
              </p>
              <div className="bg-white/10 p-6 rounded-lg text-center">
                <div className="flex items-center justify-center gap-2 text-2xl font-bold text-peaceful-dawn">
                  <p className="text-white">www.prexia.io</p>
                </div>
              </div>
              <p className="text-white leading-relaxed text-sm sm:text-base mt-4">
                כך שיהיה נגיש ונוח לשימוש עבור כלל הגולשים, לרבות אנשים עם
                מוגבלויות שונות.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white text-sunset-glow">
                התאמות נגישות שבוצעו באתר
              </h2>
              <p className="text-white leading-relaxed text-sm sm:text-base mb-6">
                באתר בוצעו התאמות נגישות בהתאם להנחיות התקן הישראלי ת&quot;י
                5568 ברמת AA ו/או בהתאם להנחיות WCAG 2.0, ככל הניתן, ובין היתר:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { text: "אפשרות לשינוי גודל גופן" },
                  { text: "שימוש בפונט קריא וברור" },
                  { text: "הדגשת כותרות והיררכיית תוכן" },
                  { text: "ריווח שורות ויישור טקסט נגיש" },
                  { text: "אפשרות ניווט באמצעות מקלדת בלבד" },
                  { text: "התאמת ניגודיות צבעים" },
                  { text: "שמירה על מבנה אחיד וברור בין עמודי האתר" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border-r-2 border-sunset-glow/50"
                  >
                    <div className="w-2 h-2 rounded-full bg-sunset-glow flex-shrink-0"></div>
                    <span className="text-white text-sm sm:text-base">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white text-garden-party">
                נגישות פיזית
              </h2>
              <div className="bg-white/5 p-6 rounded-lg border-r-4 border-garden-party">
                <p className="text-white leading-relaxed text-sm sm:text-base">
                  החברה אינה מקיימת קבלת קהל או פעילות פרונטלית, ולפיכך אין כיום
                  הסדרי נגישות פיזיים. כלל השירותים ניתנים באמצעים דיגיטליים
                  בלבד.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white text-rainbow-soft">
                מגבלות נגישות ידועות
              </h2>
              <p className="text-white leading-relaxed text-sm sm:text-base mb-4">
                על אף מאמצינו, ייתכן כי חלק מהרכיבים באתר אינם מונגשים באופן
                מלא. החברה פועלת לשיפור מתמיד של רמת הנגישות ולתיקון ליקויים ככל
                שיתגלו.
              </p>
              <div className="mt-4 p-4 bg-white/5 border-r-4 border-sunset-glow rounded-lg">
                <p className="text-white leading-relaxed text-sm sm:text-base font-medium">
                  במידה ונתקלתם בקושי כלשהו בגלישה באתר, נשמח לקבל פנייה ולפעול
                  לתיקון בהקדם האפשרי.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white text-peaceful-dawn">
                פרטי קשר לעניין נגישות
              </h2>
              <p className="text-white leading-relaxed text-sm sm:text-base mb-6">
                לפניות בנושא נגישות ניתן ליצור קשר:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border-r-4 border-ocean-sky">
                  <div className="font-semibold text-white text-lg mb-2">
                    דוא&quot;ל
                  </div>
                  <div className="text-white font-medium">info@prexia.io</div>
                </div>

                <div className="p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border-r-4 border-peaceful-dawn">
                  <div className="font-semibold text-white text-lg mb-2">
                    טלפון
                  </div>
                  <div className="text-white font-medium">050-5322336</div>
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-lg border-r-4 border-ocean-sky">
                <h3 className="font-semibold text-white text-lg mb-4">
                  לצורך טיפול יעיל, מומלץ לצרף:
                </h3>
                <ul className="space-y-3 text-white text-sm sm:text-base">
                  <li className="flex items-start gap-3 pr-2">
                    <span className="text-ocean-sky font-bold">•</span>
                    <span>תיאור הפעולה שבוצעה</span>
                  </li>
                  <li className="flex items-start gap-3 pr-2">
                    <span className="text-ocean-sky font-bold">•</span>
                    <span>קישור לעמוד הרלוונטי</span>
                  </li>
                  <li className="flex items-start gap-3 pr-2">
                    <span className="text-ocean-sky font-bold">•</span>
                    <span>תיאור הבעיה</span>
                  </li>
                  <li className="flex items-start gap-3 pr-2">
                    <span className="text-ocean-sky font-bold">•</span>
                    <span>סוג דפדפן, מערכת הפעלה ומכשיר</span>
                  </li>
                  <li className="flex items-start gap-3 pr-2">
                    <span className="text-ocean-sky font-bold">•</span>
                    <span>שימוש בטכנולוגיה מסייעת, ככל שיש</span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white text-candy-cloud">
                התחייבות
              </h2>
              <div className="bg-white/5 p-6 rounded-lg border-2 border-candy-cloud">
                <p className="text-white leading-relaxed text-sm sm:text-base">
                  החברה רואה בהנגשת האתר והשירותים חלק בלתי נפרד מאיכות השירות,
                  ומתחייבת לפעול באופן שוטף לשיפור, תיקון והתאמה לצורכי כלל
                  הציבור.
                </p>
              </div>
            </section>

            <section className="border-t border-white/20 pt-6">
              <div className="text-center">
                <p className="text-white text-sm">
                  <strong>עודכן לאחרונה:</strong> 16/10/2025
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AccessibilityStatement;
