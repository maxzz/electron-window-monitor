#!/usr/bin/env node

// Test script for tailwind-plugin-debug-screens.js
// This script can be used with the VS Code debugger to test the plugin

const plugin = require('./tailwind-plugin-debug-screens.js');

// Mock Tailwind CSS theme function
function createMockTheme() {
    const themeData = {
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px'
        },
        debugScreens: {
            style: {},
            ignore: ['dark'],
            prefix: 'screen: ',
            selector: '.debug-screens',
            position: ['bottom', 'left']
        }
    };

    return function theme(path, defaultValue) {
        const keys = path.split('.');
        let value = themeData;
        
        for (const key of keys) {
            if (value && typeof value === 'object' && key in value) {
                value = value[key];
            } else {
                return defaultValue;
            }
        }
        
        return value || defaultValue;
    };
}

// Mock addComponents function
function mockAddComponents(components) {
    console.log('🎯 Generated Components:');
    console.log(JSON.stringify(components, null, 2));
    console.log('\n📏 CSS Breakdown:');
    
    Object.entries(components).forEach(([selector, styles]) => {
        console.log(`\n${selector}:`);
        Object.entries(styles).forEach(([property, value]) => {
            if (property.startsWith('@media')) {
                console.log(`  ${property}:`);
                Object.entries(value).forEach(([mediaProp, mediaValue]) => {
                    console.log(`    ${mediaProp}: ${mediaValue}`);
                });
            } else {
                console.log(`  ${property}: ${value}`);
            }
        });
    });
}

// Test the plugin
console.log('🚀 Testing Tailwind Debug Screens Plugin\n');
console.log('=' .repeat(50));

try {
    const theme = createMockTheme();
    
    // Test with default configuration
    console.log('\n📋 Testing with default configuration...\n');
    plugin({ addComponents: mockAddComponents, theme });
    
    console.log('\n' + '=' .repeat(50));
    console.log('✅ Plugin test completed successfully!');
    
} catch (error) {
    console.error('❌ Error testing plugin:', error);
    process.exit(1);
}