"use client"

import { Alignment, Fit, Layout, useRive } from '@rive-app/react-canvas';
import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import ImagePlaceholder from '@/components/shared/image-placeholder';
import TitleAnimation from '@/components/shared/title-animation';

const titleItems = [
  { value: 'טכנולוגיה' },
  { value: 'שמציבה' },
  { value: 'את' },
  { value: 'העסק', className: 'gradient-text' },
  { value: 'שלך', className: 'gradient-text' },
  { value: 'בסטנדרט הגבוה ביותר' },
];

const descriptionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
};

const STATE_MACHINE_NAME = 'SM';

export default function Stack() {
  const [wrapperRef, isWrapperInView] = useInView({ triggerOnce: true, rootMargin: '500px' });
  const [contentRef, isContentInView] = useInView({ triggerOnce: true, threshold: 0.8 });
  const [illustrationRef, isIllustrationInView] = useInView({ triggerOnce: true, threshold: 0.8 });

  const titleControls = useAnimation();
  const descriptionControls = useAnimation();

  const { RiveComponent, rive } = useRive({
    src: '/animations/stack.riv',
    autoplay: false,
    stateMachines: STATE_MACHINE_NAME,
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.Center,
    }),
  });

  useEffect(() => {
    if (isContentInView) {
      titleControls.start('animate').then(() => descriptionControls.start('animate'));
    }
    if (isIllustrationInView && rive) rive.play();
  }, [isContentInView, titleControls, descriptionControls, rive, isIllustrationInView]);

  return (
    <section className="bg-black pt-19 pb-72 sm:pt-47 lg:pt-78 lg:pb-58 sm:pb-50" ref={wrapperRef} dir="rtl">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-8">
        <div className="lg:col-span-6 order-1 lg:order-1" ref={contentRef}>
          <TitleAnimation
            tag="h2"
            className="font-noto-hebrew text-2xl tracking-[-1.12px] text-white font-black leading-snug lg:text-[42px] max-w-[586px] md:max-w-[470px] md:text-4xl sm:text-3xl text-black"
            items={titleItems}
            animationName="second"
            controls={titleControls}
          />
          <motion.p
            className="mt-5 max-w-[410px] text-[11.5px] md:mt-3 md:max-w-[470px] sm:mt-2.5 sm:text-base leading-relaxed text-white/80"
            initial="initial"
            animate={descriptionControls}
            variants={descriptionVariants}
          >
          טכנולוגיה שהיא הסטנדרט הגבוה בתעשייה, עם קוד נקי ומדויק שמבטיח יציבות וביצועים לאורך זמן. בעידן שבו ניתן להקים אתר בסיסי בקלות באמצעות AI, אנחנו מספקים נוכחות דיגיטלית מקצועית וגמישה לצמיחה – פתרון שמעניק לעסק שלך יתרון ברור ומשמעותי.
          </motion.p>
        </div>
        <div
          className="relative lg:col-span-6 flex items-center justify-center order-2 lg:order-2 py-2"
          aria-label="Technology Stack Animation"
          ref={illustrationRef}
        >
          <ImagePlaceholder 
            width={592} 
            height={536} 
            className="w-full max-w-sm md:max-w-md lg:max-w-lg"
          >
            {/* Negative offset for adjusting extra space in Rive animation needed for animation */}
            {isWrapperInView && (
              <div className="absolute -top-[25px] -bottom-[65px] -right-[0px] -left-[0px]">
                <RiveComponent width={592} height={626} />
              </div>
            )}
          </ImagePlaceholder>
        </div>
      </div>
    </section>
  );
}