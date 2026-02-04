import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import noUnsanitized from "eslint-plugin-no-unsanitized";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import security from "eslint-plugin-security";
import sonarjs from "eslint-plugin-sonarjs";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// `eslint-config-next` primarily ships "legacy" shareable configs.
// `FlatCompat` converts them into ESLint v9+ flat config format.
const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/out/**",
      "**/build/**",
      "**/dist/**",
      "sanity-studio/**",
      "src/components/webgpu-galaxy/**",
      "src/app/api/**", // Backend logic per .cursorrules
    ],
  },

  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    settings: {
      // Make jsx-a11y treat Next components like DOM elements
      // so rules like anchor-* and alt-text actually apply.
      "jsx-a11y": {
        components: {
          Link: "a",
          Image: "img",
        },
      },
    },

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
      // Disabled: dangerouslySetInnerHTML is used for JSON-LD structured data (standard SEO practice)
      "react/no-danger": "off",
      "no-console": ["error", { allow: ["warn","error"] }],

      // TypeScript (עכשיו באמת נטען)
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "error",

      // WCAG AA — verified jsx-a11y rules
      "jsx-a11y/alt-text": ["error", {
        elements: ["img"],
        img: ["Image"],
      }],

      // Enforce non-empty alt text (ESLint/ jsx-a11y allow alt="" for decorative images).
      // If you truly want to ban blank alt entirely, this is the simplest enforceable rule.
      "no-restricted-syntax": [
        "error",
        {
          selector: `
            JSXOpeningElement[name.name=/^(img|Image)$/]
            > JSXAttribute[name.name="alt"][value.value=""]
            :not(:has(JSXAttribute[name.name="aria-hidden"][value.value="true"]))
          `,
          message:
            "Empty alt is allowed only for decorative images. Add aria-hidden='true' and role='presentation', or provide meaningful alt text."
        }
      ],
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/aria-activedescendant-has-tabindex": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-role": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/click-events-have-key-events": "error",
      "jsx-a11y/control-has-associated-label": "error",
      "jsx-a11y/heading-has-content": "error",
      "jsx-a11y/iframe-has-title": "error",
      "jsx-a11y/img-redundant-alt": "error",
      "jsx-a11y/interactive-supports-focus": "error",
      "jsx-a11y/label-has-associated-control": ["error", { assert: "either" }],
      "jsx-a11y/media-has-caption": "error",
      "jsx-a11y/mouse-events-have-key-events": "error",
      "jsx-a11y/no-access-key": "error",
      "jsx-a11y/no-autofocus": "error",
      "jsx-a11y/no-distracting-elements": "error",
      "jsx-a11y/no-noninteractive-element-interactions": "error",
      "jsx-a11y/no-noninteractive-tabindex": "error",
      "jsx-a11y/no-redundant-roles": "error",
      "jsx-a11y/no-static-element-interactions": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",
      "jsx-a11y/tabindex-no-positive": "error",

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

export default eslintConfig;
