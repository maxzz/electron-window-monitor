import { EngineControlWithMeta } from "@/store";
import { FormRowTypeIcon, engineControlToFieldIconTypes } from "@/store/manifest";
import { classNames } from '@/utils';

export function ControlsGridItem({ item }: { item: EngineControlWithMeta; }) {
    return (
        <div className="grid grid-cols-[1rem,1rem,1rem,1fr,16rem] gap-x-2">
            <div className="text-end !pl-1 border-none">{item.control.memid}</div>
            <div className="text-end">{item.control.orderid}</div>
            <div className=""><FormRowTypeIcon field={engineControlToFieldIconTypes(item.control)} className="w-4 h-4" /></div>
            <div className="max-w-[30ch] whitespace-nowrap overflow-hidden overflow-ellipsis">{item.control.dispname}</div>
            <div className="text-[.6rem]">{item.control.path}</div>
        </div>
    );
}

const vlineClasses = "[&>*]:py-0.5 [&>*]:border-primary-500 [&>*]:border-l [&>*]:pl-2"; // [&>*~*]:border-b

export function ControlsGrid({ controls }: { controls: EngineControlWithMeta[]; }) {

    console.log('controls', controls);

    return (
        <div className={classNames("text-xs grid overflow-auto", vlineClasses,)}>
            {controls.map((control, idx) => (
                <ControlsGridItem item={control} key={idx} />
            ))}
        </div>
    );
}
