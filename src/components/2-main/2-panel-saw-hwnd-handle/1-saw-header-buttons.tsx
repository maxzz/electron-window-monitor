import { useSetAtom, useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { appSettings } from "@/store/1-atoms";
import { ImageHolder } from "@/components/ui";
import { utilityButtonClasses } from "../1-panel-start-actions/8-button-classes";
import { doClearSawHandleAtom, sawHandleStrAtom, isMonitoringAtom, sawIconAtom } from "@/store";

export function SawHeaderButtons() {
    const isMonitoring = useAtomValue(isMonitoringAtom);
    const iconsLarge = useSnapshot(appSettings.monitor).iconsLarge;

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

            {!isMonitoring &&
                <div className="flex items-center space-x-1">
                    <ButtonClearHandle />
                    <ButtonShowReplyRawText raw={raw} />
                </div>
            }
        </div>
    );
}

function ButtonClearHandle() {
    const doClearSawHandle = useSetAtom(doClearSawHandleAtom);
    return (
        <button
            className={utilityButtonClasses}
            onClick={doClearSawHandle}
            title="Clear Second Active Window handle"
        >
            Clear
        </button>
    );
}

function ButtonShowReplyRawText({ raw }: { raw: string; }) {
    try {
        const rawObj = JSON.parse(raw);
        raw = JSON.stringify(rawObj, null, 2);
    } catch (e) {
        raw = `Failed to parse: "${raw}"`;
    }
    raw = `Second active window info:\n${raw}`;

    return (
        <div className="relative group cursor-default">
            <div className={classNames(utilityButtonClasses, "active:!scale-100 !transition-none")}>
                Raw
            </div>

            <div className="absolute hidden group-hover:block right-0 py-1">
                <div className="relative px-2 py-1 text-xs bg-primary-300 border-primary-500 border shadow-md rounded whitespace-pre z-50">
                    {`${raw}`}
                </div>
            </div>
        </div>
    );
}
