'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Spline from '@splinetool/react-spline';
import Link from 'next/link';

import TitleAnimation from '@/components/shared/title-animation';

const titleItems = [
  { 
    value: 'עיצוב',
    useWordRotate: true,
    rotateWords: ['עיצוב', 'מיתוג', 'תכנון'],
    rotateDuration: 3000
  },
  { value: 'מדויק.', },
  { value: 'חוויה חכמה.' },
  { value: ' אתר', className: 'gradient-text' },
  { value: ' שמביא תוצאות' },
];

const descriptionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
};

export default function Hero() {
  const [contentRef, isContentInView] = useInView({ triggerOnce: true, threshold: 0.8 });
  const titleControls = useAnimation();
  const descriptionControls = useAnimation();

  useEffect(() => {
    if (isContentInView) {
      titleControls.start('animate').then(() => descriptionControls.start('animate'));
    }
  }, [isContentInView, titleControls, descriptionControls]);

  return (
    <section className="hidden lg:block relative w-full h-screen overflow-hidden" dir="rtl">
      {/* Full screen Spline animation */}
      <div className="bg-black absolute inset-0 w-full h-full pt-65">
        <Spline 
          scene="/animations/robot_follow_cursor_for_landing_page.spline"
          className="w-full h-full scale-80"
          style={{
            transformOrigin: 'center center'
          }}
        />
      </div>
      
      {/* Hero Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-start text-center px-8 pt-43" ref={contentRef}>
        <TitleAnimation
          tag="h1"
          className="font-noto-hebrew text-5xl lg:text-6xl xl:text-6xl 2xl:text-6xl font-black text-white mb-8 leading-tight tracking-tight max-w-6xl"
          items={titleItems}
          animationName="second"
          controls={titleControls}
        />
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
        <div className="flex flex-row-reverse gap-4" dir="rtl">
          <Link 
            href="/contact"
            className="bg-white hover:bg-gray-100 text-black px-6 py-2 rounded-[12px] font-bold text-[14px] transition-all duration-200 hover:shadow-xl flex items-center gap-2"
          >
            בוא נתחיל
            <svg
              width="16"
              height="16"
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
            className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-5 py-3 rounded-[14px] font-semibold text-[14px] transition-all duration-200 hover:shadow-xl"
          >
            המחירים
          </Link>
        </div>
      </div>
    </section>
  );
}