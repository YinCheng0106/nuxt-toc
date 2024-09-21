const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './playground/components/**/*.{js,vue,ts}',
    './playground/layouts/**/*.vue',
    './playground/pages/**/*.vue',
    './playground/plugins/**/*.{js,ts}',
    './playground/app.vue',
    './playground/error.vue',
  ],
  theme: {
    extend: {
      animation: {
        spinSlow: 'spin 10s linear infinite',
      },
      colors: {
        themeColor: colors.stone,
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('scrollbar', '&::-webkit-scrollbar')
      addVariant('scrollbar-track', '&::-webkit-scrollbar-track')
      addVariant('scrollbar-thumb', '&::-webkit-scrollbar-thumb')
    }),
  ],
}
