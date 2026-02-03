"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleAnimation from "@/components/shared/title-animation";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const titleItems = [
  { value: "תוכנות" },
  { value: "שנראות" },
  { value: "מושלם", className: "gradient-text-contact" },
  { value: "בכל" },
  { value: "מסך" },
];

export default function SecondSectionGsap() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const [contentRef, isContentInView] = useInView({ triggerOnce: true, threshold: 0.8 });
  const titleControls = useAnimation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isContentInView) {
      titleControls.start("animate");
    }
  }, [isContentInView, titleControls]);

  useEffect(() => {
    if (!mounted) return;
    
    const card = cardRef.current;
    const stackSection = document.querySelector("[data-section='stack']") as HTMLElement | null;
    const sitesSection = document.querySelector("section.bg-white") as HTMLElement | null;

    if (!card || !stackSection) {
      return;
    }

    // Set initial position - card starts below viewport and is hidden
    gsap.set(card, { yPercent: 100, autoAlpha: 0 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: stackSection,
        start: "bottom bottom",
        end: sitesSection ? "top top" : "+=100%",
        endTrigger: sitesSection || undefined,
        scrub: 1,
        pin: stackSection,
        pinSpacing: false,
        anticipatePin: 1,
        // markers: true, // Uncomment for debugging
        onEnter: () => {
          gsap.set(card, { autoAlpha: 1 });
          gsap.set(stackSection, { autoAlpha: 1, clearProps: "transform,opacity" });
        },
        onEnterBack: () => {
          gsap.set(card, { autoAlpha: 1 });
          gsap.set(stackSection, { autoAlpha: 0 });
        },
        onLeaveBack: () => {
          gsap.set(card, { autoAlpha: 0, yPercent: 100 });
          gsap.set(stackSection, { autoAlpha: 1, clearProps: "transform,opacity" });
        },
        onLeave: () => {
          gsap.set(card, { autoAlpha: 0, yPercent: -120 });
          gsap.set(stackSection, { autoAlpha: 0 });
        },
      },
    });

    // Slide card up and scale down stack simultaneously
    timeline.to(card, {
      yPercent: 0,
      ease: "none",
    });

    timeline.to(
      stackSection,
      {
        scale: 0.95,
        yPercent: -2,
        opacity: 0.8,
        ease: "none",
      },
      "<"
    );

    // Add label when card is fully up
    timeline.addLabel("cardUp");

    // Hold the card visible, then slide it up out of view near the end
    timeline.to(card, {
      yPercent: -120,
      ease: "none",
    }, "cardUp+=0.5");

    // Hide the stack section earlier as the card starts exiting
    timeline.to(
      stackSection,
      {
        autoAlpha: 0,
        ease: "none",
      },
      "cardUp+=0.2"
    );

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, [mounted]);

  useEffect(() => {
    const box = boxRef.current;
    const img = imgRef.current;
    const rightText = rightTextRef.current;
    const leftText = leftTextRef.current;

    if (!box || !img || !rightText || !leftText) return;

    // Continuous image rotation
    gsap.to(img, {
      rotation: 360,
      repeat: -1,
      ease: "none",
      duration: 3,
    });

    // Initial scale animation
    gsap.from(box, {
      scale: 0,
      ease: "back.out(1.7)",
      duration: 1,
      delay: 0.5,
    });

    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width: 1023px)",
        isDesktop: "(min-width: 1024px)",
      },
      (context) => {
        const { conditions } = context as { conditions: { isMobile?: boolean; isDesktop?: boolean } };

        if (conditions?.isMobile) {
          // Mobile dimensions - 25% smaller sizes
          gsap.set(box, { width: 270, height: 151.9 });
          gsap.set(rightText, { x: 165 });
          gsap.set(leftText, { x: -202.5 });

          const morphTimeline = gsap.timeline({
            repeat: -1,
            delay: 1.5,
          });

          // State 1: Desktop → State 2: Mobile (portrait)
          morphTimeline.to(box, {
            width: 75,
            height: 150,
            duration: 1.125,
            ease: "power2.inOut",
          });
          morphTimeline.to(rightText, {
            x: 52.5,
            duration: 1.125,
            ease: "power2.inOut",
          }, "<");
          morphTimeline.to(leftText, {
            x: -90,
            duration: 1.125,
            ease: "power2.inOut",
          }, "<");

          // State 2: Mobile → State 3: Tablet (landscape)
          morphTimeline.to(box, {
            width: 210,
            height: 131.3,
            duration: 1.125,
            ease: "power2.inOut",
          });
          morphTimeline.to(rightText, {
            x: 135,
            duration: 1.125,
            ease: "power2.inOut",
          }, "<");
          morphTimeline.to(leftText, {
            x: -165,
            duration: 1.125,
            ease: "power2.inOut",
          }, "<");

          // State 3: Tablet → Back to State 1: Desktop
          morphTimeline.to(box, {
            width: 270,
            height: 151.9,
            duration: 1.125,
            ease: "power2.inOut",
          });
          morphTimeline.to(rightText, {
            x: 165,
            duration: 1.125,
            ease: "power2.inOut",
          }, "<");
          morphTimeline.to(leftText, {
            x: -202.5,
            duration: 1.125,
            ease: "power2.inOut",
          }, "<");
        }

        if (conditions?.isDesktop) {
          // Desktop dimensions - original sizes
          gsap.set(box, { width: 600, height: 337.5 });
          gsap.set(rightText, { x: 365 });
          gsap.set(leftText, { x: -448 });

          const morphTimeline = gsap.timeline({
            repeat: -1,
            delay: 1.5,
          });

          // State 1: Desktop → State 2: Mobile (portrait)
          morphTimeline.to(box, {
            width: 140,
            height: 280,
            duration: 1.125,
            ease: "power2.inOut",
          });
          morphTimeline.to(rightText, {
            x: 105,
            duration: 1.125,
            ease: "power2.inOut",
          }, "<");
          morphTimeline.to(leftText, {
            x: -188,
            duration: 1.125,
            ease: "power2.inOut",
          }, "<");

          // State 2: Mobile → State 3: Tablet (landscape)
          morphTimeline.to(box, {
            width: 400,
            height: 250,
            duration: 1.125,
            ease: "power2.inOut",
          });
          morphTimeline.to(rightText, {
            x: 265,
            duration: 1.125,
            ease: "power2.inOut",
          }, "<");
          morphTimeline.to(leftText, {
            x: -348,
            duration: 1.125,
            ease: "power2.inOut",
          }, "<");

          // State 3: Tablet → Back to State 1: Desktop
          morphTimeline.to(box, {
            width: 600,
            height: 337.5,
            duration: 1.125,
            ease: "power2.inOut",
          });
          morphTimeline.to(rightText, {
            x: 365,
            duration: 1.125,
            ease: "power2.inOut",
          }, "<");
          morphTimeline.to(leftText, {
            x: -448,
            duration: 1.125,
            ease: "power2.inOut",
          }, "<");
        }
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative h-screen"
        style={{ zIndex: 10 }}
      >
        <div
          ref={cardRef}
          className="bg-[#0e100f] py-30 min-h-screen flex flex-col items-center justify-center w-full rounded-t-[10px] shadow-2xl fixed top-19 lg:top-28 left-0 right-0"
          style={{
            transform: mounted ? undefined : 'translateY(100%)',
            opacity: mounted ? undefined : 0,
            visibility: mounted ? undefined : 'hidden'
          }}
        >
          <div className="max-w-6xl mx-auto px-8 w-full">
          <div className="text-center mb-1" dir="rtl" ref={contentRef}>
            <TitleAnimation
              tag="h2"
              className="text-[38px] lg:text-6xl font-bold font-noto-hebrew text-[#fffce1] mb-6"
              items={titleItems}
              animationName="second-gsap"
              controls={titleControls}
            />
            <p className="text-[11px] lg:text-[18px] text-[#fffce1]/90 max-w-sm lg:max-w-2xl mx-auto">
              הלקוחות שלך גולשים היום בעיקר מהמובייל, אבל עדיין צריכים אתר שנראה מצוין גם על מסך מחשב. אצלנו כל חלק מקבל עיצוב מותאם אישית לכל פלטפורמה – כדי להבטיח חוויית משתמש חלקה, מהירה ומדויקת בכל גודל מסך
            </p>
          </div>

          <div className="relative flex items-center justify-center overflow-hidden h-[350px] lg:h-[450px]">
            {/* Morphing box in the center */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div
                ref={boxRef}
                className="bg-[#fffce1] rounded-[10px] flex items-center justify-center w-[270px] h-[151.9px] lg:w-[600px] lg:h-[337.5px]"
              >
                <img
                  ref={imgRef}
                  src="/images/gsap.webp"
                  alt="Responsive view"
                  className="w-1/3"
                />
              </div>
            </div>

            {/* "בכל" text on the right */}
            <div ref={rightTextRef} className="absolute left-1/2 top-1/2 -translate-y-1/2">
              <h4 className="text-[#fffce1] text-[1.56rem] lg:text-[2.1rem] font-bold inline-block">
                בכל
              </h4>
            </div>

            {/* "מסך" text on the left */}
            <div ref={leftTextRef} className="absolute left-1/2 top-1/2 -translate-y-1/2">
              <h4 className="text-[#fffce1] text-[1.56rem] lg:text-[2.1rem] font-bold inline-block">
                מסך
              </h4>
            </div>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}

