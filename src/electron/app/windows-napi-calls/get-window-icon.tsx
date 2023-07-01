import { addon } from ".";

export function getWindowIcon(hwnd: number, iconFormat: string): Promise<string> {
    const paramsObj = { hwnd: hwnd, iconFormat: iconFormat }; // Other supported formats are 'png' and 'bmp'.
    const paramsStr = JSON.stringify(paramsObj);

    return new Promise<string>((resolve: (arg0: string) => void, reject: (arg0: string) => void) => {
        addon.getWindowIcon(paramsStr, (err: any, data: string) => {
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

function base64Decode(str: string): Buffer {
    return Buffer.from(str, 'base64');
}


///
/// This function starts GDI in a separate call, gets Window icon using that initialized ahead of time GDI
/// and stops GDI after.
/// In real program you would start GDI sometime at the beginning, call addon.getWindowIcon multiple times
/// and stop GDI at the end.
///
/// It also demonstrates how to to use simple callbacks instead of promises.
function getIconOfWindowInitGdiTest(hwnd: number) {
    const paramsObj = { "hwnd": hwnd };
    const paramsStr = JSON.stringify(paramsObj);

    addon.initGdi((err: string) => {
        if (err) {
            console.error('ERROR in initGdi:', err);
        }
        else {
            addon.getWindowIcon(paramsStr, (err: any, data: string) => {
                if (err) {
                    console.error('ERROR in getWindowIcon:', err);
                }
                else {
                    console.log('Icon received');

                    addon.termGdi(() => {
                        let iconContentObj = JSON.parse(data);
                        let iconBase64 = iconContentObj.data;
                        let iconBinary = base64Decode(iconContentObj.data);
//                        fs.writeFileSync('ImportedIcon.jpg', iconBinary);

                        console.log('Done');
                    });
                }
            });
        }
    });
}

///
/// This function starts GDI and stops GDI internally, every time it is called.
/// This happens if you do not start GDI using addon.initGdi ahead of calling addon.getWindowIcon
/// This is easier, but involves overhead of starting and stopping SGI every time
///
/// It also demonstrates how to use promise with await for this purpose.
async function getIconOfWindowTest(hwnd: number, iconFormat: string): Promise<[Buffer, string]> {
    let iconContentJson = await getWindowIcon(hwnd, iconFormat);
    let iconContentObj = JSON.parse(iconContentJson);
    return [base64Decode(iconContentObj.data), iconContentObj.type];
}
