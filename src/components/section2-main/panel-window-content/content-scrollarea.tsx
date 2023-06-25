import { Fragment, ReactNode } from 'react';
import { useAtomValue } from 'jotai';
import { EngineControl, sawContentAtom } from '@/store';
import { classNames } from '@/utils';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { ControlsGridItems } from './content-panel';

const gridBorderClasses = `text-xs border-primary-500 border rounded select-none shadow-sm`;
const vlineClasses = "[&>*]:py-0.5 [&>*]:border-primary-500 [&>*]:border-l [&>*]:pl-2"; // [&>*~*]:border-b

function ControlsGrid({ controls }: { controls: EngineControl[]; }) {
    return (
        <div className={classNames("text-xs grid grid-cols-[repeat(5,min-content)] gap-x-2 overflow-auto", vlineClasses, )}>
            <ControlsGridItems controls={controls} />
        </div>
    );
}

const barClasses = "\
p-0.5 \
bg-primary-500/50 \
hover:bg-primary-500 \
\
data-[orientation=vertical]:w-2.5 \
data-[orientation=horizontal]:h-2.5 \
data-[orientation=horizontal]:flex-col \
\
flex \
transition-colors \
duration-[160ms] ease-out \
select-none \
touch-none \
";

const thumbClasses = "\
relative \
flex-1 \
bg-primary-700/70 \
rounded-[10px] \
\
before:content-[''] \
before:absolute \
before:top-1/2 \
before:left-1/2 \
before:-translate-x-1/2 \
before:-translate-y-1/2 \
\
before:w-full \
before:h-full \
\
before:min-w-[44px] \
before:min-h-[44px] \
";

// export function ContentScrollArea({ children }: { children: ReactNode; }) {
export function ContentScrollArea() {
    const sawContent = useAtomValue(sawContentAtom);
    const controls = sawContent?.controls;
    return (
        <div className={classNames("min-h-0",gridBorderClasses)}>
            <ScrollArea.Root className="w-full h-full" type="always">
                <ScrollArea.Viewport className="pb-4 w-full h-full min-h-0">
                    <ControlsGrid controls={controls || []} />
                </ScrollArea.Viewport>

                <ScrollArea.Scrollbar className={barClasses} orientation="vertical">
                    <ScrollArea.Thumb className={thumbClasses} />
                </ScrollArea.Scrollbar>

                <ScrollArea.Scrollbar className={barClasses} orientation="horizontal">
                    <ScrollArea.Thumb className={thumbClasses} />
                </ScrollArea.Scrollbar>

            </ScrollArea.Root>
        </div>
    );
}