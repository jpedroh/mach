const eslint = require('@eslint/js')
const tsEslint = require('typescript-eslint')
const reactEslint = require('eslint-plugin-react/configs/recommended')
const nxEslint = require('@nx/eslint-plugin')

module.exports = tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    ...reactEslint,
    rules: {
      ...reactEslint.rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-target-blank': 'off',
    },
  },
  {
    plugins: {
      '@nx': nxEslint,
    },
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
