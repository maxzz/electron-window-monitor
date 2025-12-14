import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { debugSettings } from "@/store/1-atoms";
import { ImageHolder } from "@/components/ui";
import { sawHandleStrAtom, isMonitorRunningAtom, sawIconAtom } from "@/store";
import { SawHeaderRightActions } from "./4-buttons-actions";

export function SawHeaderButtons() {
    const isMonitoring = useAtomValue(isMonitorRunningAtom);
    const { iconsLarge } = useSnapshot(debugSettings.uiState);

    const raw = useAtomValue(sawHandleStrAtom);
    if (!raw) {
        return null;
    }

    return (
        <div className={classNames("pb-1 max-w-3xl flex items-center justify-between", !iconsLarge && "h-7")}>

            <div className="flex items-center gap-2">
                <div className="text-sm font-semibold">
                    Second active window
                </div>

                <ImageHolder className={iconsLarge ? "size-12" : "size-5"} imageAtom={sawIconAtom} />
            </div>

            <SawHeaderRightActions isMonitoring={isMonitoring} raw={raw} />
        </div>
    );
}
