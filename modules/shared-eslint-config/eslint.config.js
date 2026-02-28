// @ts-check

import eslint from '@eslint/js'
import nxPlugin from '@nx/eslint-plugin'
import { defineConfig } from 'eslint/config'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import playwright from 'eslint-plugin-playwright'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import testingLibrary from 'eslint-plugin-testing-library'
import tseslint from 'typescript-eslint'

export default defineConfig(
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['out-tsc/**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      reactHooks.configs.flat['recommended-latest'],
      nxPlugin.configs['flat/base'],
      jsxA11y.flatConfigs.strict,
    ],
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
