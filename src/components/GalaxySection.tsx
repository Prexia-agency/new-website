"use client";

import { gsap } from "gsap";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";

import { useAccessibility } from "@/contexts/AccessibilityContext";

// Dynamic import with no SSR for WebGPU component
const WebGPUGalaxy = dynamic(
  () => import("@/components/webgpu-galaxy").then((mod) => mod.WebGPUGalaxy),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-blue-300 text-lg">Loading Galaxy...</p>
        </div>
      </div>
    ),
  },
);

// English text items with Hebrew content for popup cards
const hebrewTextsData = [
  {
    text: "Accessibility",
    title: "Accessibility",
    content:
      "אתרים העומדים בתקן WCAG 2.1 AA ומבטיחים גישה שווה לכל המשתמשים ללא קשר ליכולותיהם.",
  },
  {
    text: "Security",
    title: "Security",
    content:
      "הצפנה מתקדמת, אימות מאובטח ומעקב מתמיד אחר פרצות אבטחה להגנה מלאה.",
  },
  {
    text: "Cookies",
    title: "Cookie Management",
    content: "ניהול הסכמה מלא לעוגיות בהתאם ל-GDPR עם שליטה מדויקת למשתמש.",
  },
  {
    text: "Optimization",
    title: "Optimization",
    content: "פיצול קוד, טעינה עצלה ומטמון מתקדם לחוויות מהירות במיוחד.",
  },
  {
    text: "SEO",
    title: "Search Engines",
    content:
      "ארכיטקטורת SEO מיום אחד עם נתונים מובנים, אופטימיזציה של מטא ועוד.",
  },
  {
    text: "Performance",
    title: "Performance",
    content:
      "מותאם ל-Core Web Vitals עם זמני טעינה מתחת לשנייה ואינטראקציות חלקות.",
  },
  {
    text: "Privacy",
    title: "Privacy",
    content:
      "גישה המעדיפה פרטיות עם טיפול מאובטח בנתונים ובקרות שקופות למשתמש.",
  },
  {
    text: "Analytics",
    title: "Analytics",
    content:
      "מעקב ואנליטיקה מתקדמים לקבלת החלטות עסקיות מושכלות המבוססות על נתונים.",
  },
  {
    text: "Scalability",
    title: "Scalability",
    content:
      "ארכיטקטורה שתוכננה להתרחב בצורה חלקה מסטארטאפ ועד לרמת ארגון גדול.",
  },
  {
    text: "Compliance",
    title: "Compliance",
    content:
      "עמידה מלאה בתקנים בינלאומיים כולל GDPR, ADA ותקנות הענף הרלוונטיות.",
  },
  {
    text: "Mobile First",
    title: "Mobile First",
    content:
      "חוויה מושלמת בכל המכשירים עם אינטראקציות מותאמות למגע וממשק רספונסיבי.",
  },
];

