"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

export interface AccessibilitySettings {
  fontSize: "small" | "normal" | "large" | "extra-large" | "jumbo";
  fontFamily: "default" | "dyslexic" | "mono";
  contrast: "normal" | "high" | "dark" | "light";
  spacing: "normal" | "wide" | "extra-wide";
  animations: boolean;
  focusRing: boolean;
  readingGuide: boolean;
  language: string;
  colorBlindness: "none" | "protanopia" | "deuteranopia" | "tritanopia";
  underlineLinks: boolean;
  cursor: "normal" | "large" | "extra-large";
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K],
  ) => void;
  resetSettings: () => void;
  announcement: string;
}

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

const defaultSettings: AccessibilitySettings = {
  fontSize: "normal",
  fontFamily: "default",
  contrast: "normal",
  spacing: "normal",
  animations: true,
  focusRing: false,
  readingGuide: false,
  language: "he",
  colorBlindness: "none",
  underlineLinks: false,
  cursor: "normal",
};

export const AccessibilityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [settings, setSettings] =
    useState<AccessibilitySettings>(defaultSettings);
  const [announcement, setAnnouncement] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);

  // Handle hydration to prevent flash
  useEffect(() => {
    setIsHydrated(true);
    markHydrationComplete();

    // Safety check: ensure body is scrollable on mount
    if (typeof document !== "undefined") {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
  }, []);

  // Load settings from localStorage - ONLY after hydration
  useEffect(() => {
    if (!isHydrated) return;

    try {
      const saved = localStorage.getItem("accessibility-settings");
      if (saved) {
        const parsedSettings = JSON.parse(saved);
        const validatedSettings = validateSettings(parsedSettings);
        setSettings(validatedSettings);
      }
    } catch (error) {
      console.warn("Failed to load accessibility settings:", error);
    }
  }, [isHydrated]);

  // Save settings to localStorage and apply them - ONLY after hydration
  useEffect(() => {
    if (!isHydrated) return;

    try {
      localStorage.setItem("accessibility-settings", JSON.stringify(settings));
      applySettings(settings);
    } catch (error) {
      console.warn("Failed to save accessibility settings:", error);
    }
  }, [settings, isHydrated]);

  // Announce changes to screen readers in Hebrew
  const announce = useCallback((message: string) => {
    setAnnouncement("");
    setTimeout(() => {
      setAnnouncement(message);
    }, 100);
  }, []);

  const updateSetting = useCallback(
    <K extends keyof AccessibilitySettings>(
      key: K,
      value: AccessibilitySettings[K],
    ) => {
      setSettings((prev) => {
        const newSettings = { ...prev, [key]: value };

        // Hebrew announcements for screen readers
        const hebrewLabels: Record<string, string> = {
          fontSize: "גודל טקסט",
          fontFamily: "סוג גופן",
          contrast: "ניגודיות",
          spacing: "מרווח טקסט",
          animations: "אנימציות",
          focusRing: "סימון מיקוד",
          readingGuide: "קו קריאה",
          colorBlindness: "פילטר עיוורון צבעים",
          underlineLinks: "קו תחתון לקישורים",
          cursor: "גודל סמן",
        };

        const hebrewValues: Record<string, string> = {
          small: "קטן",
          normal: "רגיל",
          large: "גדול",
          "extra-large": "גדול מאוד",
          jumbo: "ענק",
          default: "ברירת מחדל",
          dyslexic: "ידידותי לדיסלקטים",
          mono: "רוחב קבוע",
          high: "ניגודיות גבוהה",
          dark: "מצב כהה",
          light: "מצב בהיר",
          wide: "רחב",
          "extra-wide": "רחב מאוד",
          true: "מופעל",
          false: "מכובה",
          none: "ללא",
          protanopia: "עיוורון לאדום",
          deuteranopia: "עיוורון לירוק",
          tritanopia: "עיוורון לכחול",
        };

        // Safe object access with explicit guards
        const safeKey = key as keyof typeof hebrewLabels;
        const readableKey = key in hebrewLabels ? hebrewLabels[safeKey] : key;

        const valueStr = String(value);
        const safeValueKey = valueStr as keyof typeof hebrewValues;
        const readableValue =
          valueStr in hebrewValues ? hebrewValues[safeValueKey] : valueStr;

        announce(`${readableKey} שונה ל${readableValue}`);

        return newSettings;
      });
    },
    [announce],
  );

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
    announce("כל הגדרות הנגישות אופסו לברירת המחדל");
  }, [announce]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      // Alt + א to toggle accessibility panel (Hebrew)
      if (e.altKey && (e.key === "a" || e.key === "א")) {
        e.preventDefault();
        const widget = document.querySelector(
          ".accessibility-toggle",
        ) as HTMLElement;
        widget?.click();
      }

      // Alt + 1,2,3,4,5 for quick font size changes
      if (e.altKey && ["1", "2", "3", "4", "5"].includes(e.key)) {
        e.preventDefault();
        const sizes: AccessibilitySettings["fontSize"][] = [
          "small",
          "normal",
          "large",
          /* eslint-disable-next-line sonarjs/no-duplicate-string */
          "extra-large",
          "jumbo",
        ];
        updateSetting("fontSize", sizes[parseInt(e.key) - 1]);
      }

      // Alt + ח for dark mode toggle (Hebrew ח for חושך - darkness)
      if (e.altKey && (e.key === "d" || e.key === "ח")) {
        e.preventDefault();
        updateSetting(
          "contrast",
          settings.contrast === "dark" ? "normal" : "dark",
        );
      }
    };

    document.addEventListener("keydown", handleKeyboard);
    return () => document.removeEventListener("keydown", handleKeyboard);
  }, [updateSetting, settings.contrast]);

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSetting,
        resetSettings,
        announcement,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility must be used within AccessibilityProvider",
    );
  }
  return context;
};

