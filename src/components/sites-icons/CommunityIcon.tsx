"use client";

import { gsap } from "gsap";
import { useRef, useImperativeHandle, forwardRef } from "react";

export interface IconHandle {
  playHoverAnimation: () => void;
  playLeaveAnimation: () => void;
}

const CommunityIcon = forwardRef<IconHandle>((props, ref) => {
  const person1Ref = useRef<SVGCircleElement>(null);
  const person2Ref = useRef<SVGCircleElement>(null);
  const person3Ref = useRef<SVGCircleElement>(null);
  const body1Ref = useRef<SVGPathElement>(null);
  const body2Ref = useRef<SVGPathElement>(null);
  const body3Ref = useRef<SVGPathElement>(null);
  const chat1Ref = useRef<SVGPathElement>(null);
  const chat2Ref = useRef<SVGPathElement>(null);
  const chat3Ref = useRef<SVGPathElement>(null);
  const heartRef = useRef<SVGPathElement>(null);
  const connectionRef = useRef<SVGPathElement>(null);

  useImperativeHandle(ref, () => ({
    playHoverAnimation: () => {
      const people = [
        person1Ref.current,
        person2Ref.current,
        person3Ref.current,
      ];
      const bodies = [body1Ref.current, body2Ref.current, body3Ref.current];
      const chats = [chat1Ref.current, chat2Ref.current, chat3Ref.current];
      const heart = heartRef.current;
      const connection = connectionRef.current;
      const tl = gsap.timeline();

      // Connection lines appear between people
      tl.fromTo(
        connection,
        { strokeDashoffset: 100, opacity: 0 },
        {
          strokeDashoffset: 0,
          opacity: 0.5,
          duration: 0.6,
          ease: "power2.out",
        },
        0,
      );

      // People light up and bob up in wave (reduced movement to avoid cropping)
      people.forEach((person, index) => {
        tl.to(
          person,
          {
            y: -2,
            scale: 1.1,
            stroke: "#00D4FF",
            strokeWidth: 2,
            filter: "drop-shadow(0 0 8px rgba(0, 212, 255, 0.4))",
            duration: 0.4,
            ease: "power2.out",
          },
          0.2 + index * 0.15,
        );

        tl.to(
          bodies[index],
          {
            y: -2,
            stroke: "#00D4FF",
            strokeWidth: 2,
            duration: 0.4,
            ease: "power2.out",
          },
          0.2 + index * 0.15,
        );
      });

      // Chat bubbles pop up in sequence
      chats.forEach((chat, index) => {
        tl.fromTo(
          chat,
          { scale: 0, opacity: 0, y: 5 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "back.out(2)",
            transformOrigin: "bottom center",
          },
          0.5 + index * 0.2,
        )
          // Chat bubbles fade out
          .to(
            chat,
            {
              y: -3,
              opacity: 0,
              duration: 0.3,
              ease: "power2.in",
            },
            "+=0.2",
          );
      });

      // Heart appears and grows (reduced movement to avoid cropping)
      tl.fromTo(
        heart,
        { scale: 0, opacity: 0, rotation: -45 },
        {
          scale: 1.1,
          opacity: 1,
          rotation: 0,
          duration: 0.5,
          ease: "back.out(2)",
          transformOrigin: "center center",
        },
        1.4,
      )
        .to(heart, {
          scale: 1.3,
          duration: 0.2,
          ease: "power2.inOut",
          yoyo: true,
          repeat: 1,
        })
        .to(heart, {
          y: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
        });
    },
    playLeaveAnimation: () => {
      const people = [
        person1Ref.current,
        person2Ref.current,
        person3Ref.current,
      ];
      const bodies = [body1Ref.current, body2Ref.current, body3Ref.current];
      const connection = connectionRef.current;
      const tl = gsap.timeline();

      tl.to([...people, ...bodies], {
        y: 0,
        scale: 1,
        stroke: "url(#communityGradient)",
        strokeWidth: 1.5,
        filter: "drop-shadow(0 0 0px rgba(0, 212, 255, 0))",
        duration: 0.4,
        ease: "power2.in",
        stagger: 0.05,
      });

      tl.to(
        connection,
        {
          strokeDashoffset: 100,
          opacity: 0,
          duration: 0.3,
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
          id="communityGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#00D4FF" />
          <stop offset="50%" stopColor="#007BFF" />
          <stop offset="100%" stopColor="#8B00FF" />
        </linearGradient>
      </defs>

      {/* Connection lines between people */}
      <path
        ref={connectionRef}
        d="M 12 18 L 20 16 M 20 16 L 28 18"
        stroke="url(#communityGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="100"
        strokeDashoffset="100"
        opacity="0"
      />

      {/* Person 1 */}
      <circle
        ref={person1Ref}
        cx="12"
        cy="18"
        r="4"
        fill="none"
        stroke="url(#communityGradient)"
        strokeWidth="1.5"
      />
      <path
        ref={body1Ref}
        d="M6 30 C6 25 8 22 12 22 C16 22 18 25 18 30"
        fill="none"
        stroke="url(#communityGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Person 2 (center, larger) */}
      <circle
        ref={person2Ref}
        cx="20"
        cy="16"
        r="5"
        fill="none"
        stroke="url(#communityGradient)"
        strokeWidth="1.5"
      />
      <path
        ref={body2Ref}
        d="M13 32 C13 26 15 22 20 22 C25 22 27 26 27 32"
        fill="none"
        stroke="url(#communityGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Person 3 */}
      <circle
        ref={person3Ref}
        cx="28"
        cy="18"
        r="4"
        fill="none"
        stroke="url(#communityGradient)"
        strokeWidth="1.5"
      />
      <path
        ref={body3Ref}
        d="M22 30 C22 25 24 22 28 22 C32 22 34 25 34 30"
        fill="none"
        stroke="url(#communityGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Chat bubbles */}
      <path
        ref={chat1Ref}
        d="M 8 12 L 13 12 L 13 16 L 11.5 16 L 10.5 17.5 L 10.5 16 L 8 16 Z"
        fill="url(#communityGradient)"
        opacity="0"
      />
      <path
        ref={chat2Ref}
        d="M 17 9 L 23 9 L 23 13 L 21.5 13 L 20.5 14.5 L 20.5 13 L 17 13 Z"
        fill="url(#communityGradient)"
        opacity="0"
      />
      <path
        ref={chat3Ref}
        d="M 25 12 L 31 12 L 31 16 L 29.5 16 L 28.5 17.5 L 28.5 16 L 25 16 Z"
        fill="url(#communityGradient)"
        opacity="0"
      />

      {/* Heart icon */}
      <path
        ref={heartRef}
        d="M 20 18 L 22 16 C 24 14 26 16 26 18 C 26 20 24 22 20 24 C 16 22 14 20 14 18 C 14 16 16 14 18 16 Z"
        fill="#FF00A8"
        opacity="0"
      />
    </svg>
  );
});

CommunityIcon.displayName = "CommunityIcon";

export default CommunityIcon;
