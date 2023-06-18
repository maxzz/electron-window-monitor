import { monitoringCounterAtom, sawContentStrAtom, sawHandleAtom, sawHandleStrAtom } from "@/store";
import { useAtomValue } from "jotai";

function RowWindowInfo({ name, value }: { name: string; value: string; }) {
    return (<>
        <div className="py-1.5 px-2 h-full border-primary-500 border-b text-xs ">{name}</div>
        <div className="py-1 border-primary-500 border-l border-b px-2">{value}</div>
    </>);
}

export function SawHandlePanel() {
    const secondActiveWindow = useAtomValue(sawHandleAtom);
    const raw = useAtomValue(sawHandleStrAtom);
    return (
        <div className="my-4">
            <div className="pt-4 pb-1 flex items-center justify-between">
                <div className="font-semibold">
                    Second Window
                </div>
                {raw && (
                    <div className="relative group cursor-default">
                        <div className="px-2 py-1 text-xs border-primary-500 border rounded">Raw</div>
                        <div className="absolute hidden group-hover:block right-0 py-1">
                            <div className="px-2 py-1 text-xs bg-primary-100 rounded">{`"${raw}"`}</div>
                        </div>
                    </div>
                )}
            </div>

            <div className="max-w-[max-content] text-xs border-primary-500 border rounded grid grid-cols-[auto_1fr]">
                {secondActiveWindow && (
                    <>
                        <RowWindowInfo name="hwnd"      /**/ value={(secondActiveWindow?.hwnd || '').replace(/^00000000/, '')} />
                        <RowWindowInfo name="caption"   /**/ value={secondActiveWindow.caption} />
                        <RowWindowInfo name="classname" /**/ value={secondActiveWindow.classname} />
                        <RowWindowInfo name="process"   /**/ value={secondActiveWindow.process} />
                    </>
                )}
            </div>
        </div>
    );
}

export function SawContentPanel() {
    const sawContentStr = useAtomValue(sawContentStrAtom);
    const controls = sawContentStr;
    return (
        <div className="my-4">
            <div className="pt-4 pb-1 font-semibold">
                Second Window Content
            </div>

            <div className="text-sm grid grid-cols-[auto_1fr] gap-x-2">
                Not now
            </div>
        </div>
    );
}

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
