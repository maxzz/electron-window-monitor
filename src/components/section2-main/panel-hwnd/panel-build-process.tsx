import { HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { sendToMain } from "@/store";
import { clientState, buildState } from "@/store/app-state";
import { classNames } from "@/utils";

const buttonClasses = "px-2 py-1 border-primary-500 hover:border-primary-600 hover:bg-primary-500 border rounded shadow active:scale-[.97] disabled:scale-100 disabled:hover:bg-transparent disabled:opacity-20 transition-transform";

function BuildCounter() {
    const { buildError } = useSnapshot(clientState);
    const { buildCounter } = useSnapshot(buildState);
    if (buildError || buildCounter < 200) {
        return null;
    }
    return (<>
        <div className="pt-0.5">
            controls detection progress
        </div>

        <div className="pt-0.5 min-w-[2.5rem] font-semibold font-mono">
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

export function PanelBuildProcess({ className, ...rest }: HTMLAttributes<HTMLElement>) {
    return (
        <div className={classNames("text-xs text-primary-700 flex items-center gap-x-1", className)} {...rest}>
            <BuildCounter />
            <BuildError />
        </div>
    );
}
