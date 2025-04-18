import { proxy, subscribe } from 'valtio';
import { mergeDefaultAndLoaded } from '@/utils';
import { sendNapiOptions } from '@/shared/2-gates-in-client-as-atoms';
import { type DebugMonitorState, initialDebugMonitorState } from './2-local-storage-debug-monitor';
import { type TestCreate, initialTestCreate } from '@/store/7-napi-atoms/8-create-mani-tests-w-fetch';

const STORAGE_UI_KEY = 'pmat-win-mon:debug';
const STORAGE_UI_VER = 'v1';

type DebugState = {
    uiState: DebugMonitorState;
    testCreate: TestCreate;
};

const initialDebugState: DebugState = {
    uiState: initialDebugMonitorState,
    testCreate: initialTestCreate,
};

export const debugSettings = proxy<DebugState>(loadUiInitialState());

// Local storage is separate from the main app settings

function loadUiInitialState(): DebugState {
    let storageUi: any;
    
    let storageUiStr = localStorage.getItem(STORAGE_UI_KEY);
    if (storageUiStr) {
        try {
            storageUi = JSON.parse(storageUiStr)?.[STORAGE_UI_VER];
        } catch (error) {
            console.error('storageUi bad format');
        }
    }

    const state = mergeDefaultAndLoaded({ defaults: initialDebugState, loaded: storageUi });
    return state;
}

subscribe(debugSettings, () => {
    sendNapiOptions();
    localStorage.setItem(STORAGE_UI_KEY, JSON.stringify({ [STORAGE_UI_VER]: debugSettings }));
});
