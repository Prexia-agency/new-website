'use client';

import { motion } from 'framer-motion';
import { AuroraText } from '@/components/ui/aurora-text';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F8F8FF] text-white pt-24 pb-12 px-6 sm:pt-24 sm:pb-12 md:px-12 lg:pt-28 lg:pb-16 lg:px-24" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="font-noto-hebrew text-5xl lg:text-6xl font-black mb-4 mt-15">
            <AuroraText colors={['#FF6A00', '#FF00A8', '#8B00FF', '#007BFF', '#00D4FF']} speed={1.2}>
              מדיניות פרטיות
            </AuroraText>
          </h1>
          <p className="text-black/70 text-sm">
            עודכנה לאחרונה: 25 בספטמבר 2025
          </p>
          <p className="text-black/90 mt-4">
            מדיניות פרטיות זו מהווה חלק בלתי נפרד מתנאי השימוש של סוכנות אתרים.
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
            <h2 className="text-2xl font-bold text-black">1. כללי</h2>
            <div className="text-black/80 leading-relaxed space-y-3">
              <p>
                 סוכנות אתרים(א.כ פתרונות), שמשרדיה ממוקמים בישראל, מכבדת את פרטיותך ומתחייבת להגן על הנתונים האישיים שלך.
                מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים, חושפים, שומרים ומגנים על המידע האישי שלך בעת השימוש באתרנו בכתובת www.atarym.com
                 (כולל כל תת־דומיין הקשור אליו).
              </p>
              <p>
                אנו פועלים בהתאם לחוק הגנת הפרטיות, התשמ&quot;א-1981, לתקנות הגנת הפרטיות (אבטחת מידע), התשע&quot;ז-2017, ולתקנות ה-GDPR של האיחוד האירופי, ככל שהן חלות.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black">2. סוגי המידע שאנו אוספים</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-black mb-2">2.1 מידע מזהה אישי (PII)</h3>
                <p className="text-black/80 mb-2">בעת השימוש באתר או שליחת טופס יצירת קשר אנו עשויים לאסוף את הפרטים הבאים:</p>
                <ul className="list-disc list-inside text-black/80 space-y-1 mr-4">
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
                <h3 className="text-xl font-semibold text-black mb-2">2.2 מידע לא אישי</h3>
                <p className="text-black/80 mb-2">מידע טכני ושימושי שנאסף אוטומטית, כגון:</p>
                <ul className="list-disc list-inside text-black/80 space-y-1 mr-4">
                  <li>סוג דפדפן, מכשיר ומערכת הפעלה</li>
                  <li>פעילות באתר (עמודים שנצפו, לחיצות)</li>
                  <li>נתוני מיקום גאוגרפי</li>
                  <li>אינטראקציה עם פרסומות</li>
                  <li>נתוני ניתוח אנונימיים (באמצעות Google Analytics, Facebook Pixel וכדומה)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black">3. הבסיס החוקי לעיבוד מידע (בהתאם ל-GDPR)</h2>
            <p className="text-black/80">אנו מעבדים מידע אישי על בסיסים חוקיים אלה:</p>
            <ul className="list-disc list-inside text-black/80 space-y-1 mr-4">
              <li>הסכמה מפורשת שלך, כאשר אתה מוסר מידע מרצונך</li>
              <li>קיום חוזה או מענה לבקשה שהגשת</li>
              <li>עמידה בחובות חוקיות</li>
              <li>אינטרסים לגיטימיים, כגון ניתוח סטטיסטי, אבטחה ושיפור השירות</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black">4. שימוש במידע שנאסף</h2>
            <p className="text-black/80">המידע משמש אותנו למטרות הבאות:</p>
            <ul className="list-disc list-inside text-black/80 space-y-1 mr-4">
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
            <h2 className="text-2xl font-bold text-black">5. שמירת מידע</h2>
            <p className="text-black/80">אנו שומרים את הנתונים לפרקי זמן הבאים:</p>
            <ul className="list-disc list-inside text-black/80 space-y-1 mr-4">
              <li>פניות מטפסי יצירת קשר: שנתיים לאחר יצירת הקשר האחרון</li>
              <li>מנויי ניוזלטר: עד לביטול ההרשמה + שנה לצרכי ציות לחוק</li>
              <li>נתוני אנליטיקה: 26 חודשים (ברירת מחדל של Google Analytics)</li>
              <li>רישומי הסכמה שיווקית: 3 שנים לאחר ביטול ההסכמה</li>
            </ul>
            <p className="text-black/80 mt-3">
              אנו שומרים מידע רק לצורך המטרות שלשמן נאסף, לרבות צרכים חוקיים ועסקיים לגיטימיים.
              ניתן לבקש מחיקת נתונים בכל עת (ראו סעיף 11).
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black">6. אחסון ואבטחת מידע</h2>
            <div className="text-black/80 space-y-3">
              <p>
                המידע שלך עשוי להישמר בשרתים מאובטחים בישראל או מחוצה לה, באמצעות ספקי שירות חיצוניים.
                בין הספקים העיקריים:
              </p>
              <ul className="list-disc list-inside text-black/80 space-y-1 mr-4">
                <li>Google Analytics (לניתוח פעילות האתר)</li>
                <li>Meta/Facebook Pixel (לניתוח פרסום)</li>
                <li>Resend (לשליחת הודעות מטפסי יצירת קשר)</li>
                <li>VERCEL (לאחסון האתר)</li>
              </ul>
              <p>
                אנו מיישמים אמצעי אבטחה טכנולוגיים וארגוניים מתאימים להגנה על הנתונים, אך אין דרך להבטיח הגנה מוחלטת מפני גישה בלתי מורשית.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black">7. העברת מידע לצדדים שלישיים</h2>
            <div className="text-black/80 space-y-3">
              <p>איננו מוכרים את המידע האישי שלך.
