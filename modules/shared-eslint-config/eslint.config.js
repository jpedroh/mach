// @ts-check

import eslint from '@eslint/js'
import nxPlugin from '@nx/eslint-plugin'
import reactPlugin from 'eslint-plugin-react'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
  },
  reactPlugin.configs.flat.recommended,
  {
    settings: {
      react: {
        version: '18.3.1',
      },
    },
  },
  reactPlugin.configs.flat['jsx-runtime'],
  { plugins: { '@nx': nxPlugin } },
  {
    files: ['*.ts', '*.tsx', '*.js', '*.jsx'],

    rules: {
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
  { ignores: ['**/eslint.config.js', '**/dist'] }
)
