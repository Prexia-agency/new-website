"use client"

import { motion, useAnimation } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { z } from 'zod';

import TitleAnimation from '@/components/shared/title-animation';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { contactSchema, type ContactFormData } from '@/lib/validations/contact';

const titleItems = [
  { value: 'בואו' },
  { value: 'נתחיל', className: 'gradient-text' },
];

const formVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const whatsappVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
};

const descriptionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
};

export default function ContactPage() {
  const [contentRef, isContentInView] = useInView({ triggerOnce: true, threshold: 0.8 });
  const [formRef, isFormInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const titleControls = useAnimation();
  const descriptionControls = useAnimation();
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    projectType: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    if (isContentInView) {
      titleControls.start('animate').then(() => descriptionControls.start('animate'));
    }
  }, [isContentInView, titleControls, descriptionControls]);

  const validateField = (fieldName: keyof ContactFormData, value: unknown) => {
    try {
      const fieldSchema = contactSchema.shape[fieldName];
      fieldSchema.parse(value);
      return null;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.issues[0]?.message || 'שגיאה בערך';
      }
      return null;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof ContactFormData;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation for touched fields
    if (touched[name]) {
      const error = validateField(fieldName, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error || ''
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof ContactFormData;
    
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    const error = validateField(fieldName, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error || ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate entire form with Zod
    const validationResult = contactSchema.safeParse(formData);
    
    if (!validationResult.success) {
      const newErrors: Record<string, string> = {};
      const newTouched: Record<string, boolean> = {};
      
      validationResult.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        newErrors[field] = issue.message;
        newTouched[field] = true;
      });
      
      setErrors(newErrors);
      setTouched(newTouched);
      alert('נא למלא את כל השדות הנדרשים בצורה תקינה');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validationResult.data),
      });

      const data = await response.json();

      if (response.ok) {
        alert('הודעתך נשלחה בהצלחה! נחזור אליך בהקדם. אימייל אישור נשלח לכתובת שהזנת.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
          projectType: ''
        });
        setErrors({});
        setTouched({});
        setAcceptedTerms(false);
      } else {
        alert('אירעה שגיאה בשליחת ההודעה. אנא נסה שוב או פנה אלינו בוואטסאפ.');
      }
    } catch (error) {
      alert('אירעה שגיאה בשליחת ההודעה. אנא נסה שוב או פנה אלינו בוואטסאפ.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappUrl = "https://wa.me/972505322336?text=שלום! אשמח לקבל מידע על שירותי פיתוח אתרים";

  return (
    <div className="min-h-screen pt-20 pb-12 sm:pt-24 sm:pb-12 lg:pt-28 lg:pb-16" style={{ backgroundColor: '#F8F8FF' }}>
      <GoogleAnalytics />
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12" ref={contentRef} dir="rtl">
          <TitleAnimation
            tag="h1"
            className="text-3xl font-bold font-noto-hebrew text-gray-900 mb-4 sm:text-3xl lg:text-4xl xl:text-5xl"
            items={titleItems}
            animationName="second"
            controls={titleControls}
          />
          <motion.p
            className="text-sm text-gray-700 max-w-3xl mx-auto leading-relaxed sm:text-sm lg:text-base xl:text-lg"
            initial="initial"
            animate={descriptionControls}
            variants={descriptionVariants}
          >
            מוכנים להתחיל את הפרויקט הבא שלכם? בואו נדבר על הרעיון שלכם ונבנה יחד משהו מדהים
          </motion.p>
        </div>

        {/* Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-12" ref={formRef} dir="rtl">
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2 order-2 lg:order-1"
            initial="initial"
            animate={isFormInView ? "animate" : "initial"}
            variants={formVariants}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-[24px] shadow-lg p-4 sm:p-6 lg:p-8 xl:p-10 border-1 border-gray-100">
              <h2 className="text-lg font-bold font-noto-hebrew text-gray-900 mb-4 sm:text-xl lg:text-2xl">
                ספרו לנו על הפרויקט שלכם
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-[12px] font-medium text-gray-700 mb-1 sm:text-sm sm:mb-2">
                      שם מלא *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-3 py-2 border rounded-[16px] focus:ring-2 focus:border-transparent transition-all duration-200 text-[11px] sm:text-sm sm:px-4 sm:py-3 ${
                        touched.name && errors.name
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-blue-500'
                      }`}
                      placeholder="השם שלכם"
                    />
                    {touched.name && errors.name && (
                      <p className="text-red-500 text-[10px] sm:text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-gray-700 mb-1 sm:text-sm sm:mb-2">
                      אימייל *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-3 py-2 border rounded-[16px] focus:ring-2 focus:border-transparent transition-all duration-200 text-[11px] sm:text-sm sm:px-4 sm:py-3 ${
                        touched.email && errors.email
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-blue-500'
                      }`}
                      placeholder="your@email.com"
                    />
                    {touched.email && errors.email && (
                      <p className="text-red-500 text-[10px] sm:text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Phone and Company Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-[12px] font-medium text-gray-700 mb-1 sm:text-sm sm:mb-2">
                      טלפון
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone || ''}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-3 py-2 border rounded-[16px] focus:ring-2 focus:border-transparent transition-all duration-200 text-[11px] sm:text-sm sm:px-4 sm:py-3 ${
                        touched.phone && errors.phone
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-blue-500'
                      }`}
                      placeholder="050-123-4567"
                    />
                    {touched.phone && errors.phone && (
                      <p className="text-red-500 text-[10px] sm:text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-gray-700 mb-1 sm:text-sm sm:mb-2">
                      שם החברה
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company || ''}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-3 py-2 border rounded-[16px] focus:ring-2 focus:border-transparent transition-all duration-200 text-[11px] sm:text-sm sm:px-4 sm:py-3 ${
                        touched.company && errors.company
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-blue-500'
                      }`}
                      placeholder="שם העסק או החברה"
                    />
                    {touched.company && errors.company && (
                      <p className="text-red-500 text-[10px] sm:text-xs mt-1">{errors.company}</p>
                    )}
                  </div>
                </div>

                {/* Project Type */}
                <div>
                  <label className="block text-[12px] sm:text-sm font-medium text-gray-700 mb-2">
                    סוג הפרויקט
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-[16px] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-[11px] sm:text-sm sm:px-4 sm:py-3"
                  >
                    <option value="">בחרו סוג פרויקט</option>
                    <option value="basic">חבילת בסיס - אתר תדמית פשוט</option>
                    <option value="advanced">חבילת מתקדמים - אנימציות ותלת־ממד</option>
                    <option value="complex">פרויקטים מורכבים - אינטגרציות ופיתוח מתקדם</option>
                    <option value="other">אחר</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[12px] sm:text-sm font-medium text-gray-700 mb-2">
                    ספרו לנו על הפרויקט *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    rows={5}
                    className={`w-full px-3 py-2 border rounded-[16px] focus:ring-2 focus:border-transparent transition-all duration-200 resize-none text-[11px] sm:text-sm sm:px-4 sm:py-3 ${
                      touched.message && errors.message
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="תארו את הפרויקט שלכם, מטרות, דרישות מיוחדות ולוח זמנים רצוי..."
                  />
                  {touched.message && errors.message && (
                    <p className="text-red-500 text-[10px] sm:text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Terms and Privacy Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    required
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                  />
                  <label htmlFor="acceptTerms" className="text-[11px] sm:text-sm text-gray-700 leading-relaxed cursor-pointer">
                    בשליחת ההודעה אני מאשר/ת שקראתי והבנתי את{' '}
                    <Link href="/privacy" className="text-blue-600 hover:text-blue-800 underline font-medium">
                      מדיניות הפרטיות
                    </Link>
                    {' '}ואת{' '}
                    <Link href="/terms" className="text-blue-600 hover:text-blue-800 underline font-medium">
                      תנאי השימוש
                    </Link>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !acceptedTerms}
                  style={{
                    transition: 'opacity 800ms ease-in-out, transform 900ms ease-in-out'
                  }}
                  className={`w-full gradient-bg text-white px-4 py-1.5 rounded-[8.5px] font-semibold text-[13px] shadow-lg sm:px-4 sm:py-2.5 sm:text-[16px] relative ${
                    isSubmitting || !acceptedTerms ? 'opacity-40 cursor-not-allowed' : 'hover:scale-[1.01]'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>שולח...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span>שלח הודעה</span>
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5 rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                      </svg>
                    </span>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* WhatsApp Box */}
          <motion.div
            className="lg:col-span-1 order-1 lg:order-2"
            initial="initial"
            animate={isFormInView ? "animate" : "initial"}
            variants={whatsappVariants}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="relative bg-white rounded-2xl shadow-lg p-4 border-2 border-green-200 hover:border-green-300 transition-colors duration-300 group cursor-pointer sm:p-6 lg:p-8">
                {/* WhatsApp Header */}
                <div className="text-center mb-4 sm:mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3 group-hover:bg-green-200 transition-colors duration-300 sm:w-16 sm:h-16 sm:mb-4">
                    <svg
                      className="w-6 h-6 text-green-600 sm:w-8 sm:h-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold font-noto-hebrew text-gray-900 mb-2 sm:text-xl">
                    צ&apos;אט איתנו בוואטסאפ
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed sm:text-sm">
                    מעדיפים לדבר ישירות? אנחנו כאן בשבילכם 
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-4 sm:space-y-3 sm:mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-700 sm:text-sm">מענה מיידי</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-700 sm:text-sm">ייעוץ ללא התחייבות</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-700 sm:text-sm">הצעת מחיר תוך 24 שעות</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold text-xs transition-all duration-200 sm:px-6 sm:py-3 sm:text-sm">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                    התחילו צ&apos;אט
                  </div>
                </div>

                {/* Decorative Element - Hidden on mobile */}
                <div className="hidden lg:block absolute top-4 left-4 w-8 h-8 bg-green-100 rounded-full opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="hidden lg:block absolute bottom-4 right-4 w-6 h-6 bg-green-200 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
