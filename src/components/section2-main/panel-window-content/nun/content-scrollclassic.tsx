import { useAtomValue } from "jotai";
import { sawContentAtom, sawContentStrAtom } from "@/store";
import { EngineControl } from "@/electron/app/napi-calls";
import { classNames } from "@/utils";
import { ControlsGridItems } from "../body-elements/content-items";

const gridBorderClasses = `pl-2 text-xs border-primary-500 border rounded ${"select-none shadow-sm"}`;
const vlineClasses = "[&>*]:py-0.5 [&>*]:border-primary-500 [&>*]:border-l [&>*]:pl-2"; // [&>*~*]:border-b

function ControlsGrid({ controls }: { controls: EngineControl[]; }) {
    return (
        <div className={classNames("flex-0 pb-1 h-full flex flex-col min-h-0", gridBorderClasses)}>
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
