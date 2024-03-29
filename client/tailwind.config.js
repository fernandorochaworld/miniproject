/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      sky: colors.sky,
      amber: colors.amber,
      red: colors.red,
      green: colors.green,
    },
  },
  plugins: [],
};

