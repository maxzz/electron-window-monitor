import { useAtomValue } from 'jotai';
import { useSnapshot } from 'valtio';
import { sawContentStrAtom, sendToMain } from '@/store';
import { clientState } from "@/store/app-state";
import { ButtonCopyContent } from './btn-copy';

const buttonClasses = "px-2 py-1 border-primary-500 hover:border-primary-600 hover:bg-primary-500 disabled:opacity-20 border rounded shadow active:scale-[.97] transition-transform";

function BuildCounter() {
    const { buildError, buildCounter } = useSnapshot(clientState);
    if (buildError || buildCounter < 200) {
        return null;
    }
    return (<>
        <div className="pt-0.5">
            controls detection progress
        </div>

        <div className="pt-0.5 min-w-[2.5rem]">
            {buildCounter}
        </div>

        <button className={buttonClasses} onClick={() => sendToMain({ type: 'cancel-detection' })}>
            Cancel
        </button>
    </>);
}

function BuildError() {
    const { buildError } = useSnapshot(clientState);
    if (!buildError) {
        return null;
    }
    return (
        <div className="px-2 py-1 bg-red-600 text-white rounded-sm">
            {buildError}
        </div>
    );
}

function PanelBuildProcess() {
    return (
        <div className="text-xs text-primary-700 flex items-center gap-x-1">
            <BuildCounter />
            <BuildError />
        </div>
    );
}

function HeaderTitle() {
    const sawContentStr = useAtomValue(sawContentStrAtom);
    const { buildError, buildCounter } = useSnapshot(clientState);
    return (<>
        {(!!sawContentStr || buildCounter > 0 || buildError) &&
            <div className="py-2 flex items-center gap-2">
                <div className="font-semibold">
                    Second Window Content
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
            <PanelBuildProcess />
        </div>
    );
}
