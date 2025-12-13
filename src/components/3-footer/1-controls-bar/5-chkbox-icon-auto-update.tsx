import { useSnapshot } from "valtio";
import { debugSettings } from "@/store/1-atoms";
import { CheckboxControl } from "./7-checkbox-control";

export function ChkboxIconAutoUpdate() {
    const { iconAutoUpdate } = useSnapshot(debugSettings.uiState);
    return (
        <CheckboxControl
            label="Auto update icon"
            title="The get manifest request format: JSON/XML"
            checked={iconAutoUpdate}
            onCheckedChange={(v) => debugSettings.uiState.iconAutoUpdate = v}
        />
    );
}
