import { useAtomValue } from "jotai";
import { monitoringCounterAtom } from "@/store";

export function MonitoringCounter() {
    const monitoringCounter = useAtomValue(monitoringCounterAtom);
    if (monitoringCounter < 0) {
        return null;
    }
    return (
        <div className="absolute left-0 -bottom-4">
            <div className="text-3xl font-mono font-semibold text-transparent [-webkit-text-stroke-width:1px] [-webkit-text-stroke-color:#0da50d]">
                {`${monitoringCounter}`.padStart(2, '0')}
            </div>
        </div>
    );
}
