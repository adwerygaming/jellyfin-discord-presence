import js from "@eslint/js";
import type { Linter } from "eslint";
import tseslint from "typescript-eslint";

const config: Linter.Config[] = [
  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.eslint.json",
        sourceType: "module"
      }
    },
    rules: {
      "eol-last": ["error", "always"],
      "semi": ["error", "always"],
      "@typescript-eslint/no-unnecessary-type-parameters": "off",
      "@typescript-eslint/no-extraneous-class": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
    }
  },

  {
    ignores: ["dist", "build", "node_modules"]
  }
];

export default config;
