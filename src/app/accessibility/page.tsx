'use client'

import { motion } from 'framer-motion';

export default function AccessibilityStatement() {
  return (
    <div className="min-h-screen bg-[#F8F8FF] pt-24 pb-12 px-6 sm:pt-24 sm:pb-12 md:px-12 lg:pt-28 lg:pb-16 lg:px-24" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="font-noto-hebrew text-5xl lg:text-6xl font-black mb-4 mt-15 gradient-text-contact">
              הצהרת נגישות
          </h1>
          <p className="text-xl text-gray-600">
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
          <div className="bg-white rounded-2xl soft-shadow p-10 space-y-8 prose prose-lg max-w-none">
            
            <section>
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">
                  <strong>סוכנות אתרים</strong> (להלן: &quot;העסק&quot;) רואה חשיבות רבה בהנגשת שירותיה ואתר האינטרנט שלה לאנשים עם מוגבלות, 
                  מתוך תפיסה של שוויון, כבוד, נגישות ושילוב חברתי.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-ocean-sky">כתובת האתר</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                העסק פועל להנגיש את אתר האינטרנט שבבעלותו, שכתובתו:
              </p>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg text-center">
                <div className="flex items-center justify-center gap-2 text-2xl font-bold text-peaceful-dawn">
                  <span>🌐</span>
                  <span>www.atarym.com</span>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mt-4">
                כך שיהיה נגיש ונוח לשימוש עבור כלל הגולשים, לרבות אנשים עם מוגבלויות שונות.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-sunset-glow">התאמות נגישות שבוצעו באתר</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                באתר בוצעו מגוון התאמות נגישות בהתאם להנחיות התקן הישראלי (ת&quot;י 5568) ברמת AA ו/או ככל הניתן לפי WCAG 2.0. בין היתר:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: "📝", text: "אפשרות לשינוי גודל גופן" },
                  { icon: "🔤", text: "שימוש בפונט קריא וברור" },
                  { icon: "📋", text: "הדגשת כותרות" },
                  { icon: "📏", text: "ריווח שורות" },
                  { icon: "↔️", text: "יישור טקסט" },
                  { icon: "⌨️", text: "אפשרות ניווט באמצעות מקלדת בלבד" },
                  { icon: "🎨", text: "קונטרסט מותאם לנגישות" },
                  { icon: "🔄", text: "שמירה על מבנה ברור ואחיד בין הדפים" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-garden-party">נגישות פיזית</h2>
              <div className="bg-blue-50 p-6 rounded-lg border-r-4 border-ocean-sky">
                <p className="text-gray-700 leading-relaxed">
                  אין קבלת קהל או סניפים פיזיים הפעילים לציבור הרחב, ולפיכך אין כיום הסדרי נגישות פיזיים. 
                  השירות ניתן באמצעים דיגיטליים בלבד.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-rainbow-soft">מגבלות נגישות ידועות</h2>
              <p className="text-gray-700 leading-relaxed">
                על אף מאמצינו, ייתכן שחלק מהרכיבים באתר אינם מונגשים בצורה מלאה. אנו עושים כמיטב יכולתנו 
                לעמוד בדרישות החוק ולשפר באופן מתמיד את הנגישות.
              </p>
              <div className="mt-4 p-4 bg-yellow-50 border-r-4 border-sunset-glow rounded-lg">
                <p className="text-gray-700 leading-relaxed font-medium">
                  במידה ונתקלתם בקושי כלשהו בגלישה באתר, נשמח שתעדכנו אותנו ונפעל לתקן זאת בהקדם האפשרי.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-peaceful-dawn">פרטי קשר לעניין נגישות</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                לכל פנייה בנושא נגישות, אנא צרו קשר:
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
                  <span className="text-3xl">📧</span>
                  <div>
                    <div className="font-semibold text-gray-800">דוא&quot;ל</div>
                    <div className="text-peaceful-dawn font-medium">info@contact.atarym.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                  <span className="text-3xl">📞</span>
                  <div>
                    <div className="font-semibold text-gray-800">טלפון</div>
                    <div className="text-sunset-glow font-medium">050-5322336</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-4">לצורך טיפול מהיר ויעיל, מומלץ לצרף את הפרטים הבאים:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-garden-party">•</span>
                    <span>תיאור הפעולה שניסיתם לבצע</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-garden-party">•</span>
                    <span>קישור לעמוד שבו נתקלתם בבעיה</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-garden-party">•</span>
                    <span>תיאור הבעיה</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-garden-party">•</span>
                    <span>סוג דפדפן, מערכת הפעלה ומכשיר</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-garden-party">•</span>
                    <span>סוג הטכנולוגיה המסייעת (אם קיימת)</span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-candy-cloud">התחייבות</h2>
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-lg border-2 border-rainbow-soft">
                <p className="text-gray-700 leading-relaxed text-lg">
                  העסק רואה בהנגשה חלק בלתי נפרד מאיכות השירות ומחוייב לפעול באופן מתמשך לשיפור, תיקון והתאמה 
                  של האתר לצרכי כלל הציבור.
                </p>
              </div>
            </section>

            <section className="border-t border-gray-200 pt-6">
              <div className="text-center">
                <p className="text-gray-500 text-sm">
                  <strong>עודכן לאחרונה:</strong> 16/10/2025
                </p>
              </div>
            </section>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
