import { EngineControl, sawContentAtom, sawContentStrAtom, sawHandleStrAtom } from "@/store";
import { classNames } from "@/utils";
import { useAtomValue } from "jotai";
import { Fragment } from "react";

const borderClasses = `px-2 py-1 text-xs border-primary-500 border rounded ${"select-none shadow-sm"}`;
const vlineClasses = "[&>*]:border-primary-500 [&>*]:border-l [&>*]:pl-2"; // [&>*~*]:border-b

function ContentsGrid({ controls }: { controls: EngineControl[]; }) {
    return (
        <div className={classNames("text-xs grid grid-cols-[repeat(5,min-content)] gap-x-2 gap-y-0.5", vlineClasses, borderClasses)}>
            {controls.map((control, idx) => (
                <Fragment key={idx}>
                    <div className="text-end !pl-0 border-none">{control.memid}</div>
                    <div className="text-end">{control.orderid}</div>
                    <div className="">{control.type}</div>
                    <div className="w-max">{control.dispname}</div>
                    <div className="text-[.6rem]">{control.path}</div>
                </Fragment>
            ))}
        </div>
    );
}

export function SawContentPanel() {
    const sawHandleStr = useAtomValue(sawHandleStrAtom);
    const sawContentStr = useAtomValue(sawContentStrAtom);
    const sawContent = useAtomValue(sawContentAtom);
    console.log('sawContent', sawContent);

    if (!sawHandleStr) {
        return null;
    }

    const controls = sawContent?.controls;
    // if (!controls) {
    //     return null;
    // }

    return (
        <div className="my-4 w-max">
            <div className="pt-4 pb-1 font-semibold">
                Second Window Content
            </div>

            {!controls && (
                <div className="text-sm grid grid-cols-[auto_1fr] gap-x-2">
                    <div className="">No controls detected</div>
                    <div className="">{sawContentStr}</div>
                </div>
            )}

            {controls && <ContentsGrid controls={controls} />}
        </div>
    );
}