const GalaxySection = () => {
  const { settings } = useAccessibility();
  const [isMobile, setIsMobile] = useState(false);
  const [key, setKey] = useState(0); // Key to force re-render
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isSlowedDown, setIsSlowedDown] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMotionPaused, setIsMotionPaused] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Track client-side mounting
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animationsRef = useRef<gsap.core.Tween[]>([]);

  const isMotionDisabled =
    prefersReducedMotion || !settings.animations || isMotionPaused;

  // Set mounted flag to true on client side to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Respect OS-level reduced-motion preference
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    setPrefersReducedMotion(mq.matches);

    // Modern browsers
    mq.addEventListener?.("change", handler);
    // Legacy Safari
    (
      mq as unknown as {
        addListener?: (cb: (e: MediaQueryListEvent) => void) => void;
      }
    )?.addListener?.(handler);

    return () => {
      mq.removeEventListener?.("change", handler);
      (
        mq as unknown as {
          removeListener?: (cb: (e: MediaQueryListEvent) => void) => void;
        }
      )?.removeListener?.(handler);
    };
  }, []);

  useEffect(() => {
    // Detect mobile on client side
    const checkMobile = () => {
      const newIsMobile = window.innerWidth < 768;
      if (newIsMobile !== isMobile) {
        setIsMobile(newIsMobile);
        setKey((prev) => prev + 1); // Force component re-render when screen size changes
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [isMobile]);

  // Animate each text element in a circle
  useEffect(() => {
    // Kill any previous animations before setting up new ones
    animationsRef.current.forEach((anim) => anim.kill());
    animationsRef.current = [];

    // If motion is disabled, keep the initial static layout (no GSAP loop)
    if (isMotionDisabled) return;

    const animations: gsap.core.Tween[] = [];
    const radius = isMobile ? 240 : 320; // Further from center (increased by ~33%)
    const duration = 120 / (0.3 * 5.5); // Even slower text rotation

    textRefs.current.forEach((textRef, index) => {
      if (!textRef) return;

      const startAngle = (index / hebrewTextsData.length) * 360;

      const animation = gsap.to(textRef, {
        duration: duration,
        ease: "none",
        repeat: -1,
        onUpdate: function () {
          const progress = this.progress();
          const currentAngle = startAngle - progress * 360; // Changed + to - for counter-clockwise
          const angleInRadians = (currentAngle * Math.PI) / 180;

          const x = Math.cos(angleInRadians) * radius;
          const y = Math.sin(angleInRadians) * radius;

          textRef.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        },
      });

      animations.push(animation);
    });

    animationsRef.current = animations;

    return () => {
      animations.forEach((anim) => anim.kill());
    };
  }, [isMobile, isMotionDisabled]);

  // Handle pause effect when hovering
  useEffect(() => {
    if (hoveredIndex !== null && !isSlowedDown) {
      setIsSlowedDown(true);
      // Pause all animations
      animationsRef.current.forEach((anim) => {
        gsap.to(anim, { timeScale: 0, duration: 0.5 });
      });
    } else if (hoveredIndex === null && isSlowedDown) {
      setIsSlowedDown(false);
      // Resume to normal speed
      animationsRef.current.forEach((anim) => {
        gsap.to(anim, { timeScale: 1, duration: 0.5 });
      });
    }
  }, [hoveredIndex, isSlowedDown]);

  // Adjust galaxy size based on device and hover state
  // Desktop: 20% smaller than original (multiplied by 0.8)
  // Mobile: 50% smaller than original (multiplied by 0.5)
  // When hovering: rotation stops
  const galaxyConfig = {
    starCount: isMobile ? 75000 : 110000, // Fewer stars on mobile for performance
    rotationSpeed: isMotionDisabled ? 0 : hoveredIndex !== null ? 0 : 0.3, // Stop rotation when hovering; disable rotation when motion is off
    spiralTightness: 1.75,
    mouseForce: 7.0,
    mouseRadius: 10.0,
    galaxyRadius: isMobile ? 6.5 : 10.4, // Mobile: 50% smaller, Desktop: 20% smaller (13.0 * 0.8)
    galaxyThickness: isMobile ? 1.5 : 2.4, // Mobile: 50% smaller, Desktop: 20% smaller (3 * 0.8)
    armCount: 2,
    armWidth: isMobile ? 1.125 : 1.8, // Mobile: 50% smaller, Desktop: 20% smaller (2.25 * 0.8)
    randomness: 1.8,
    particleSize: isMobile ? 0.04 : 0.048, // Mobile: smaller, Desktop: 20% smaller (0.06 * 0.8)
    starBrightness: 0.3,
    denseStarColor: "#1885ff",
    sparseStarColor: "#ffb28a",
    bloomStrength: 0.2,
    bloomRadius: 0.2,
    bloomThreshold: 0.1,
    cloudCount: isMobile ? 2500 : 4000, // Mobile: 50% smaller, Desktop: 20% smaller (5000 * 0.8)
    cloudSize: isMobile ? 1.5 : 2.4, // Mobile: 50% smaller, Desktop: 20% smaller (3 * 0.8)
    cloudOpacity: 0.02,
    cloudTintColor: "#ffdace",
  };

  return (
    <section className="relative w-full h-[100vh] bg-black -mt-1">
      {/* Accessible equivalent (decorative visual; semantic content for assistive tech) */}
      <div className="sr-only" dir="rtl">
        <h2>יכולות מרכזיות</h2>
        <ul>
          {hebrewTextsData.map((item) => (
            <li key={item.text}>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Gradient overlay for smooth transition from previous section */}
      <div
        className="absolute top-0 left-0 right-0 h-32 md:h-48 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0) 100%)",
        }}
      />

      {/* Pause/resume motion control (for users who don't use OS settings or the accessibility widget) */}
      <div className="absolute top-4 right-4 z-20 pointer-events-auto">
        <button
          type="button"
          className="rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2 text-xs text-white/90 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/40 disabled:opacity-60 disabled:cursor-not-allowed"
          aria-pressed={isMotionPaused}
          disabled={!settings.animations || prefersReducedMotion}
          title={
            prefersReducedMotion
              ? "Motion is reduced due to your OS setting (prefers-reduced-motion)"
              : !settings.animations
                ? "Motion is disabled in accessibility settings"
                : isMotionPaused
                  ? "Resume motion"
                  : "Pause motion"
          }
          onClick={() => setIsMotionPaused((v) => !v)}
        >
          {prefersReducedMotion || !settings.animations
            ? "Motion reduced"
            : isMotionPaused
              ? "Resume motion"
              : "Pause motion"}
        </button>
      </div>

      {/* Decorative WebGPU galaxy */}
      <div aria-hidden="true" className="w-full h-full">
        <WebGPUGalaxy
          key={key} // Force re-render when screen size changes
          className="w-full h-full"
          showUI={false} // Hide UI controls for main page
          showInfo={false} // Hide info panel for main page
          config={galaxyConfig}
        />
      </div>

      {/* Orbiting Hebrew Text with Hover Cards */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-15"
      >
        <div className="relative w-full h-full">
          {/* Centered Hover Card - appears at galaxy center */}
          {isMounted &&
            hoveredIndex !== null &&
            (() => {
              // Safe array access with explicit guard and extraction
              const safeIndex =
                hoveredIndex >= 0 && hoveredIndex < hebrewTextsData.length
                  ? hoveredIndex
                  : 0;
              const safeData = hebrewTextsData[safeIndex];
              const currentData = safeData;

              return (
                <div
                  className="absolute top-1/2 left-1/2 -translate-y-1/2 px-6 py-7 rounded-2xl shadow-2xl z-[100] min-w-[280px] max-w-[320px] pointer-events-none"
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(20px) saturate(180%)",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                    animation:
                      "cardOpenFromBottom 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                    transform: "translateY(-50%) translateX(-30%)",
                  }}
                >
                  {/* Title with PP-Eiko font - Left aligned */}
                  <h3 className="text-white font-ppeiko text-xl md:text-2xl mb-7 text-left leading-tight">
                    {currentData.title}
                  </h3>

                  {/* Hebrew Content */}
                  <p
                    className="text-white/90 text-[11px] md:text-sm leading-relaxed text-right mb-6"
                    dir="rtl"
                  >
                    {currentData.content}
                  </p>

                  {/* Divider */}
                  <div className="w-full h-[1px] bg-white/10 mb-5"></div>

                  {/* Footer */}
                  <div className="text-gray-300 text-[10px] md:text-xs text-left">
                    Learn more →
                  </div>
                </div>
              );
            })()}

          {isMounted &&
            hebrewTextsData.map((item, index) => {
              const angle = (index / hebrewTextsData.length) * 360;
              const radius = isMobile ? 240 : 400;

              // Calculate initial position
              const angleInRadians = (angle * Math.PI) / 180;
              const x = Math.cos(angleInRadians) * radius;
              const y = Math.sin(angleInRadians) * radius;

              return (
                <div
                  key={index}
                  ref={(el) => {
                    // Safe ref assignment with bounds check
                    if (index >= 0 && index < hebrewTextsData.length) {
                      textRefs.current[index] = el;
                    }
                  }}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    zIndex: hoveredIndex === index ? 100 : 10,
                  }}
                >
                  {/* Text wrapper with pointer events - larger hover area */}
                  <div
                    className="relative pointer-events-auto cursor-pointer px-6 py-4 -m-4"
                    role="button"
                    tabIndex={0}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setHoveredIndex(index);
                      }
                    }}
                  >
                    <span
                      className="text-white/80 font-ppeiko text-lg md:text-xl lg:text-2xl whitespace-nowrap block transition-all duration-300 hover:text-white/80"
                      style={{
                        textShadow:
                          "0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.2)",
                      }}
                    >
                      {item.text}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Gradient overlay for smooth transition to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 md:h-48 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0) 100%)",
        }}
      />
    </section>
  );
};

export default GalaxySection;
