import { useSnapshot } from 'valtio';
import { clientState } from "@/store/app-state";
import { sawContentStrAtom } from '@/store';
import { useAtomValue } from 'jotai';
import { IconCopy } from '@/components/ui/icons';
import { a, easings, useTransition } from '@react-spring/web';
import { ReactNode, useState } from 'react';
import { classNames } from '@/utils';

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
        <div className="pt-0.5 min-w-[2.5rem]">{buildCounter}</div>
        <button
            className={buttonClasses}
            onClick={() => {
                clientState.buildCounter = buildCounter + 1;
            }}
        >
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

const borderClasses = `border-primary-500 border rounded ${"hover:bg-primary-500 hover:border-primary-600 select-none shadow-sm"}`;

function MountCopyNotice({ show, setShow, items }: { show: boolean; setShow?: (v: boolean) => void; items: ReactNode[]; }) {
    const transitions = useTransition(Number(show), {
        from: { opacity: 1, y: 0, },
        enter: { opacity: 1, y: 0, config: { duration: 0 }, },
        leave: { opacity: 0, y: -25, config: { duration: 350, easing: easings.easeOutQuad }, },
        onRest: ({ finished }) => show && finished && setShow?.(false),
    });
    return transitions((styles, item) => (
        <a.div style={styles} className="absolute"> {items[item]} </a.div>
    ));
}

function ButtonCopyContent() {
    const [showNotice, setShowNotice] = useState(false);
    const { buildFailedBody } = useSnapshot(clientState);
    if (!buildFailedBody) {
        return null;
    }
    return (
        <button
            className={classNames(borderClasses, "relative p-1.5 py-1 active:scale-[.97]")} title="copy server reply"
            onClick={() => {
                navigator.clipboard.writeText(buildFailedBody);
                setShowNotice(true);
            }}
        >
            <IconCopy className="w-4 h-4 text-primary-800/80" />
            <MountCopyNotice
                show={showNotice}
                setShow={setShowNotice}
                items={[
                    <div className="absolute -left-5 -top-12 text-xs opacity-25">💎</div>,
                    <div className="absolute -left-5 -top-12 px-2 py-1 w-fit text-xs text-white bg-primary-600 border-primary-800 border rounded">Copied</div>
                ]}
            />

        </button>
    );
}

export function HeaderPanel() {
    return (
        <div className="flex items-center justify-between gap-2">
            <div className="py-2 flex items-center gap-2">
                <div className="font-semibold">
                    Second Window Content
                </div>
                <ButtonCopyContent />
            </div>

            <PanelBuildProcess />
        </div>
    );
}
