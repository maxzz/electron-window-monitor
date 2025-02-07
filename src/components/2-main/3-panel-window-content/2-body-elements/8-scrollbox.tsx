import { type ReactNode } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { scrollbarClasses, scrollbarThumbClasses } from '../../8-shared-styles';

export function ScrollBox({ children }: { children: ReactNode; }) {
    return (
        <ScrollArea.Root className="w-full h-full" type="always">
            <ScrollArea.Viewport className="pb-4 w-full h-full min-h-0">
                {children}
            </ScrollArea.Viewport>

            <ScrollArea.Scrollbar className={scrollbarClasses} orientation="vertical">
                <ScrollArea.Thumb className={scrollbarThumbClasses} />
            </ScrollArea.Scrollbar>

            <ScrollArea.Scrollbar className={scrollbarClasses} orientation="horizontal">
                <ScrollArea.Thumb className={scrollbarThumbClasses} />
            </ScrollArea.Scrollbar>
        </ScrollArea.Root>
    );
}
