import type { Config } from 'tailwindcss';
import tailwind_colors from 'tailwindcss/colors';
import tailwind_forms from '@tailwindcss/forms';
import tm_debug_screens from 'tailwindcss-plugin-debug-screens-tw4';
import tm_markers from 'tailwindcss-plugin-markers-tw4';

const config: Config = {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'primary': tailwind_colors.slate,
            },
        },
    },
    plugins: [
        tailwind_forms({ strategy: 'class' }),
        tm_debug_screens,
        tm_markers({ light: tailwind_colors.green[900], dark: tailwind_colors.green[100] }),
    ],
};

export default config;
