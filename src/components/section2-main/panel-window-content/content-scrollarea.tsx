import { ReactNode } from 'react';
import { useAtomValue } from 'jotai';
import { EngineControl, sawContentAtom, sawContentStrAtom } from '@/store';
import { classNames } from '@/utils';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { barClasses, thumbClasses } from './styles-scrollbar';
import { ControlsGridItems } from './content-items';

const gridBorderClasses = `text-xs border-primary-500 border rounded select-none shadow-sm`;
const vlineClasses = "[&>*]:py-0.5 [&>*]:border-primary-500 [&>*]:border-l [&>*]:pl-2"; // [&>*~*]:border-b

function ControlsGrid({ controls }: { controls: EngineControl[]; }) {
    return (
        <div className={classNames("text-xs grid grid-cols-[repeat(5,min-content)] gap-x-2 overflow-auto", vlineClasses,)}>
            <ControlsGridItems controls={controls} />
        </div>
    );
}

export function ScrollBox({ children }: { children: ReactNode; }) {
    return (
        <ScrollArea.Root className="w-full h-full" type="always">
            <ScrollArea.Viewport className="pb-4 w-full h-full min-h-0">
                {children}
            </ScrollArea.Viewport>

            <ScrollArea.Scrollbar className={barClasses} orientation="vertical">
                <ScrollArea.Thumb className={thumbClasses} />
            </ScrollArea.Scrollbar>

            <ScrollArea.Scrollbar className={barClasses} orientation="horizontal">
                <ScrollArea.Thumb className={thumbClasses} />
            </ScrollArea.Scrollbar>
        </ScrollArea.Root>
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
