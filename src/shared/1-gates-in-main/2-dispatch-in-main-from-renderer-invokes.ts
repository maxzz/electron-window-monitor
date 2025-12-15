import { type R2MInvoke } from "@/shared/ipc-types";
import { getTargetHwnd, getWindowIcon, getWindowControls, getWindowMani, getTlwInfos, getTlwScreenshots, highlightControl, highlightWindow, getWindowExtras, dndActionInit, getGeneralInfo, performCommand } from "../../x-electron/xternal-to-renderer/7-napi-calls";
import { loadWin32FilesContent } from "../../x-electron/xternal-to-renderer/2-commands-in-main";
import { appWindow } from "../../x-electron/app/1-start-main-window/7-app-window-instance";

export async function invokeFromRendererInMain(data: R2MInvoke.AllInvokes): Promise<any> {
    switch (data.type) {
        case 'r2mi:load-files': {
            return loadWin32FilesContent(data.filenames, data.allowedExt);
        }
        case 'r2mi:load-files2': {
            return loadWin32FilesContent(data.filenames);
        }

        // napi

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
        case 'r2mi:get-window-pos-init': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.GetWindowPosInit> = dndActionInit(data.params);
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
            const rv: R2MInvoke.InvokeResult<R2MInvoke.HighlightField> = await highlightControl(data.params);
            return rv;
        }
        case 'r2mi:highlight-target': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.HighlightTarget> = await highlightWindow(data.params);
            return rv;
        }
        case 'r2mi:get-window-extras': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.GetWindowExtras> = await getWindowExtras(data);
            return rv;
        }

        case 'r2mi:get-general-info': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.GeneralInfo> = await getGeneralInfo();
            return rv;
        }
        case 'r2mi:perform-command': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.PerformCommand> = await performCommand(data.params);
            return rv;
        }
        case 'r2mi:get-zoom-level': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.GetZoomLevel> = appWindow.wnd?.webContents.getZoomLevel() ?? 0;
            return rv;
        }
        default: {
            const really: never = data;
            throw new Error(`\nUnknown IPC-invoke: ${JSON.stringify(really)}\n`);
        }
    }
}
