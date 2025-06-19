import { type R2MInvoke } from "@/shared/ipc-types";
import { getTargetHwnd, getWindowIcon, getWindowControls, getWindowMani, getTlwInfos, getTlwScreenshots, highlightField, highlightTargetWindow, getWindowExtras, dndAction } from "../../x-electron/xternal-to-renderer/7-napi-calls";
import { loadWin32FilesContent } from "../../x-electron/xternal-to-renderer/2-commands-in-main";

export async function invokeFromRendererInMain(data: R2MInvoke.AllInvokes): Promise<any> {
    switch (data.type) {
        case 'r2mi:load-files': {
            return loadWin32FilesContent(data.filenames, data.allowedExt);
        }
        case 'r2mi:load-files2': {
            return loadWin32FilesContent(data.filenames);
        }
        case 'r2mi:get-target-hwnd': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.GetSecondWindowHandle> = await getTargetHwnd();
            return rv;
        }
        case 'r2mi:get-window-controls': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.GetSecondWindowContent> = await getWindowControls(data.hwnd);
            return rv;
        }
        case 'r2mi:get-window-icon': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.GetSecondWindowIcon> = await getWindowIcon(data.hwnd);
            return rv;
        }
        case 'r2mi:get-window-pos': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.GetWindowPos> = await dndAction(data.params);
            return rv;
        }
        case 'r2mi:get-window-mani': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.GetSecondWindowMani> = await getWindowMani(data.params);
            return rv;
        }
        case 'r2mi:get-tlw-infos': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.GetTlwInfos> = await getTlwInfos();
            return rv;
        }
        case "r2mi:get-tlw-screenshots": {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.GetTlwScreenshots> =  await getTlwScreenshots(data.tlwInfos);
            return rv;
        }
        case 'r2mi:highlight-field': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.HighlightField> = await highlightField(data);
            return rv;
        }
        case 'r2mi:highlight-target': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.HighlightTarget> = await highlightTargetWindow(data.params);
            return rv;
        }
        case 'r2mi:get-window-extras': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.GetWindowExtras> = await getWindowExtras(data);
            return rv;
        }
        default: {
            const really: never = data;
            throw new Error(`\nUnknown IPC-invoke: ${JSON.stringify(really)}\n`);
        }
    }
}
