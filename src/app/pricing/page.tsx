"use client"

import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

import TitleAnimation from '@/components/shared/title-animation';
import AnimatedCalculator from '@/components/AnimatedCalculator';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const titleItems = [
  { value: 'מחירון' },
  { value: 'אתרים', className: 'gradient-text' },
];

const pricingData = [
  {
    id: 1,
    title: 'חבילת בסיס',
    subtitle: 'אתר תדמית פשוט',
    description: 'פתרון מושלם לעסקים הרוצים להקים נוכחות דיגיטלית מקצועית ויעילה',
    features: [
      'עד 3 עמודים סטנדרטיים',
      'עיצוב מותאם למובייל',
      'טופס יצירת קשר מתקדם',
      'אופטימיזציה למנועי חיפוש (SEO בסיסי)',
      'תשתית ניהול תוכן',
      'הטמעה וזמינות למשך שנה',
      'תמיכה בתוספת תשלום'
    ],
    price: '10,000 - 6,000 ₪',
    popular: false
  },
  {
    id: 2,
    title: 'חבילת מתקדמים',
    subtitle: 'אנימציות ומיקרו אינטראקציות',
    description: 'חוויית משתמש יוצאת דופן עם אנימציות מתקדמות ואלמנטים אינטראקטיביים',
    features: [
      'אנימציות מתקדמות וחלקות',
      'Micro-interactions מותאמים',
      'רכיבי Spline/React Three Fiber',
      'סצנות אינטראקטיביות',
      'מעברים בין עמודים',
      'אלמנטים ויזואליים מותאמים',
      'אופטימיזציה לביצועים',
      'תמיכה בתוספת תשלום'
    ],
    price: '40,000 - 10,000 ₪',
    popular: true
  },
  {
    id: 3,
    title: 'פרויקטים מורכבים + מיתוג',
    subtitle: 'אינטגרציות ופיתוח מתקדם',
    description: 'פתרונות טכנולוגיים מתקדמים למערכות עסקיות מורכבות',
    features: [
      'חיבור ל-API חיצוניים',
      'אינטגרציות CRM ומערכות תשלום',
      'מיתוג ושיווק מאפס כולל יצירת לוגו ותוכן שיווקי',
      'עיצובי תלת־ממד חדשניים',
      '  אלמנטים ויזואלים ב - GSAP',
      'אופטימיזציה מורכבת',
      'תסריטים של Spline/React Three Fiber',
      'מערכות ניהול מותאמות',
      'תמיכה ותחזוקה מלאה'
    ],
    price: 'דברו איתנו',
    popular: false
  }
];

const descriptionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 1.2 } },
};

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function PricingPage() {
  const [contentRef, isContentInView] = useInView({ triggerOnce: true, threshold: 0.8 });
  const [cardsRef, areCardsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const titleControls = useAnimation();
  const descriptionControls = useAnimation();

  useEffect(() => {
    if (isContentInView) {
      // Delay animations to avoid conflict with navbar animation
      setTimeout(() => {
        titleControls.start('animate').then(() => descriptionControls.start('animate'));
      }, 1000);
    }
  }, [isContentInView, titleControls, descriptionControls]);

  return (
    <div className="min-h-screen pt-24 pb-12 sm:pt-24 sm:pb-12 lg:pt-28 lg:pb-16" style={{ backgroundColor: '#F8F8FF' }}>
      <GoogleAnalytics />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 lg:mb-6 sm:mb-10" ref={contentRef} dir="rtl">
          <div className="flex flex-col items-center justify-center gap-6 mb-6">
            <AnimatedCalculator />
            <TitleAnimation
              tag="h1"
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-noto-hebrew text-gray-900"
              items={titleItems}
              animationName="second"
              controls={titleControls}
            />
          </div>
          <motion.p
            className="text-[11px] pb-8 text-gray-700 max-w-3xl mx-auto leading-relaxed lg:text-base sm:text-sm"
            initial="initial"
            animate={descriptionControls}
            variants={descriptionVariants}
          >
            אנחנו מציעים פתרונות אתרים מותאמים אישית לכל עסק, מאתרי תדמית פשוטים ועד פרויקטים מורכבים. כל מחיר נקבע לפי הצרכים הספציפיים של הפרויקט ומורכבותו הטכנית.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6" ref={cardsRef} dir="rtl">
          {pricingData.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`relative bg-white rounded-[24px] shadow-lg transition-all duration-300 p-4 sm:p-6 lg:p-8 border-2 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex flex-col ${
                plan.popular ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-300'
              }`}
              initial="initial"
              animate={areCardsInView ? "animate" : "initial"}
              variants={cardVariants}
              transition={{ duration: 0.6, delay: 1.3 + (index * 0.1) }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 right-6 gradient-bg text-white px-4 py-1 rounded-full text-sm font-semibold">
                  הכי פופולרי
                </div>
              )}

              {/* Header */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-[13px] font-bold font-noto-hebrew text-gray-900 mb-2 leading-snug sm:text-lg lg:text-xl">
                  {plan.title}
                </h3>
                <p className="text-[12px] font-medium text-gray-600 mb-2 sm:mb-3 lg:text-base">
                  {plan.subtitle}
                </p>
                <p className="text-gray-600 leading-relaxed text-[11px] sm:text-sm">
                  {plan.description}
                </p>
              </div>

              {/* Features List */}
              <div className="flex-grow mb-4 sm:mb-6">
                <h4 className="font-semibold text-gray-900 mb-2 text-[12px] sm:mb-4 sm:text-base">מה כלול בחבילה:</h4>
                <ul className="space-y-2 sm:space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 sm:gap-3">
                      <div className="flex-shrink-0 w-4 h-4 bg-green-100 rounded-full flex items-center justify-center mt-0.5 sm:w-5 sm:h-5">
                        <svg className="w-2 h-2 text-green-600 sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-[11px] leading-relaxed sm:text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing */}
              <div className="mb-4 pt-3 border-t border-gray-100 sm:mb-6 sm:pt-4">
                <div className="text-center">
                  <p className="text-lg font-bold gradient-text mb-1 sm:text-2xl lg:text-3xl">
                    {plan.price}
                  </p>
                  {plan.id === 2 || plan.id === 1 ? (
                    <p className="text-[10px] text-gray-400 mt-1 leading-relaxed sm:text-xs sm:mt-2">
                      המחיר הסופי נקבע לפי מורכבות הפרויקט וכמות העבודה הנדרשת
                    </p>
                  ) : null}
                </div>
              </div>

              {/* CTA Button */}
              <Link 
                href="/contact"
                className={`w-full px-4 py-1.5 rounded-[8.5px] font-semibold text-[13px] transition-all duration-300 text-center block sm:px-4 sm:py-2.5 sm:text-[15px] group ${
                  plan.popular 
                    ? 'gradient-bg text-white shadow-lg hover:shadow-xl opacity-95 hover:opacity-90' 
                    : 'bg-black text-white hover:shadow-lg'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <span>{plan.popular ? 'בואו נתחיל' : 'בואו נתחיל'}</span>
                  <svg 
                    className="w-5 h-5 sm:w-6 sm:h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    {/* Chevron/Triangle - always visible, pointing left */}
                    <path d="M15 18l-6-6 6-6" />
                    {/* Arrow line - slides in and fades in on hover */}
                    <path 
                      d="M9 12h10" 
                      className="transition-all duration-300 ease-out opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                    />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}