import { Fragment } from "react";
import { EngineControl } from "@/store";

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
