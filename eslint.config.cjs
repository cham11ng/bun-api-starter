const parser = require('@typescript-eslint/parser');
const sonarjs = require('eslint-plugin-sonarjs');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const jsdoc = require('eslint-plugin-jsdoc');

module.exports = {
  languageOptions: {
    parser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },
  plugins: { sonarjs, simpleImportSort, jsdoc },
  files: ['**/*.ts'],
  ...require('@eslint/js').configs.recommended,
  ...require('@typescript-eslint/eslint-plugin').configs.recommended,
  // overrides: [
  //   {
  //     files: ['**/*.ts'],
  //     ...require('eslint-plugin-prettier').configs.recommended,
  //     ...require('eslint-plugin-sonarjs').configs.recommended,
  //     ...require('eslint-plugin-jsdoc').configs['recommended-typescript']
  //   }
  // ],
  ignores: ['./node_modules/*'],
  rules: {
    'no-error-on-unmatched-pattern': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'sonarjs/cognitive-complexity': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/ban-ts-comment': 'off',
    'simple-import-sort/imports': 'warn',
    'jsdoc/no-types': 'off',
    'jsdoc/tag-lines': 'off',
    'jsdoc/require-returns-description': 'off'
  }
};
