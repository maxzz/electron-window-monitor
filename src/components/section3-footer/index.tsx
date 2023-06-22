import { appUi } from "@/store/app-state";
import { useSnapshot } from "valtio";

export function Section3Footer() {
    const { maxControls } = useSnapshot(appUi.uiState);
    function setValue(value: string) {
        appUi.uiState.maxControls = +value;
    }
    return (
        <div className="p-4">
            <label className="text-xs flex items-center gap-2" title="Allowed number of controls before rejecting content detection">
                <div className="select-none">Max controls</div>
                <input className="px-2 py-1 w-20 text-primary-900 bg-primary-300 rounded-sm" value={maxControls} onChange={(e) => setValue(e.target.value)} />
            </label>
        </div>
    );
}
