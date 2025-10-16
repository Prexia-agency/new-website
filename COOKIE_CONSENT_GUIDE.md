# Cookie Consent System Documentation

This guide explains how the cookie consent system works in your AK Agency website and how to integrate Google Analytics.

## 📋 Overview

The cookie consent system is fully implemented and manages user preferences for:
- **Essential Cookies**: Always enabled (required for site functionality)
- **Analytics Cookies**: Optional (Google Analytics - to be integrated)

## 🏗️ System Components

### 1. Cookie Consent Utility (`src/utils/cookieConsent.ts`)
Central utility for managing cookie preferences:
- Stores preferences in `localStorage` under key `cookieConsent`
- Provides functions to check, save, and retrieve preferences
- Dispatches events when preferences change

**Key Functions:**
```typescript
getCookiePreferences()    // Get current preferences
saveCookiePreferences()   // Save preferences
acceptAllCookies()        // Accept all cookies
rejectAllCookies()        // Reject non-essential cookies
hasUserMadeChoice()       // Check if user has made a choice
isAnalyticsEnabled()      // Check if analytics is enabled
```

### 2. Cookies Banner (`src/components/shared/CookiesBanner.tsx`)
- Shows 6 seconds after page load (if no preference stored)
- Provides "Accept All" and "Reject All" buttons
- Links to Privacy Policy and Terms of Service
- Uses smooth animations for better UX
- **No longer redirects users to Google when rejecting**

### 3. Cookie Preferences Modal (`src/components/shared/CookiePreferencesModal.tsx`)
Full-featured modal for managing cookies:
- Shows detailed information about each cookie type
- Toggle switches for analytics cookies
- "Accept All", "Reject All", and "Save Preferences" buttons
- Accessible from footer

### 4. Footer Integration (`src/components/footer.tsx`)
Added "הגדרות עוגיות" (Cookie Settings) button in footer alongside:
- מדיניות פרטיות (Privacy Policy)
- תנאי שימוש (Terms of Service)

## 🎯 How It Works

### User Flow

1. **First Visit**:
   - Page loads
   - After 6 seconds, cookie banner appears
   - User can accept all, reject all, or close banner
   
2. **Making a Choice**:
   - Selecting "Accept All" enables analytics
   - Selecting "Reject All" disables analytics (only essential cookies)
   - Preference is saved to localStorage with timestamp

3. **Returning Visits**:
   - If preference exists, banner doesn't show
   - User can change preferences anytime via footer link

4. **Changing Preferences**:
   - Click "הגדרות עוגיות" in footer
   - Modal opens with current settings
   - Toggle analytics on/off
   - Save or accept/reject all

## 📊 Stored Data Structure

Preferences are stored in localStorage as JSON:

```json
{
  "essential": true,
  "analytics": false,
  "timestamp": "2025-10-16T12:00:00.000Z"
}
```

## 🔌 Integrating Google Analytics

### Step 1: Get Your GA4 Measurement ID
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a GA4 property
3. Copy your Measurement ID (format: `G-XXXXXXXXXX`)

### Step 2: Add Environment Variable
Create/update `.env.local` in your project root:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Step 3: Create Analytics Client Component

Create `src/components/GoogleAnalytics.tsx`:

```tsx
'use client';

import { useGoogleAnalytics } from '@/utils/useGoogleAnalytics';

export default function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  
  if (!measurementId) {
    console.warn('GA Measurement ID not found');
    return null;
  }
  
  useGoogleAnalytics(measurementId);
  
  return null;
}
```

### Step 4: Add to Layout

Update `src/app/layout.tsx`:

```tsx
import GoogleAnalytics from '@/components/GoogleAnalytics';

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <GoogleAnalytics /> {/* Add this */}
        <AccessibilityProvider>
          {/* ... rest of your layout */}
        </AccessibilityProvider>
        <Footer />
        <CookiesBanner />
      </body>
    </html>
  );
}
```

### Step 5: Track Custom Events (Optional)

In any component:

```tsx
import { trackEvent } from '@/utils/useGoogleAnalytics';

// Track button click
const handleClick = () => {
  trackEvent('button_click', {
    button_name: 'contact_form_submit',
    page: 'contact'
  });
};

// Track form submission
const handleSubmit = () => {
  trackEvent('form_submission', {
    form_name: 'contact_form',
    category: 'engagement'
  });
};
```

### Step 6: Track Page Views on Route Changes

Create `src/components/RouteChangeTracker.tsx`:

```tsx
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/utils/useGoogleAnalytics';

export default function RouteChangeTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : '');
    trackPageView(url);
  }, [pathname, searchParams]);

  return null;
}
```

Then add to layout:

```tsx
import RouteChangeTracker from '@/components/RouteChangeTracker';

// In layout body:
<GoogleAnalytics />
<RouteChangeTracker />
```

## ✅ Testing

### Test Cookie Banner
1. Clear localStorage: `localStorage.clear()` in browser console
2. Refresh page
3. Wait 6 seconds - banner should appear

### Test Cookie Preferences
1. Click "הגדרות עוגיות" in footer
2. Toggle analytics on/off
3. Check localStorage: `localStorage.getItem('cookieConsent')`

### Test Google Analytics (After Integration)
1. Accept cookies
2. Open browser DevTools → Network tab
3. Filter by "google-analytics.com"
4. You should see GA requests

## 🔒 Privacy Compliance

✅ **GDPR Compliant**:
- User consent required before analytics
- Clear information about cookie usage
- Easy way to withdraw consent
- No cookies set before consent

✅ **User-Friendly**:
- Non-intrusive banner timing (6 seconds)
- Always accessible from footer
- Clear, Hebrew-language descriptions
- Smooth animations

## 🎨 Styling

The system uses your existing color scheme:
- Primary color: `peaceful-dawn` (defined in your theme)
- RTL support (Hebrew)
- Responsive design (mobile-first)
- Matches your site's design language

## 🐛 Troubleshooting

**Banner not showing?**
- Clear localStorage and refresh
- Check browser console for errors

**Analytics not working?**
- Verify Measurement ID is correct
- Check if analytics cookies are accepted
- Look for GA scripts in DevTools → Network

**Modal not opening?**
- Check browser console for errors
- Verify Footer component is rendering

## 📝 Notes

- Essential cookies are always enabled (cannot be disabled)
- Rejecting cookies no longer redirects users away
- Preferences persist across browser sessions
- System is ready for Google Analytics integration
- All text is in Hebrew (RTL)

