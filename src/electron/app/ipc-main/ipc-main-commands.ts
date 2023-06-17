import { BrowserWindow, dialog } from "electron";
import { winApp } from "../start-main-window/create-main-window";
import { M2R, M4RInvoke } from ".";
import { loadFilesContent } from "../utils/load-files";

export function mainToRanderer(data: M2R.RendererCalls) {
    const channel: PreloadChannels = 'send-to-renderer';
    winApp?.webContents.send(channel, data);
}

export async function openFileDialog(appWin: BrowserWindow | null | undefined, what: { openDirs: boolean; } = { openDirs: false }) {
    if (!appWin) {
        return;
    }

    try {
        const { canceled, filePaths } = await dialog.showOpenDialog(appWin, {
            properties: [what.openDirs ? 'openDirectory' : 'openFile', 'multiSelections'],
        });
        if (canceled) {
            return;
        }

        const filesCnt = loadFilesContent(filePaths, M4RInvoke.allowedExt);
        mainToRanderer({ type: 'opened-files', filesCnt });
            
    } catch (error) {
        console.error(error);
    }
}
