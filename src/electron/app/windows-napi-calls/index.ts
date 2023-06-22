import { createRequire } from 'module';
import { mainToRenderer } from '../ipc-main';
import { mainStore } from '../store-main';
console.log(`window-monitor.ts:import.meta.url = "${import.meta.url}"`);

const require = createRequire(import.meta.url);
const addon = require('./plugins/pmat_plugin_nodejs');
//const addon = require('../public/plugins/pmat_plugin_nodejs');

//import { controlsCheckProgress } from "@/store/app-state";

//TODO: what are params for getTargetWindow(dataIn: object | string)

export function getTargetWindow(dataIn: object | string): Promise<string> {
    return new Promise<string>(
        (resolve, reject) => {
            const param = typeof dataIn === 'object' ? JSON.stringify(dataIn) : dataIn;
            addon.getTargetWindow(param, (err: string, data: string) => err ? reject(err) : resolve(data));
        }
    );
}

type CollectProgressData = {
    state: 'progress' | 'done';
    progress: number;
};

export type CollectFinalData = {
    pool: string;
    controls: string[];
};

type CollectResult = CollectProgressData | CollectFinalData;

export function getWindowContent(hwnd: string): Promise<string> {
    return new Promise<string>(
        (resolve, reject) => {
            const param = JSON.stringify({ hwnd });
            const collector = new addon.CWindowControlsCollector();

            collector.collect(param, (err: any, str: string) => {
                if (err) {
                    reject(err);
                    return;
                }

                try {
                    const res: CollectResult = JSON.parse(str);

                    if ('state' in res) {
                        if (mainStore.maxControls !== 0 && res.progress > mainStore.maxControls) {
                            collector.cancel();
                            reject(`>>>Too many controls (more then ${mainStore.maxControls})`);
                        }

                        //console.log('cb:', JSON.stringify(res));
                        mainToRenderer({ type: 'detection-progress', progress: res.progress });
                        return;
                    }

                    resolve(str);
                    //console.log('final:', JSON.stringify(res));
                } catch (error) {
                    const msg = `>>>${error instanceof Error ? error.message : `${error}`}`;

                    // const m = msg.match(/Bad escaped character in JSON at position (\d+)$/);

                    // if (m) {
                    //     const n = +m[1];
                    //     const pos1 = Math.max(n - 20, 0);
                    //     const s1 = str.substring(pos1, n - 1);
                    //     const s2 = str.substring(n, n + 1);
                    //     const s3 = str.substring(n + 1, n + 100);

                    //     console.error(`tm: Bad JSON at pos ${n}:\n${pos1}-${n-1}:-->${s1}<--\n${n}-${n+1}:-->${s2}<--\n${n+1}-${n+100}:-->${s3}<--\n`);
                    //     console.log('str\n', str);
                    // }

                    reject(msg);
                    mainToRenderer({ type: 'failed-raw-content', body: str });
                }
            });
        }
    );
}
