import { createRequire } from 'module'; //console.log(`window-monitor.ts:import.meta.url = "${import.meta.url}"`);
import { AddonTypes } from './plugin-types';

const require = createRequire(import.meta.url);
export const addon: AddonTypes = require('./plugins/pmat_plugin_nodejs');

//console.log('addon', addon);

export * from './get-active-window';
export * from './get-window-content';
export * from './get-window-icon';
export * from './get-window-manifest';
