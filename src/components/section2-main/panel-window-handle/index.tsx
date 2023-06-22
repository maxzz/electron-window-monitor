import { useSetAtom, useAtomValue } from "jotai";
import { doClearSawHandleAtom, sawHandleStrAtom, sawHandleAtom, doMonitoringAtom } from "@/store";
import { classNames } from "@/utils";

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

function ButtonRaw({ raw }: { raw: string; }) {
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
            <div className="font-semibold">
                Second Window
            </div>

            {!isMonitoring &&
                <div className="flex items-center space-x-1">
                    <ButtonClearHandle />
                    <ButtonRaw raw={raw} />
                </div>
            }
        </div>
    );
}

function RowWindowInfo({ name, value, className, highlight }: { name: string; value: string; className?: string; highlight?: boolean; }) {
    return (<>
        <div className="px-2 py-1.5 h-full border-primary-500 border-b text-xs ">{name}</div>
        <div className={classNames("py-1.5 border-primary-500 border-l border-b px-2", className, highlight && value && "bg-primary-300/30")}>{value}</div>
    </>);
}

export function SawHandlePanel() {
    const secondActiveWindow = useAtomValue(sawHandleAtom);
    return (
        <div className="my-4 w-full max-w-xl">
            <HeaderButtons />

            {secondActiveWindow && (
                <div className="text-xs border-primary-500 border rounded grid grid-cols-[auto_1fr]">
                    <RowWindowInfo name="caption"   /**/ value={secondActiveWindow.caption} className="font-semibold" highlight={true} />
                    <RowWindowInfo name="classname" /**/ value={secondActiveWindow.classname} />
                    <RowWindowInfo name="process"   /**/ value={secondActiveWindow.process} />
                    <RowWindowInfo name="hwnd"      /**/ value={(secondActiveWindow?.hwnd || '').replace(/^00000000/, '')} />
                </div>
            )}
        </div>
    );
}
