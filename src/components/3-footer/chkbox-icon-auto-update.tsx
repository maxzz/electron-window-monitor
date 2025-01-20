import { useSnapshot } from "valtio";
import { appUi } from "@/store/1-app-state";
import { checkboxClasses } from "../2-main/shared-styles";

export function ChkboxIconAutoUpdate() {
    const { iconAutoUpdate } = useSnapshot(appUi.uiState);
    return (
        <label className="w-max flex items-center gap-x-1" title="The get manifest request format: JSON/XML">
            <input type="checkbox"
                className={checkboxClasses}
                checked={iconAutoUpdate}
                onChange={(e) => appUi.uiState.iconAutoUpdate = e.target.checked}
            />
            <div className="select-none">Auto update icon</div>
        </label>
    );
}
