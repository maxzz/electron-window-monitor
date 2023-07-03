import { Fragment } from "react";
import { EngineControl } from "@/electron/app/napi-calls";

export function ControlsGridItems({ controls }: { controls: EngineControl[]; }) {
    return (<>
        {controls.map((control, idx) => (
            <Fragment key={idx}>
                <div className="text-end !pl-1 border-none">{control.memid}</div>
                <div className="text-end">{control.orderid}</div>
                <div className="">{control.type}</div>
                <div className="max-w-[30ch] whitespace-nowrap overflow-hidden overflow-ellipsis">{control.dispname}</div>
                <div className="text-[.6rem]">{control.path}</div>
            </Fragment>
        ))}
    </>);
}
