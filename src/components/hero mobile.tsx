'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Spline from '@splinetool/react-spline';
import Link from 'next/link';

import TitleAnimation from '@/components/shared/title-animation';

const titleItems = [
  { 
    value: 'בניית',
    useWordRotate: true,
    rotateWords: ['בניית', 'מיתוג', 'עיצוב'],
    rotateDuration: 3000
  },
  { value: 'אתרים', className: 'gradient-text' },
  { value: 'לעסקים' },
  { value: 'שמוכרים' },
  { value: 'באמת' },
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
    <section className="lg:hidden relative w-full h-screen overflow-hidden" dir="rtl">
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
        <TitleAnimation
          tag="h1"
          className="font-noto-hebrew text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight max-w-sm sm:max-w-2xl"
          items={titleItems}
          animationName="second"
          controls={titleControls}
        />
        <motion.p
          className="text-[12px] sm:text-base md:text-lg text-white/95 mb-3 max-w-xs sm:max-w-sm md:max-w-lg leading-relaxed font-normal"
          initial="initial"
          animate={descriptionControls}
          variants={descriptionVariants}
          dir="rtl"
        >
          אנחנו בסוכנות אתרים בונים ומעצבים אתרים שמותאמים בדיוק לצרכים של העסק שלך עם עיצוב מקצועי, חוויית משתמש מתקדמת ו- SEO שמביא תוצאות
        </motion.p>
         {/* Hero Buttons */}
        <div className="flex flex-row-reverse gap-4" dir="rtl">
          <Link 
            href="/contact"
            className="bg-white hover:bg-white/90 text-black px-3 py-1.5 rounded-[12px] font-bold text-[11px] transition-all duration-200 hover:shadow-xl flex items-center gap-1"
          >
            בוא נתחיל
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0"
            >
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </Link>
          <Link 
            href="/pricing"
            className="bg-transparent hover:bg-white/20 text-white border-2 border-white px-4 py-2 rounded-[12px] font-semibold text-[11px] transition-all duration-200 hover:shadow-xl"
          >
            המחירים
          </Link>
      </div>
      </div>
    </section>
  );
}