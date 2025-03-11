import { proxy } from 'valtio';
import { atomWithProxy } from 'jotai-valtio';
import { type TargetPosition } from '@/x-electron/xternal-to-renderer/7-napi-calls';
import { type NapiCallError } from '@/utils';

type NapiBuildState = {                         // State of Napi multistep build: icons, controls, manifest
    buildRunning: boolean;                      // Content check build is runnning. Make shure there is no multiple calls at the same time or use counter as lock
    typedError: NapiCallError;                  // Error message if build failed
    typedExtra: string | undefined;             // Extra info if build failed
    buildFailedBody: string;                    // Raw string returned from main that failed to parse
};

export const napiBuildState = proxy<NapiBuildState>({
    buildRunning: false,
    typedError: '',
    typedExtra: undefined,
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
