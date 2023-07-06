const twColors = require('tailwindcss/colors');
const setInputMarkerColor = require('./tailwind/set-input-marker-color');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'primary': twColors.green,
            }

        },
    },
    plugins: [
        require('@tailwindcss/forms')({ strategy: 'class' }),
        setInputMarkerColor({ light: twColors.green[800], dark: twColors.red[300] }),
    ],
};
