"use client";

import { motion } from "framer-motion";

const PrivacyPage = () => {
  return (
    <div
      className="min-h-screen bg-black text-white pt-24 pb-12 px-6 sm:pt-24 sm:pb-12 md:px-12 lg:pt-28 lg:pb-16 lg:px-24"
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
            Privacy Policy
          </h1>
          <h1 className="font-noto-hebrew text-5xl lg:text-6xl font-black mb-4 text-white">
            מדיניות פרטיות
          </h1>
          <p className="text-white/70 text-sm">
            עודכנה לאחרונה: 25 בספטמבר 2025
          </p>
          <p className="text-white/70 mt-4">
            מדיניות פרטיות זו מהווה חלק בלתי נפרד מתנאי השימוש של PREXIA.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              1. כללי
            </h2>
            <div className="text-white/70 leading-relaxed space-y-3 text-sm sm:text-base">
              <p>
                שירותי PREXIA מופעלים ומנוהלים במסגרת המותג PREXIA. מדיניות
                פרטיות זו מתארת כיצד נאסף, נעשה שימוש, נשמר ומוגן מידע אישי
                במסגרת השימוש באתר PREXIA בכתובת www.prexia.io (לרבות כל
                תת־דומיין הקשור אליו). לצורכי עמידה בדין, בעלת המאגר והישות
                המשפטית האחראית לעיבוד המידע היא קיניגמאה בע״מ, חברה הרשומה
                ופועלת בישראל. התפעול השוטף של האתר, השירותים, המוצרים והתקשורת
                מול המשתמשים מתבצע באמצעות PREXIA. לעניין מדיניות זו, המונח
                &quot;אנו&quot; מתייחס לחברה, הפועלת באמצעות המותג PREXIA.
              </p>
              <p>
                אנו פועלים בהתאם לחוק הגנת הפרטיות, התשמ&quot;א-1981, לתקנות
                הגנת הפרטיות (אבטחת מידע), התשע&quot;ז-2017, ולתקנות ה-GDPR של
                האיחוד האירופי, ככל שהן חלות.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              2. סוגי המידע שאנו אוספים
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  2.1 מידע מזהה אישי (PII)
                </h3>
                <p className="text-white/70 mb-2 text-sm sm:text-base">
                  בעת השימוש באתר או שליחת טופס יצירת קשר אנו עשויים לאסוף את
                  הפרטים הבאים:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-1 mr-4 text-sm sm:text-base">
                  <li>שם מלא</li>
                  <li>כתובת דוא&quot;ל</li>
                  <li>מספר טלפון</li>
                  <li>אזרחות</li>
                  <li>כתובת IP</li>
                  <li>תוכן ההתקשרות</li>
                  <li>תפקיד או שיוך מקצועי</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  2.2 מידע לא אישי
                </h3>
                <p className="text-white/70 mb-2 text-sm sm:text-base">
                  מידע טכני ושימושי שנאסף אוטומטית, כגון:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-1 mr-4 text-sm sm:text-base">
                  <li>סוג דפדפן, מכשיר ומערכת הפעלה</li>
                  <li>פעילות באתר (עמודים שנצפו, לחיצות)</li>
                  <li>נתוני מיקום גאוגרפי</li>
                  <li>אינטראקציה עם פרסומות</li>
                  <li>
                    נתוני ניתוח אנונימיים (באמצעות Google Analytics, Facebook
                    Pixel וכדומה)
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              3. הבסיס החוקי לעיבוד מידע (בהתאם ל-GDPR)
            </h2>
            <p className="text-white/70 text-sm sm:text-base">
              אנו מעבדים מידע אישי על בסיסים חוקיים אלה:
            </p>
            <ul className="list-disc list-inside text-white/70 space-y-1 mr-4 text-sm sm:text-base">
              <li>הסכמה מפורשת שלך, כאשר אתה מוסר מידע מרצונך</li>
              <li>קיום חוזה או מענה לבקשה שהגשת</li>
              <li>עמידה בחובות חוקיות</li>
              <li>
                אינטרסים לגיטימיים, כגון ניתוח סטטיסטי, אבטחה ושיפור השירות
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              4. שימוש במידע שנאסף
            </h2>
            <p className="text-white/70 text-sm sm:text-base">
              המידע משמש אותנו למטרות הבאות:
            </p>
            <ul className="list-disc list-inside text-white/70 space-y-1 mr-4 text-sm sm:text-base">
              <li>מתן מענה לפניותיך ומתן השירותים שביקשת</li>
              <li>ניהול פניות משתמשים ותקשורת עם לקוחות</li>
              <li>שליחת ניוזלטרים ותוכן שיווקי (רק באישור מראש)</li>
              <li>שיפור האתר והשירותים שלנו</li>
              <li>התאמה אישית של חוויית המשתמש</li>
              <li>אכיפת תנאי השימוש</li>
              <li>עמידה בדרישות חוק ורגולציה</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              5. שמירת מידע
            </h2>
            <p className="text-white/70 text-sm sm:text-base">
              אנו שומרים את הנתונים לפרקי זמן הבאים:
            </p>
            <ul className="list-disc list-inside text-white/70 space-y-1 mr-4 text-sm sm:text-base">
              <li>פניות מטפסי יצירת קשר: שנתיים לאחר יצירת הקשר האחרון</li>
              <li>מנויי ניוזלטר: עד לביטול ההרשמה + שנה לצרכי ציות לחוק</li>
              <li>
                נתוני אנליטיקה: 26 חודשים (ברירת מחדל של Google Analytics)
              </li>
              <li>רישומי הסכמה שיווקית: 3 שנים לאחר ביטול ההסכמה</li>
            </ul>
            <p className="text-white/70 mt-3">
              אנו שומרים מידע רק לצורך המטרות שלשמן נאסף, לרבות צרכים חוקיים
              ועסקיים לגיטימיים. ניתן לבקש מחיקת נתונים בכל עת (ראו סעיף 11).
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              6. אחסון ואבטחת מידע
            </h2>
            <div className="text-white/70 space-y-3 text-sm sm:text-base">
              <p>
                המידע שלך עשוי להישמר בשרתים מאובטחים בישראל או מחוצה לה,
                באמצעות ספקי שירות חיצוניים. בין הספקים העיקריים, בין אם במועד
                זה ובין אם בעתיד:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-1 mr-4 text-sm sm:text-base">
                <li>Google Analytics (לניתוח פעילות האתר)</li>
                <li>Meta/Facebook Pixel (לניתוח פרסום)</li>
                <li>Resend (לשליחת הודעות מטפסי יצירת קשר)</li>
                <li>VERCEL (לאחסון האתר)</li>
              </ul>
              <p>
                אנו מיישמים אמצעי אבטחה טכנולוגיים וארגוניים מתאימים להגנה על
                הנתונים, אך אין דרך להבטיח הגנה מוחלטת מפני גישה בלתי מורשית.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              7. העברת מידע לצדדים שלישיים
            </h2>
            <div className="text-white/70 space-y-3 text-sm sm:text-base">
              <p>
                איננו מוכרים את המידע האישי שלך. מידע עשוי להימסר לצדדים שלישיים
                רק במקרים הבאים:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-1 mr-4 text-sm sm:text-base">
                <li>בהסכמתך המפורשת</li>
                <li>לשם עמידה בחובה חוקית או בצו בית משפט</li>
                <li>
                  אם נדרש על ידי רשות מוסמכת (כגון לפי דיני פרטיות או ביטחון
                  בישראל)
                </li>
                <li>
                  לצורך השלמת מתן שירות (כגון שיתופי פעולה עם קבלנים מורשים)
                </li>
                <li>במקרה של שינוי מבנה עסקי (מיזוג, רכישה וכדומה)</li>
              </ul>
              <p>
                בנוסף, ייתכן שנשתף נתוני אנליטיקה שאינם מזהים אישית עם פלטפורמות
                כמו Meta ו-Google.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              8. העברת מידע מחוץ לישראל
            </h2>
            <p className="text-white/70 text-sm sm:text-base">
              אם נתונים מועברים מחוץ לישראל או לאזור הכלכלי האירופי (EEA), נוודא
              שקיימים מנגנוני הגנה נאותים, כגון Standard Contractual Clauses
              (SCCs), כדי להבטיח את שמירת זכויותיך.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              9. שימוש בעוגיות ובכלי מעקב
            </h2>
            <div className="text-white/70 space-y-3 text-sm sm:text-base">
              <p>אנו משתמשים בעוגיות ובטכנולוגיות מעקב לצורך:</p>
              <ul className="list-disc list-inside text-white/70 space-y-1 mr-4 text-sm sm:text-base">
                <li>שיפור ביצועי האתר</li>
                <li>ניתוח תעבורה ודפוסי שימוש</li>
                <li>התאמת תוכן ופרסומות</li>
                <li>שיפור אבטחה</li>
              </ul>
              <p>
                באפשרותך לנהל את העדפות העוגיות שלך באמצעות הבאנר המוצג בביקור
                הראשון שלך באתר או באמצעות כפתור &quot;ניהול עוגיות&quot;
                שבתחתית הדף. למידע נוסף ראה את מדיניות העוגיות המלאה שלנו.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              10. ניוזלטרים ותקשורת שיווקית
            </h2>
            <div className="text-white/70 space-y-3 text-sm sm:text-base">
              <p>
                אנו עשויים לשלוח מיילים, הודעות WhatsApp או SMS רק לאחר קבלת
                הסכמה מפורשת מראש. תוכל להסיר את עצמך בכל עת באמצעות:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-1 mr-4 text-sm sm:text-base">
                <li>לחיצה על הקישור &quot;להסרה&quot; בכל הודעת מייל</li>
                <li>שליחת תגובה עם המילה STOP (ל-SMS/וואטסאפ)</li>
                <li>פנייה לכתובת info@prexia.io</li>
              </ul>
            </div>
          </section>

          {/* Section 11 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              11. זכויותיך (בהתאם ל-GDPR ולחוק הישראלי)
            </h2>
            <div className="text-white/70 space-y-3 text-sm sm:text-base">
              <p>באפשרותך:</p>
              <ul className="list-disc list-inside text-white/70 space-y-1 mr-4 text-sm sm:text-base">
                <li>לעיין בנתוניך האישיים</li>
                <li>לבקש תיקון, מחיקה או הגבלת שימוש</li>
                <li>להתנגד לעיבוד נתוניך</li>
                <li>לבטל את הסכמתך בכל עת</li>
                <li>להגיש תלונה לרשות המוסמכת</li>
              </ul>
              <p>לפנייה בנושא זכויות פרטיות: info@prexia.io</p>
              <p>טלפון: 050-5322336</p>
            </div>
          </section>

          {/* Section 12 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              12. דיווח על פגיעה בפרטיות
            </h2>
            <p className="text-white/70 text-sm sm:text-base">
              אם אתה סבור שפרטיותך נפגעה, פנה אלינו מיד לכתובת: info@prexia.io
            </p>
            <p className="text-white/70 text-sm sm:text-base">
              ציין את פרטי האירוע, ואנו נבדוק ונטפל בהתאם לחוק.
            </p>
          </section>

          {/* Section 13 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              13. עדכונים למדיניות
            </h2>
            <p className="text-white/70 text-sm sm:text-base">
              אנו עשויים לעדכן את מדיניות הפרטיות מעת לעת. כל שינוי מהותי יפורסם
              בעמוד זה בציון תאריך העדכון האחרון.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPage;
