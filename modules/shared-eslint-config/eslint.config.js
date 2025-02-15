// @ts-check

import { FlatCompat } from '@eslint/eslintrc'
import eslint from '@eslint/js'
import nxPlugin from '@nx/eslint-plugin'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import playwright from 'eslint-plugin-playwright'
import react from 'eslint-plugin-react'
import reactCompiler from 'eslint-plugin-react-compiler'
import testingLibrary from 'eslint-plugin-testing-library'
import tseslint from 'typescript-eslint'

const compat = new FlatCompat()

export default tseslint.config(
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['out-tsc/**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      compat.extends('plugin:react-hooks/recommended'),
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      // @ts-expect-error - Broken types on react compiler for some reason
      reactCompiler.configs.recommended,
      jsxA11y.flatConfigs.strict,
    ],
    plugins: { '@nx': nxPlugin },
    settings: {
      react: { version: '18.3.1' },
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@nx/enforce-module-boundaries': [
        'error',
        {
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
            {
              sourceTag: 'type:feature',
              onlyDependOnLibsWithTags: ['type:shared'],
            },
            {
              sourceTag: 'type:shared',
              onlyDependOnLibsWithTags: ['type:shared'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.test.tsx'],
    ignores: ['out-tsc/**/*.ts'],
    extends: [testingLibrary.configs['flat/react']],
  },
  {
    files: ['**/*.spec.ts'],
    ignores: ['out-tsc/**/*.ts'],
    extends: [playwright.configs['flat/recommended']],
  }
)