// Validate settings to ensure they contain valid values
function validateSettings(
  settings: Record<string, unknown>,
): AccessibilitySettings {
  const validOptions = {
    fontSize: ["small", "normal", "large", "extra-large", "jumbo"],
    fontFamily: ["default", "dyslexic", "mono"],
    contrast: ["normal", "high", "dark", "light"],
    spacing: ["normal", "wide", "extra-wide"],
    colorBlindness: ["none", "protanopia", "deuteranopia", "tritanopia"],
    cursor: ["normal", "large", "extra-large"],
  };

  const validated = { ...defaultSettings };

  Object.keys(settings).forEach((key) => {
    if (key in defaultSettings) {
      const typedKey = key as keyof AccessibilitySettings;
      // Safe object access with explicit guard
      const safeKey = key as keyof typeof settings;
      const currentValue = key in settings ? settings[safeKey] : undefined;

      // Safe defaultSettings access
      const defaultValue =
        typedKey in defaultSettings ? defaultSettings[typedKey] : undefined;

      if (typeof defaultValue === "boolean") {
        (validated as Record<string, unknown>)[typedKey] =
          Boolean(currentValue);
      } else if (typedKey in validOptions) {
        // Safe validOptions access
        const optionsForKey =
          typedKey in validOptions
            ? (validOptions as Record<string, string[]>)[typedKey]
            : [];
        if (optionsForKey.includes(currentValue as string)) {
          (validated as Record<string, unknown>)[typedKey] = currentValue;
        }
      } else if (typeof currentValue === "string") {
        (validated as Record<string, unknown>)[typedKey] = currentValue;
      }
    }
  });

  return validated;
}

// Apply settings to document with enhanced WCAG compliance
function applySettings(settings: AccessibilitySettings) {
  if (typeof document === "undefined") return;

  // ROBUST HYDRATION GUARD
  if (
    typeof window !== "undefined" &&
    !window.document.documentElement.hasAttribute("data-hydration-complete")
  ) {
    return;
  }

  const root = document.documentElement;

  // Font size with proper scaling
  root.setAttribute("data-font-size", settings.fontSize);

  // Font family
  root.setAttribute("data-font-family", settings.fontFamily);

  // Contrast/Theme
  root.setAttribute("data-theme", settings.contrast);

  // Spacing
  root.setAttribute("data-spacing", settings.spacing);

  // Color blindness filters
  root.setAttribute("data-color-blindness", settings.colorBlindness);

  // Cursor size
  root.setAttribute("data-cursor", settings.cursor);

  // Underline links
  root.setAttribute("data-underline-links", settings.underlineLinks.toString());

  // Animations with proper reduced motion support
  if (
    !settings.animations ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    root.style.setProperty("--animation-duration", "0ms");
    root.style.setProperty("--transition-duration", "0ms");
  } else {
    root.style.removeProperty("--animation-duration");
    root.style.removeProperty("--transition-duration");
  }

  // Focus ring
  root.setAttribute("data-focus-ring", settings.focusRing.toString());

  // Reading guide
  root.setAttribute("data-reading-guide", settings.readingGuide.toString());

  // Language
  root.setAttribute("lang", settings.language);
}

// Mark hydration as complete
function markHydrationComplete() {
  if (typeof window !== "undefined") {
    setTimeout(() => {
      document.documentElement.setAttribute("data-hydration-complete", "true");
    }, 100);
  }
}
