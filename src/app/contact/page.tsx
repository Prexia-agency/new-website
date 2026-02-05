"use client";

import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { z } from "zod";

import TitleAnimation from "@/components/shared/title-animation";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact";

const titleItems = [{ value: "talk" }, { value: "Lets" }];

const formVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 1.3 } },
};

const whatsappVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 1.5 } },
};

const descriptionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 1.2 } },
};

const ContactPage = () => {
  const [contentRef, isContentInView] = useInView({
    triggerOnce: true,
    threshold: 0.8,
  });
  const [formRef, isFormInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const titleControls = useAnimation();
  const descriptionControls = useAnimation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    projectType: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    if (isContentInView) {
      // Delay animations to avoid conflict with navbar animation
      setTimeout(() => {
        titleControls
          .start("animate")
          .then(() => descriptionControls.start("animate"));
      }, 1000);
    }
  }, [isContentInView, titleControls, descriptionControls]);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const numbers = value.replace(/\D/g, "");

    // Format based on length
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else if (numbers.length <= 10) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
    } else {
      // Limit to 10 digits
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
    }
  };

  const validateField = (fieldName: keyof ContactFormData, value: unknown) => {
    try {
      // Safe field access - guard against dynamic key access
      const safeFieldName = fieldName as keyof typeof contactSchema.shape;
      const fieldSchema = contactSchema.shape[safeFieldName];
      fieldSchema.parse(value);
      return null;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.issues[0]?.message || "שגיאה בערך";
      }
      return null;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof ContactFormData;

    // Format phone number with dashes as user types
    const finalValue = name === "phone" ? formatPhoneNumber(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    // Real-time validation for touched fields
    // Safe key access - using name as keyof Record
    const isTouched = name in touched && touched[name as keyof typeof touched];
    if (isTouched) {
      const error = validateField(fieldName, finalValue);
      setErrors((prev) => ({
        ...prev,
        [name as keyof typeof prev]: error || "",
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof ContactFormData;

    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(fieldName, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error || "",
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
        // Safe assignment with explicit type guards
        const safeField = field as keyof ContactFormData;
        if (field in formData) {
          const errorKey = safeField;
          const touchedKey = safeField;
          newErrors[errorKey] = issue.message;
          newTouched[touchedKey] = true;
        }
      });

      setErrors(newErrors);
      setTouched(newTouched);
      alert("נא למלא את כל השדות הנדרשים בצורה תקינה");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validationResult.data),
      });

      await response.json();

      if (response.ok) {
        alert(
          "הודעתך נשלחה בהצלחה! נחזור אליך בהקדם. אימייל אישור נשלח לכתובת שהזנת.",
        );
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
          projectType: "",
        });
        setErrors({});
        setTouched({});
        setAcceptedTerms(false);
      } else {
        alert("אירעה שגיאה בשליחת ההודעה. אנא נסה שוב או פנה אלינו בוואטסאפ.");
      }
    } catch {
      alert("אירעה שגיאה בשליחת ההודעה. אנא נסה שוב או פנה אלינו בוואטסאפ.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappUrl = "https://wa.me/972505322336?text=שלום";

  // Simple WhatsApp click handler - opens link directly
  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.dataLayer?.push({
      event: "whatsapp_click",
    });
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen pt-24 pb-12 sm:pt-32 sm:pb-12 lg:pt-34 lg:pb-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div
          className="text-center mb-8 sm:mb-10 lg:mb-12"
          ref={contentRef}
          dir="rtl"
        >
          <TitleAnimation
            tag="h1"
            className="text-3xl font-bold font-ppeiko text-foreground mb-4 sm:text-3xl lg:text-4xl xl:text-5xl"
            items={titleItems}
            animationName="second"
            controls={titleControls}
          />
          <motion.p
            className="text-sm text-foreground max-w-3xl mx-auto leading-relaxed sm:text-sm lg:text-base xl:text-lg"
            initial="initial"
            animate={descriptionControls}
            variants={descriptionVariants}
          >
            מוכנים להתחיל את הפרויקט הבא שלכם? בואו נדבר על הרעיון שלכם ונבנה
            יחד משהו מדהים
          </motion.p>
        </div>

        {/* Contact Section */}
        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-12"
          ref={formRef}
          dir="rtl"
        >
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2 order-2 lg:order-1"
            initial="initial"
            animate={isFormInView ? "animate" : "initial"}
            variants={formVariants}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-transparent p-4 sm:p-6 lg:p-8 xl:p-10">
              <h2 className="text-lg font-bold font-noto-hebrew text-foreground mb-4 sm:text-xl lg:text-2xl">
                ספרו לנו על הפרויקט שלכם
              </h2>

              <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-[12px] font-medium text-foreground mb-1 sm:text-sm sm:mb-2"
                    >
                      שם מלא <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      aria-label="שם מלא"
                      value={formData.name}
                      className={`w-full px-3 py-2 bg-transparent border rounded-[8px] focus:ring-2 focus:border-transparent transition-all duration-200 text-[11px] text-foreground sm:text-sm sm:px-4 sm:py-3 ${
                        touched.name && errors.name
                          ? /* eslint-disable-next-line sonarjs/no-duplicate-string */
                            "border-red-500 focus:ring-red-500"
                          : /* eslint-disable-next-line sonarjs/no-duplicate-string */
                            "border-white/30 focus:ring-white"
                      }`}
                      placeholder="השם שלכם"
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {touched.name && errors.name && (
                      <p className="text-red-500 text-[10px] sm:text-xs mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-[12px] font-medium text-foreground mb-1 sm:text-sm sm:mb-2"
                    >
                      אימייל <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      aria-label="אימייל"
                      value={formData.email}
                      dir="ltr"
                      className={`w-full px-3 py-2 bg-transparent border rounded-[8px] focus:ring-2 focus:border-transparent transition-all duration-200 text-[11px] text-foreground sm:text-sm sm:px-4 sm:py-3 ${
                        touched.email && errors.email
                          ? "border-red-500 focus:ring-red-500"
                          : "border-white/30 focus:ring-white"
                      }`}
                      placeholder="your@email.com"
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {touched.email && errors.email && (
                      <p className="text-red-500 text-[10px] sm:text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Company and Phone Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label
                      htmlFor="contact-company"
                      className="block text-[12px] font-medium text-foreground mb-1 sm:text-sm sm:mb-2"
                    >
                      שם החברה
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      name="company"
                      aria-label="שם החברה"
                      value={formData.company || ""}
                      className={`w-full px-3 py-2 bg-transparent border rounded-[8px] focus:ring-2 focus:border-transparent transition-all duration-200 text-[11px] text-foreground sm:text-sm sm:px-4 sm:py-3 ${
                        touched.company && errors.company
                          ? "border-red-500 focus:ring-red-500"
                          : "border-white/30 focus:ring-white"
                      }`}
                      placeholder="שם העסק או החברה"
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {touched.company && errors.company && (
                      <p className="text-red-500 text-[10px] sm:text-xs mt-1">
                        {errors.company}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-[12px] font-medium text-foreground mb-1 sm:text-sm sm:mb-2"
                    >
                      טלפון <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      aria-label="טלפון"
                      value={formData.phone}
                      className={`w-full px-3 py-2 bg-transparent border rounded-[8px] focus:ring-2 focus:border-transparent transition-all duration-200 text-[11px] text-foreground sm:text-sm sm:px-4 sm:py-3 ${
                        touched.phone && errors.phone
                          ? "border-red-500 focus:ring-red-500"
                          : "border-white/30 focus:ring-white"
                      }`}
                      placeholder="050-123-4567"
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {touched.phone && errors.phone && (
                      <p className="text-red-500 text-[10px] sm:text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Project Type */}
                <div className="relative">
                  <label
                    htmlFor="contact-projectType"
                    className="block text-[12px] sm:text-sm font-medium text-foreground mb-2"
                  >
                    סוג הפרויקט <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="contact-projectType"
                    name="projectType"
                    aria-label="סוג הפרויקט"
                    value={formData.projectType}
                    className={`w-full pl-10 pr-3 py-2 bg-transparent border rounded-[8px] focus:ring-2 focus:border-transparent transition-all duration-200 text-[11px] text-foreground appearance-none sm:text-sm sm:pl-12 sm:pr-4 sm:py-3 ${
                      touched.projectType && errors.projectType
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/30 focus:ring-white"
                    }`}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  >
                    <option value="" className="bg-black text-foreground">
                      בחרו סוג פרויקט
                    </option>
                    <option
                      value="website"
                      className="bg-black text-foreground"
                    >
                      אתר אינטרנט
                    </option>
                    <option value="mobile" className="bg-black text-foreground">
                      אפליקציית נייטיב(למובייל)
                    </option>
                    <option value="web" className="bg-black text-foreground">
                      אפליקציית ווב
                    </option>
                    <option value="ai" className="bg-black text-foreground">
                      אוטומציה AI
                    </option>
                    <option
                      value="branding"
                      className="bg-black text-foreground"
                    >
                      Branding
                    </option>
                    <option value="other" className="bg-black text-foreground">
                      אחר
                    </option>
                  </select>
                  {/* Custom Arrow - positioned on the left for RTL */}
                  <div className="pointer-events-none absolute left-3 top-[38px] sm:top-[42px] sm:left-4">
                    <svg
                      className="w-4 h-4 text-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                  {touched.projectType && errors.projectType && (
                    <p className="text-red-500 text-[10px] sm:text-xs mt-1">
                      {errors.projectType}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-[12px] sm:text-sm font-medium text-foreground mb-2"
                  >
                    ספרו לנו על הפרויקט <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    aria-label="ספרו לנו על הפרויקט"
                    value={formData.message}
                    rows={5}
                    className={`w-full px-3 py-2 bg-transparent border rounded-[8px] focus:ring-2 focus:border-transparent transition-all duration-200 resize-none text-[11px] text-foreground sm:text-sm sm:px-4 sm:py-3 ${
                      touched.message && errors.message
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/30 focus:ring-white"
                    }`}
                    placeholder="תארו את הפרויקט שלכם, מטרות, דרישות מיוחדות ולוח זמנים רצוי..."
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                  {touched.message && errors.message && (
                    <p className="text-red-500 text-[10px] sm:text-xs mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Terms and Privacy Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    aria-label="אישור תנאי שימוש ומדיניות פרטיות"
                    checked={acceptedTerms}
                    className="mt-1 w-4 h-4 text-foreground border-white/30 rounded focus:ring-white focus:ring-2 cursor-pointer bg-transparent"
                    required
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                  />
                  <label
                    htmlFor="acceptTerms"
                    className="text-[11px] sm:text-sm text-foreground/80 leading-relaxed cursor-pointer"
                  >
                    בשליחת ההודעה אני מאשר/ת שקראתי והבנתי את{" "}
                    <Link
                      href="/privacy"
                      className="text-foreground hover:text-foreground underline font-medium"
                    >
                      מדיניות הפרטיות
                    </Link>{" "}
                    ואת{" "}
                    <Link
                      href="/terms"
                      className="text-foreground hover:text-foreground underline font-medium"
                    >
                      תנאי השימוש
                    </Link>
                  </label>
                </div>

                {/* Submit Button */}
                <style jsx>{`
                  .submit-button {
                    transform: translateZ(0) scale(1);
                    will-change: transform, opacity;
                    transition:
                      transform 700ms cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 800ms cubic-bezier(0.4, 0, 0.2, 1) !important;
                  }
                  .submit-button:not(:disabled):hover {
                    transform: translateZ(0) scale(1.01) !important;
                    opacity: 0.75;
                  }
                `}</style>
                <button
                  type="submit"
                  disabled={isSubmitting || !acceptedTerms}
                  className={`submit-button w-full bg-white text-black px-4 py-1.5 rounded-full font-semibold text-[13px] shadow-lg sm:px-4 sm:py-2.5 sm:text-[16px] relative ${
                    isSubmitting || !acceptedTerms
                      ? "opacity-40 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-foreground"
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
            <a
              id="whatsapp-button"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              onClick={handleWhatsAppClick}
            >
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-4 border-2 border-white/20 hover:border-white/30 transition-colors duration-300 group cursor-pointer sm:p-6 lg:p-8">
                {/* WhatsApp Header */}
                <div className="text-center mb-4 sm:mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-full mb-3 group-hover:bg-green-500/30 transition-colors duration-300 sm:w-16 sm:h-16 sm:mb-4">
                    <svg
                      className="w-6 h-6 text-green-400 sm:w-8 sm:h-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold font-noto-hebrew text-foreground mb-2 sm:text-xl">
                    צ&apos;אט איתנו בוואטסאפ
                  </h3>
                  <p className="text-foreground/80 text-xs leading-relaxed sm:text-sm">
                    מעדיפים לדבר ישירות? אנחנו כאן בשבילכם
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-4 sm:space-y-3 sm:mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-foreground sm:text-sm">
                      מענה מיידי
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-foreground sm:text-sm">
                      ייעוץ ללא התחייבות
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-foreground sm:text-sm">
                      הצעת מחיר תוך 24 שעות
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-foreground px-4 py-2 rounded-full font-semibold text-xs transition-all duration-200 sm:px-6 sm:py-3 sm:text-sm">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    התחילו צ&apos;אט
                  </div>
                </div>

                {/* Decorative Element - Hidden on mobile */}
                <div className="hidden lg:block absolute top-4 left-4 w-8 h-8 bg-green-500/20 rounded-full opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="hidden lg:block absolute bottom-4 right-4 w-6 h-6 bg-green-400/20 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
