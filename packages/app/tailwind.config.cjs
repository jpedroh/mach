/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../modules/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {},
  },
  variants: {
    extend: { opacity: ['disabled'] },
  },
  plugins: [
    require('tailwindcss-react-aria-components'),
    require('tailwindcss-animate'),
  ],
}
