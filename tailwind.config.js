const twColors = require('tailwindcss/colors');
const { debugScreensPlugin } = require('tailwindcss-plugin-debug-screens-tw4');
const { markersPlugin } = require("tailwindcss-plugin-markers-tw4");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'primary': twColors.slate,
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms')({ strategy: 'class' }),
        debugScreensPlugin,
        markersPlugin({ light: twColors.green[900], dark: twColors.green[100] }),
    ],
};
