
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import react from 'eslint-plugin-react';
import tsParser from '@typescript-eslint/parser';
import fsdLayers from 'eslint-plugin-fsd-layers';
import reactRefresh from 'eslint-plugin-react-refresh';


const tseslint = await import('@typescript-eslint/eslint-plugin');

export default [
  { ignores: ['dist'] },
  

  tseslint.default.configs?.stylisticTypeChecked || 
  tseslint.configs?.stylisticTypeChecked ||
  { plugins: { '@typescript-eslint': tseslint.default || tseslint } },
  
  tseslint.default.configs?.strictTypeChecked ||
  tseslint.configs?.strictTypeChecked ||
  { plugins: { '@typescript-eslint': tseslint.default || tseslint } },
  
  js.configs.recommended,
  
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'fsd-layers': fsdLayers,
      '@typescript-eslint': tseslint.default || tseslint,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'fsd-layers/no-import-from-top': 'error',
      'class-methods-use-this': 'warn',
      'no-console': 'off',
      'default-param-last': 'off',
      'consistent-return': 'warn',
      'no-void': 'off',
      'no-param-reassign': 'off',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      '@typescript-eslint/no-confusing-void-expression': [
        'error',
        {
          ignoreArrowShorthand: true,
          ignoreVoidOperator: true,
        },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
          allowDirectConstAssertionInArrowFunctions: true,
          allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          allowFunctionsWithoutTypeParameters: false,
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/consistent-type-exports': [
        'error',
        {
          fixMixedExportsWithInlineTypeSpecifier: true,
        },
      ],
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      'react/no-array-index-key': 'error',
    },
  },
];