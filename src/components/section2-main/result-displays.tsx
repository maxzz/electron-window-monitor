import { sawContentStrAtom, secondActiveWindowAtom } from "@/store";
import { useAtomValue } from "jotai";

function RowWindowInfo({ name, value }: { name: string; value: string; }) {
    return (<>
        <div className="py-1.5 px-2 h-full border-primary-500 border-b text-xs ">{name}</div>
        <div className="py-1 border-primary-500 border-l border-b px-2">{value}</div>
    </>);
}

export function SecondWindowResult() {
    const secondActiveWindow = useAtomValue(secondActiveWindowAtom);
    return (
        <div className="my-4">
            <div className="pt-4 pb-1 font-semibold">
                Second Window
            </div>

            <div className="max-w-[max-content] text-xs border-primary-500 border rounded grid grid-cols-[auto_1fr]">
                {secondActiveWindow && (<>
                    <RowWindowInfo name="hwnd"      /**/ value={secondActiveWindow.hwnd} />
                    <RowWindowInfo name="caption"   /**/ value={secondActiveWindow.caption} />
                    <RowWindowInfo name="classname" /**/ value={secondActiveWindow.classname} />
                    <RowWindowInfo name="process"   /**/ value={secondActiveWindow.process} />
                </>)}
            </div>
        </div>
    );
}

export function SecondWindowContent() {
    const sawContentStr = useAtomValue(sawContentStrAtom);
    const controls = sawContentStr;
    return (
        <div className="my-4">
            <div className="pt-4 pb-1 font-semibold">
                Content
            </div>

            <div className="text-sm grid grid-cols-[auto_1fr] gap-x-2">
                Not now
            </div>
        </div>
    );
}