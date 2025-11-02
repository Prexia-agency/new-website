'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Spline from '@splinetool/react-spline';
import Link from 'next/link';
import { gsap } from 'gsap';

import TitleAnimation from '@/components/shared/title-animation';

const titleItemsLine1 = [
  { 
    value: 'עיצוב',
    useWordRotate: true,
    rotateWords: ['עיצוב', 'מיתוג', 'תכנון'],
    rotateDuration: 3000
  },
  { value: 'מדויק.', },
  { value: 'חוויה חכמה.' },
];

const titleItemsLine2 = [
  { value: 'אתר', className: 'gradient-text-contact' },
  { value: ' שמביא תוצאות' },
];

const descriptionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
};

const dividerVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { 
    width: '280px',
    opacity: 0.8,
    transition: { 
      duration: 0.3
    } 
  },
} as const;

const buttonVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5
    } 
  },
} as const;

export default function Hero() {
  const [contentRef, isContentInView] = useInView({ triggerOnce: true, threshold: 0.8 });
  const titleControls = useAnimation();
  const dividerControls = useAnimation();
  const descriptionControls = useAnimation();
  const buttonControls = useAnimation();
  const [hasMouseMoved, setHasMouseMoved] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showMouseUI, setShowMouseUI] = useState(false);
  const mouseUIRef = useRef<HTMLDivElement>(null);
  const initialMousePos = useRef({ x: 0, y: 0 });
  const hasRecordedInitialPos = useRef(false);
  const pricingIconRef = useRef<SVGSVGElement>(null);
  const pricingButtonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (isContentInView) {
      titleControls.start('animate')
        .then(() => dividerControls.start('animate'))
        .then(() => descriptionControls.start('animate'))
        .then(() => buttonControls.start('animate'));
    }
  }, [isContentInView, titleControls, dividerControls, descriptionControls, buttonControls]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Update mouse position for UI to follow cursor
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Record initial position on first move and show the UI
      if (!hasRecordedInitialPos.current) {
        initialMousePos.current = { x: e.clientX, y: e.clientY };
        hasRecordedInitialPos.current = true;
        setShowMouseUI(true);
        return;
      }

      // Calculate distance moved from initial position
      const deltaX = Math.abs(e.clientX - initialMousePos.current.x);
      const deltaY = Math.abs(e.clientY - initialMousePos.current.y);
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Threshold of 120 pixels (60% increase from 75)
      if (distance > 520 && !hasMouseMoved && mouseUIRef.current) {
        setHasMouseMoved(true);
        
        // Animate out with GSAP
        gsap.to(mouseUIRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hasMouseMoved]);

  const handlePricingHover = () => {
    if (!pricingIconRef.current || !pricingButtonRef.current) return;
    
    const tl = gsap.timeline();
    
    // Carousel: Slide out to the left
    tl.to(pricingIconRef.current, {
      x: -30,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    })
    // Instantly move to the right
    .set(pricingIconRef.current, {
      x: 30,
    })
    // Slide in from the right with tilt and sparks
    .to(pricingIconRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    })
    // First tilt - 35 degrees to the right
    .to(pricingIconRef.current, {
      rotation: 35,
      duration: 0.3,
      ease: 'power2.out',
      onStart: () => createSparks(),
    })
    // Back to center
    .to(pricingIconRef.current, {
      rotation: 0,
      duration: 0.3,
      ease: 'power2.inOut',
    })
    // Second tilt - 35 degrees to the right
    .to(pricingIconRef.current, {
      rotation: 35,
      duration: 0.3,
      ease: 'power2.out',
      onStart: () => createSparks(),
    })
    // Back to center
    .to(pricingIconRef.current, {
      rotation: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const createSparks = () => {
    if (!pricingButtonRef.current) return;
    
    const sparkCount = 5;
    const buttonRect = pricingButtonRef.current.getBoundingClientRect();
    
    for (let i = 0; i < sparkCount; i++) {
      const spark = document.createElement('div');
      spark.style.position = 'fixed';
      spark.style.width = '4px';
      spark.style.height = '4px';
      spark.style.borderRadius = '50%';
      spark.style.background = 'linear-gradient(45deg, #FFD700, #FFA500)';
      spark.style.pointerEvents = 'none';
      spark.style.zIndex = '100';
      
      // Position at top of button
      spark.style.left = `${buttonRect.left + buttonRect.width / 2}px`;
      spark.style.top = `${buttonRect.top}px`;
      
      document.body.appendChild(spark);
      
      // Animate spark
      gsap.to(spark, {
        x: gsap.utils.random(-30, 30),
        y: gsap.utils.random(-30, -10),
        opacity: 0,
        scale: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => {
          spark.remove();
        },
      });
    }
  };

  return (
    <section 
      className="hidden lg:block relative w-full min-h-screen h-[110vh] overflow-hidden" 
      dir="rtl" 
      data-section="hero"
      style={{ cursor: hasMouseMoved ? 'auto' : 'none' }}
    >
      {/* Full screen Spline animation */}
      <div 
        className="bg-black absolute inset-0 w-full h-full pt-50"
        style={{ cursor: hasMouseMoved ? 'auto' : 'none' }}
      >
        <Spline 
          scene="/animations/robot_follow_cursor_for_landing_page.spline"
          className="w-full h-full scale-70"
          style={{
            transformOrigin: 'center center',
            cursor: hasMouseMoved ? 'auto' : 'none'
          }}
        />
      </div>
      
      {/* Hero Content */}
      <div 
        className="absolute inset-0 z-10 flex flex-col items-center justify-start text-center px-8 pt-33" 
        ref={contentRef}
        style={{ cursor: hasMouseMoved ? 'auto' : 'none' }}
      >
        <div className="flex flex-col items-center">
          <TitleAnimation
            tag="h1"
            className="font-noto-hebrew text-5xl lg:text-6xl xl:text-6xl 2xl:text-6xl font-black text-white mb-2 leading-tight tracking-tight max-w-6xl"
            items={titleItemsLine1}
            animationName="second"
            controls={titleControls}
          />
          <TitleAnimation
            tag="h1"
            className="font-noto-hebrew text-5xl lg:text-6xl xl:text-6xl 2xl:text-6xl font-black text-white mb-8 leading-tight tracking-tight max-w-6xl"
            items={titleItemsLine2}
            animationName="second"
            controls={titleControls}
          />
        </div>
        
        {/* Divider Line */}
        <motion.div 
          className="h-[2px] bg-gradient-to-r from-transparent via-white to-transparent mb-4"
          initial="initial"
          animate={dividerControls}
          variants={dividerVariants}
        ></motion.div>
        
        <motion.p
          className="text-md lg:text-lg xl:text-lg text-white/95 max-w-2xl leading-relaxed font-normal mb-6"
          initial="initial"
          animate={descriptionControls}
          variants={descriptionVariants}
          dir="rtl"
        >
לא עוד אתרים מתבניות, אלא אתרים שנכתבים שורה אחרי שורה בקוד מלא, כדי להעניק מהירות, עומק ו - SEO שמתחיל בארכיטקטורה. 
       </motion.p>
        
        {/* Hero Buttons */}
        <style jsx>{`
          :global(.hero-button-link) {
            transform: translateZ(0) scale(1);
            will-change: transform, opacity;
            transition: transform 700ms cubic-bezier(0.4, 0, 0.2, 1), opacity 800ms cubic-bezier(0.4, 0, 0.2, 1) !important;
          }
          :global(.hero-button-link:hover) {
            transform: translateZ(0) scale(1.02) !important;
            opacity: 0.85;
          }
        `}</style>
        <motion.div 
          className="flex flex-row-reverse gap-4" 
          dir="rtl"
          initial="initial"
          animate={buttonControls}
          variants={buttonVariants}
        >
          <Link 
            href="/contact"
            className="hero-button-link text-black px-6 py-2 rounded-[12px] border-2 border-gray-100/10 shadow-xl font-bold text-[14px] flex items-center gap-2 group"
            style={{ 
              cursor: hasMouseMoved ? 'pointer' : 'none',
              background: 'linear-gradient(176.87deg, rgb(255, 255, 255) 8.56%, rgb(186, 23, 154) 85.04%)',
              backdropFilter: 'blur(10px)',
            }}
          >
            בוא נתחיל
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0"
            >
              {/* Chevron/Triangle - always visible, pointing left */}
              <path d="M15 18l-6-6 6-6"/>
              {/* Arrow line - slides in and fades in on hover */}
              <path 
                d="M9 12h10" 
                className="transition-all duration-300 ease-out opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
              />
            </svg>
          </Link>
          <Link 
            ref={pricingButtonRef}
            href="/pricing"
            className="hero-button-link text-black border-2 border-white/30 px-5 py-3 rounded-[14px] font-semibold text-[14px] shadow-xl flex items-center gap-2"
            style={{ 
              cursor: hasMouseMoved ? 'pointer' : 'none',
              background: 'linear-gradient(176.87deg, rgba(255, 255, 255, 0.88) 8.56%, rgb(255, 255, 255) 85.04%)',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={handlePricingHover}
          >
            <span>המחירים</span>
            <svg
              ref={pricingIconRef}
              width="19"
              height="19"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 13.5c3.5 0 6-1.238 6-3.994 0-2.995-1.5-4.992-4.5-6.49l1.18-1.518A.658.658 0 0 0 9.12.5H4.88a.66.66 0 0 0-.56.998L5.5 3.026C2.5 4.534 1 6.531 1 9.526 1 12.262 3.5 13.5 7 13.5" />
                <path d="M8.383 6.806a1.083 1.083 0 0 0-1.022-.723h-.838a.967.967 0 0 0-.207 1.912l1.277.28a1.084 1.084 0 0 1-.232 2.142H6.64c-.472 0-.873-.302-1.022-.722M7 6.083V5m0 6.5v-1.083" />
              </g>
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Mouse UI Indicator */}
      {showMouseUI && !hasMouseMoved && (
        <div
          ref={mouseUIRef}
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-white/50 text-base font-semibold tracking-wide whitespace-nowrap bg-black/30 px-3 py-1 rounded-lg backdrop-blur-sm">
              הזז את העכבר
            </p>
            <svg
              width="20"
              height="30"
              viewBox="0 0 24 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="animate-bounce"
            >
              {/* Mouse body */}
              <rect
                x="2"
                y="2"
                width="20"
                height="30"
                rx="10"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
              {/* Mouse scroll wheel */}
              <line
                x1="12"
                y1="8"
                x2="12"
                y2="14"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      )}
    </section>
  );
}