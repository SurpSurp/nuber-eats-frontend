const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lime: colors.lime,
        warmGray: colors.warmGray
      },
      screens: {
        '3xl': '1800px',
      }
    },
  },
  maxWidth: {
    '3/4': '75%'
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
