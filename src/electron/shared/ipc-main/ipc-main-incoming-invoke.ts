import { M4RInvoke } from "@/electron/shared/ipc-types";
import { loadFilesContent } from "../../app/utils-main/load-files";
import { getTargetHwnd, getWindowIcon, getWindowControls, getWindowMani } from "../../app/napi-calls";

export async function invokeFromRendererToMain(data: M4RInvoke.InvokeCalls): Promise<any> {
    switch (data.type) {
        case 'load-files': {
            return loadFilesContent(data.filenames, data.allowedExt);
        }
        case 'load-files2': {
            return loadFilesContent(data.filenames);
        }
        case 'get-target-hwnd': {
            const res = await getTargetHwnd();
            return res;
        }
        case 'get-window-controls': {
            const res = await getWindowControls(data.hwnd);
            return res;
        }
        case 'get-window-icon': {
            const res = await getWindowIcon(data.hwnd);
            return res;
        }
        case 'get-window-mani': {
            const res = await getWindowMani(data.hwnd, data.wantXml);
            return res;
        }
        default: {
            const really: never = data;
            throw new Error(`\nUnknown IPC-invoke: ${JSON.stringify(really)}\n`);
        }
    }
}
