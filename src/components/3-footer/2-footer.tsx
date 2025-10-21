import { type HTMLAttributes } from "react";
import { classNames, envBuildVersion, envModifiedDate } from "@/utils";
import { IconSunnyvale } from "../ui/icons";

export function Section3_Footer({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("pb-1 h-8 text-xs dark:bg-black dark:text-slate-600 flex items-center justify-center overflow-hidden", className)} {...rest}>

            <a className={urlClasses} href="https://github.com/maxzz" target="_blank" rel="noopener">
                Created by Max Zakharzhevskiy
            </a>

            <IconSunnyvale
                className="pt-1 size-8 hover:scale-150 transition-all duration-300"
                title={`${envModifiedDate()}\n   Sunnyvale Produce\n\tVersion ${envBuildVersion()}`}
            />

            <a className={urlClasses} href="https://github.com/maxzz/electron-window-monitor" target="_blank" rel="noopener">
                Open source code on GitHub
            </a>
        </div>
    );
}

const urlClasses = "\
origin-center \
underline-offset-2 \
hover:underline \
hover:text-primary-500 \
scale-y-50 \
hover:scale-y-125 \
transition-colors \
duration-1000 \
cursor-pointer";
