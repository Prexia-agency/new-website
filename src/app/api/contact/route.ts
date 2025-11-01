import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations/contact';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate using Zod schema
    const validationResult = contactSchema.safeParse(body);
    
    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: errors 
        },
        { status: 400 }
      );
    }

    const { name, email, phone, company, message, projectType } = validationResult.data;

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'contact@atarym.com';
    const toEmail = process.env.RESEND_TO_EMAIL || 'atarymwebsite@gmail.com';

    // Email to business
    const businessEmailResult = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `הודעה חדשה מאתרים - ${name}`,
      html: `
        <div dir="rtl">
          <h2>הודעה חדשה מטופס יצירת קשר</h2>
          
          <h3>פרטי השולח:</h3>
          <p><strong>שם:</strong> ${name}</p>
          <p><strong>אימייל:</strong> ${email}</p>
          <p><strong>טלפון:</strong> ${phone}</p>
          ${company ? `<p><strong>חברה:</strong> ${company}</p>` : ''}
          <p><strong>סוג פרויקט:</strong> ${getProjectTypeLabel(projectType)}</p>
          
          <h3>הודעה:</h3>
          <p style="white-space: pre-wrap;">${message}</p>
          
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />
          <p style="color: #6b7280; font-size: 14px;">נשלח מטופס יצירת קשר באתרים</p>
        </div>
      `,
    });

    if (businessEmailResult.error) {
      return NextResponse.json(
        { error: 'Failed to send notification email' },
        { status: 500 }
      );
    }

    // Confirmation email to user (prettier, RTL Hebrew)
    const userEmailResult = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: 'תודה שפנית אלינו',
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="he">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f3f4f6;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #FF6A00 0%, #FF00A8 25%, #8B00FF 50%, #007BFF 75%, #00D4FF 100%);
              padding: 40px 20px;
              text-align: center;
              color: white;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: bold;
            }
            .content {
              padding: 40px 30px;
              color: #374151;
              line-height: 1.6;
            }
            .greeting {
              font-size: 20px;
              font-weight: bold;
              color: #1f2937;
              margin-bottom: 20px;
            }
            .message {
              font-size: 16px;
              margin-bottom: 30px;
            }
            .info-box {
              background-color: #f8f8ff;
              border-right: 4px solid #8B00FF;
              padding: 20px;
              border-radius: 8px;
              margin: 30px 0;
            }
            .info-box h3 {
              margin: 0 0 15px 0;
              color: #8B00FF;
              font-size: 18px;
            }
            .info-item {
              margin: 10px 0;
              font-size: 15px;
            }
            .info-label {
              font-weight: bold;
              color: #4b5563;
            }
            .cta-button {
              display: inline-block;
              background: linear-gradient(135deg, #FF6A00 0%, #FF00A8 25%, #8B00FF 50%, #007BFF 75%, #00D4FF 100%);
              color: white;
              padding: 14px 32px;
              border-radius: 8px;
              text-decoration: none;
              font-weight: bold;
              font-size: 16px;
              margin: 20px 0;
            }
            .footer {
              background-color: #f9fafb;
              padding: 30px;
              text-align: center;
              color: #6b7280;
              font-size: 14px;
              border-top: 1px solid #e5e7eb;
            }
            .contact-info {
              margin-top: 20px;
            }
            .contact-info a {
              color: #8B00FF;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✨ אתרים atarym</h1>
            </div>
            
            <div class="content">
              <div class="greeting">שלום ${name},</div>
              
              <div class="message">
                <p>תודה רבה שפנית אלינו! 🙏</p>
                <p>קיבלנו את הפנייה שלך ונחזור אליך בהקדם האפשרי, בדרך כלל תוך 24 שעות.</p>
                <p>אנחנו כבר מתחילים לעבוד על הצעת המחיר המושלמת עבורך ומצפים לשתף פעולה איתך.</p>
              </div>

              <div class="info-box">
                <h3>📋 סיכום הפנייה שלך</h3>
                <div class="info-item">
                  <span class="info-label">שם:</span> ${name}
                </div>
                <div class="info-item">
                  <span class="info-label">אימייל:</span> ${email}
                </div>
                <div class="info-item">
                  <span class="info-label">טלפון:</span> ${phone}
                </div>
                ${company ? `
                <div class="info-item">
                  <span class="info-label">חברה:</span> ${company}
                </div>
                ` : ''}
                <div class="info-item">
                  <span class="info-label">סוג פרויקט:</span> ${getProjectTypeLabel(projectType)}
                </div>
              </div>

              <div class="message">
                <p><strong>בינתיים, רוצה לדבר איתנו ישירות?</strong></p>
                <p>אל תהסס לפנות אלינו בוואטסאפ למענה מיידי:</p>
                <a href="https://wa.me/972505322336" class="cta-button">💬 צ'אט בוואטסאפ</a>
              </div>
            </div>

            <div class="footer">
              <p><strong> אתרים atarym</strong></p>
              <p>פיתוח אתרים וחוויות דיגיטליות מתקדמות</p>
              <div class="contact-info">
                <p>📧 <a href="mailto:${fromEmail}">${fromEmail}</a></p>
                <p>📱 <a href="https://wa.me/972505322336">050-532-2336</a></p>
              </div>
              <p style="margin-top: 20px; font-size: 12px;">
                אימייל זה נשלח כתגובה אוטומטית לפנייתך באתר אתרים atarym
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (userEmailResult.error) {
      return NextResponse.json(
        { error: 'Failed to send confirmation email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Emails sent successfully'
      },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function getProjectTypeLabel(projectType: string): string {
  const labels: { [key: string]: string } = {
    'basic': 'חבילת בסיס - אתר תדמית פשוט',
    'advanced': 'חבילת מתקדמים - אנימציות ותלת־ממד',
    'complex': 'פרויקטים מורכבים - אינטגרציות ופיתוח מתקדם',
    'other': 'אחר'
  };
  return labels[projectType] || projectType;
}

