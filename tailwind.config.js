const twColors = require('tailwindcss/colors');
const setInputMarkerColor = require('./tailwind/set-input-marker-color');

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
    plugins: [
        require('@tailwindcss/forms')({ strategy: 'class' }),
        setInputMarkerColor({ marker: twColors.green[800] }),
    ],
};
