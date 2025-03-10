import { UiState } from "./0-local-storage-app";

export function setAppDarkMode(setDark: boolean) {
    document.getElementsByTagName('body')[0].classList[setDark ? 'add' : 'remove']('dark');
}

export function initializeUiState(initialUiState: UiState) {
    setAppDarkMode(initialUiState.darkMode);
}
