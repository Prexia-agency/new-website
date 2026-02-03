import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import importPlugin from "eslint-plugin-import";
import noUnsanitized from "eslint-plugin-no-unsanitized";
import security from "eslint-plugin-security";
import sonarjs from "eslint-plugin-sonarjs";
import tseslint from "@typescript-eslint/eslint-plugin";

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
    },

    rules: {
      // Import hygiene
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      // Safety
      "no-console": ["error", { allow: ["warn", "error"] }],

      // TypeScript
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "error",

      // Security
      "security/detect-object-injection": "warn",
      "no-unsanitized/method": "error",
      "no-unsanitized/property": "error",

      // Logic & maintainability
      "sonarjs/no-duplicate-string": "warn",
      "sonarjs/no-identical-functions": "warn",
      "sonarjs/no-all-duplicated-branches": "error",
      "sonarjs/no-small-switch": "warn",
      "sonarjs/cognitive-complexity": ["warn", 20],
    },
  },
];
