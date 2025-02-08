import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";

export function Section1Header({className, ...rest}: ComponentPropsWithoutRef<"div">) {
    return (<>
        <div className={classNames("h-0.5 border-b border-primary-500/50", className)} {...rest} />
    </>);
}
