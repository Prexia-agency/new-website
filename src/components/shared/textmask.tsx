"use client";

import { gsap } from "gsap";
import { useEffect, useMemo, useRef } from "react";
import type { ReactNode } from "react";
import { useInView } from "react-intersection-observer";

type MaskTextProps = {
  phrases?: ReactNode[];
  className?: string;
  lineClassName?: string;
  textClassName?: string;
  /**
   * - 'lines' (default): animate each line as a whole (safe for ReactNode phrases).
   * - 'letters': animate each letter (only for string phrases; non-strings fall back to 'lines').
   */
  split?: "lines" | "letters";
  /** GSAP timing controls */
  duration?: number;
  stagger?: number;
  /** Optional delay before the animation starts (seconds). */
  delay?: number;
};

export const MaskText = ({
  phrases = [],
  className,
  lineClassName,
  textClassName,
  split = "lines",
  duration = 1.5,
  stagger = 0.09,
  delay = 0,
}: MaskTextProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const hasAnimatedRef = useRef(false);

  const [inViewRef, isInView] = useInView({
    triggerOnce: true,
    rootMargin: "-75%",
  });

  const resolvedSplit = useMemo(() => {
    if (split === "letters") {
      const hasOnlyStrings = phrases.every((p) => typeof p === "string");
      return hasOnlyStrings ? "letters" : "lines";
    }
    return "lines";
  }, [phrases, split]);

  useEffect(() => {
    if (!rootRef.current) return;

    // Check immediately if in viewport
    const checkAndAnimate = () => {
      if (!rootRef.current || hasAnimatedRef.current) return;

      // Fallback: in pinned / above-the-fold contexts IntersectionObserver can be flaky.
      // If the element is currently in the viewport, animate anyway.
      const rect = rootRef.current.getBoundingClientRect();
      const isActuallyInViewport =
        rect.bottom > 0 && rect.top < window.innerHeight;
      const shouldAnimate = isInView || isActuallyInViewport;

      if (!shouldAnimate) return;

      const ctx = gsap.context(() => {
        const letters =
          rootRef.current?.querySelectorAll<HTMLElement>("[data-mask-letter]");
        const lines =
          rootRef.current?.querySelectorAll<HTMLElement>("[data-mask-line]");

        if (resolvedSplit === "letters" && letters && letters.length > 0) {
          gsap.fromTo(
            letters,
            { y: "120%" },
            {
              y: "0%",
              duration,
              delay,
              ease: "power3.out",
              stagger: {
                each: Math.max(0, stagger / 10),
              },
              overwrite: true,
            },
          );
          return;
        }

        if (resolvedSplit === "lines" && lines && lines.length > 0) {
          gsap.fromTo(
            lines,
            { y: "120%" },
            {
              y: "0%",
              duration,
              delay,
              ease: "power3.out",
              stagger: {
                each: stagger,
              },
              overwrite: true,
            },
          );
        }
      }, rootRef);

      hasAnimatedRef.current = true;
      return () => ctx.revert();
    };

    // Initial check
    checkAndAnimate();

    // Check again after a short delay to handle layout shifts from ScrollTrigger
    const timer = setTimeout(checkAndAnimate, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, isInView, resolvedSplit, stagger, delay]);

  return (
    <div
      ref={(node) => {
        rootRef.current = node;
        inViewRef(node);
      }}
      className={className ?? "flex flex-col gap-2"}
    >
      {phrases.map((phrase: ReactNode, index: number) => {
        const key =
          typeof phrase === "string" ? `${index}-${phrase}` : String(index);

        if (resolvedSplit === "letters" && typeof phrase === "string") {
          return (
            <div key={key} className={lineClassName ?? "overflow-hidden"}>
              <p className={textClassName}>
                {/* WCAG: keep real text for screen readers with proper contrast */}
                <span className="sr-only text-foreground">{phrase}</span>
                {/* Visual letters only */}
                <span aria-hidden="true" className="inline-block">
                  {phrase.split("").map((char, charIndex) => {
                    const printableChar = char === " " ? "\u00A0" : char;
                    return (
                      <span
                        // Wrapper makes the "mask" per-letter
                        key={`${key}-${charIndex}`}
                        className="inline-block overflow-hidden align-baseline"
                      >
                        <span
                          className="inline-block will-change-transform mask-text-initial text-foreground"
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
          );
        }

        return (
          <div key={key} className={lineClassName ?? "overflow-hidden"}>
            <p
              className={`${textClassName ?? ""} will-change-transform mask-text-initial`}
              data-mask-line
            >
              {phrase}
            </p>
          </div>
        );
      })}
    </div>
  );
};
