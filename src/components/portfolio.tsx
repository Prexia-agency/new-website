"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Portfolio = () => {
  // Sample portfolio items - replace with actual data
  const portfolioItems = [
    {
      id: 1,
      title: "קיניגמאה אתר תדמית",
      description:
        "החברה עוסקת בייצוא ביטחוני ברמה בינלאומית, תוך עמידה מלאה ברגולציות ובאישורי הייצוא של משרד הביטחון הישראלי. במסגרת פעילותה, פיתחנו עבורה מיתוג מקיף מאפס ויצרנו אתר יוקרתי ומורכב שכלל למעלה מעשרה עמודים, מיני-אינטראקציות, אלמנטים תלת-ממדיים אינטראקטיביים ושילובים מדויקים של גוונים שונים של זהב. האתגר המשמעותי ביותר היה בצד השרת, שם נדרשנו להקים מערכת חסימת גישה למדינות שאינן עומדות בתקנות הייצוא הביטחוני",
      image: "/images/P-KINIGMA.png",
    },
    {
      id: 2,
      title: " EvidenceLine אתר תדמית",
      description:
        "חברת EVIDENCELINE מתמחה במתן חוות דעת מקצועיות בתיקים אזרחיים באמצעות צוותי מומחים בעלי ניסיון רב בתחומם. עבור החברה פיתחנו אתר תדמיתי המשדר אמינות, מומחיות וסמכות מקצועית, עם דגש על חוויית משתמש נקייה וברורה שמאפשרת ללקוחות להכיר את צוות המומחים וליצור קשר ישיר לקבלת ייעוץ.",
      image: "/images/ED.png",
    },
    {
      id: 3,
      title: "הגן של שגית - אתר תדמית, הרשמה וניהול",
      description:
        "גן מפעיל אתר תדמיתי ייחודי הכולל בנוסף גם מערכת הרשמה באתר להורים דרך טופס רישום, מיד לאחר שהורה ממלא את הטופס, כל הנתונים נשמרים אוטומטית ומופיעים ישירות בטבלת Airtable של הגן, שם הגננת יכולה לראות ולעדכן את כל הנרשמים בזמן אמת. בנוסף, פותחה מערכת קישורים ייחודיים – כל הורה מקבל מהגננת לינק אישי, ורק באמצעותו ניתן להתחיל את תהליך הרישום באתר, מה שמבטיח בקרה מלאה על הגישה וההרשמה.",
      image: "/images/sagit.png",
    },
  ];

  return (
    <section className="w-full py-16 px-4 lg:px-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-noto-hebrew text-2xl tracking-[-1.12px] font-black leading-snug lg:text-[42px] max-w-[586px] md:max-w-[470px] md:text-4xl sm:text-3xl text-black text-center mx-auto mb-30">
          העבודות האחרונות שלנו
        </h2>

        <div className="relative px-4" dir="ltr">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              direction: "ltr",
              dragFree: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {portfolioItems.map((item) => (
                <CarouselItem key={item.id} className="pl-4 basis-full">
                  <div className="flex justify-center">
                    <div className="relative flex h-fit w-full max-w-2xl flex-col gap-2 overflow-hidden rounded-lg border p-4 backdrop-blur-md bg-white">
                      {/* Header Section */}
                      <div className="flex flex-row justify-between tracking-tight">
                        <div className="text-[10px] md:text-sm text-gray-500">
                          פרויקט חדש
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <div className="text-right">
                            <div className="flex items-center text-xs md:text-base font-semibold whitespace-nowrap">
                              סוכנות אתרים
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="text-[10px] md:text-sm text-gray-500">
                                סוכנות_אתרים@
                              </span>
                            </div>
                          </div>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="/images/LOGO-AK.png"
                            alt="AK Agency Logo"
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Project Title */}
                      <div className="leading-normal tracking-tighter break-words">
                        <h3 className="gradient-text text-sm md:text-lg font-semibold text- mb-2 text-right pr-2">
                          {item.title}
                        </h3>
                        <p className="text-[11px] md:text-base text-gray-900 font-normal font-noto-hebrew text-right pr-3 pl-3 pb-3">
                          {item.description}
                        </p>
                      </div>

                      {/* Project Image */}
                      <div className="flex flex-1 items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full max-h-[420px] rounded-xl border shadow-sm object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              className="h-10 w-10 md:h-12 md:w-12 -left-6 md:left-8 lg:left-20 border-2 border-transparent bg-origin-border !top-1/2 !-translate-y-1/2"
              style={{
                backgroundImage:
                  "linear-gradient(white, white), linear-gradient(90deg, #FF6A00 15%, #FF00A8 25%, #8B00FF 50%, #007BFF 75%, #00D4FF 100%)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
              }}
            />
            <CarouselNext
              className="h-10 w-10 md:h-12 md:w-12 -right-6 md:right-8 lg:right-20 border-2 border-transparent bg-origin-border !top-1/2 !-translate-y-1/2"
              style={{
                backgroundImage:
                  "linear-gradient(white, white), linear-gradient(90deg, #FF6A00 15%, #FF00A8 25%, #8B00FF 50%, #007BFF 75%, #00D4FF 100%)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
              }}
            />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
