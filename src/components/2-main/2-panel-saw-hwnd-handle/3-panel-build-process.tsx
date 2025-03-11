import { type ComponentPropsWithoutRef } from "react";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { R2MCalls } from "@/store";
import { napiBuildState, napiBuildProgress } from "@/store/7-napi-atoms";

export function PanelBuildProcess(props: ComponentPropsWithoutRef<"div">) {
    const { typedError } = useSnapshot(napiBuildState);
    return (<>
        {typedError
            ? <BuildError buildError={typedError} {...props} />
            : <BuildCounter {...props} />
        }
    </>);
}

function BuildError({ buildError, className, ...rest }: { buildError: string; } & ComponentPropsWithoutRef<"div">) {
    return (
        <div className={classNames("my-2 px-2 text-[.65rem] text-white bg-red-600 rounded-sm flex items-center gap-x-1", className)} {...rest}>
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
        <div className={classNames("my-2 text-xs text-primary-700 flex items-center gap-x-1", className)} {...rest}>
            <div>
                controls detection progress
            </div>

            <div className="pt-0.5 min-w-[2.5rem] font-semibold font-mono">
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
text-orange-100 bg-orange-500 border-orange-600 \
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
