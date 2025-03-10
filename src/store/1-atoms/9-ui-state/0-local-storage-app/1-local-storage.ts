import { proxy, subscribe } from 'valtio';
import { initializeUiState } from '../4-local-storage-utils';
import { mergeDefaultAndLoaded } from '@/utils';
import { sendNapiOptions } from '@/shared/2-gates-in-client-as-atoms';

const STORAGE_UI_KEY = 'electron-window-monitor:ui';
const STORAGE_UI_VER = 'v2';

export type UiState = {
    darkMode: boolean;
};

type AppUi = {
    uiState: UiState;
};

const initialAppUi: AppUi = {
    uiState: {
        darkMode: false,
    },
};

export const appSettings = proxy<AppUi>(loadUiInitialState());

initializeUiState(appSettings.uiState);

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

subscribe(appSettings.uiState, () => {
    sendNapiOptions();
    localStorage.setItem(STORAGE_UI_KEY, JSON.stringify({ [STORAGE_UI_VER]: appSettings }));
});
