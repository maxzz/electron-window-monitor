const { type } = require("os");

module.exports = function ({ addComponents, theme }) {
    //https://github.com/jorenvanhee/tailwindcss-debug-screens
    //use: add class 'debug-screens' on any top element

    const screens = theme('screens') || {}; // {sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px'}

    const userStyles = theme('debugScreens.style', {});
    const ignoredScreens = theme('debugScreens.ignore', ['dark']);
    const prefix = theme('debugScreens.prefix', 'screen: ');
    const selector = theme('debugScreens.selector', '.debug-screens');

    const defaultPosition = ['bottom', 'left'];
    const position = theme('debugScreens.position', defaultPosition);
    const positionY = position[0] || defaultPosition[0];
    const positionX = position[1] || defaultPosition[1];

    const screenEntries = Object.entries(screens);

    const mediaQueries = {};

    Object.entries(screens).forEach(
        ([name, size]) => {
            console.log('---', name, size);
            if (typeof size !== 'string' || !size) {
                return;
            }
            const pxs = size.includes('rem') ? `${parseInt(size.replace('rem', ''), 10) * 16}px` : '';

            mediaQueries[`@media (min-width: ${size})`] = {
                content: `'${prefix}${name} ${pxs} is ${size}'`,
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
    const rv = {
        position: 'fixed',
        zIndex: '2147483647',
        [positionY]: '6px',
        [positionX]: '4px',
        padding: '0.75rem 0.25rem',
        fontSize: '12px',
        lineHeight: '1',
        fontFamily: 'sans-serif',
        borderRadius: '5px',
        border: '2px solid #6f84f9ff',
        backgroundColor: '#162ba35f',
        color: '#2e3982ff',
        boxShadow: '0 0 2px 2px rgba(124, 117, 253, 0.24)',
        content: `'${prefix}${screenEntries?.[0]?.[0] ? `less then ${screenEntries?.[0]?.[0]} (${screenEntries?.[0]?.[1]})` : '_'}'`,
    };
    return rv;
}
