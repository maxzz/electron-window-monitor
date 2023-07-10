import { useSetAtom } from "jotai";
import { EngineControlWithMeta, doHighlightRectAtom } from "@/store";
import { FieldTypeIconComponent, engineControlToFieldIconTypes } from "@/store/manifest";
import { classNames } from '@/utils';

const vlineClasses = "[&>*]:pl-2 [&>*]:py-0.5 [&>*]:border-primary-500 [&>*]:border-l"; // [&>*~*]:border-b
const gridRowClasses = classNames("grid grid-cols-[1.6rem,1.6rem,1fr,16rem] gap-x-2", vlineClasses);

export function ControlsGridItem({ item }: { item: EngineControlWithMeta; }) {
    const doHighlightRect = useSetAtom(doHighlightRectAtom);
    function select() {
        doHighlightRect({ rect: item.meta.rect });
    }
    return (
        <div className={gridRowClasses} onClick={select}>
            <div className="text-end" title="Order ID">{`${item.control.orderid}`.padStart(2,'0')}</div>
            <div className=""><FieldTypeIconComponent field={engineControlToFieldIconTypes(item.control)} className="w-4 h-4" /></div>
            <div className="max-w-[30ch] whitespace-nowrap overflow-hidden overflow-ellipsis">{item.control.dispname}</div>
            <div className="text-[.6rem]">{item.control.path}</div>
        </div>
    );
}

export function ControlsGrid({ controls }: { controls: EngineControlWithMeta[]; }) {

    console.log('controls', controls);

    return (
        <div className="text-xs grid">
            {controls.map((control, idx) => (
                <ControlsGridItem item={control} key={idx} />
            ))}
        </div>
    );
}
