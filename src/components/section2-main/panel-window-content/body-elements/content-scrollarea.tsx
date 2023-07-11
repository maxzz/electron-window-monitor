import { useAtomValue } from 'jotai';
import { sawContentAtom, sawContentStrAtom } from '@/store';
import { classNames } from '@/utils';
import { ControlsGridItems2 } from './content-items';
import { ScrollBox } from './scrollbox';

const gridBorderClasses = `text-xs border-primary-500 border rounded select-none shadow-sm`;

export function ContentScrollArea() {
    const sawContentStr = useAtomValue(sawContentStrAtom);
    const sawContent = useAtomValue(sawContentAtom);
    const controls = sawContent?.controls;

    if (!controls) {
        if (sawContentStr) {
            return (
                <div className="text-sm">
                    No controls detected
                </div>
            );
        }
        return null;
    }

    return (
        <div className={classNames("min-h-0", gridBorderClasses)}>
            <ScrollBox>
                <ControlsGridItems2 controls={controls} />
            </ScrollBox>
        </div>
    );
}
