import { useSnapshot } from "valtio";
import { debugSettings } from "@/store/1-atoms";
import { checkboxClasses } from "../2-main/8-shared-styles";

export function ChkboxIconAutoUpdate() {
    const { iconAutoUpdate } = useSnapshot(debugSettings.uiState);
    return (
        <label className="w-max flex items-center gap-x-1" title="The get manifest request format: JSON/XML">

            <input type="checkbox"
                className={checkboxClasses}
                checked={iconAutoUpdate}
                onChange={(e) => debugSettings.uiState.iconAutoUpdate = e.target.checked}
            />

            <div className="select-none">
                Auto update icon
            </div>
        </label>
    );
}
