import { useSetAtom, useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { appUi } from "@/store/1-app-state";
import { ImageHolder } from "@/components/ui";
import { doClearSawHandleAtom, sawHandleStrAtom, doMonitoringAtom, sawIconAtom } from "@/store";

export function SawHeaderButtons() {
    const isMonitoring = useAtomValue(doMonitoringAtom);
    const iconsLarge = useSnapshot(appUi.monitor).iconsLarge;

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

const borderClasses = `px-2 py-1 text-xs border-primary-500 border rounded ${"hover:bg-primary-500 select-none shadow-sm"}`;

function ButtonClearHandle() {
    const doClearSawHandle = useSetAtom(doClearSawHandleAtom);
    return (
        <button
            className={classNames(borderClasses, "hover:border-primary-600 hover:shadow active:scale-[.97] transition-transform")}
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
            <div className={borderClasses}>
                Raw
            </div>

            <div className="absolute hidden group-hover:block right-0 py-1">
                <div className="relative px-2 py-1 text-xs bg-primary-100 rounded whitespace-pre z-50">
                    {`${raw}`}
                </div>
            </div>
        </div>
    );
}
