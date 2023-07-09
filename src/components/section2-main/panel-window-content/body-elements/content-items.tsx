import { EngineControl } from "@/electron/app/napi-calls";
import { FormRowTypeIcon, engineControlToFieldIconTypes } from "@/store/manifest/manifest-fields";
import { classNames } from '@/utils';

export function ControlsGridItem({ control }: { control: EngineControl; }) {
    return (<>
        <div className="text-end !pl-1 border-none">{control.memid}</div>
        <div className="text-end">{control.orderid}</div>
        <div className=""><FormRowTypeIcon field={engineControlToFieldIconTypes(control)} className="w-4 h-4" /></div>
        <div className="max-w-[30ch] whitespace-nowrap overflow-hidden overflow-ellipsis">{control.dispname}</div>
        <div className="text-[.6rem]">{control.path}</div>
    </>);
}

const vlineClasses = "[&>*]:py-0.5 [&>*]:border-primary-500 [&>*]:border-l [&>*]:pl-2"; // [&>*~*]:border-b

export function ControlsGrid({ controls }: { controls: EngineControl[]; }) {
    return (
        <div className={classNames("text-xs grid grid-cols-[repeat(5,min-content)] gap-x-2 overflow-auto", vlineClasses,)}>
            {controls.map((control, idx) => (
                <ControlsGridItem control={control} key={idx} />
            ))}
        </div>
    );
}
