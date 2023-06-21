import { useSnapshot } from 'valtio';
import { clientState } from "@/store/app-state";

const buttonClasses = "px-2 py-1 border-primary-500 hover:border-primary-600 hover:bg-primary-500 disabled:opacity-20 border rounded shadow active:scale-[.97] transition-transform";

export function PanelBuildProcess() {
    const { buildCounter } = useSnapshot(clientState);
    if (!buildCounter) {
        return null;
    }
    return (
        <div className="text-xs text-primary-700 flex items-center gap-x-1">
            <div className="pt-0.5">
                controls detection progress
            </div>
            <div className="pt-0.5 min-w-[2.5rem]">{buildCounter}</div>
            <button
                className={buttonClasses}
                onClick={() => {
                    clientState.buildCounter = buildCounter + 1;
                }}
            >
                Cancel
            </button>
        </div>
    );
}
