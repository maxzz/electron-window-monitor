import { useSetAtom, useAtomValue } from "jotai";
import { doClearSawHandleAtom, sawHandleStrAtom, doMonitoringAtom } from "@/store";
import { classNames } from "@/utils";
import { ImagePanel } from "../panel-window-icon";
import { PanelBuildProcess } from "./panel-build-process";
import { PanelHwndGrid } from "./panel-grid";

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
    return (
        <div className="relative group cursor-default">
            <div className={borderClasses}>Raw</div>
            <div className="absolute hidden group-hover:block right-0 py-1">
                <div className="px-2 py-1 text-xs bg-primary-100 rounded">{`"${raw}"`}</div>
            </div>
        </div>
    );
}

function HeaderButtons() {
    const isMonitoring = useAtomValue(doMonitoringAtom);
    const raw = useAtomValue(sawHandleStrAtom);
    if (!raw) {
        return null;
    }
    return (
        <div className="pb-1 h-7 max-w-3xl flex items-center justify-between">
            <div className="flex items-center">
                <div className="font-semibold">Second active window</div>
                <ImagePanel className="mx-2 w-5 h-5" />
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

export function SawHandlePanel() {

    return (
        <div className="w-full max-w-xl">
            <HeaderButtons />
            <PanelHwndGrid />
            <PanelBuildProcess />
        </div>
    );
}
