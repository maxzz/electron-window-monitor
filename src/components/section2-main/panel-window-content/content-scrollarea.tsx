import { Fragment, ReactNode } from 'react';
import { useAtomValue } from 'jotai';
import { EngineControl, sawContentAtom } from '@/store';
import { classNames } from '@/utils';
import * as ScrollArea from '@radix-ui/react-scroll-area';

const borderClasses = `px-2 py-1 text-xs border-primary-500 border rounded ${"select-none shadow-sm"}`;
const vlineClasses = "[&>*]:border-primary-500 [&>*]:border-l [&>*]:pl-2"; // [&>*~*]:border-b

function ControlsGrid({ controls }: { controls: EngineControl[]; }) {
    return (
        <div className={classNames("text-xs grid grid-cols-[repeat(5,min-content)] gap-x-2 gap-y-0.5 h-full overflow-auto", vlineClasses, borderClasses)}>
            {controls.map((control, idx) => (
                <Fragment key={idx}>
                    <div className="text-end !pl-0 border-none">{control.memid}</div>
                    <div className="text-end">{control.orderid}</div>
                    <div className="">{control.type}</div>
                    <div className="w-max">{control.dispname}</div>
                    <div className="text-[.6rem]">{control.path}</div>
                </Fragment>
            ))}
        </div>
    );
}

const barClasses = "\
flex \
select-none \
touch-none \
p-0.5 \
bg-blackA6 \
hover:bg-blackA8 \
transition-colors \
duration-[160ms] ease-out \
\
data-[orientation=vertical]:w-2.5 \
data-[orientation=horizontal]:flex-col \
data-[orientation=horizontal]:h-2.5 \
";

const thumbClasses = "\
relative \
flex-1 \
bg-mauve10 \
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
        <div className="">
            <ScrollArea.Root>
                <ScrollArea.Viewport>
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