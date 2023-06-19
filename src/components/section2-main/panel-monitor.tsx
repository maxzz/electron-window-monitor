import { useAtomValue } from "jotai";
import { monitoringCounterAtom } from "@/store";

export function MonitoringCounter() {
    const monitoringCounter = useAtomValue(monitoringCounterAtom);
    if (monitoringCounter < 0) {
        return null;
    }
    return (
        <div className="my-4 absolute left-0 bottom-0">
            <div className="pt-4 pb-1 text-5xl font-mono font-semibold">
                {`${monitoringCounter}`.padStart(2, '0')}
            </div>
        </div>
    );
}
