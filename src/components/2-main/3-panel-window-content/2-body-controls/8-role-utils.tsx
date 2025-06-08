import { type Meta, getRoleStateNames } from "@/store/manifest";
import { type EngineControlWithMeta } from "@/store";

/**
 * Correct name for listitems
 */
export function getItemName(item: EngineControlWithMeta) {
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

export function printRoles(path: Meta.Path) {
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
