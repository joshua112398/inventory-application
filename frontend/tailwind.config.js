/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}',],
  theme: {
    extend: {
      backgroundImage: {
        'home-pattern': "url('/src/assets/Dainsleif_Portrait.png')",
      }
    },
    fontFamily: {
      'sans': ['Lexend Deca', 'sans-serif', ...defaultTheme.fontFamily.sans],
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

