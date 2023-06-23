import { Fragment } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { EngineControl, sawContentAtom, sawContentStrAtom } from "@/store";

const borderClasses = `px-2 py-1 text-xs border-primary-500 border rounded ${"select-none shadow-sm"}`;
const vlineClasses = "[&>*]:border-primary-500 [&>*]:border-l [&>*]:pl-2"; // [&>*~*]:border-b

function ControlsGrid({ controls }: { controls: EngineControl[]; }) {
    return (
        <div className={classNames("text-xs grid grid-cols-[repeat(5,min-content)] gap-x-2 gap-y-0.5 h-full overflow-auto", vlineClasses, borderClasses)}>
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

export function ContentPanel() {
    const sawContentStr = useAtomValue(sawContentStrAtom);
    const sawContent = useAtomValue(sawContentAtom);
    const controls = sawContent?.controls;
    return (<>
        {controls && <ControlsGrid controls={controls} />}
        {!controls && sawContentStr && <div className="text-sm"> No controls detected </div>}
    </>);
}
