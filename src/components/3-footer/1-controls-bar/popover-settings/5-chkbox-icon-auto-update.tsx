import { useSnapshot } from "valtio";
import { debugSettings } from "@/store/1-atoms";
import { CheckboxControl } from "../../../ui/ui-local/7-checkbox-control";

export function ChkboxIconAutoUpdate() {
    const { iconAutoUpdate } = useSnapshot(debugSettings.uiState);
    return (
        <CheckboxControl
            label="Auto update icon of the SAW"
            title="Get the icon of the second active window automatically"
            checked={iconAutoUpdate}
            onCheckedChange={(v) => debugSettings.uiState.iconAutoUpdate = v}
        />
    );
}
