import { addon } from ".";
import fs from 'fs';
import { GetWindowIconParams, IconFormatType, WindowIconGetterBody } from "./plugin-types";

function base64Decode(str: string): Buffer {
    return Buffer.from(str, 'base64');
}

let gManifestForWindowCreator: WindowIconGetterBody | null = null;

export async function getIcon(hwnd: string, iconFormat: IconFormatType = 'png'): Promise<[Buffer, IconFormatType]> {
    if (!gManifestForWindowCreator) {
        gManifestForWindowCreator = new addon.WindowIconGetter();
    }

    const params = JSON.stringify({ hwnd, iconFormat } as GetWindowIconParams);

    return new Promise<[Buffer, IconFormatType]>((resolve, reject) => {
        if (!gManifestForWindowCreator) {
            throw new Error('no gManifestForWindowCreator');
        }

        gManifestForWindowCreator.getWindowIcon(params, (err: any, data: string) => {
            if (err) {
                reject(err);
            } else {
                // resolve(data);
                // fs.writeFileSync('ImportedIcon.' + iconFormat, iconFormat);

                const iconContentObj = JSON.parse(data);
                const iconBinary = base64Decode(iconContentObj.data);
                resolve([iconBinary, iconContentObj.type]);
            }
        });
    });
}
