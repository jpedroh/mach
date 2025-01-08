// @ts-check

import { FlatCompat } from '@eslint/eslintrc'
import eslint from '@eslint/js'
import nxPlugin from '@nx/eslint-plugin'
import playwright from 'eslint-plugin-playwright'
import reactPlugin from 'eslint-plugin-react'
import testingLibrary from 'eslint-plugin-testing-library'
import tseslint from 'typescript-eslint'

const compat = new FlatCompat()

export default tseslint.config(
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...compat.extends('plugin:react-hooks/recommended'),
      reactPlugin.configs.flat.recommended,
      reactPlugin.configs.flat['jsx-runtime'],
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
    extends: [testingLibrary.configs['flat/react']],
  },
  {
    files: ['**/*.spec.ts'],
    extends: [playwright.configs['flat/recommended']],
  }
)
