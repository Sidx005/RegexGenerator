import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Base JS/TS rules
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"]
  },
  // Browser globals
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: { globals: globals.browser }
  },
  // TypeScript rules
  tseslint.configs.recommended,
  // React rules (new JSX transform)
  pluginReact.configs.flat.recommended,
  // Custom overrides
  {
    rules: {
      // Next.js and React 17+ automatically import React, disable this rule
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off'

    }
  }
]);
