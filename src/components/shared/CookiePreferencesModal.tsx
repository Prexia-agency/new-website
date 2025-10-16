"use client";

import { useState, useEffect } from 'react';
import { 
  getCookiePreferences, 
  saveCookiePreferences, 
  acceptAllCookies, 
  rejectAllCookies,
  type CookiePreferences 
} from '@/utils/cookieConsent';

interface CookiePreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CookiePreferencesModal({ isOpen, onClose }: CookiePreferencesModalProps) {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    timestamp: new Date().toISOString(),
  });

  useEffect(() => {
    if (isOpen) {
      const currentPreferences = getCookiePreferences();
      if (currentPreferences) {
        setPreferences(currentPreferences);
      }
    }
  }, [isOpen]);

  const handleSavePreferences = () => {
    saveCookiePreferences(preferences);
    onClose();
  };

  const handleAcceptAll = () => {
    acceptAllCookies();
    onClose();
  };

  const handleRejectAll = () => {
    rejectAllCookies();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
          dir="rtl"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-peaceful-dawn">
                הגדרות עוגיות
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="סגור"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6 space-y-6">
            {/* Introduction */}
            <div className="text-sm text-gray-700 leading-relaxed">
              <p>
                אנו משתמשים בעוגיות כדי לשפר את חוויית הגלישה שלך באתר. 
                עוגיות חיוניות נדרשות כדי שהאתר יתפקד כראוי ותמיד פעילות. 
                עוגיות נוספות משמשות לניתוח תנועה באתר ולשיפור השירות שלנו.
              </p>
            </div>

            {/* Cookie Types */}
            <div className="space-y-4">
              {/* Essential Cookies */}
              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      עוגיות חיוניות
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      עוגיות אלו נחוצות לתפקוד תקין של האתר. הן מאפשרות ניווט בסיסי ושימוש בפונקציות האתר. 
                      לא ניתן להשבית עוגיות אלו.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-12 h-6 bg-green-500 rounded-full flex items-center px-1">
                      <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      עוגיות אנליטיות (Google Analytics)
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      עוגיות אלו עוזרות לנו להבין כיצד המבקרים משתמשים באתר. 
                      המידע נאסף באופן אנונימי ומשמש לשיפור חוויית המשתמש והתוכן באתר.
                    </p>
                    <div className="mt-3 text-xs text-gray-500">
                      <span className="font-semibold">ספק:</span> Google LLC
                      <br />
                      <span className="font-semibold">משך חיים:</span> עד 2 שנים
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                      className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                        preferences.analytics ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                      aria-label={preferences.analytics ? 'השבת עוגיות אנליטיות' : 'אפשר עוגיות אנליטיות'}
                    >
                      <div 
                        className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                          preferences.analytics ? 'translate-x-6' : 'translate-x-0'
                        }`} 
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-1">מידע נוסף</p>
                  <p className="text-blue-800">
                    למידע מפורט על השימוש שלנו בעוגיות, אנא עיין ב
                    <a href="/privacy" target="_blank" className="underline hover:no-underline mx-1 font-semibold">
                      מדיניות הפרטיות
                    </a>
                    שלנו.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer with Actions */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-2xl">
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={handleRejectAll}
                className="px-5 py-2.5 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 font-semibold text-sm transition-colors"
              >
                דחה הכל
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-xl font-semibold text-sm transition-colors"
              >
                שמור העדפות
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-5 py-2.5 bg-black hover:bg-black/80 text-white rounded-xl font-bold text-sm transition-colors"
              >
                קבל הכל
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

