import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import importPlugin from "eslint-plugin-import";
import noUnsanitized from "eslint-plugin-no-unsanitized";
import security from "eslint-plugin-security";
import sonarjs from "eslint-plugin-sonarjs";
import tseslint from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// `eslint-config-next` primarily ships "legacy" shareable configs.
// `FlatCompat` converts them into ESLint v9+ flat config format.
const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    plugins: {
      security,
      import: importPlugin,
      "@typescript-eslint": tseslint,
      "no-unsanitized": noUnsanitized,
      sonarjs,
      react,
      "jsx-a11y": jsxA11y,
      "react-hooks": reactHooks,
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
];
