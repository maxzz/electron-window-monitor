import { atom } from "jotai";
import { invokeMain } from "../ipc-client";
import { clientState } from "../app-state";
import { getSubError } from "@/utils";

export const sawIconStrAtom = atom<string | undefined>('');
export const sawIconAtom = atom<HTMLImageElement | null>(null);

export const doGetSawIconAtom = atom(
    null,
    async (get, set, hwnd: string | undefined): Promise<void> => {
        try {
            if (!hwnd) {
                throw new Error('No hwnd');
            }

            const res = await invokeMain<string>({ type: 'get-second-window-icon', hwnd });

            set(sawIconStrAtom, res);

            var image = new Image();
            image.src = `data:image/png;base64,${res}`;
            set(sawIconAtom, image);

            clientState.buildRunning = false;
            clientState.buildCounter = 0;
            clientState.buildError = '';

            console.log('doGetSawIconAtom.set', JSON.stringify(res, null, 4));
        } catch (error) {
            set(sawIconStrAtom, '');

            clientState.buildError = getSubError(error);

            console.error(`'get-saw-content' ${error instanceof Error ? error.message : `${error}`}`);
        }
    }
);

