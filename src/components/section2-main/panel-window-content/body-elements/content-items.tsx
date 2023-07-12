import { useState } from "react";
import { useSetAtom } from "jotai";
import { EngineControlWithMeta, doHighlightRectAtom } from "@/store";
import { FieldTypeIconComponent, engineControlToFieldIconType } from "@/store/manifest";
import { classNames } from '@/utils';
import { a, useSpring } from "@react-spring/web";

const vlineClasses = "[&>*]:pl-2 [&>*]:py-0.5 [&>*]:border-primary-500 [&>*]:border-l"; // [&>*~*]:border-b
const gridRowClasses = classNames("grid grid-cols-[1.6rem,1.6rem,minmax(10ch,30ch),16rem] gap-x-2 cursor-pointer", vlineClasses);
const ellipsisClasses = "whitespace-nowrap overflow-hidden overflow-ellipsis";

export function ControlsGridItem({ item }: { item: EngineControlWithMeta; }) {
    const [localHi, setLocalHi] = useState(false);

    const doHighlightRect = useSetAtom(doHighlightRectAtom);
    function select() {
        doHighlightRect({ rect: item.meta.rect });
        setLocalHi(true);
    }

    const styles = useSpring({
        // opacity: localHi ? 0 : 1,
        borderColor: localHi ? 'red' : 'transparent',
        borderStyle: 'solid',
        borderWidth: '1px',
        onRest: () => {
            setLocalHi(false);
        }
    });

    const role = item.meta.role?.role || item.meta.role?.raw;
    const states = item.meta.role?.states ? `${item.meta.role?.states.join(', ')}` : '';
    return (
        <a.div style={styles} className={gridRowClasses} onClick={select}>
            <div className="text-end" title="Order ID">{`${item.control.orderid}`.padStart(2, '0')}</div>
            <div className=""><FieldTypeIconComponent field={engineControlToFieldIconType(item.control)} className="w-4 h-4" /></div>
            <div className={ellipsisClasses}>{item.control.dispname}</div>
            <div className="pr-4 text-[.6rem] flex items-center justify-between" title={item.meta.role?.raw}>
                <div className="font-semibold">{role}</div>
                <div className="">{states}</div>
            </div>
        </a.div>
    );
}

export function ControlsGridItems({ controls }: { controls: EngineControlWithMeta[]; }) {
    console.log('controls', controls);
    return (
        <div className="text-xs grid">
            {controls.map((control, idx) => (
                <ControlsGridItem item={control} key={idx} />
            ))}
        </div>
    );
}