מידע עשוי להימסר לצדדים שלישיים רק במקרים הבאים:</p>
              <ul className="list-disc list-inside text-black/80 space-y-1 mr-4">
                <li>בהסכמתך המפורשת</li>
                <li>לשם עמידה בחובה חוקית או בצו בית משפט</li>
                <li>אם נדרש על ידי רשות מוסמכת (כגון לפי דיני פרטיות או ביטחון בישראל)</li>
                <li>לצורך השלמת מתן שירות (כגון שיתופי פעולה עם קבלנים מורשים)</li>
                <li>במקרה של שינוי מבנה עסקי (מיזוג, רכישה וכדומה)</li>
              </ul>
              <p>בנוסף, ייתכן שנשתף נתוני אנליטיקה שאינם מזהים אישית עם פלטפורמות כמו Meta ו-Google.</p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black">8. העברת מידע מחוץ לישראל</h2>
            <p className="text-black/80">
              אם נתונים מועברים מחוץ לישראל או לאזור הכלכלי האירופי (EEA), נוודא שקיימים מנגנוני הגנה נאותים, כגון Standard Contractual Clauses (SCCs), כדי להבטיח את שמירת זכויותיך.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black">9. שימוש בעוגיות ובכלי מעקב</h2>
            <div className="text-black/80 space-y-3">
              <p>אנו משתמשים בעוגיות ובטכנולוגיות מעקב לצורך:</p>
              <ul className="list-disc list-inside text-black/80 space-y-1 mr-4">
                <li>שיפור ביצועי האתר</li>
                <li>ניתוח תעבורה ודפוסי שימוש</li>
                <li>התאמת תוכן ופרסומות</li>
                <li>שיפור אבטחה</li>
              </ul>
              <p>
                באפשרותך לנהל את העדפות העוגיות שלך באמצעות הבאנר המוצג בביקור הראשון שלך באתר או באמצעות כפתור &quot;ניהול עוגיות&quot; שבתחתית הדף.
                למידע נוסף ראה את מדיניות העוגיות המלאה שלנו.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black">10. ניוזלטרים ותקשורת שיווקית</h2>
            <div className="text-black/80 space-y-3">
              <p>אנו עשויים לשלוח מיילים, הודעות WhatsApp או SMS רק לאחר קבלת הסכמה מפורשת מראש.
תוכל להסיר את עצמך בכל עת באמצעות:</p>
              <ul className="list-disc list-inside text-black/80 space-y-1 mr-4">
                <li>לחיצה על הקישור &quot;להסרה&quot; בכל הודעת מייל</li>
                <li>שליחת תגובה עם המילה STOP (ל-SMS/וואטסאפ)</li>
                <li>פנייה לכתובת contact@atarym.com</li>
              </ul>
            </div>
          </section>

          {/* Section 11 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black">11. זכויותיך (בהתאם ל-GDPR ולחוק הישראלי)</h2>
            <div className="text-black/80 space-y-3">
              <p>באפשרותך:</p>
              <ul className="list-disc list-inside text-black/80 space-y-1 mr-4">
                <li>לעיין בנתוניך האישיים</li>
                <li>לבקש תיקון, מחיקה או הגבלת שימוש</li>
                <li>להתנגד לעיבוד נתוניך</li>
                <li>לבטל את הסכמתך בכל עת</li>
                <li>להגיש תלונה לרשות המוסמכת</li>
              </ul>
              <p>לפנייה בנושא זכויות פרטיות: contact@atarym.com</p>
              <p>טלפון: 050-5322336</p>
            </div>
          </section>

          {/* Section 12 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black">12. דיווח על פגיעה בפרטיות</h2>
            <p className="text-black/80">
              אם אתה סבור שפרטיותך נפגעה, פנה אלינו מיד לכתובת: contact@atarym.com
            </p>
            <p className="text-black/80">
              ציין את פרטי האירוע, ואנו נבדוק ונטפל בהתאם לחוק.
            </p>
          </section>

          {/* Section 13 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black">13. עדכונים למדיניות</h2>
            <p className="text-black/80">
              אנו עשויים לעדכן את מדיניות הפרטיות מעת לעת. כל שינוי מהותי יפורסם בעמוד זה בציון תאריך העדכון האחרון.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}