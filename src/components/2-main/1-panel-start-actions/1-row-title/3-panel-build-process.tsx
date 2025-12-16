import { type ComponentPropsWithoutRef } from "react";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { R2MCalls } from "@/store";
import { napiBuildState, napiBuildProgress } from "@/store/7-napi-atoms";

export function PanelBuildProcess(props: ComponentPropsWithoutRef<"div">) {
    const { buildError } = useSnapshot(napiBuildState);
    return (<>
        {buildError
            ? <BuildError buildError={buildError} {...props} />
            : <BuildCounter {...props} />
        }
    </>);
}

function BuildError({ buildError, className, ...rest }: { buildError: string; } & ComponentPropsWithoutRef<"div">) {
    return (
        <div className={classNames("flex-1 mx-2 px-2 min-w-16 text-[.65rem] leading-5 text-white bg-red-600 rounded-xs cursor-default truncate flex items-center justify-end gap-x-1", className)} title={buildError} {...rest}>
            {buildError}
        </div>
    );
}

function BuildCounter({ className, ...rest }: ComponentPropsWithoutRef<"div">) {

    const { buildCounter } = useSnapshot(napiBuildProgress);
    if (buildCounter < 200) {
        return null;
    }

    return (
        <div className={classNames("shrink-0 mx-1 text-xs bg-orange-100 dark:bg-orange-950 rounded flex items-center gap-x-1", className)} {...rest}>
            <div className="pl-1 pt-0.5 text-[.55rem]">
                detecting controls:
            </div>

            <div className="pt-0.5 min-w-10 font-semibold font-mono">
                {buildCounter}
            </div>

            <button className={buttonClasses} onClick={() => R2MCalls.cancelDetection()}>
                Cancel
            </button>
        </div>
    );
}

const buttonClasses = "\
px-2 py-1 \
text-white bg-orange-500 border-orange-600 \
hover:text-white \
hover:bg-orange-600 \
hover:border-orange-700 \
border \
rounded \
shadow \
disabled:scale-100 \
disabled:hover:bg-transparent \
disabled:opacity-20 \
\
active:scale-x-75 \
transition-colors \
";
