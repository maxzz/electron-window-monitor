import { useState } from "react";
import { useSetAtom } from "jotai";
import { motion } from "motion/react";
import { FieldTypeIconComponent, type Meta, engineControlToFieldIconType, getRoleStateNames } from "@/store/manifest";
import { type EngineControlWithMeta, doHighlightRectAtom } from "@/store";

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

function printRoles(path: Meta.Path) {
    /*
    path.p4a.roleString 
      96_ -> {"raw":"96_","role":"dpinfo"},
       9_160000 -> {"raw":"9_160000","role":"window","states":["sizeable","moveable","focusable"]},
         a_100000 -> {"raw":"a_100000","role":"client","states":["focusable"]},
           9_100000 -> {"raw":"9_100000","role":"window","states":["focusable"]},
             a_100000 -> {"raw":"a_100000","role":"client","states":["focusable"]},
               9_100000 -> {"raw":"9_100000","role":"window","states":["focusable"]},
                 a_100000 -> {"raw":"a_100000","role":"client","states":["focusable"]},
                   9_100000 -> {"raw":"9_100000","role":"window","states":["focusable"]},
                     10_ -> {"raw":"10_","role":"pane"},
                       10_ -> {"raw":"10_","role":"pane"},
                         9_100000 -> {"raw":"9_100000","role":"window","states":["focusable"]},
                           a_100000 -> {"raw":"a_100000","role":"client","states":["focusable"]},
                             9_100000 -> {"raw":"9_100000","role":"window","states":["focusable"]},
                               21_100040 -> {"raw":"21_100040","role":"list","states":["readonly","focusable"]},
                                 22_1300002 -> {"raw":"22_1300002","role":"listitem","states":["selected","focusable","selectable","multiselectable"]},
                                   2a_ -> {"raw":"2a_","role":"text"}
    */
    const paths = path.p4a || [];
    const res = paths.map((p4a, idx) => {
        const s = `${``.padStart(idx * 2, ' ')} ${p4a.roleString} -> ${JSON.stringify(getRoleStateNames(p4a.roleString))}`;
        return s;
    }).join(',\n');
    console.log('%cpath.p4a.roleString', 'color: blue', '\n', res);
}

/**
 * Correct name for listitems
 */
function getItemName(item: EngineControlWithMeta) {
    let name = item.control.dispname;
    if (!name) {
        const lastRole = getRoleStateNames(item.meta.path.p4a?.at(-1)?.roleString);
        const prevRole = getRoleStateNames(item.meta.path.p4a?.at(-2)?.roleString);
        if (lastRole && prevRole && lastRole?.role === 'text' && prevRole?.role === 'listitem') {
            name = item.meta.path.p4a?.at(-2)?.name || 'aa';
        }
    }
    return name;
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
