# ESLint Exceptions & Security Patterns

This document explains all security patterns and `eslint-disable` comments in the codebase.

## Object Injection Prevention (Per .cursorrules)

All dynamic object access has been refactored using explicit guards:

### Pattern Used:

```typescript
// ✅ SAFE - Ternary guard
const value = key === "valid" ? obj.valid : obj.default;

// ✅ SAFE - Explicit bounds check
const item = index >= 0 && index < arr.length ? arr[index] : arr[0];
```

### Files Fixed:

- `src/lib/validations/contact.ts` - Field schema access with ternary guards
- `src/components/shared/hero-button.tsx` - Variant selection with ternary
- `src/components/ui/word-rotate.tsx` - Array access with bounds check
- `src/contexts/AccessibilityContext.tsx` - Settings access with explicit guards
- `src/components/DrawLink.tsx` - SVG variant selection with bounds check
- `src/components/GalaxySection.tsx` - Data access with null check and bounds
- `src/components/footer-new.tsx` - Glyph widths with bounds check
- `src/components/magicui/hyper-text.tsx` - Character access with bounds check
- `src/components/second-work.tsx` - Ref assignment with bounds check
- `src/app/contact/page.tsx` - Form validation with type guards

---

## Safe Exceptions

### 1. tailwind.config.js - CommonJS require()

**File:** `tailwind.config.js`  
**Rule:** `@typescript-eslint/no-require-imports`  
**Reason:** Tailwind config uses CommonJS format. This is the standard way to load plugins.  
**Security:** ✅ Safe - No user input involved.

---

### 2. DrawLink.tsx - Static SVG innerHTML

**File:** `src/components/DrawLink.tsx`  
**Rule:** `no-unsanitized/property`  
**Reason:** SVG content comes from a hardcoded array (lines 15-21), not user input.  
**Security:** ✅ Safe - Only internal counter replaces `{ID}` placeholder.

---

### 3. useGoogleAnalytics.ts - Debug Logs

**File:** `src/utils/useGoogleAnalytics.ts`  
**Rule:** `no-console`  
**Reason:** Development logs for tracking Google Analytics initialization.  
**Security:** ✅ Safe - No sensitive data logged.  
**Note:** These can be removed in production if desired.

---

### 4. CookiePreferencesModal.tsx - ARIA Dialog

**File:** `src/components/shared/CookiePreferencesModal.tsx`  
**Rule:** `jsx-a11y/no-noninteractive-element-interactions`  
**Reason:** Modal has proper ARIA attributes (`role="dialog"`, `aria-modal="true"`).  
**Accessibility:** ✅ Compliant - Escape key handler included.

---

### 5. sites.tsx - Visual Hover Effects

**File:** `src/components/sites.tsx`  
**Rule:** `jsx-a11y/no-noninteractive-element-interactions`  
**Reason:** Hover effects are purely visual feedback, not critical functionality.  
**Accessibility:** ✅ Acceptable - Links inside are keyboard-navigable.

---

### 6. webgpu-galaxy - Experimental APIs

**Files:** `src/components/webgpu-galaxy/*`  
**Rule:** `@typescript-eslint/no-explicit-any`  
**Reason:** WebGPU and Three.js TSL are experimental with incomplete TypeScript definitions.  
**Note:** Entire directory is excluded from CI linting via `eslint.config.mjs`.

---

---

## Additional Safe Exceptions (Cosmetic)

### 7. String Duplication

**Rule:** `sonarjs/no-duplicate-string`  
**Reason:** Repeated strings in styling (CSS classes, font names, easing functions) and configuration constants.  
**Files:** Multiple components with repeated Tailwind classes, GSAP animation strings, and site metadata.  
**Impact:** ✅ Cosmetic only - no runtime or security implications.

### 8. React Hooks Dependencies

**Rule:** `react-hooks/exhaustive-deps`  
**Reason:** Ref cleanup in useEffect - standard React pattern where ref stability is guaranteed.  
**Files:** `herov.tsx`, `second-work.tsx`, `sites.tsx`  
**Impact:** ✅ Safe - React refs are stable and don't require inclusion in dependencies.

### 9. Next.js Image Optimization

**Rule:** `@next/next/no-img-element`  
**Reason:** Direct `<img>` tags used for GSAP-animated images requiring ref access.  
**Files:** `second-section-gsap.tsx`, `ProjectItem.tsx`  
**Impact:** ✅ Intentional - GSAP animations require direct DOM element refs.

### 10. Cognitive Complexity

**Rule:** `sonarjs/cognitive-complexity`  
**Reason:** Complex validation logic in contact form field validator.  
**File:** `lib/validations/contact.ts`  
**Impact:** ✅ Acceptable - validation logic is well-tested and necessary for form security.

---

## CI/CD Safety

All exceptions have been reviewed for security and accessibility compliance.  
No user input reaches any `innerHTML` or similar dangerous operations.  
All object injection warnings are protected with explicit guards (bounds checks, `in` operator, type guards).

**Last reviewed:** 2026-02-04
