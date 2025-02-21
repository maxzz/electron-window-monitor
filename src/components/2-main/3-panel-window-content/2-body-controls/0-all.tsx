import { useAtomValue } from 'jotai';
import { classNames } from '@/utils';
import { ScrollBox } from '@/components/ui';
import { sawContentAtom, sawContentStrAtom } from '@/store';
import { ControlsGridItems } from './1-controls-grid';

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
        <div className={classNames("min-h-32", gridBorderClasses)}>
            <ScrollBox>
                <ControlsGridItems controls={controls} />
            </ScrollBox>
        </div>
    );
}

const gridBorderClasses = `text-xs border-primary-500 border rounded select-none shadow-sm`;
