import { useSnapshot } from "valtio";
import { appSettings } from "@/store/1-app-state";
import { checkboxClasses } from "../2-main/8-shared-styles";

export function ChkboxLargeIcon() {
    const { iconsLarge } = useSnapshot(appSettings.monitor);
    return (
        <label className="w-max flex items-center gap-x-1" title="The get manifest request format: JSON/XML">

            <input type="checkbox"
                className={checkboxClasses}
                checked={iconsLarge}
                onChange={(e) => appSettings.monitor.iconsLarge = e.target.checked}
            />

            <div className="select-none">
                Large icon
            </div>
        </label>
    );
}
