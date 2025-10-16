// Cookie consent management utility

export type CookiePreferences = {
  essential: boolean; // Always true, cannot be disabled
  analytics: boolean;
  timestamp: string;
};

const COOKIE_CONSENT_KEY = 'cookieConsent';

export const defaultPreferences: CookiePreferences = {
  essential: true,
  analytics: false,
  timestamp: new Date().toISOString(),
};

/**
 * Get current cookie preferences from localStorage
 */
export const getCookiePreferences = (): CookiePreferences | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) return null;
    
    const preferences = JSON.parse(stored) as CookiePreferences;
    return preferences;
  } catch (error) {
    console.error('Error reading cookie preferences:', error);
    return null;
  }
};

/**
 * Save cookie preferences to localStorage
 */
export const saveCookiePreferences = (preferences: CookiePreferences): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const preferencesWithTimestamp = {
      ...preferences,
      essential: true, // Always keep essential cookies enabled
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(preferencesWithTimestamp));
    
    // Dispatch custom event for components to listen to preference changes
    window.dispatchEvent(new CustomEvent('cookiePreferencesChanged', { 
      detail: preferencesWithTimestamp 
    }));
  } catch (error) {
    console.error('Error saving cookie preferences:', error);
  }
};

/**
 * Accept all cookies
 */
export const acceptAllCookies = (): void => {
  saveCookiePreferences({
    essential: true,
    analytics: true,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Reject all non-essential cookies
 */
export const rejectAllCookies = (): void => {
  saveCookiePreferences({
    essential: true,
    analytics: false,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Check if user has made a choice about cookies
 */
export const hasUserMadeChoice = (): boolean => {
  return getCookiePreferences() !== null;
};

/**
 * Check if analytics cookies are enabled
 */
export const isAnalyticsEnabled = (): boolean => {
  const preferences = getCookiePreferences();
  return preferences?.analytics ?? false;
};

/**
 * Clear all cookie preferences (useful for testing)
 */
export const clearCookiePreferences = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(COOKIE_CONSENT_KEY);
  window.dispatchEvent(new Event('cookiePreferencesCleared'));
};

