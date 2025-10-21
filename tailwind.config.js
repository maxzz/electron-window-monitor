const twColors = require('tailwindcss/colors');
const setInputMarkerColor = require('./tailwind/set-input-marker-color');

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
        // require('@tailwindcss/forms')({ strategy: 'class' }),
        // require('./tailwind/tailwind-plugin-debug-screens'),
        // require('./tailwind/tailwind-plugin-debug-styles'),
        // setInputMarkerColor({ light: twColors.green[900], dark: twColors.green[100] }),
    ],
};
