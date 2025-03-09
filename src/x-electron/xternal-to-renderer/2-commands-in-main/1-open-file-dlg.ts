import { type BrowserWindow, dialog } from "electron";
import { R2MInvoke } from "@/shared/ipc-types";
import { mainToRenderer } from "@/shared/1-gates-in-main";
import { loadFilesContent } from "@/x-electron/app/utils-main/load-files";

export async function openFileDialogAndReply(appWin: BrowserWindow | null | undefined, what: { openDirs: boolean; } = { openDirs: false }) {
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

        const filesCnt = loadFilesContent(filePaths, R2MInvoke.allowedExt);
        mainToRenderer({ type: 'm2r:opened-files', filesCnt });
            
    } catch (error) {
        console.error(error);
    }
}
