"use client";

import clsx from "clsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

interface ImagePlaceholderProps {
  className?: string;
  width: number;
  height: number;
  children?: React.ReactNode;
  /** Show a lightweight loading overlay (spinner) until content is ready */
  withLoader?: boolean;
  /** Accessible label for the loader (screen readers only) */
  loaderLabel?: string;
  /** Optional backdrop blur class for the loader overlay (Tailwind arbitrary values allowed) */
  loaderBlurClassName?: string;
  /** Enable reveal animation on scroll (top-to-bottom). */
  revealOnScroll?: boolean;
  /** Run reveal only once (default true). */
  revealOnce?: boolean;
  /** Duration for reveal animation (seconds). */
  revealDuration?: number;
  /** Ease for reveal animation. */
  revealEase?: string;
}

const ImagePlaceholder = React.forwardRef<
  HTMLDivElement,
  ImagePlaceholderProps
>(
  (
    {
      className,
      width,
      height,
      children,
      withLoader = false,
      loaderLabel = "טוען מדיה",
      loaderBlurClassName = "backdrop-blur-[4px]",
      revealOnScroll = false,
      revealOnce = true,
      revealDuration = 0.9,
      revealEase = "power2.out",
      ...otherProps
    },
    ref,
  ) => {
    const localRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (!revealOnScroll || typeof window === "undefined") return;
      const node = localRef.current;
      if (!node) return;

      gsap.registerPlugin(ScrollTrigger);

      // Start fully masked (clip top->bottom)
      gsap.set(node, { clipPath: "inset(0% 0% 100% 0%)" });

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: node,
          start: "top 85%",
          end: "top 40%",
          scrub: false,
          once: revealOnce,
          onEnter: () => {
            gsap.to(node, {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: revealDuration,
              ease: revealEase,
              overwrite: true,
            });
          },
          onEnterBack: () => {
            if (!revealOnce) {
              gsap.to(node, {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: revealDuration,
                ease: revealEase,
                overwrite: true,
              });
            }
          },
          onLeaveBack: () => {
            if (!revealOnce) {
              gsap.set(node, { clipPath: "inset(0% 0% 100% 0%)" });
            }
          },
        });
      }, node);

      return () => ctx.revert();
    }, [revealEase, revealDuration, revealOnScroll, revealOnce]);

    return (
      <div
        className={clsx("relative overflow-hidden", className)}
        ref={(node) => {
          localRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref)
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
        }}
        {...otherProps}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="w-full h-auto"
          src={`data:image/svg+xml;charset=utf-8,%3Csvg width='${width}' height='${height}' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E`}
          alt=""
          aria-hidden
        />

        <div className="absolute inset-0 h-full w-full">{children}</div>

        {withLoader && (
          <div
            className={clsx(
              "absolute inset-0 flex items-center justify-center bg-black/30",
              loaderBlurClassName,
            )}
            aria-live="polite"
          >
            <div
              className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin"
              aria-hidden="true"
            />
            <span className="sr-only">{loaderLabel}</span>
          </div>
        )}
      </div>
    );
  },
);

ImagePlaceholder.displayName = "ImagePlaceholder";

export default ImagePlaceholder;
