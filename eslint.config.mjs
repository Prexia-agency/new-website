import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import noUnsanitized from "eslint-plugin-no-unsanitized";
import sonarjs from "eslint-plugin-sonarjs";


import security from "eslint-plugin-security";
import importPlugin from "eslint-plugin-import";
import tseslint from "@typescript-eslint/eslint-plugin";

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    plugins: {
      security,
      import: importPlugin,
      "@typescript-eslint": tseslint, 
      "no-unsanitized": noUnsanitized,
      sonarjs,
    },

    rules: {
      // Airbnb JSX
      "import/order": ["error", {
        groups: ["builtin","external","internal","parent","sibling","index"],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      }],

      "react/jsx-sort-props": ["error", {
        callbacksLast: true,
        shorthandLast: true,
        noSortAlphabetically: true,
      }],

      "react/function-component-definition": ["error", {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      }],

      // Safety
      "react/no-danger": "error",
      "no-console": ["error", { allow: ["warn","error"] }],

      // TypeScript (עכשיו באמת נטען)
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "error",

      // A11y (עכשיו באמת נטען)
      "jsx-a11y/no-static-element-interactions": "error",
      "jsx-a11y/click-events-have-key-events": "error",
      "jsx-a11y/control-has-associated-label": "error",
      "jsx-a11y/tabindex-no-positive": "error",
      "jsx-a11y/media-has-caption": "error",

      // Security
      "security/detect-object-injection": "warn",
      "no-unsanitized/method": "error",
      "no-unsanitized/property": "error",

      // Logic & security bugs
      "sonarjs/no-duplicate-string": "warn",
      "sonarjs/no-identical-functions": "warn",
      "sonarjs/no-all-duplicated-branches": "error",
      "sonarjs/no-small-switch": "warn",
      "sonarjs/cognitive-complexity": ["warn", 20],
    },
  },
]);
