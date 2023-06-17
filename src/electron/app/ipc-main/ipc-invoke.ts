import { M4RInvoke } from "./ipc-types";
import { loadFilesContent } from "../utils/load-files";
import { getTargetWindow } from "../windows-napi-calls/window-monitor";

export async function invokeFromRendererToMain(d: M4RInvoke.InvokeCalls): Promise<any> {
    switch (d.type) {
        case 'load-files': {
            return loadFilesContent(d.filenames, d.allowedExt);
        }
        case 'load-files2': {
            return loadFilesContent(d.filenames);
        }
        case 'get-second-window-result': {
            let data1 = await getTargetWindow({});
            console.log('get-second-window-result', JSON.stringify(JSON.parse(data1), null, 4));
            return data1;
        }
        default: {
            const really: never = d;
            throw new Error(really);
        }
    }
}
