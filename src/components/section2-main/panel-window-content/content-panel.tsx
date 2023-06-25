import { Fragment } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { EngineControl, sawContentAtom, sawContentStrAtom } from "@/store";

export function ControlsGridItems({ controls }: { controls: EngineControl[]; }) {
    return (<>
        {controls.map((control, idx) => (
            <Fragment key={idx}>
                <div className="text-end !pl-0 border-none">{control.memid}</div>
                <div className="text-end">{control.orderid}</div>
                <div className="">{control.type}</div>
                <div className="w-max">{control.dispname}</div>
                <div className="text-[.6rem]">{control.path}</div>
            </Fragment>
        ))}
    </>);
}

const gridBorderClasses = `px-2 text-xs border-primary-500 border rounded ${"select-none shadow-sm"}`;
const vlineClasses = "[&>*]:py-0.5 [&>*]:border-primary-500 [&>*]:border-l [&>*]:pl-2"; // [&>*~*]:border-b

function ControlsGrid({ controls }: { controls: EngineControl[]; }) {
    return (
        <div className={classNames("pb-1", gridBorderClasses)}>
            <div className={classNames("h-full text-xs grid grid-cols-[repeat(5,min-content)] gap-x-2 overflow-auto", vlineClasses, )}>
                <ControlsGridItems controls={controls} />
            </div>

        </div>
    );
}

export function ContentPanel() {
    const sawContentStr = useAtomValue(sawContentStrAtom);
    const sawContent = useAtomValue(sawContentAtom);
    const controls = sawContent?.controls;
    return (<>
        {controls &&
            <ControlsGrid controls={controls} />
        }

        {!controls && sawContentStr &&
            <div className="text-sm">
                No controls detected
            </div>
        }
    </>);
}
