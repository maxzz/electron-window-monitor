import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { appUi } from "@/store/1-app-state";
import { focusClasses } from "../2-main/8-shared-styles";

export function InputMaxControls() {
    const { maxControls } = useSnapshot(appUi.uiState);
    
    function setValue(value: string) {
        let n = parseInt(value);
        if (Number.isNaN(n)) {
            n = 0;
        }
        appUi.uiState.maxControls = n;
    }

    return (
        <label className="w-max flex items-center gap-x-2" title="Allowed number of controls before rejecting content detection (0 - unlimited).">
            <div className="select-none">Max controls</div>
            <input
                className={classNames("px-2 py-1 w-20 text-primary-900 bg-primary-300 rounded-sm", focusClasses)}
                value={maxControls}
                onChange={(e) => setValue(e.target.value)}
            />
        </label>
    );
}
