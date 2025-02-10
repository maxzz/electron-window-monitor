import { proxy, subscribe } from 'valtio';
import { initializeUiState } from './4-local-storage-utils';
import { mergeDefaultAndLoaded } from '@/utils';
import { sendClientOptions } from '..';
import { type DebugMonitorState, initialDebugMonitorState } from './2-local-storage-debug-monitor';
import { type TestCreate, initialTestCreate } from './3-local-storage-debug-create';

const STORAGE_UI_KEY = 'electron-window-monitor:ui';
const STORAGE_UI_VER = 'v2';

export type UiState = {
    darkMode: boolean;
};

type AppUi = {
    uiState: UiState;
    monitor: DebugMonitorState;
    testCreate: TestCreate;
};

const initialAppUi: AppUi = {
    uiState: {
        darkMode: false,
    },
    monitor: initialDebugMonitorState,
    testCreate: initialTestCreate,
};

export const appUi = proxy<AppUi>(loadUiInitialState());

initializeUiState(appUi.uiState);

// Local storage

function loadUiInitialState(): AppUi {
    let storageUi;
    let storageUiStr = localStorage.getItem(STORAGE_UI_KEY);
    if (storageUiStr) {
        try {
            storageUi = JSON.parse(storageUiStr)?.[STORAGE_UI_VER];
        } catch (error) {
            console.error('storageUi bad format');
        }
    }

    const state = mergeDefaultAndLoaded({ defaults: initialAppUi, loaded: storageUi });
    return state;
}

subscribe(appUi.uiState, () => {
    //console.log('store ui  ', appUi);

    sendClientOptions();
    localStorage.setItem(STORAGE_UI_KEY, JSON.stringify({ [STORAGE_UI_VER]: appUi }));
});
