import { useSnapshot } from "valtio";
import { appUi } from "@/store/app-state";
import { checkboxClasses } from "../2-main/shared-styles";

export function ChkboxXmlFormat() {
    const { acquireXml } = useSnapshot(appUi.uiState);
    return (
        <label className="w-max flex items-center gap-x-1" title="The get manifest request format: JSON/XML">
            <input type="checkbox"
                className={checkboxClasses}
                checked={acquireXml}
                onChange={(e) => appUi.uiState.acquireXml = e.target.checked}
            />
            <div className="select-none">Get manifest in XML format</div>
        </label>
    );
}
