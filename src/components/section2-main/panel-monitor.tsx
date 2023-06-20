import { useAtomValue } from "jotai";
import { useSnapshot } from 'valtio';
import { monitoringCounterAtom } from "@/store";
import { controlsCheckProgress } from "@/store/app-state";

const buttonClasses = "px-2 py-1 border-primary-500 hover:border-primary-600 hover:bg-primary-500 disabled:opacity-20 border rounded shadow active:scale-[.97] transition-transform";

export function MonitoringCounter() {
    const monitoringCounter = useAtomValue(monitoringCounterAtom);
    const { foundCounter } = useSnapshot(controlsCheckProgress);
    if (monitoringCounter < 0) {
        return null;
    }
    return (
        <div className="my-4 absolute left-0 bottom-0">
            <div className="flex flex-col justify-start">
                <div className="text-3xl font-mono font-semibold text-transparent [-webkit-text-stroke-width:1px] [-webkit-text-stroke-color:#0da50d]">
                    {`${monitoringCounter}`.padStart(2, '0')}
                </div>

                <div className="text-xs text-primary-700 flex items-center gap-x-2">
                    <div className="pl-0.5">
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
            </div>
        </div>
    );
}
