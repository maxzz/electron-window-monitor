import { useAtomValue } from 'jotai';
import { useSnapshot } from 'valtio';
import { sawContentStrAtom } from '@/store';
import { napiBuildProgress, napiBuildState } from "@/store/7-napi-atoms";
import { ButtonCopyContent } from './1-btn-copy';

export function HeaderPanel() {
    return (
        <div className="flex items-center justify-between gap-2">
            <HeaderTitle />
        </div>
    );
}

function HeaderTitle() {
    const sawContentStr = useAtomValue(sawContentStrAtom);
    const { buildCounter } = useSnapshot(napiBuildProgress);
    const { buildError } = useSnapshot(napiBuildState);

    const showControls = !!sawContentStr || buildCounter > 0 || !!buildError;
    return (<>
        {showControls &&
            <div className="py-1 flex items-center gap-2">
                <div className="text-sm font-semibold">
                    Controls inside window
                </div>

                <ButtonCopyContent />
            </div>
        }
    </>);
}
