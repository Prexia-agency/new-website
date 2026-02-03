"use client";

import { useState, useEffect, useRef } from "react";

import { useAccessibility } from "@/contexts/AccessibilityContext";

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSetting, resetSettings, announcement } =
    useAccessibility();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Focus management when opening/closing
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      const firstInput = panelRef.current?.querySelector(
        'button, input, select, [tabindex]:not([tabindex="-1"])',
      ) as HTMLElement;
      firstInput?.focus();
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  // Click outside to close (with touch support)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !toggleRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      // Prevent page scroll when panel is open (lock BOTH html+body)
      const prevHtmlOverflow = document.documentElement.style.overflow;
      const prevBodyOverflow = document.body.style.overflow;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      // Allow scrolling INSIDE the panel even with Lenis installed:
      // stop scroll events from reaching window listeners (Lenis) when they start inside the modal.
      const stopScrollToPage = (ev: Event) => {
        const target = ev.target as Node | null;
        if (target && panelRef.current?.contains(target)) {
          ev.stopPropagation();
        }
      };

      document.addEventListener("wheel", stopScrollToPage, { capture: true });
      document.addEventListener("touchmove", stopScrollToPage, {
        capture: true,
      });

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      return () => {
        document.documentElement.style.overflow = prevHtmlOverflow;
        document.body.style.overflow = prevBodyOverflow;

        document.removeEventListener("wheel", stopScrollToPage, {
          capture: true,
        } as AddEventListenerOptions);
        document.removeEventListener("touchmove", stopScrollToPage, {
          capture: true,
        } as AddEventListenerOptions);
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
      };
    }
  }, [isOpen]);

  // Safety mechanism: ensure modal doesn't block on page load
  useEffect(() => {
    // Ensure widget starts closed on mount
    setIsOpen(false);

    // Clear any stuck states
    document.body.style.overflow = "";
  }, []);

  return (
    <>
      <div
        className="accessibility-widget"
        role="region"
        aria-label="בקרי נגישות"
      >
        {/* Toggle Button */}
        <button
          ref={toggleRef}
          className="accessibility-toggle"
          aria-label={`${isOpen ? "סגור" : "פתח"} לוח הגדרות נגישות`}
          aria-expanded={isOpen}
          aria-describedby="accessibility-shortcut-hint"
          aria-haspopup="dialog"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="accessibility-icon"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
          >
            <circle cx="12" cy="4" r="2" />
            <path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3V10.5h1.11l1.3 1.43C16.95 12.58 17.98 13 19 13z" />
            <circle
              cx="12"
              cy="17.5"
              r="4.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          <span className="sr-only">הגדרות נגישות</span>
        </button>

        <div id="accessibility-shortcut-hint" className="sr-only">
          לחץ Alt+א כדי לפתוח או לסגור לוח זה, או השתמש ב-Alt+1 עד Alt+5 לשינוי
          מהיר של גודל הגופן
        </div>

        {/* Widget Panel */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="accessibility-backdrop"
              aria-hidden="true"
              onClick={() => setIsOpen(false)}
            />

            <div
              ref={panelRef}
              className="accessibility-panel"
              role="dialog"
              aria-labelledby="accessibility-title"
              aria-describedby="accessibility-description"
              aria-modal="true"
              dir="rtl"
            >
              <div className="accessibility-header">
                <h2 id="accessibility-title">הגדרות נגישות</h2>
                <p
                  id="accessibility-description"
                  className="accessibility-description"
                >
                  התאם את חוויית הצפייה שלך. השינויים נשמרים אוטומטית.
                </p>
                <button
                  aria-label="סגור תיבת דו-שיח הגדרות נגישות"
                  className="close-btn"
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                  <span className="sr-only">סגור</span>
                </button>
              </div>

              <div className="accessibility-content">
                {/* Font Size Controls */}
                <fieldset className="control-group">
                  <legend>
                    <svg
                      className="control-icon"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M5 4v3h5.5v12h3V7H19V4z" />
                    </svg>
                    גודל טקסט
                  </legend>
                  <div
                    className="button-group"
                    role="group"
                    aria-label="אפשרויות גודל גופן"
                  >
                    {[
                      { key: "small", label: "קטן", shortcut: "Alt+1" },
                      { key: "normal", label: "רגיל", shortcut: "Alt+2" },
                      { key: "large", label: "גדול", shortcut: "Alt+3" },
                      {
                        key: "extra-large",
                        label: "גדול מאוד",
                        shortcut: "Alt+4",
                      },
                      { key: "jumbo", label: "ענק", shortcut: "Alt+5" },
                    ].map(({ key, label, shortcut }) => (
                      <button
                        key={key}
                        className={`control-btn ${settings.fontSize === key ? "active" : ""}`}
                        aria-pressed={settings.fontSize === key}
                        title={`גודל גופן ${label} (${shortcut})`}
                        onClick={() =>
                          updateSetting(
                            "fontSize",
                            key as
                              | "small"
                              | "normal"
                              | "large"
                              | "extra-large"
                              | "jumbo",
                          )
                        }
                      >
                        <span
                          className={`font-preview font-${key}`}
                          aria-hidden="true"
                        >
                          א
                        </span>
                        <span className="btn-label">{label}</span>
                        {settings.fontSize === key && (
                          <span
                            className="current-indicator"
                            aria-label="בחירה נוכחית"
                          >
                            ✓
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Font Family */}
                <fieldset className="control-group">
                  <legend>סגנון גופן</legend>
                  <label htmlFor="font-family-select" className="sr-only">
                    בחר משפחת גופנים
                  </label>
                  <select
                    id="font-family-select"
                    value={settings.fontFamily}
                    className="select-control"
                    aria-describedby="font-family-help"
                    onChange={(e) =>
                      updateSetting(
                        "fontFamily",
                        e.target.value as "default" | "dyslexic" | "mono",
                      )
                    }
                  >
                    <option value="default">גופן ברירת מחדל</option>
                    <option value="dyslexic">
                      ידידותי לדיסלקטים (OpenDyslexic)
                    </option>
                    <option value="mono">רוחב קבוע (Monospace)</option>
                  </select>
                  <div id="font-family-help" className="help-text">
                    גופנים ידידותיים לדיסלקטים יכולים לשפר את הקריאות עבור חלק
                    מהמשתמשים
                  </div>
                </fieldset>

                {/* Contrast & Theme */}
                <fieldset className="control-group">
                  <legend>
                    <svg
                      className="control-icon"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12,18V6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,15.31L23.31,12L20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31Z" />
                    </svg>
                    תצוגה וניגודיות
                  </legend>
                  <div
                    className="button-group"
                    role="group"
                    aria-label="אפשרויות ערכת נושא וניגודיות"
                  >
                    {[
                      {
                        key: "normal",
                        label: "רגיל",
                        description: "צבעים סטנדרטיים",
                      },
                      {
                        key: "high",
                        label: "ניגודיות גבוהה",
                        description: "ניגודיות גבוהה שחור וצהוב",
                      },
                      {
                        key: "dark",
                        label: "מצב כהה",
                        description: "רקע כהה עם טקסט בהיר",
                      },
                      {
                        key: "light",
                        label: "מצב בהיר",
                        description: "רקע בהיר עם טקסט כהה",
                      },
                    ].map(({ key, label, description }) => (
                      <button
                        key={key}
                        className={`control-btn theme-btn theme-${key} ${settings.contrast === key ? "active" : ""}`}
                        aria-pressed={settings.contrast === key}
                        aria-describedby={`theme-${key}-desc`}
                        onClick={() =>
                          updateSetting(
                            "contrast",
                            key as "normal" | "high" | "dark" | "light",
                          )
                        }
                      >
                        <span
                          className="theme-preview"
                          aria-hidden="true"
                        ></span>
                        <span className="btn-label">{label}</span>
                        {settings.contrast === key && (
                          <span
                            className="current-indicator"
                            aria-label="בחירה נוכחית"
                          >
                            ✓
                          </span>
                        )}
                        <span id={`theme-${key}-desc`} className="sr-only">
                          {description}
                        </span>
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Color Blindness Support */}
                <fieldset className="control-group">
                  <legend>תמיכה בעיוורון צבעים</legend>
                  <label htmlFor="color-blindness-select" className="sr-only">
                    בחר פילטר עיוורון צבעים
                  </label>
                  <select
                    id="color-blindness-select"
                    value={settings.colorBlindness}
                    className="select-control"
                    aria-describedby="color-blindness-help"
                    onChange={(e) =>
                      updateSetting(
                        "colorBlindness",
                        e.target.value as
                          | "none"
                          | "protanopia"
                          | "deuteranopia"
                          | "tritanopia",
                      )
                    }
                  >
                    <option value="none">ללא פילטר</option>
                    <option value="protanopia">
                      עיוורון לאדום (Protanopia)
                    </option>
                    <option value="deuteranopia">
                      עיוורון לירוק (Deuteranopia)
                    </option>
                    <option value="tritanopia">
                      עיוורון לכחול (Tritanopia)
                    </option>
                  </select>
                  <div id="color-blindness-help" className="help-text">
                    החל פילטרי צבע כדי לסייע עם הבדלי ראיית צבעים
                  </div>
                </fieldset>

                {/* Spacing */}
                <fieldset className="control-group">
                  <legend>מרווח טקסט</legend>
                  <div
                    className="button-group"
                    role="group"
                    aria-label="אפשרויות מרווח טקסט"
                  >
                    {[
                      {
                        key: "normal",
                        label: "רגיל",
                        description: "מרווח סטנדרטי",
                      },
                      {
                        key: "wide",
                        label: "רחב",
                        description: "מרווח מוגדל בין אותיות ושורות",
                      },
                      {
                        key: "extra-wide",
                        label: "רחב מאוד",
                        description: "מרווח מקסימלי לקריאות",
                      },
                    ].map(({ key, label, description }) => (
                      <button
                        key={key}
                        className={`control-btn ${settings.spacing === key ? "active" : ""}`}
                        aria-pressed={settings.spacing === key}
                        title={description}
                        onClick={() =>
                          updateSetting(
                            "spacing",
                            key as "normal" | "wide" | "extra-wide",
                          )
                        }
                      >
                        <span className="btn-label">{label}</span>
                        {settings.spacing === key && (
                          <span
                            className="current-indicator"
                            aria-label="בחירה נוכחית"
                          >
                            ✓
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Toggle Options */}
                <fieldset className="control-group">
                  <legend>עזרים חזותיים</legend>

                  <div className="toggle-controls">
                    <div className="toggle-control">
                      <input
                        type="checkbox"
                        id="focus-ring-toggle"
                        aria-label="מחווני מיקוד משופרים"
                        checked={settings.focusRing}
                        aria-describedby="focus-ring-help"
                        onChange={(e) =>
                          updateSetting("focusRing", e.target.checked)
                        }
                      />
                      <label htmlFor="focus-ring-toggle">
                        <span
                          className="toggle-slider"
                          aria-hidden="true"
                        ></span>
                        מחווני מיקוד משופרים
                      </label>
                      <div id="focus-ring-help" className="help-text">
                        הופך את מיקוד המקלדת לנראה יותר עם קווי מתאר משופרים
                      </div>
                    </div>

                    <div className="toggle-control">
                      <input
                        type="checkbox"
                        id="reading-guide-toggle"
                        aria-label="קו מדריך קריאה"
                        checked={settings.readingGuide}
                        aria-describedby="reading-guide-help"
                        onChange={(e) =>
                          updateSetting("readingGuide", e.target.checked)
                        }
                      />
                      <label htmlFor="reading-guide-toggle">
                        <span
                          className="toggle-slider"
                          aria-hidden="true"
                        ></span>
                        קו מדריך קריאה
                      </label>
                      <div id="reading-guide-help" className="help-text">
                        מציג קו אופקי שעוקב אחרי סמן העכבר שלך
                      </div>
                    </div>

                    <div className="toggle-control">
                      <input
                        type="checkbox"
                        id="underline-links-toggle"
                        aria-label="הדגשת קישורים"
                        checked={settings.underlineLinks}
                        aria-describedby="underline-links-help"
                        onChange={(e) =>
                          updateSetting("underlineLinks", e.target.checked)
                        }
                      />
                      <label htmlFor="underline-links-toggle">
                        <span
                          className="toggle-slider"
                          aria-hidden="true"
                        ></span>
                        קו תחתון לכל הקישורים
                      </label>
                      <div id="underline-links-help" className="help-text">
                        הוסף קו תחתון לכל הקישורים לזיהוי קל יותר
                      </div>
                    </div>

                    <div className="toggle-control">
                      <input
                        type="checkbox"
                        id="animations-toggle"
                        aria-label="אנימציות"
                        checked={settings.animations}
                        aria-describedby="animations-help"
                        onChange={(e) =>
                          updateSetting("animations", e.target.checked)
                        }
                      />
                      <label htmlFor="animations-toggle">
                        <span
                          className="toggle-slider"
                          aria-hidden="true"
                        ></span>
                        הפעל אנימציות
                      </label>
                      <div id="animations-help" className="help-text">
                        כבה כדי להפחית תנועה ולשפר מיקוד
                      </div>
                    </div>
                  </div>
                </fieldset>

                {/* Cursor Size */}
                <fieldset className="control-group">
                  <legend>גודל סמן</legend>
                  <div
                    className="button-group"
                    role="group"
                    aria-label="אפשרויות גודל סמן"
                  >
                    {[
                      { key: "normal", label: "רגיל" },
                      { key: "large", label: "גדול" },
                      { key: "extra-large", label: "גדול מאוד" },
                    ].map(({ key, label }) => (
                      <button
                        key={key}
                        className={`control-btn ${settings.cursor === key ? "active" : ""}`}
                        aria-pressed={settings.cursor === key}
                        onClick={() =>
                          updateSetting(
                            "cursor",
                            key as "normal" | "large" | "extra-large",
                          )
                        }
                      >
                        <span className="btn-label">{label}</span>
                        {settings.cursor === key && (
                          <span
                            className="current-indicator"
                            aria-label="בחירה נוכחית"
                          >
                            ✓
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Reset Button */}
                <div className="control-group">
                  <button
                    className="reset-btn"
                    aria-describedby="reset-help"
                    onClick={resetSettings}
                  >
                    אפס את כל ההגדרות
                  </button>
                  <div id="reset-help" className="help-text">
                    פעולה זו תחזיר את כל הגדרות הנגישות לערכי ברירת המחדל שלהן
                  </div>
                </div>

                {/* Keyboard Shortcuts Info */}
                <details className="keyboard-shortcuts">
                  <summary>קיצורי מקלדת</summary>
                  <dl className="shortcut-list">
                    <dt>Alt + א</dt>
                    <dd>פתח/סגור לוח זה</dd>
                    <dt>Alt + 1-5</dt>
                    <dd>שנה גודל גופן (1=קטן, 5=ענק)</dd>
                    <dt>Alt + ח</dt>
                    <dd>החלף מצב כהה</dd>
                    <dt>Escape</dt>
                    <dd>סגור לוח זה</dd>
                  </dl>
                </details>
              </div>
            </div>
          </>
        )}

        {/* Reading Guide */}
        {settings.readingGuide && <ReadingGuide />}
      </div>

      {/* Live region for announcements */}
      <div
        id="accessibility-announcements"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
    </>
  );
};

export default AccessibilityWidget;

// Enhanced Reading Guide Component
const ReadingGuide = () => {
  const [position, setPosition] = useState({ y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ y: e.clientY });
    };

    const handleKeyboardMove = () => {
      const focusedElement = document.activeElement;
      if (focusedElement && focusedElement !== document.body) {
        const rect = focusedElement.getBoundingClientRect();
        setPosition({ y: rect.top + rect.height / 2 });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("focusin", handleKeyboardMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("focusin", handleKeyboardMove);
    };
  }, []);

  return (
    <div
      className="reading-guide"
      style={{ top: position.y }}
      aria-hidden="true"
      role="presentation"
    />
  );
};
