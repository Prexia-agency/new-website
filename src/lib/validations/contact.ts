import { z } from 'zod';

/**
 * Shared Contact Form Validation Schema
 * Used by both frontend and backend for consistent validation
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'שם מלא הוא שדה חובה')
    .min(2, 'שם חייב להכיל לפחות 2 תווים')
    .max(100, 'שם ארוך מדי (מקסימום 100 תווים)')
    .regex(/^[\u0590-\u05FF\sa-zA-Z'-]+$/, 'שם יכול להכיל רק אותיות ורווחים')
    .trim(),

  email: z
    .string()
    .min(1, 'אימייל הוא שדה חובה')
    .email('כתובת אימייל לא תקינה')
    .max(254, 'כתובת אימייל ארוכה מדי')
    .trim()
    .toLowerCase(),

  phone: z
    .string()
    .min(1, 'מספר טלפון הוא שדה חובה')
    .trim()
    .refine(
      (val) => {
        const cleanPhone = val.replace(/[\s-]/g, '');
        // Israeli phone formats: 05X-XXX-XXXX, 0X-XXX-XXXX, +972-XX-XXX-XXXX
        const phoneRegex = /^(?:\+972|0)?(?:5[0-9]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/;
        return phoneRegex.test(cleanPhone);
      },
      { message: 'מספר טלפון לא תקין (לדוגמה: 050-123-4567)' }
    ),

  company: z
    .string()
    .optional()
    .transform((val) => val?.trim())
    .refine(
      (val) => {
        if (!val || val === '') return true;
        return val.length >= 2 && val.length <= 100;
      },
      { message: 'שם חברה חייב להכיל בין 2 ל-100 תווים' }
    ),

  message: z
    .string()
    .min(1, 'הודעה היא שדה חובה')
    .min(10, 'ההודעה קצרה מדי (לפחות 10 תווים)')
    .max(2000, 'ההודעה ארוכה מדי (מקסימום 2000 תווים)')
    .trim(),

  projectType: z
    .string()
    .min(1, 'נא לבחור סוג פרויקט')
    .refine(
      (val) => ['website', 'mobile', 'web', 'ai', 'branding', 'other'].includes(val),
      { message: 'נא לבחור סוג פרויקט תקין' }
    ),
});

// Export the TypeScript type inferred from the schema
export type ContactFormData = z.infer<typeof contactSchema>;

// Helper to validate a single field
export const validateField = (field: keyof ContactFormData, value: unknown) => {
  try {
    const fieldSchema = contactSchema.shape[field];
    fieldSchema.parse(value);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.issues[0]?.message || 'שגיאה בערך';
    }
    return 'שגיאה בערך';
  }
};

