import { useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { doClearSawHandleAtom } from "@/store";
import { utilityButtonClasses } from "../1-panel-start-actions/8-button-classes";

export function SawHeaderRightActions({ isMonitoring, raw }: { isMonitoring: boolean; raw: string; }) {
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
            <div className={classNames(utilityButtonClasses, "active:scale-100! transition-none!")}>
                Raw
            </div>

            <div className="absolute hidden group-hover:block right-0 py-1">
                <div className="relative px-2 py-1 text-xs bg-primary-300 border-primary-500 border shadow-md rounded-sm whitespace-pre z-50">
                    {`${raw}`}
                </div>
            </div>
        </div>
    );
}

