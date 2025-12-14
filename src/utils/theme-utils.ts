import { appSettings } from "@/store/1-atoms";

export function isThemeDark(theme: string) {
    if (theme === 'light') return false;
    if (theme === 'dark') return true;
    return getIsSystemDark();
}

export function toggleTheme(theme: string) {
    if (theme === 'dark') {
        appSettings.appUi.theme = 'light';
    } 
    else if (theme === 'light') {
        appSettings.appUi.theme = 'dark';
    } 
    else {
        const isSystemDark = getIsSystemDark();
        appSettings.appUi.theme = isSystemDark ? 'light' : 'dark';
    }
}

export function getIsSystemDark() {
    return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

