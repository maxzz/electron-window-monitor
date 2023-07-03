import { M4RInvoke } from "@/electron/app/ipc-types";
import { loadFilesContent } from "../utils-main/load-files";
import { getWindowIcon, getTargetHwnd, getWindowControls } from "../napi-calls";

export async function invokeFromRendererToMain(data: M4RInvoke.InvokeCalls): Promise<any> {
    switch (data.type) {
        case 'load-files': {
            return loadFilesContent(data.filenames, data.allowedExt);
        }
        case 'load-files2': {
            return loadFilesContent(data.filenames);
        }
        case 'get-second-window-handle': {
            const res = await getTargetHwnd({});
            return res;
        }
        case 'get-second-window-content': {
            const res = await getWindowControls(data.hwnd);
            return res;
        }
        case 'get-second-window-icon': {
            const res = await getWindowIcon(data.hwnd);
            return res;
        }
        case 'get-second-window-mani': {
            const res = await getWindowControls(data.hwnd);
            return res;
        }
        default: {
            const really: never = data;
            throw new Error(`\nUnknown IPC-invoke: ${JSON.stringify(really)}\n`);
        }
    }
}
