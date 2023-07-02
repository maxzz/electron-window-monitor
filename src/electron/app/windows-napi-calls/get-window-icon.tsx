import { addon } from ".";
import { WindowIconGetterParams, IconFormatType, WindowIconGetter } from "./pmat-plugin-types";
//import fs from 'fs';

function base64Decode(str: string): Buffer {
    return Buffer.from(str, 'base64');
}

let gManifestForWindowCreator: WindowIconGetter | null = null;

export async function getIcon(hwnd: string, iconFormat: IconFormatType = 'png'): Promise<string> {
    if (!gManifestForWindowCreator) {
        gManifestForWindowCreator = new addon.WindowIconGetter();
    }

    const params = JSON.stringify({ hwnd, iconFormat } as WindowIconGetterParams);

    return new Promise<string>((resolve, reject) => {
        if (!gManifestForWindowCreator) {
            throw new Error('no gManifestForWindowCreator');
        }

        gManifestForWindowCreator.getWindowIcon(params, (err: any, data: string) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
                // fs.writeFileSync('ImportedIcon.' + iconFormat, iconFormat);

                // const iconContentObj = JSON.parse(data);
                // const iconBinary = base64Decode(iconContentObj.data);
                // resolve([iconBinary, iconContentObj.type]);
            }
        });
    });
}
