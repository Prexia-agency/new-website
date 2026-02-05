"use client";

import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import ImagePlaceholder from "@/components/shared/image-placeholder";
import { MaskText } from "@/components/shared/textmask";

const STATE_MACHINE_NAME = "SM";

const descriptionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
};

const Stack = () => {
  const [wrapperRef, isWrapperInView] = useInView({
    triggerOnce: true,
    rootMargin: "500px",
  });
  const [contentRef, isContentInView] = useInView({
    triggerOnce: true,
    threshold: 0.8,
  });
  const [illustrationRef, isIllustrationInView] = useInView({
    triggerOnce: true,
    threshold: 0.8,
  });

  const descriptionControls = useAnimation();

  const { RiveComponent, rive } = useRive({
    src: "/animations/stack.riv",
    autoplay: false,
    stateMachines: STATE_MACHINE_NAME,
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.Center,
    }),
  });

  useEffect(() => {
    if (isContentInView) {
      descriptionControls.start("animate");
    }
    if (isIllustrationInView && rive) rive.play();
  }, [isContentInView, descriptionControls, rive, isIllustrationInView]);

  return (
    <section
      className="bg-black pt-19 pb-72 sm:pt-24 lg:pt-39 lg:pb-58 sm:pb-50 relative"
      ref={wrapperRef}
      dir="rtl"
      data-section="stack"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-8">
        <div className="lg:col-span-6 order-1 lg:order-1" ref={contentRef}>
          <MaskText
            className="max-w-[586px] md:max-w-[470px]"
            lineClassName="overflow-hidden"
            textClassName="font-noto-hebrew text-[32px] tracking-[-1.12px] text-white font-black leading-snug lg:text-[48px] md:text-4xl sm:text-3xl"
            phrases={[
              <>
                סביבת פיתוח שמציבה את{" "}
                <span className="gradient-text-contact">העסק</span>{" "}
                <span className="gradient-text-contact">שלך</span>
              </>,
              <>בסטנדרט הגבוה ביותר</>,
            ]}
          />
          <motion.p
            className="mt-5 max-w-[410px] text-[12.5px] md:mt-3 md:max-w-[470px] sm:mt-2.5 sm:text-base leading-relaxed text-white"
            initial="initial"
            animate={descriptionControls}
            variants={descriptionVariants}
          >
            לא עוד אתר מתבנית. מערכת ייעודית שנבנית עבורך . אנחנו משתמשים
            בטכנולוגיה שמובילה את עולם הפיתוח, עם שליטה מלאה בביצועים, אבטחה
            ויכולת צמיחה אמיתית. אתר קל משקל, מותאם לגוגל, ונבנה בדיוק לצרכים
            שלך, לא לצרכים של הפלטפורמה.
          </motion.p>
        </div>
        <div
          className="relative lg:col-span-6 flex items-center justify-center order-2 lg:order-2 py-1"
          role="img"
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
              <div className="absolute -top-[25px] -bottom-[65px] -right-[0px] -left-[0px] pointer-events-none md:pointer-events-auto">
                <RiveComponent width={592} height={626} />
              </div>
            )}
          </ImagePlaceholder>
        </div>
      </div>
    </section>
  );
};

export default Stack;
