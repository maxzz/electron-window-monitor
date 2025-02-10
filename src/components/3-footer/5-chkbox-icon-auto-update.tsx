import { useSnapshot } from "valtio";
import { appUi } from "@/store/1-app-state";
import { checkboxClasses } from "../2-main/8-shared-styles";

export function ChkboxIconAutoUpdate() {
    const { iconAutoUpdate } = useSnapshot(appUi.monitor);
    return (
        <label className="w-max flex items-center gap-x-1" title="The get manifest request format: JSON/XML">

            <input type="checkbox"
                className={checkboxClasses}
                checked={iconAutoUpdate}
                onChange={(e) => appUi.monitor.iconAutoUpdate = e.target.checked}
            />

            <div className="select-none">
                Auto update icon
            </div>
        </label>
    );
}
