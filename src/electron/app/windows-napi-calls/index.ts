import { createRequire } from 'module'; //console.log(`window-monitor.ts:import.meta.url = "${import.meta.url}"`);
const require = createRequire(import.meta.url);

/* * @type import('./addon') */

//export const addon = require('./plugins/pmat_plugin_nodejs');

import * as addon2 from './plugins/pmat_plugin_nodejs.node';
export const addon = addon2;

export * from './get-active-window';
export * from './get-window-content';
export * from './get-window-icon';
export * from './get-window-manifest';
