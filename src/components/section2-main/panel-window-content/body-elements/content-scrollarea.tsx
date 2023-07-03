import { useAtomValue } from 'jotai';
import { sawContentAtom, sawContentStrAtom } from '@/store';
import { EngineControl } from '@/electron/app/napi-calls';
import { classNames } from '@/utils';
import { ControlsGridItems } from './content-items';
import { ScrollBox } from './scrollbox';

const gridBorderClasses = `text-xs border-primary-500 border rounded select-none shadow-sm`;
const vlineClasses = "[&>*]:py-0.5 [&>*]:border-primary-500 [&>*]:border-l [&>*]:pl-2"; // [&>*~*]:border-b

function ControlsGrid({ controls }: { controls: EngineControl[]; }) {
    return (
        <div className={classNames("text-xs grid grid-cols-[repeat(5,min-content)] gap-x-2 overflow-auto", vlineClasses,)}>
            <ControlsGridItems controls={controls} />
        </div>
    );
}

export function ContentScrollArea() {
    const sawContentStr = useAtomValue(sawContentStrAtom);
    const sawContent = useAtomValue(sawContentAtom);
    const controls = sawContent?.controls;
    return (<>
        {controls &&
            <div className={classNames("min-h-0", gridBorderClasses)}>
                <ScrollBox>
                    <ControlsGrid controls={controls || []} />
                </ScrollBox>
            </div>
        }

        {!controls && sawContentStr &&
            <div className="text-sm">
                No controls detected
            </div>
        }
    </>);
}
