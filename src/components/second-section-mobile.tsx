"use client"

import Image from 'next/image';
import PathDrawing from './draw';
import { useAnimation } from 'framer-motion';
import PathDrawingLp1 from './draw_Laptop1';
import TitleAnimation from '@/components/shared/title-animation';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const titleItems = [
  { value: 'אתרים' },
  { value: 'שנראים' },
  { value: 'מושלם', className: 'gradient-text' },
  { value: 'בכל' },
  { value: 'מסך' },
];

export default function SecondSectionMobile() {
  const [contentRef, isContentInView] = useInView({ triggerOnce: true, threshold: 0.8 });
  const titleControls = useAnimation();

  useEffect(() => {
    if (isContentInView) {
      titleControls.start('animate');
    }
  }, [isContentInView, titleControls]);

  return (
    <section className="lg:hidden bg-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading and subheading */}
        <div className="text-center mb-4" dir="rtl" ref={contentRef}>
          <TitleAnimation
            tag="h2"
            className="font-noto-hebrew text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight tracking-tight max-w-sm sm:max-w-6xl mx-auto"
            items={titleItems}
            animationName="second"
            controls={titleControls}
          />
          <p className="text-[11px] sm:text-base md:text-lg text-gray-700 mb-3 max-w-[260px] sm:max-w-[350px] md:max-w-xs leading-relaxed font-normal mx-auto">
            הלקוחות שלך גולשים היום בעיקר מהמובייל, אבל עדיין צריכים אתר שנראה מצוין גם על מסך מחשב. אצלנו כל אתר מקבל עיצוב מותאם אישית לכל פלטפורמה – כדי להבטיח חוויית משתמש חלקה, מהירה ומדויקת בכל גודל מסך
          </p>
        </div>
        <div className="flex flex-col gap-6 items-center justify-center" dir="rtl">
          {/* iPhone 14 Pro Max with animation */}
          <div className="flex justify-center relative">
            <Image
              src="/images/Device 14PM.png"
              alt="iPhone 14 Pro Max showcase"
              width={250}
              height={500}
              className="w-[180px] sm:w-[220px] h-auto"
              priority
            />
            {/* Animation overlay positioned on the iPhone screen */}
            <div className="absolute inset-0 flex items-center justify-center" style={{
              top: '20%',
              left: '20%', 
              right: '20%',
              bottom: '24%'
            }}>
              <PathDrawing />
            </div>
          </div>
          
          {/* iPad Pro image with animation */}
          <div className="flex justify-center relative">
            <Image
              src="/images/iPad Pro.png"
              alt="iPad Pro showcase"
              width={300}
              height={200}
              className="w-[230px] sm:w-[270px] h-auto"
              priority
            />
            {/* Animation overlay positioned on the iPad screen */}
            <div className="absolute inset-0 flex items-center justify-center" style={{
              top: '20%',
              left: '20%', 
              right: '20%',
              bottom: '25%'
            }}>
              <PathDrawing />
            </div>
          </div>
          
          {/* Laptop image with animation */}
          <div className="flex justify-center relative">
            <Image
              src="/images/laptop.png"
              alt="Laptop showcase"
              width={250}
              height={100}
              className="w-[260px] sm:w-[300px] h-auto"
              priority
            />
            {/* Animation overlay positioned on the laptop screen */}
            <div className="absolute inset-0 flex items-center justify-center" style={{
              top: '20%',
              left: '20%', 
              right: '20%',
              bottom: '24%'
            }}>
              <PathDrawingLp1 />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}