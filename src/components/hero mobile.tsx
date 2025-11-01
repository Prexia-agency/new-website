'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Spline from '@splinetool/react-spline';
import Link from 'next/link';

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
  { value: 'אתר', className: 'gradient-text' },
  { value: ' שמביא תוצאות' },
];


const descriptionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
};

export default function HeroMobile() {
  const [contentRef, isContentInView] = useInView({ triggerOnce: true, threshold: 0.8 });
  const titleControls = useAnimation();
  const descriptionControls = useAnimation();

  useEffect(() => {
    if (isContentInView) {
      titleControls.start('animate').then(() => descriptionControls.start('animate'));
    }
  }, [isContentInView, titleControls, descriptionControls]);

  return (
    <section className="lg:hidden relative w-full h-screen overflow-hidden" dir="rtl" data-section="hero">
      {/* Full screen Spline animation */}
      <div className="bg-black absolute inset-0 w-full h-full pt-15">
        <Spline 
          scene="/animations/s-mobile.spline"
          className="w-full h-full scale-100"
          style={{
            transformOrigin: 'center center'
          }}
        />
      </div>
      
      {/* Hero Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-start text-center px-4 pt-30 sm:pt-45" ref={contentRef}>
        <div className="flex flex-col items-center">
          <TitleAnimation
            tag="h1"
            className="font-noto-hebrew text-3xl sm:text-4xl md:text-5xl font-black text-white mb-1 leading-tight tracking-tight max-w-sm sm:max-w-2xl"
            items={titleItemsLine1}
            animationName="second"
            controls={titleControls}
          />
          <TitleAnimation
            tag="h1"
            className="font-noto-hebrew text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight max-w-sm sm:max-w-2xl"
            items={titleItemsLine2}
            animationName="second"
            controls={titleControls}
          />
        </div>
        
        {/* Divider Line */}
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent mb-3 opacity-50"></div>
        
        <motion.p
          className="text-[12px] sm:text-base md:text-lg text-white/95 mb-3 max-w-xs sm:max-w-sm md:max-w-lg leading-relaxed font-normal"
          initial="initial"
          animate={descriptionControls}
          variants={descriptionVariants}
          dir="rtl"
        >
לא עוד אתרים מתבניות, אלא אתרים שנכתבים שורה אחרי שורה בקוד, כדי להעניק מהירות, עומק ו - SEO שמתחיל בארכיטקטורה. 
        </motion.p>
         {/* Hero Buttons */}
        <style jsx>{`
          :global(.hero-mobile-button-link) {
            transform: translateZ(0) scale(1);
            will-change: transform, opacity;
            transition: transform 700ms cubic-bezier(0.4, 0, 0.2, 1), opacity 800ms cubic-bezier(0.4, 0, 0.2, 1) !important;
          }
          :global(.hero-mobile-button-link:hover) {
            transform: translateZ(0) scale(1.01) !important;
            opacity: 0.75;
          }
        `}</style>
        <div className="flex flex-row-reverse gap-4" dir="rtl">
          <Link 
            href="/contact"
            className="hero-mobile-button-link text-black px-3 py-1.5 rounded-[12px] border-2 border-gray-100/10 shadow-xl font-bold text-[11px] flex items-center gap-1 group"
            style={{ 
              background: 'linear-gradient(176.87deg, rgb(255, 255, 255) 8.56%, rgb(186, 23, 154) 85.04%)',
              backdropFilter: 'blur(10px)',
            }}
          >
            בוא נתחיל
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0"
            >
              {/* Chevron/Triangle - always visible, pointing left */}
              <path d="m15 18-6-6 6-6"/>
              {/* Arrow line - slides in and fades in on hover */}
              <path 
                d="M9 12h10" 
                className="transition-all duration-300 ease-out opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
              />
            </svg>
          </Link>
          <Link 
            href="/pricing"
            className="hero-mobile-button-link text-black border-2 border-white/30 px-4 py-2 rounded-[12px] font-semibold text-[11px] shadow-xl flex items-center gap-1"
            style={{ 
              background: 'linear-gradient(176.87deg, rgba(255, 255, 255, 0.88) 8.56%, rgb(255, 255, 255) 85.04%)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <span>המחירים</span>
            <svg
              width="14"
              height="14"
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
      </div>
      </div>
    </section>
  );
}