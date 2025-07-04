import { proxy } from 'valtio';
import { atomWithProxy } from 'jotai-valtio';
import { type PosTrackerCbType } from '@/x-electron/xternal-to-renderer/7-napi-calls';

// Build state

type NapiBuildState = {                         // State of Napi multistep build: icons, controls, manifest
    buildRunning: boolean;                      // Content check build is runnning. Make shure there is no multiple calls at the same time or use counter as lock
    buildError: string;                         // Error message if build failed
    buildFailedBody: string;                    // Raw string returned from main that failed to parse
};

export const napiBuildState = proxy<NapiBuildState>({
    buildRunning: false,
    buildError: '',
    buildFailedBody: '',
});

export const napiBuildStateAtom = atomWithProxy(napiBuildState);

// Get window position progress

type NapiBuildProgress = {
    buildCounter: number;                       // Controls detection progress
    lastProgress: number;                       // Last number of build progress or 0
    // getPosProgress: TargetPosition | null;      // Get window position progress
    // dragIsRunning: boolean;                     // Drag and drop is running
};

export const napiBuildProgress = proxy<NapiBuildProgress>({
    buildCounter: 0,
    lastProgress: 0,
    // getPosProgress: null,
    // dragIsRunning: false,
});

// export function setNapiGetPosXY(x: number, y: number) {
//     const xyNew: PointXY = { x: roundInt(x), y: roundInt(y) };
//     const xyOld = napiBuildProgress.getPosProgress?.point || { x: 0, y: 0 };
//
//     if (xyNew.x !== xyOld.x || xyNew.y !== xyOld.y) {
//         napiBuildProgress.getPosProgress = { point: xyNew, clientRect: { left: 0, top: 0, right: 0, bottom: 0 }, windowRect: { left: 0, top: 0, right: 0, bottom: 0 } }; //TODO: this is temp and wrong; get is from main
//
//         console.log(`napi-xy-progress {x:${xyNew.x}, y:${xyNew.y}}`);
//     }
// }
//
// export const debouncedSetNapiGetPosXY = debounce(setNapiGetPosXY, 100);

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
