const twColors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');
const svgToDataUri = require('mini-svg-data-uri');

const fixInputs = plugin.withOptions(function (options = { marker: 'red' }) {
    return function ({ addComponents }) {
        const markColor = options.marker;
        addComponents({
            '.form-checkbox:checked': {
                'background-image': `url("${svgToDataUri(
                    `<svg viewBox="0 0 16 16" fill="${markColor}" xmlns="http://www.w3.org/2000/svg"><path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"/></svg>`
                )}")`,
            },
            '.form-checkbox:indeterminate': {
                'background-image': `url("${svgToDataUri(
                    `<svg xmlns="http://www.w3.org/2000/svg" fill="${markColor}" viewBox="0 0 16 16"><path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h8"/></svg>`
                )}")`,
            },
            '.form-radio:checked': {
                'background-image': `url("${svgToDataUri(
                    `<svg viewBox="0 0 16 16" fill="${markColor}" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="3"/></svg>`
                )}")`,
            },
        });
    };
});

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
        fixInputs({marker: twColors.green[800]}),
    ],
};
