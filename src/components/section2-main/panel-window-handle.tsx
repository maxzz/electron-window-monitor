import { useSetAtom, useAtomValue } from "jotai";
import { doClearSawHandleAtom, sawHandleStrAtom, sawHandleAtom } from "@/store";
import { classNames } from "@/utils";

function RowWindowInfo({ name, value }: { name: string; value: string; }) {
    return (<>
        <div className="py-1.5 px-2 h-full border-primary-500 border-b text-xs ">{name}</div>
        <div className="py-1 border-primary-500 border-l border-b px-2">{value}</div>
    </>);
}

const borderClasses = `px-2 py-1 text-xs border-primary-500 border rounded ${"hover:bg-primary-500 select-none shadow-sm"}`;

//TODO: show clear/raw for content

function SawHandlePanelButtons() {
    const doClearSawHandle = useSetAtom(doClearSawHandleAtom);
    const raw = useAtomValue(sawHandleStrAtom);
    if (!raw) {
        return null;
    }
    return (
        <div className="flex items-center space-x-1">
            <button
                className={classNames(borderClasses, "hover:border-primary-600 hover:shadow active:scale-[.97] transition-transform")}
                onClick={doClearSawHandle}
                title="Clear Second Active Window handle"
            >
                Clear
            </button>

            <div className="relative group cursor-default">
                <div className={borderClasses}>Raw</div>
                <div className="absolute hidden group-hover:block right-0 py-1">
                    <div className="px-2 py-1 text-xs bg-primary-100 rounded">{`"${raw}"`}</div>
                </div>
            </div>
        </div>
    );
}

export function SawHandlePanel() {
    const secondActiveWindow = useAtomValue(sawHandleAtom);
    return (
        <div className="my-4 w-full max-w-xl">
            <div className="max-w-3xl pt-4 pb-1 flex items-center justify-between">
                <div className="font-semibold">
                    Second Window
                </div>
                <SawHandlePanelButtons />
            </div>

            {secondActiveWindow && (
                <div className="text-xs border-primary-500 border rounded grid grid-cols-[auto_1fr]">
                    <RowWindowInfo name="hwnd"      /**/ value={(secondActiveWindow?.hwnd || '').replace(/^00000000/, '')} />
                    <RowWindowInfo name="caption"   /**/ value={secondActiveWindow.caption} />
                    <RowWindowInfo name="classname" /**/ value={secondActiveWindow.classname} />
                    <RowWindowInfo name="process"   /**/ value={secondActiveWindow.process} />
                </div>
            )}
        </div>
    );
}
