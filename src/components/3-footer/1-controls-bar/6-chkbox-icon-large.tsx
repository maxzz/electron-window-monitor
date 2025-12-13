import { useSnapshot } from "valtio";
import { debugSettings } from "@/store/1-atoms";
import { CheckboxControl } from "./7-checkbox-control";

export function ChkboxLargeIcon() {
    const { iconsLarge } = useSnapshot(debugSettings.uiState);
    return (
        <CheckboxControl
            label="Large icon"
            title="The get manifest request format: JSON/XML"
            checked={iconsLarge}
            onCheckedChange={(v) => debugSettings.uiState.iconsLarge = v}
        />
    );
}
