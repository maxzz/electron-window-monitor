const twColors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
        colors: {
            'primary': twColors.green,
        }
        
    },
  },
  plugins: [],
}
