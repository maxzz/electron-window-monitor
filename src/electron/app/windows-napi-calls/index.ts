import { createRequire } from 'module'; //console.log(`window-monitor.ts:import.meta.url = "${import.meta.url}"`);
const require = createRequire(import.meta.url);

/* * @type import('./addon') */

//export const addon = require('./plugins/pmat_plugin_nodejs');

// import * as addon2 from './plugins/pmat_plugin_nodejs.node';
// export const addon = addon2;

// import * as addon2 from './plugins/pmat_plugin_nodejs.node';
// export const addon = addon2;

/* * @type import('./addon.d.ts') */
//export const addon = require('./plugins/pmat_plugin_nodejs');



// module Addon {
    
//     export type PluginErrorCallback = (err: string) => void;
//     export type PluginDataCallback = (err: string, data: string) => void;

//     export declare function getTargetWindow(dataIn: object | string, cb: PluginDataCallback): Promise<string>;
    
//     // declare class CWindowControlsCollector {
//     //     // CWindowControlsCollector();
//     //     collect(param: string, cb: PluginDataCallback): Promise<string>;
//     //     cancel();
//     // }

//     export declare function initGdi(cd: PluginErrorCallback): void;

//     export declare function getWindowIcon(paramsStr: string, cb: PluginDataCallback): void;

//     export declare function termGdi(cb: () => void): void;
        
//     // declare class CManifestForWindowCreator {
//     //     CWindowControlsCollector();
//     //     async create(param: string, cb: PluginDataCallback): Promise<string>;
//     //     cancel();
//     // }
// }

// export const addon = require('./plugins/pmat_plugin_nodejs') as Addon;

// /<reference path="./addon.d.ts" />

//export const addon = require('./plugins/pmat_plugin_nodejs.node');

// import addon2 = require('./plugins/pmat_plugin_nodejs.node');
// import * as addon2 = require('./plugins/pmat_plugin_nodejs.node');
// export const addon = addon2;

// import addon2 from './plugins/pmat_plugin_nodejs.node';
// export const addon = addon2;

/// <reference types="./addon.d.ts" />
export const addon = require('./plugins/pmat_plugin_nodejs');

export * from './get-active-window';
export * from './get-window-content';
export * from './get-window-icon';
export * from './get-window-manifest';
