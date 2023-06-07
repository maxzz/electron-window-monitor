import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const addon = require('../public/plugins/pmat_plugin_nodejs');

export function getTargetWindow(dataIn: object | string): Promise<string> {
    return new Promise<string>(
        (resolve, reject) => {
            let strParam = dataIn;
            if (typeof strParam === 'object') {
                strParam = JSON.stringify(dataIn);
            }

            addon.getTargetWindow(strParam, (err: string, data: string) => {
                if (err) {
                    //console.error(err);
                    reject(err);
                }
                else {
                    //console.log(data);
                    resolve(data);
                }
            });
        });
}

//const hwnd = { "hwnd": "10025E" };

// async function doWork() {
//     try {
//         console.log('step1');

//         let data1 = await getTargetWindow({});

//         let hwnd;
//         try {
//             const obj = JSON.parse(data1);
//             console.log('getTargetWindow():', obj);

//             hwnd = { hwnd: obj.hwnd };

//         } catch (error) {
//             console.error('failed:', error);
//         }

//         console.log('step2');

//         let collector = new addon.CWindowControlsCollector();
//         collector.collect(JSON.stringify(hwnd), (err: any, data: string) => {
//             if (err) {
//                 console.error(err);
//             }
//             else {
//                 console.log(data);
//             }
//         });

//         //collector.cancel();
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

// doWork();

