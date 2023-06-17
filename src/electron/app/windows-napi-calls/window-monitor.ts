import { createRequire } from 'module';
console.log(`window-monitor.ts:import.meta.url = "${import.meta.url}"`);

const require = createRequire(import.meta.url);
const addon = require('./plugins/pmat_plugin_nodejs');
//const addon = require('../public/plugins/pmat_plugin_nodejs');

//TODO: what are params for getTargetWindow(dataIn: object | string)

export function getTargetWindow(dataIn: object | string): Promise<string> {
    return new Promise<string>(
        (resolve, reject) => {
            const param = typeof dataIn === 'object' ? JSON.stringify(dataIn) : dataIn;
            addon.getTargetWindow(param, (err: string, data: string) => err ? reject(err) : resolve(data));
        }
    );
}

// export function getWindowContent(hwnd: string): Promise<string> {
//     return new Promise<string>(
//         (resolve, reject) => {
//             const param = JSON.stringify({ hwnd });
//             const collector = new addon.CWindowControlsCollector();
//             collector.collect(param, (err: any, data: string) => err ? reject(err) : resolve(data));
//         }
//     );
// }

export function getWindowContent(hwnd: string): Promise<string> {
    return new Promise<string>(
        (resolve, reject) => {
            const param = JSON.stringify({ hwnd });
            const collector = new addon.CWindowControlsCollector();
            collector.collect(param, (err: any, data: string) => {
                if (err) {
                    reject(err);
                    return;
                }
                const res: /*{ state: 'progress' | 'done'; progress: number; } |*/ { pool: string; controls: string[]; } = JSON.parse(data);
                
                if (res.controls) {
                    resolve(data);
                }

                console.log('cb:', JSON.stringify(res));
            });
        }
    );
}
