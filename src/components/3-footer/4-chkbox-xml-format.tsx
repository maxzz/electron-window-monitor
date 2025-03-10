import { useSnapshot } from "valtio";
import { debugSettings } from "@/store/1-atoms";
import { checkboxClasses } from "../2-main/8-shared-styles";

export function ChkboxXmlFormat() {
    const { acquireXml } = useSnapshot(debugSettings.uiState);
    return (
        <label className="w-max flex items-center gap-x-1" title="The get manifest request format: JSON/XML">

            <input type="checkbox"
                className={checkboxClasses}
                checked={acquireXml}
                onChange={(e) => debugSettings.uiState.acquireXml = e.target.checked}
            />

            <div className="select-none">
                Get manifest in XML format
            </div>
            
        </label>
    );
}
