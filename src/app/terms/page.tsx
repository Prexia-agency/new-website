"use client";

import { motion } from "framer-motion";

const TermsPage = () => {
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
            Terms of Use
          </h1>
          <h1 className="font-noto-hebrew text-5xl lg:text-6xl font-black mb-4 text-white">
            תנאי שימוש
          </h1>
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
              1. מטרת האתר
            </h2>
            <div className="text-white/90 leading-relaxed space-y-3 text-sm sm:text-base">
              <p>
                האתר בכתובת www.prexia.io (להלן: &quot;האתר&quot;) מופעל במסגרת
                המותג PREXIA ומיועד להציג מידע כללי אודות שירותי עיצוב, פיתוח,
                בנייה ותחזוקה של אתרים ומוצרים דיגיטליים.
              </p>
              <p>
                מטרת האתר היא לאפשר היכרות עם תחומי הפעילות של PREXIA, הצגת
                פרויקטים נבחרים, יצירת קשר ראשונית והעברת פניות לקבלת שירותים,
                לרבות שירותי בנייה, תחזוקה, עיצוב וייעוץ דיגיטלי.
              </p>
              <p>
                האתר עשוי לכלול דוגמאות, מדריכים, תכנים מקצועיים ואלמנטים
                אינטראקטיביים, שנועדו להמחיש את אופן העבודה והשירותים הניתנים
                במסגרת המותג PREXIA. חלק מהשירותים זמינים לכלל הציבור, בעוד
                שירותים אחרים ניתנים ללקוחות חוזיים בלבד, לאחר תיאום ואישור
                מראש.
              </p>
              <p>
                השירותים והתכנים המוצגים באתר אינם מהווים התחייבות, הצעה מחייבת
                או ייעוץ מקצועי פרטני, אלא מידע כללי בלבד. החברה שומרת לעצמה את
                הזכות לסרב למתן שירות, לפי שיקול דעתה.
              </p>
              <p>
                השירותים הניתנים במסגרת המותג PREXIA כוללים שירותי תכנון, עיצוב,
                פיתוח וייעוץ דיגיטלי בלבד. החברה אינה אחראית לתכנים, חומרים או
                נתונים שסופקו או הוזנו על ידי הלקוח.
              </p>
              <p>
                לצורכי התקשרות משפטית, תנאי שימוש אלה מהווים הסכם בין המשתמש
                לבין קיניגמאה בע״מ, החברה המפעילה את המותג PREXIA.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              2. הגדרות
            </h2>
            <div className="text-white/90 leading-relaxed space-y-3 text-sm sm:text-base">
              <p>לצורך תנאי שימוש אלה:</p>
              <div className="space-y-3">
                <p>
                  <strong>&quot;האתר&quot;</strong> – אתר PREXIA בכתובת
                  www.prexia.io, לרבות כל דף משנה, תת־דומיין, שירות, מערכת, תוכן
                  או רכיב הכלולים בו.
                </p>
                <p>
                  <strong>&quot;PREXIA&quot;</strong> – מותג טכנולוגי ותפעולי
                  המספק שירותי עיצוב, פיתוח, בנייה, תחזוקה וייעוץ דיגיטלי, ואשר
                  באמצעותו מופעל האתר והשירותים המוצעים בו.
                </p>
                <p>
                  <strong>&quot;החברה&quot; / &quot;הישות המשפטית&quot;</strong>{" "}
                  – קיניגמאה בע״מ, חברה הרשומה ופועלת בישראל, המשמשת כצד החוזי
                  לצורכי תנאי שימוש אלה.
                </p>
                <p>
                  <strong>&quot;משתמש&quot;</strong> – כל אדם, תאגיד, רשות או
                  גוף העושה שימוש כלשהו באתר, לרבות גלישה, צפייה בתוכן, מילוי
                  טופס, בקשת שירות או כל פעולה אחרת.
                </p>
                <p>
                  <strong>&quot;שירותים&quot;</strong> – כל שירות, תוכן, מוצר
                  דיגיטלי, תוצר, ייעוץ, עיצוב, פיתוח, תחזוקה או פעילות אחרת
                  המוצעים או ניתנים במסגרת PREXIA, בין אם בתשלום ובין אם ללא
                  תשלום.
                </p>
                <p>
                  <strong>&quot;תנאי שימוש&quot;</strong> – מסמך זה, לרבות כל
                  חלקיו, נספחיו ועדכוניו.
                </p>
                <p>
                  <strong>&quot;תוכן מוגן&quot;</strong> – כל טקסט, עיצוב,
                  גרפיקה, קוד, וידאו, תמונה, לוגו, נתון או מידע המוגנים על פי
                  דיני זכויות יוצרים וקניין רוחני בישראל או בעולם.
                </p>
                <p>
                  <strong>&quot;מידע עסקי&quot;</strong> – כל מידע הקשור
                  לפעילות, לתהליכים, למערכות או לידע של PREXIA או של החברה, אשר
                  אינו נחלת הכלל.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              3. הוראות כלליות
            </h2>
            <div className="text-white/90 leading-relaxed space-y-3 text-sm sm:text-base">
              <p>
                תנאי שימוש אלה מהווים הסכם מחייב בין המשתמש לבין החברה. כל שימוש
                באתר מהווה הסכמה מפורשת ומלאה לכל האמור בהם. מי שאינו מסכים
                לתנאים – מתבקש שלא להשתמש באתר.
              </p>
              <p>
                התנאים מנוסחים בלשון זכר מטעמי נוחות בלבד אך מתייחסים לשני
                המינים. האמור בלשון יחיד מתייחס גם לרבים, אלא אם צוין אחרת.
              </p>
              <p>
                השימוש באתר מיועד לבני 18 ומעלה. קטין רשאי להשתמש באתר רק באישור
                אפוטרופוס.
              </p>
              <p>
                המשתמש מצהיר כי כל מידע שמסר לחברה מדויק ומעודכן. החברה רשאית
                להגביל או למנוע שירות במקרים של מידע שגוי או מטעה.
              </p>
              <p>כותרות הסעיפים נועדו לנוחות בלבד ולא ישמשו לפרשנות.</p>
              <p>
                השימוש באתר כפוף גם למדיניות הפרטיות של החברה, המהווה חלק בלתי
                נפרד מתנאי שימוש אלה.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              4. פרטיות ואיסוף נתונים
            </h2>
            <div className="text-white/90 leading-relaxed space-y-3 text-sm sm:text-base">
              <p>
                החברה מכבדת את פרטיות המשתמשים ופועלת בהתאם לחוק הגנת הפרטיות,
                תשמ&quot;א–1981, לתקנות הגנת הפרטיות (אבטחת מידע),
                תשע&quot;ז–2017, ולתקנות ה-GDPR של האיחוד האירופי במידת תחולתן.
              </p>
              <p>
                במסגרת השימוש באתר עשוי להיאסף מידע כגון שם, טלפון, דוא&quot;ל,
                כתובת IP, נתוני מיקום, סוג דפדפן ועוד. מסירת המידע היא
                וולונטרית, אך ייתכן ששירותים מסוימים לא יינתנו בלעדיה.
              </p>
              <p>
                החברה רשאית להשתמש במידע זה לצורך מתן שירות, שיפור חוויית
                המשתמש, תקשורת עם הלקוח, עמידה בדרישות חוק ואבטחת מידע.
              </p>
              <p>
                החברה מיישמת אמצעי הגנה מתאימים אך אינה יכולה להבטיח חסינות
                מוחלטת.
              </p>
              <p>
                האתר משתמש בקובצי קוקיז ובכלי ניתוח (כגון Google Analytics)
                לצרכים סטטיסטיים ושיווקיים בכפוף להסכמת המשתמש. המשתמש רשאי לבקש
                לעיין, לתקן או למחוק את המידע שנשמר עליו באמצעות פנייה לכתובת:
                info@prexia.io . למידע נוסף ראה מדיניות הפרטיות שלנו.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              5. קניין רוחני
            </h2>
            <div className="text-white/90 leading-relaxed space-y-3 text-sm sm:text-base">
              <p>
                כל זכויות הקניין הרוחני באתר ובתוכנו, לרבות עיצובים, גרפיקות,
                קוד מקור, תמונות, לוגו, טקסטים, סרטונים, תוכנות, מאגרי נתונים
                ותוצרים דיגיטליים, שייכים לסוכנות אתרים או לספקים חיצוניים
                שהעניקו לה רישיון שימוש.
              </p>
              <p>
                אנימציות או תכנים ויזואליים שנלקחו ממקורות פתוחים תחת רישיון MIT
                מוצגים בכפוף לתנאי הרישיון, והקרדיט לכך ניתן לפי הנדרש.
              </p>
              <p>
                אין להעתיק, לשכפל, להפיץ, לפרסם, לשנות, למכור או להשתמש בכל תוכן
                מהאתר ללא רשות מפורשת בכתב.
              </p>
              <p>
                שימוש בתוכן האתר ללא אישור מהווה הפרת זכויות יוצרים ועשוי לגרור
                צעדים משפטיים.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              6. השימוש באתר
            </h2>
            <div className="text-white/90 leading-relaxed space-y-3 text-sm sm:text-base">
              <p>
                השימוש באתר מותר למטרות חוקיות ואישיות בלבד. החברה רשאית לשנות,
                לעדכן, להוסיף או להסיר שירותים או תכנים באתר בכל עת, לפי שיקול
                דעתה, וללא הודעה מוקדמת.
              </p>
              <p>
                המשתמש מתחייב להימנע מכל פעולה שעלולה לפגוע בפעילות האתר,
                באבטחתו או במשתמשים אחרים. החברה רשאית לחסום גישה או למחוק
                נתונים במקרה של שימוש אסור, ללא צורך בהצדקה.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              7. הגבלת אחריות
            </h2>
            <div className="text-white/90 leading-relaxed space-y-3 text-sm sm:text-base">
              <p>
                החברה מספקת שירותי עיצוב ופיתוח בלבד, ואינה מתחייבת לתוצאה
                עסקית, שיווקית או כלכלית כלשהי. כל שימוש בתוכן, במידע או
                בשירותים נעשה באחריות המשתמש בלבד.
              </p>
              <p>
                החברה לא תישא באחריות לכל נזק ישיר, עקיף, כספי או תוצאתי שייגרם
                משימוש באתר או במידע שבו. בכל מקרה שבו תוטל על החברה אחריות על
                פי דין, היא תוגבל לסכום מרבי של 5,000 ש&quot;ח בלבד.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              8. זמינות האתר והפרעות
            </h2>
            <div className="text-white/90 leading-relaxed space-y-3 text-sm sm:text-base">
              <p>
                החברה עושה מאמצים להבטיח שהאתר יהיה זמין ובטוח לשימוש, אך ייתכנו
                הפרעות עקב תקלות טכניות או תחזוקה. החברה רשאית להשבית את האתר או
                חלק ממנו בכל עת ללא הודעה מוקדמת, ואינה אחראית לנזקים עקב כך.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              9. יצירת קשר
            </h2>
            <div className="text-white/90 leading-relaxed space-y-3 text-sm sm:text-base">
              <p>
                ניתן לפנות לחברה בכל עניין הנוגע לשירות, למדיניות הפרטיות או
                לתנאי השימוש באחת מהדרכים הבאות:
              </p>
              <ul className="list-none text-white/90 text-sm sm:text-base space-y-2 mr-4">
                <li>📧 info@prexia.io</li>
                <li>📞 050-5322336</li>
                <li>📝 טופס יצירת קשר באתר.</li>
              </ul>
              <p>
                החברה תשיב לפניות בהקדם האפשרי, בכפוף לעומס הפניות ולנסיבות
                טכניות.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              10. שימושים אסורים
            </h2>
            <div className="text-white/90 leading-relaxed space-y-3 text-sm sm:text-base">
              <p>חל איסור לבצע את הפעולות הבאות:</p>
              <ul className="list-disc list-inside text-white/90 text-sm sm:text-base space-y-1 mr-4">
                <li>חדירה לא מורשית למערכות החברה.</li>
                <li>עקיפת מנגנוני אבטחה.</li>
                <li>שימוש בתוכן האתר לצרכים מסחריים ללא אישור.</li>
                <li>שליחת קוד זדוני או פגיעה באבטחת האתר.</li>
                <li>התחזות, מתן פרטים כוזבים או שימוש לא חוקי בתוכן.</li>
              </ul>
              <p>
                הפרת סעיף זה תיחשב כהפרה מהותית של תנאי השימוש ותזכה את החברה
                בכל סעד משפטי לפי החוק.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              11. אחריות המשתמש
            </h2>
            <div className="text-white/90 leading-relaxed space-y-3 text-sm sm:text-base">
              <p>
                המשתמש אחראי באופן בלעדי לכל פעולה שביצע באתר. הוא מתחייב לשפות
                את החברה בגין כל נזק, הוצאה או תביעה שתוגש נגדה עקב פעולה שביצע
                בניגוד לתנאים אלה.
              </p>
            </div>
          </section>

          {/* Section 12 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              12. שינויים בתנאים
            </h2>
            <div className="text-white/90 leading-relaxed space-y-3 text-sm sm:text-base">
              <p>
                החברה רשאית לעדכן את תנאי השימוש מעת לעת. הגרסה המעודכנת תפורסם
                באתר ותיכנס לתוקף עם פרסומה. המשך שימוש באתר מהווה הסכמה לגרסה
                המעודכנת.
              </p>
            </div>
          </section>

          {/* Section 13 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              13. התקשרות חוזית עם לקוחות
            </h2>
            <div className="text-white/90 leading-relaxed space-y-3 text-sm sm:text-base">
              <p>
                במקרה שבו נוצר שיתוף פעולה עסקי בין הלקוח לבין החברה, תיחתם
                הסכמת התקשרות מפורטת בכתב. חוזה זה יהווה את המסמך המחייב היחיד
                בין הצדדים ויכלול פירוט השירותים, המחירים, לוחות הזמנים, הזכויות
                והחובות של שני הצדדים. כל מידע באתר או שיחה טרם החתימה נועד
                לצרכים אינפורמטיביים בלבד, ואינו יוצר התחייבות חוזית. החברה
                שומרת לעצמה את הזכות לסרב להתקשרות מכל סיבה עסקית או מקצועית לפי
                שיקול דעתה.
              </p>
            </div>
          </section>

          {/* Section 14 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              14. דין וסמכות שיפוט
            </h2>
            <div className="text-white/90 leading-relaxed space-y-3 text-sm sm:text-base">
              <p>
                תנאים אלה כפופים לדיני מדינת ישראל בלבד. סמכות השיפוט הבלעדית
                בכל מחלוקת הקשורה לתנאים אלה נתונה לבתי המשפט המוסמכים בירושלים
                בלבד.
              </p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsPage;
