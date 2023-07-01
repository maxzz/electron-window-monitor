import { createRequire } from 'module'; //console.log(`window-monitor.ts:import.meta.url = "${import.meta.url}"`);

const require = createRequire(import.meta.url);
// export const addon = require('./plugins/pmat_plugin_nodejs');
export const addon2 = require('./plugins/pmat_plugin_nodejs');

export const addon = addon2 as PluginErrorCallback;

export * from './get-active-window';
export * from './get-window-content';
export * from './get-window-icon';
export * from './get-window-manifest';
