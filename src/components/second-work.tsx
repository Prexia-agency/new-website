"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

import ImagePlaceholder from "@/components/shared/image-placeholder";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Services data
const services = [
  {
    id: 1,
    title: "Web Design",
    descriptionHebrew:
      "עיצוב אתרים מותאם אישית, המאזן בין אסתטיקה לבין חוויית משתמש איכותית",
    image: "014.png",
    details: [
      "אפיון מבנה האתר והיררכיית מידע",
      "עיצוב מסכים בהתאם לשפה מותגית מוגדרת",
      "התאמה מלאה למובייל ולסטנדרטים טכנולוגיים עדכניים",
      "יישום עקרונות שימושיות ונגישות",
      "ליווי עד שלב הטמעה ואישור סופי",
    ],
  },
  {
    id: 2,
    title: "App Development",
    descriptionHebrew:
      "פיתוח אפליקציות מתקדמות למובייל ווב עם טכנולוגיות חדישות.",
    image: "015.png",
    details: [
      "אפיון טכני ופונקציונלי מלא",
      "פיתוח צד לקוח וצד שרת בהתאם לדרישות",
      "חיבור למערכות קיימות ולממשקי צד ג׳",
      "בדיקות תפקוד, יציבות ואבטחה",
      "מסירה מסודרת של קוד, תשתיות ותיעוד",
    ],
  },
  {
    id: 3,
    title: "UI/UX Design",
    descriptionHebrew:
      "עיצוב ממשקים אינטואיטיביים המבוסס על מחקר משתמשים מעמיק ועקרונות UX",
    image: "016.png",
    details: [
      "מחקר משתמשים והגדרת תרחישי פעולה",
      "בניית זרימות שימוש והיררכיית מסכים",
      "תכנון ממשק התומך בתהליך ולא מסיח ממנו",
      "התאמה למוצרים קיימים או מערכות מורכבות",
      "עבודה לפי עקרונות UX מוכחים",
    ],
  },
  {
    id: 4,
    title: "Branding",
    descriptionHebrew:
      "בניית זהות מותגית חזקה ועקבית על פני כל נקודות המגע הדיגיטליות.",
    image: "017.png",
    details: [
      "הגדרת עקרונות מותג ושפה חזותית",
      "פיתוח או יישור קו למותג קיים",
      "קביעת כללי שימוש בצבע, טיפוגרפיה ורכיבים",
      "יישום עקבי באתר, מערכות וממשקים",
      "שמירה על אחידות לאורך זמן",
    ],
  },
  {
    id: 5,
    title: "AI & Workflow Automation",
    descriptionHebrew:
      "מימוש אוטומציה של תהליכים חוזרים ונשנים באמצעות טכנולוגיות בינה מלאכותית ותוכנות מתקדמות",
    image: "018.png",
    details: [
      "מיפוי תהליכים חוזרים או ידניים",
      "בניית מנגנוני אוטומציה תפעוליים",
      "שילוב בינה מלאכותית במקומות בהם יש ערך פונקציונלי",
      "חיבור בין מערכות קיימות",
      "בקרה, תחזוקה ושיפור מתמשך",
    ],
  },
];

const ServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animatedCardsRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!containerRef.current || !horizontalRef.current) return;

    const ctx = gsap.context(() => {
      const horizontal = horizontalRef.current;
      if (!horizontal) return;

      // Add delay buffer (in pixels) before horizontal scroll starts
      const delayBuffer = window.innerHeight * 0.3; // 30% of viewport height

      // Add extra space to ensure last card is fully visible - responsive to viewport
      const getExtraScrollSpace = () => {
        const vw = window.innerWidth;
        if (vw < 768) {
          // Mobile
          return vw * 0.3; // 30% for mobile (cards are 85vw)
        } else if (vw < 1024) {
          // Tablet/Medium
          return vw * 0.45; // 45% for medium (cards are 65vw)
        } else {
          // Desktop
          return vw * 0.4; // 40% for large (cards are 70vw)
        }
      };

      // Create horizontal scroll animation
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: containerRef.current,
        pin: true,
        start: "top top",
        end: () => {
          const currentScrollWidth = horizontal.scrollWidth - window.innerWidth;
          const currentExtraSpace = getExtraScrollSpace();
          return `+=${currentScrollWidth + delayBuffer + currentExtraSpace}`;
        },
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (horizontal) {
            // Calculate adjusted progress with initial delay
            // The delay only happens once at the start - horizontal scroll begins after threshold
            const currentScrollWidth =
              horizontal.scrollWidth - window.innerWidth;
            const currentExtraSpace = getExtraScrollSpace();
            const totalScrollDistance =
              currentScrollWidth + delayBuffer + currentExtraSpace;
            const delayThreshold = delayBuffer / totalScrollDistance;
            const adjustedProgress = Math.max(
              0,
              Math.min(
                1,
                (self.progress - delayThreshold) / (1 - delayThreshold),
              ),
            );

            gsap.to(horizontal, {
              x: -currentScrollWidth * adjustedProgress,
              duration: 0,
              overwrite: true,
            });

            // Trigger animations for cards that come into view
            cardRefs.current.forEach((card, index) => {
              if (!card || animatedCardsRef.current.has(index)) return;

              const cardRect = card.getBoundingClientRect();
              const windowWidth = window.innerWidth;

              // Check if card is in viewport (with some threshold)
              if (
                cardRect.left < windowWidth * 0.8 &&
                cardRect.right > windowWidth * 0.2
              ) {
                animatedCardsRef.current.add(index);

                // Animate heading
                const heading = card.querySelector("[data-card-heading]");
                const letters = heading?.querySelectorAll("[data-mask-letter]");

                if (letters && letters.length > 0) {
                  gsap.fromTo(
                    letters,
                    { y: "120%" },
                    {
                      y: "0%",
                      duration: 1.5,
                      delay: 0.1,
                      ease: "power3.out",
                      stagger: {
                        each: 0.009,
                      },
                      overwrite: true,
                    },
                  );
                }

                // Animate description with delay after heading
                const description = card.querySelector(
                  "[data-card-description]",
                );
                const descriptionLine =
                  description?.querySelector("[data-mask-line]");

                if (descriptionLine) {
                  gsap.fromTo(
                    descriptionLine,
                    { y: "120%" },
                    {
                      y: "0%",
                      duration: 1.2,
                      delay: 0.4,
                      ease: "power3.out",
                      overwrite: true,
                    },
                  );
                }

                // Animate bullet points with stagger
                const bullets = card.querySelectorAll(
                  "[data-card-bullet] span",
                );
                if (bullets && bullets.length > 0) {
                  gsap.fromTo(
                    bullets,
                    { y: "120%" },
                    {
                      y: "0%",
                      duration: 1,
                      delay: 0.6,
                      ease: "power3.out",
                      stagger: 0.08,
                      overwrite: true,
                    },
                  );
                }

                // Animate image with slight delay
                const imageWrapper = card.querySelector("[data-card-image]");
                if (imageWrapper) {
                  gsap.fromTo(
                    imageWrapper,
                    { clipPath: "inset(0% 0% 100% 0%)" },
                    {
                      clipPath: "inset(0% 0% 0% 0%)",
                      duration: 0.9,
                      delay: 0,
                      ease: "power2.out",
                      overwrite: true,
                    },
                  );
                }
              }
            });
          }
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
      scrollTriggerRef.current?.kill();
      animatedCardsRef.current.clear();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-black overflow-hidden"
      dir="ltr"
    >
      {/* Horizontal Scroll Container */}
      <div
        ref={horizontalRef}
        className="flex items-center gap-8 md:gap-12 pr-8 md:pr-16 pl-16 md:pl-24 lg:pl-32 min-h-screen pt-32 lg:pt-40"
        style={{ width: "max-content" }}
      >
        {services.map((service, index) => (
          <div
            key={service.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className={`flex flex-col w-[85vw] md:w-[65vw] lg:w-[70vw] max-w-3xl shrink-0 ${index === services.length - 1 ? "mr-16 md:mr-24 lg:mr-32" : ""}`}
          >
            {/* SR-only heading for WCAG */}
            <h2 className="sr-only">{service.title}</h2>

            {/* Visible animated heading - manual animation */}
            <div className="mb-6 text-left" data-card-heading>
              <div className="overflow-hidden">
                <p className="font-ppeiko text-white text-3xl md:text-4xl lg:text-5xl leading-tight">
                  {/* WCAG: keep real text for screen readers */}
                  <span className="sr-only">{service.title}</span>
                  {/* Visual letters only */}
                  <span aria-hidden="true" className="inline-block">
                    {service.title.split("").map((char, charIndex) => {
                      const printableChar = char === " " ? "\u00A0" : char;
                      return (
                        <span
                          key={`${service.id}-${charIndex}`}
                          className="inline-block overflow-hidden align-baseline"
                        >
                          <span
                            className="inline-block will-change-transform mask-text-initial"
                            data-mask-letter
                          >
                            {printableChar}
                          </span>
                        </span>
                      );
                    })}
                  </span>
                </p>
              </div>
            </div>

            {/* Hebrew description */}
            <div className="mb-4" dir="rtl" data-card-description>
              <h3 className="sr-only">{service.descriptionHebrew}</h3>
              <div className="overflow-hidden">
                <p
                  className="font-noto-hebrew text-white/70 text-base md:text-lg font-normal leading-relaxed text-right will-change-transform mask-text-initial"
                  aria-hidden="true"
                  data-mask-line
                >
                  {service.descriptionHebrew}
                </p>
              </div>
            </div>

            {/* Service details - bullet points */}
            {service.details && (
              <div className="mb-4" dir="rtl">
                <ul className="space-y-2">
                  {service.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start gap-3">
                      <span className="text-white/50 mt" aria-hidden="true">
                        +
                      </span>
                      <span className="sr-only">{detail}</span>
                      <div
                        className="overflow-hidden flex-1"
                        data-bullet-index={detailIndex}
                        data-card-bullet
                      >
                        <span
                          className="font-noto-hebrew text-white/60 text-sm md:text-base leading-relaxed inline-block will-change-transform mask-text-initial"
                          aria-hidden="true"
                        >
                          {detail}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Image placeholder - manual animation */}
            <div
              className="relative overflow-hidden"
              style={{ clipPath: "inset(0% 0% 100% 0%)" }}
              data-card-image
            >
              <ImagePlaceholder
                width={1200}
                height={1000}
                className="overflow-hidden"
                revealOnScroll={false}
              >
                <Image
                  src={`/images/${service.image}`}
                  alt={`${service.title} - ${service.descriptionHebrew}`}
                  className="object-cover"
                  sizes="(max-width: 640px) 85vw, (max-width: 768px) 75vw, (max-width: 1024px) 60vw, 50vw"
                  fill
                />
              </ImagePlaceholder>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
