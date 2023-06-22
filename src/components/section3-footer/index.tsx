import { appUi } from "@/store/app-state";
import { classNames } from "@/utils";
import { useSnapshot } from "valtio";

export const focusClasses = "focus:ring-primary-600 dark:focus:ring-primary-400 focus:ring-offset-primary-200 dark:focus:ring-offset-primary-800 focus:ring-1 focus:ring-offset-1 focus:outline-none";

export function Section3Footer() {
    const { maxControls } = useSnapshot(appUi.uiState);
    function setValue(value: string) {
        let n = parseInt(value);
        if (isNaN(n)) {
            n = 0;
        }
        appUi.uiState.maxControls = n;
    }
    return (
        <div className="p-4">
            <div className="w-max text-xs flex items-center gap-2" title="Allowed number of controls before rejecting content detection">
                <div className="select-none">Max controls</div>
                <input className={classNames("px-2 py-1 w-20 text-primary-900 bg-primary-300 rounded-sm", focusClasses)} value={maxControls} onChange={(e) => setValue(e.target.value)} />
            </div>
        </div>
    );
}
