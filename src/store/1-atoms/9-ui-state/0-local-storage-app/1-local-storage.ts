import { proxy, subscribe } from 'valtio';
import { mergeDefaultAndLoaded, themeApplyMode } from '@/utils';
import { sendNapiOptions } from '@/shared/2-gates-in-client-as-atoms';
import { type AppUISettings, defaultAppUISettings } from '../8-app-ui';

const STORAGE_UI_KEY = 'pmat-win-mon:ui';
const STORAGE_UI_VER = 'v2';

type AppUi = {
    appUi: AppUISettings;           // App UI settings: theme, divider, etc.
};

const initialAppUi: AppUi = {
    appUi: defaultAppUISettings,
};

export const appSettings = proxy<AppUi>(loadUiInitialState());

// Apply theme changes

themeApplyMode(appSettings.appUi.theme);

subscribe(appSettings.appUi, () => {
    themeApplyMode(appSettings.appUi.theme);
});

// Local storage

function loadUiInitialState(): AppUi {
    let storageUi: any;

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

subscribe(appSettings, () => {
    sendNapiOptions();
    localStorage.setItem(STORAGE_UI_KEY, JSON.stringify({ [STORAGE_UI_VER]: appSettings }));
});
