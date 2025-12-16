import { type HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { debugSettings } from "@/store/1-atoms";
import { ImageHolder } from "@/components/ui";
import { sawHandleStrAtom, isMonitorRunningAtom, sawIconAtom, sawHandleAtom } from "@/store";
import { PanelBuildProcess } from "./3-panel-build-process";
import { ButtonClearHandle } from "./4-btns-clear-raw";
import { ButtonShowReplyRawText } from "./5-btn-show-reply-raw";

export function SawHeaderButtons({ className, ...rest }: HTMLAttributes<HTMLElement>) {
    const isMonitoring = useAtomValue(isMonitorRunningAtom);
    const { iconsLarge } = useSnapshot(debugSettings.uiState);

    const secondActiveWindow = useAtomValue(sawHandleAtom);

    const raw = useAtomValue(sawHandleStrAtom);

    return (
        <div className={classNames("h-8 flex items-center justify-between", className)} {...rest}>

            <div className="flex items-center gap-2 overflow-hidden">
                {raw && (
                    <div className="grid place-items-center">
                        <ImageHolder className={iconsLarge ? "size-8" : "size-4"} imageAtom={sawIconAtom} />
                    </div>
                )}

                <div className="text-xs font-semibold truncate">
                    {secondActiveWindow?.caption || "Second active window: none"}
                </div>
            </div>

            <PanelBuildProcess className="place-self-end" />

            {raw && (
                <SawHeaderRightActions isMonitoring={isMonitoring} raw={raw} />
            )}
        </div>
    );
}

function SawHeaderRightActions({ isMonitoring, raw }: { isMonitoring: boolean; raw: string; }) {
    if (isMonitoring) {
        return null;
    }

    return (
        <div className="flex items-center space-x-1">
            <ButtonClearHandle />
            <ButtonShowReplyRawText raw={raw} />
        </div>
    );
}
