const eslintPluginPlaywright = require('eslint-plugin-playwright')

module.exports = [
  ...require('../../eslint.config'),
  eslintPluginPlaywright.configs['flat/recommended'],
]
