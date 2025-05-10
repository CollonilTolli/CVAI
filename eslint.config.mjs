import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";

const backendConfig = (path) => (
  {
    files: [
      path + "/src/**/*.ts",
    ],
    languageOptions: { globals: { ...globals.browser, ...globals.node }, parser,
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      project: path + "/tsconfig.json"
    },
   },
    rules: {
      curly: "error",
      "prefer-const": "error",
      "no-useless-constructor": "error",
      "prettier/prettier": "warn"
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier: prettierPlugin
    },
  }
)

export default defineConfig([
  backendConfig('apps/2fa-back'),
  backendConfig('apps/fileapi-back'),
  {
    files: [
      "packages/shared/**/*.ts",
    ],
    languageOptions: { globals: { ...globals.browser, ...globals.node }, parser,
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      // project: path + "/tsconfig.json"
    },
   },
    rules: {
      curly: "error",
      "prefer-const": "error",
      "no-useless-constructor": "error",
      "prettier/prettier": "warn"
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier: prettierPlugin
    },
  }
]);
