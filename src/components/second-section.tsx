"use client"

import Image from 'next/image';
import PathDrawing from './draw';
import { useAnimation } from 'framer-motion';
import PathDrawingLp from './draw_Laptop';
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

export default function SecondSection() {
  const [contentRef, isContentInView] = useInView({ triggerOnce: true, threshold: 0.8 });
  const titleControls = useAnimation();

  useEffect(() => {
    if (isContentInView) {
      titleControls.start('animate');
    }
  }, [isContentInView, titleControls]);

  return (
    <section className="hidden lg:block bg-white py-40">
      <div className="max-w-6xl mx-auto px-8">
        {/* Heading and subheading */}
        <div className="text-center mb-30" dir="rtl" ref={contentRef}>
          <TitleAnimation
            tag="h2"
            className="text-6xl font-bold font-noto-hebrew text-gray-900 mb-6"
            items={titleItems}
            animationName="second"
            controls={titleControls}
          />
          <p className="text-[18px] text-gray-700 max-w-2xl mx-auto">
            הלקוחות שלך גולשים היום בעיקר מהמובייל, אבל עדיין צריכים אתר שנראה מצוין גם על מסך מחשב. אצלנו כל אתר מקבל עיצוב מותאם אישית לכל פלטפורמה – כדי להבטיח חוויית משתמש חלקה, מהירה ומדויקת בכל גודל מסך
          </p>
        </div>
        <div className="flex gap-8 items-center justify-center" dir="rtl">
          {/* Rightmost - iPhone 14 Pro Max with animation */}
          <div className="flex justify-center relative">
            <Image
              src="/images/Device 14PM.png"
              alt="iPhone 14 Pro Max showcase"
              width={200}
              height={450}
              className="w-full max-w-xs h-70 pt-10"
              priority
            />
            {/* Animation overlay positioned on the iPhone screen */}
            <div className="absolute inset-0 flex items-center justify-center pt-10 pl-1" style={{
              top: '20%',
              left: '20%', 
              right: '20%',
              bottom: '24%'
            }}>
              <PathDrawing />
            </div>
          </div>
          
          {/* Middle - iPad Pro image with animation */}
          <div className="flex justify-center relative">
            <Image
              src="/images/iPad Pro.png"
              alt="iPad Pro showcase"
              width={300}
              height={200}
              className="w-full max-w-sm h-70"
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
          
          {/* Left side - Laptop image with animation */}
          <div className="flex justify-center relative">
            <Image
              src="/images/laptop.png"
              alt="Laptop showcase"
              width={300}
              height={200}
              className="w-full max-w-md h-60"
              priority
            />
            {/* Animation overlay positioned on the laptop screen */}
            <div className="absolute inset-0 flex items-center justify-center" style={{
              top: '20%',
              left: '20%', 
              right: '20%',
              bottom: '24%'
            }}>
              <PathDrawingLp />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}