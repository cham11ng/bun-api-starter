import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import jsdoc from 'eslint-plugin-jsdoc';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sonarjs from 'eslint-plugin-sonarjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  {
    ignores: ['./node_modules/*']
  },
  jsdoc.configs['flat/recommended'],
  sonarjs.configs.recommended,
  ...compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'),
  {
    plugins: {
      'simple-import-sort': simpleImportSort
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module'
    },

    rules: {
      'no-error-on-unmatched-pattern': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'sonarjs/cognitive-complexity': 'off',
      'sonarjs/sonar-no-fallthrough': 'off',
      '@typescript-eslint/no-shadow': ['error'],
      '@typescript-eslint/ban-ts-comment': 'off',
      'simple-import-sort/imports': 'warn',
      'jsdoc/no-types': 'off',
      'jsdoc/tag-lines': 'off',
      'jsdoc/require-returns-description': 'off'
    }
  }
];
