import { proxy } from 'valtio';
import { atomWithProxy } from 'jotai-valtio';
import { type PointXY, type TargetPosition } from '@/x-electron/xternal-to-renderer/7-napi-calls';
import { debounce, roundInt } from '@/utils';

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

//

type NapiBuildProgress = {
    buildCounter: number;                       // Controls detection progress
    lastProgress: number;                       // Last number of build progress or 0
    getPosProgress: TargetPosition | null;      // Get window position progress
};

export const napiBuildProgress = proxy<NapiBuildProgress>({
    buildCounter: 0,
    lastProgress: 0,
    getPosProgress: null,
});

export function setNapiBuildProgressXY(x: number, y: number) {
    const xyNew: PointXY = { x: roundInt(x), y: roundInt(y) };
    const xyOld = napiBuildProgress.getPosProgress?.point || { x: 0, y: 0 };
    if (xyNew.x !== xyOld.x || xyNew.y !== xyOld.y) {
        napiBuildProgress.getPosProgress = { point: xyNew };

        console.log('setNapiBuildProgressXY', napiBuildProgress.getPosProgress.point);
    }
}

export const debouncedsetNapiBuildProgressXY = debounce(setNapiBuildProgressXY, 100);
