import { M4RInvoke } from "./ipc-types";
import { loadFilesContent } from "../utils/load-files";
import { getTargetWindow, getWindowContent } from "../windows-napi-calls";

export async function invokeFromRendererToMain(d: M4RInvoke.InvokeCalls): Promise<any> {
    switch (d.type) {
        case 'load-files': {
            return loadFilesContent(d.filenames, d.allowedExt);
        }
        case 'load-files2': {
            return loadFilesContent(d.filenames);
        }
        case 'get-second-window-handle': {
            const res = await getTargetWindow({});
            return res;
        }
        case 'get-second-window-content': {
            const res = await getWindowContent(d.hwnd);
            return res;
        }
        default: {
            const really: never = d;
            throw new Error(`\nUnknown IPC invoke: ${JSON.stringify(really)}\n`);
        }
    }
}
