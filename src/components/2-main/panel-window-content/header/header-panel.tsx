import { useAtomValue } from 'jotai';
import { useSnapshot } from 'valtio';
import { sawContentStrAtom } from '@/store';
import { napiBuildProgress, napiBuildState } from "@/store/1-app-state";
import { ButtonCopyContent } from './btn-copy';

function HeaderTitle() {
    const sawContentStr = useAtomValue(sawContentStrAtom);
    const { buildError } = useSnapshot(napiBuildState);
    const { buildCounter } = useSnapshot(napiBuildProgress);
    return (<>
        {(!!sawContentStr || buildCounter > 0 || buildError) &&
            <div className="py-2 flex items-center gap-2">
                <div className="font-semibold">
                Controls inside window
                </div>
                <ButtonCopyContent />
            </div>
        }
    </>);
}

export function HeaderPanel() {
    return (
        <div className="flex items-center justify-between gap-2">
            <HeaderTitle />
        </div>
    );
}
