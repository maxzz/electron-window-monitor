import { type ComponentPropsWithoutRef } from "react";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { sendToMain } from "@/store";
import { napiBuildState, napiBuildProgress } from "@/store/7-napi-atoms";

export function PanelBuildProcess({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    return (<>
        <BuildCounter />
        <BuildError />
    </>);
}
function BuildError({ className, ...rest }: ComponentPropsWithoutRef<"div">) {

    const { buildError } = useSnapshot(napiBuildState);
    if (!buildError) {
        return null;
    }

    return (
        <div className={classNames("text-xs text-primary-700 flex items-center gap-x-1", className)} {...rest}>
            <div className="px-2 py-1 bg-red-600 text-white rounded-sm">
                {buildError}
            </div>
        </div>
    );
}


function BuildCounter({ className, ...rest }: ComponentPropsWithoutRef<"div">) {

    const { buildError } = useSnapshot(napiBuildState);
    const { buildCounter } = useSnapshot(napiBuildProgress);
    if (buildError || buildCounter < 200) {
        return null;
    }

    return (
        <div className={classNames("text-xs text-primary-700 flex items-center gap-x-1", className)} {...rest}>
            <div className="pt-0.5">
                controls detection progress
            </div>

            <div className="pt-0.5 min-w-[2.5rem] font-semibold font-mono">
                {buildCounter}
            </div>

            <button className={classNames(buttonClasses, "text-white bg-orange-500")} onClick={() => sendToMain({ type: 'cancel-detection' })}>
                Cancel
            </button>
        </div>
    );
}

const buttonClasses = "\
px-2 py-1 \
border-primary-500 \
hover:border-primary-600 \
hover:bg-primary-500 \
border \
rounded \
shadow \
active:scale-[.97] \
disabled:scale-100 \
disabled:hover:bg-transparent \
disabled:opacity-20 \
\
transition-transform \
";
