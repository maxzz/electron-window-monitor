import { useState } from "react";
import { useSetAtom } from "jotai";
import { motion } from "motion/react";
import { FieldTypeIconComponent, engineControlToFieldIconType } from "@/store/manifest";
import { type EngineControlWithMeta, doHighlightRectAtom } from "@/store";
import { getItemName, printRoles } from "./8-role-utils";

export function ControlsGridItems({ controls }: { controls: EngineControlWithMeta[]; }) {

    console.log('%ccontrols', 'color: green', controls);

    return (
        <div className="text-xs grid">
            {controls.map(
                (control, idx) => (
                    <ControlsGridItem item={control} key={idx} />
                )
            )}
        </div>
    );
}

function ControlsGridItem({ item }: { item: EngineControlWithMeta; }) {
    const [localHighlight, setLocalHighlight] = useState(false);

    const doHighlightRect = useSetAtom(doHighlightRectAtom);
    function select() {
        doHighlightRect({ rect: item.meta.rect });
        setLocalHighlight(true);
    }

    printRoles(item.meta.path);

    const role = item.meta.role?.role || item.meta.role?.raw;
    const states = item.meta.role?.states ? `${item.meta.role?.states.join(', ')}` : '';

    return (
        <motion.div
            className={gridRowClasses}
            onClick={select}
            initial={{ borderStyle: 'solid', borderWidth: '1px', borderColor: 'transparent', }}
            animate={{ borderColor: localHighlight ? 'red' : 'transparent' }}
            onAnimationComplete={() => setTimeout(() => setLocalHighlight(false), 1000)}
            transition={{ duration: 0.3 }}
        >
            <div className="text-end" title="Order ID">
                {`${item.control.orderid}`.padStart(2, '0')}
            </div>

            <div>
                <FieldTypeIconComponent className="size-4" field={engineControlToFieldIconType(item.control)} />
            </div>

            <div className="truncate">
                {getItemName(item)}
                {/* {item.control.dispname} */}
            </div>

            <div className="pr-4 text-[.6rem] flex items-center justify-between" title={item.meta.role?.raw}>
                <div className="font-semibold">
                    {role}
                </div>
                <div>
                    {states}
                </div>
            </div>
        </motion.div>
    );
}

const gridRowClasses = "\
h-5 \
grid grid-cols-[1.6rem,1.6rem,minmax(10ch,30ch),16rem] gap-x-2 \
cursor-pointer \
\
[&>*]:pl-2 [&>*]:py-0.5 [&>*]:border-primary-500 [&>*]:border-l"; // [&>*~*]:border-b // v-line
