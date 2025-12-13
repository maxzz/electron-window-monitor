import { useSnapshot } from "valtio";
import { debugSettings } from "@/store/1-atoms";
import { CheckboxControl } from "../../../ui/ui-local/7-checkbox-control";

export function ChkboxXmlFormat() {
    const { acquireXml } = useSnapshot(debugSettings.uiState);
    return (
        <CheckboxControl
            label="Get manifest as a list of controls or XML"
            title="The get manifest request format: JSON/XML"
            checked={acquireXml}
            onCheckedChange={(v) => debugSettings.uiState.acquireXml = v}
        />
    );
}
