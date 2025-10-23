// Custom version of https://github.com/jorenvanhee/tailwindcss-debug-screens for tailwindcss v4.x
// Usage: add class 'debug-screens' on any top element

/** @type {import('tailwindcss').Plugin} */
module.exports = function ({ addComponents, theme }) {

    const screens = theme('screens') || {}; // {sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px'}

    const userStyles = theme('debugScreens.style', {});
    const ignoredScreens = theme('debugScreens.ignore', ['dark']);
    const prefix = theme('debugScreens.prefix', 'Screen: ');
    const selector = theme('debugScreens.selector', '.debug-screens');

    const defaultPosition = ['bottom', 'left'];
    const position = theme('debugScreens.position', defaultPosition);
    const positionY = position[0] || defaultPosition[0];
    const positionX = position[1] || defaultPosition[1];

    const screenEntries = Object.entries(screens);

    const mediaQueries = {};

    Object.entries(screens).forEach(
        ([name, size]) => {
            if (typeof size !== 'string' || !size) {
                return;
            }
            mediaQueries[`@media (min-width: ${size})`] = {
                content: `"${prefix}<${name}> (${sizeInPixels(size)}:${size})"`,
            };
        }
    );

    const debugComponent = {
        [`${selector}::before`]: Object.assign(
            getDebugDisplayCss(prefix, positionY, positionX, screenEntries),
            mediaQueries,
            userStyles
        ),
    };

    addComponents(debugComponent);
};

function getDebugDisplayCss(prefix, positionY, positionX, screenEntries) {
    const firstScreen = screenEntries?.[0];
    const [name, size] = firstScreen ? firstScreen : ['_', 0];
    const content = `'${prefix}${name ? `less then <${name}> (${sizeInPixels(size)}:${size})` : '_'}'`;
    const rv = {
        content,
        position: 'fixed',
        zIndex: '2147483647',
        [positionY]: '6px',
        [positionX]: '4px',
        padding: '0.75rem 0.25rem',
        lineHeight: '1',
        fontSize: '12px',
        fontFamily: 'sans-serif',
        borderRadius: '5px',
        border: '2px solid #6f84f9ff',
        backgroundColor: '#162ba35f',
        color: '#2e3982ff',
        boxShadow: '0 0 2px 2px #7c75fd3d',
    };
    return rv;
}

function sizeInPixels(size) {
    const pxs = (size || '').includes('rem') ? `${parseInt(size.replace('rem', ''), 10) * 16}px` : '';
    return pxs;
}
