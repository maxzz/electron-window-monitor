import { useSnapshot } from "valtio";
import { debugSettings } from "@/store/1-atoms";
import { CheckboxControl } from "../../ui/ui-local/7-checkbox-control";

export function ChkboxLargeIcon() {
    const { iconsLarge } = useSnapshot(debugSettings.uiState);
    return (
        <CheckboxControl
            label="Use large icon of the SAW"
            title="Show large icon of the second active window"
            checked={iconsLarge}
            onCheckedChange={(v) => debugSettings.uiState.iconsLarge = v}
        />
    );
}
