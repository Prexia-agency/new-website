"use client";

import { gsap } from "gsap";
import { useRef, useImperativeHandle, forwardRef } from "react";

export interface IconHandle {
  playHoverAnimation: () => void;
  playLeaveAnimation: () => void;
}

const LearningIcon = forwardRef<IconHandle>((props, ref) => {
  const capRef = useRef<SVGPathElement>(null);
  const tasselRef = useRef<SVGLineElement>(null);
  const bookRef = useRef<SVGRectElement>(null);
  const page1Ref = useRef<SVGLineElement>(null);
  const page2Ref = useRef<SVGLineElement>(null);
  const star1Ref = useRef<SVGPathElement>(null);
  const star2Ref = useRef<SVGPathElement>(null);
  const certificateRef = useRef<SVGRectElement>(null);

  useImperativeHandle(ref, () => ({
    playHoverAnimation: () => {
      const cap = capRef.current;
      const tassel = tasselRef.current;
      const book = bookRef.current;
      const pages = [page1Ref.current, page2Ref.current];
      const stars = [star1Ref.current, star2Ref.current];
      const certificate = certificateRef.current;
      const tl = gsap.timeline();

      // Book opens and glows
      tl.to(book, {
        stroke: "#FFD700",
        strokeWidth: 2.5,
        scaleX: 1.15,
        filter: "drop-shadow(0 0 12px rgba(255, 215, 0, 0.5))",
        duration: 0.4,
        ease: "power2.out",
        transformOrigin: "center center",
      });

      // Pages turn/appear
      pages.forEach((page, index) => {
        tl.fromTo(
          page,
          { strokeDashoffset: 20, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          },
          0.2 + index * 0.15,
        );
      });

      // Cap floats up with excitement
      tl.to(
        cap,
        {
          y: -6,
          rotation: 5,
          duration: 0.5,
          ease: "power2.out",
        },
        0.3,
      )

        // Tassel swings energetically
        .to(
          tassel,
          {
            rotation: 25,
            transformOrigin: "top center",
            duration: 0.25,
            ease: "power2.inOut",
            yoyo: true,
            repeat: 3,
          },
          0.4,
        )

        // Certificate/award appears
        .fromTo(
          certificate,
          { scale: 0, rotation: -45, opacity: 0 },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            transformOrigin: "center center",
          },
          0.6,
        );

      // Stars burst out
      stars.forEach((star, index) => {
        tl.fromTo(
          star,
          { scale: 0, rotation: 0, opacity: 0 },
          {
            scale: 1,
            rotation: 180,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(2)",
            transformOrigin: "center center",
          },
          0.8 + index * 0.1,
        ).to(star, {
          y: -5,
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    },
    playLeaveAnimation: () => {
      const cap = capRef.current;
      const tassel = tasselRef.current;
      const book = bookRef.current;
      const pages = [page1Ref.current, page2Ref.current];
      const certificate = certificateRef.current;
      const tl = gsap.timeline();

      tl.to(cap, {
        y: 0,
        rotation: 0,
        duration: 0.3,
        ease: "power2.in",
      });

      tl.to(
        tassel,
        {
          rotation: 0,
          duration: 0.2,
          ease: "power2.in",
        },
        0,
      );

      tl.to(
        book,
        {
          stroke: "url(#learningGradient)",
          strokeWidth: 2,
          scaleX: 1,
          filter: "drop-shadow(0 0 0px rgba(255, 215, 0, 0))",
          duration: 0.3,
          ease: "power2.in",
        },
        0,
      );

      tl.to(
        pages,
        {
          strokeDashoffset: 20,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        0,
      );

      tl.to(
        certificate,
        {
          scale: 0,
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        },
        0,
      );
    },
  }));

  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <defs>
        <linearGradient
          id="learningGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FF6A00" />
          <stop offset="50%" stopColor="#FF00A8" />
          <stop offset="100%" stopColor="#8B00FF" />
        </linearGradient>
      </defs>

      {/* Graduation Cap */}
      <path
        ref={capRef}
        d="M20 8 L6 14 L20 20 L34 14 L20 8 Z M20 20 L20 26 M14 16 L14 22 L20 26 L26 22 L26 16"
        fill="none"
        stroke="url(#learningGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Tassel */}
      <line
        ref={tasselRef}
        x1="20"
        y1="8"
        x2="20"
        y2="4"
        stroke="url(#learningGradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Book */}
      <rect
        ref={bookRef}
        x="10"
        y="28"
        width="20"
        height="8"
        rx="1"
        fill="none"
        stroke="url(#learningGradient)"
        strokeWidth="2"
      />

      {/* Book pages */}
      <line
        ref={page1Ref}
        x1="13"
        y1="31"
        x2="18"
        y2="31"
        stroke="url(#learningGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="20"
        strokeDashoffset="20"
        opacity="0"
      />
      <line
        ref={page2Ref}
        x1="13"
        y1="34"
        x2="17"
        y2="34"
        stroke="url(#learningGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="20"
        strokeDashoffset="20"
        opacity="0"
      />

      {/* Certificate badge */}
      <rect
        ref={certificateRef}
        x="27"
        y="6"
        width="8"
        height="6"
        rx="1"
        fill="none"
        stroke="#FFD700"
        strokeWidth="2"
        opacity="0"
      />

      {/* Stars */}
      <path
        ref={star1Ref}
        d="M8 6 L9 8 L11 8 L9.5 9.5 L10 12 L8 10.5 L6 12 L6.5 9.5 L5 8 L7 8 Z"
        fill="#FFD700"
        opacity="0"
      />
      <path
        ref={star2Ref}
        d="M32 2 L33 4 L35 4 L33.5 5.5 L34 8 L32 6.5 L30 8 L30.5 5.5 L29 4 L31 4 Z"
        fill="#FFD700"
        opacity="0"
      />
    </svg>
  );
});

LearningIcon.displayName = "LearningIcon";

export default LearningIcon;
