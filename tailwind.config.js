const twColors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');
const svgToDataUri = require('mini-svg-data-uri');

const fixInputs = plugin(
    function ({ addComponents }) {
        addComponents({
            '.form-checkbox:checked': {
                '--color': 'red',
                'background-image': `url("${svgToDataUri(
                    `<svg viewBox="0 0 16 16" fill="var(--color, white)" xmlns="http://www.w3.org/2000/svg"><path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"/></svg>`
                  )}")`,
            }
        });
    },
);

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
        fixInputs,
    ],
};
