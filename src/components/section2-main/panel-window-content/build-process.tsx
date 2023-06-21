import { useSnapshot } from 'valtio';
import { controlsCheckProgress } from "@/store/app-state";

const buttonClasses = "px-2 py-1 border-primary-500 hover:border-primary-600 hover:bg-primary-500 disabled:opacity-20 border rounded shadow active:scale-[.97] transition-transform";

export function PanelBuildProcess() {
    const { foundCounter } = useSnapshot(controlsCheckProgress);
    if (!foundCounter) {
        return null;
    }
    return (
        <div className="text-xs text-primary-700 flex items-center gap-x-2">
            <div className="pt-0.5">
                controls detection progress {foundCounter}
            </div>
            <button
                className={buttonClasses}
                onClick={() => {
                    controlsCheckProgress.foundCounter = foundCounter + 1;
                }}
            >
                Cancel
            </button>
        </div>
    );
}
