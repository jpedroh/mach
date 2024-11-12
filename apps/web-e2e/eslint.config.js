// @ts-check

import playwright from 'eslint-plugin-playwright'
import defaultConfigs from '../../eslint.config.js'

export default [...defaultConfigs, playwright.configs['flat/recommended']]
