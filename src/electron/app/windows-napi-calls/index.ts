import { createRequire } from 'module'; //console.log(`window-monitor.ts:import.meta.url = "${import.meta.url}"`);
const require = createRequire(import.meta.url);
export const addon = require('./plugins/pmat_plugin_nodejs');

export * from './get-target-window';
export * from './get-window-content';
export * from './get-window-icon';
