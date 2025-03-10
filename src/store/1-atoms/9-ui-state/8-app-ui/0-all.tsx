import { ThemeMode } from "@/utils";
import { defaultUiAdvancedState, UiAdvancedState } from "./4-advanced";

export type AppUISettings = {
    theme: ThemeMode;
    uiAdvanced: UiAdvancedState;   
};

export const defaultAppUISettings: AppUISettings = {
    theme: 'light',
    uiAdvanced: defaultUiAdvancedState,
};
