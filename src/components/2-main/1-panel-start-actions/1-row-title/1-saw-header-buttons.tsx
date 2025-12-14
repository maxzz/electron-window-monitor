import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { debugSettings } from "@/store/1-atoms";
import { ImageHolder } from "@/components/ui";
import { sawHandleStrAtom, isMonitorRunningAtom, sawIconAtom, sawHandleAtom } from "@/store";
import { SawHeaderRightActions } from "./4-buttons-actions";

export function SawHeaderButtons() {
    const isMonitoring = useAtomValue(isMonitorRunningAtom);
    const { iconsLarge } = useSnapshot(debugSettings.uiState);

    const secondActiveWindow = useAtomValue(sawHandleAtom);

    const raw = useAtomValue(sawHandleStrAtom);

    return (
        <div className={classNames("min-w-0 h-8 max-w-3xl flex items-center justify-between")}>

            <div className="flex items-center gap-2 overflow-hidden">
                {raw && (
                    <div className="grid place-items-center">
                        <ImageHolder className={iconsLarge ? "size-8" : "size-4"} imageAtom={sawIconAtom} />
                    </div>
                )}

                <div className="text-xs font-semibold truncate">
                    Second active window: {secondActiveWindow?.caption || "none"}
                </div>
            </div>

            {raw && (
                <SawHeaderRightActions isMonitoring={isMonitoring} raw={raw} />
            )}
        </div>
    );
}
