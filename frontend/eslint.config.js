import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tailwindcss from "eslint-plugin-tailwindcss";
import prettier from "eslint-plugin-prettier";

export default [
  {
    ignores: ["node_modules", "dist"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        node: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
        alias: {
          map: [
            ["pages", "./src/pages"],
            ["components", "./src/components"],
            ["hooks", "./src/hooks"],
            ["layout", "./src/layout"],
            ["libs", "./src/libs"],
            ["media", "./src/media"],
            ["routes", "./src/routes"],
            ["store", "./src/store"],
            ["data", "./src/data"],
            ["styles", "./src/styles"],
          ],
          extensions: [".js", ".jsx", ".json"],
        },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      import: importPlugin,
      "jsx-a11y": jsxA11y,
      tailwindcss,
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/exhaustive-deps": "off",
      "no-unused-vars": ["error", { args: "none", ignoreRestSiblings: true }],
      "import/no-unresolved": [
        "error",
        {
          ignore: [
            "^pages/",
            "^components/",
            "^hooks/",
            "^layout/",
            "^libs/",
            "^media/",
            "^routes/",
            "^store/",
            "^styles/",
            "^data/",
          ],
        },
      ],
      "no-use-before-define": [
        "error",
        { functions: false, classes: true, variables: false },
      ],
      "prettier/prettier": ["error", { singleQuote: true, endOfLine: "auto" }],
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/enforces-shorthand": "warn",
      "tailwindcss/migration-from-tailwind-2": "warn",
      "tailwindcss/no-arbitrary-value": "off",
      "tailwindcss/no-custom-classname": "off",
      "tailwindcss/no-contradicting-classname": "error",
    },
  },
];
