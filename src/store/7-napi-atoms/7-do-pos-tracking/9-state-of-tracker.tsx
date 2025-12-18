import { atom } from "jotai";
import { proxy } from "valtio";
import { type PosTrackerCbType } from "@/x-electron/xternal-to-renderer/7-napi-calls";
import { type HighlightHwnd } from "@/store/7-napi-atoms/7-do-pos-tracking";

// State of napi pos tracker

type StateNapiPosTracker = {
    current: PosTrackerCbType;
    dragIsRunning: boolean;
};

export const stateNapiPosTracker = proxy<StateNapiPosTracker>({
    current: {
        x: 0,
        y: 0,
        isInside: false,
    },
    dragIsRunning: false,
});

// Atoms to show tracking position

export type PosAtoms = {
    xAtom: PA<number>;
    yAtom: PA<number>;
};

export const posAtoms = proxy<PosAtoms>({
    xAtom: atom(0),
    yAtom: atom(0),
});

// 
export const highlightHwnd = atom<HighlightHwnd | null>(null);

export function getFileUsConnectedHwndAtom(): PA<HighlightHwnd> {
    return highlightHwnd;
}
