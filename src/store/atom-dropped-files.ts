import { atom } from "jotai";
import { hasMain, invokeLoadFiles } from ".";
import { electronGetPathes, webLoadDataTransferContent, webLoadDialogOpen } from "@/utils";
import { R2MInvoke } from "@/shared/ipc-types";

export const filesContentAtom = atom<R2MInvoke.FileContent[]>([]);

// handle files drop for web and electron environments

export const doDroppedFilesAtom = atom(
    null,
    async (get, set, dataTransfer: DataTransfer) => {
        let filesCnt: R2MInvoke.FileContent[];

        if (hasMain()) {
            const dropFiles: File[] = [...dataTransfer.files];
            const filenames = electronGetPathes(dropFiles);
            if (!filenames.length) {
                return;
            }
            filesCnt = await invokeLoadFiles(filenames, R2MInvoke.allowedExt);
        } else {
            filesCnt = await webLoadDataTransferContent(dataTransfer.items, R2MInvoke.allowedExt);
        }

        if (filesCnt) {
            set(filesContentAtom, filesCnt);
        }
    }
);
export type DoDroppedFilesAtom = typeof doDroppedFilesAtom;

export const doDialogFilesAtom = atom(
    null,
    async (get, set, files: File[]) => {
        let filesCnt: R2MInvoke.FileContent[] = await webLoadDialogOpen(files, R2MInvoke.allowedExt);
        if (filesCnt) {
            set(filesContentAtom, filesCnt);
        }
    }
);
