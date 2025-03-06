'use client'; //https://21st.dev/yadwinder/ios-spinner/default
import { classNames } from "@/utils";
import css from "./1-wait.module.css";

export const WaitV1 = () => {
    return (
        <div className="-1mb-[155.12px] w-[311.33px] h-[155.12px] bg-red-state flex items-center relative justify-center">
            <Spinner className={classNames("")} size="xl" />
        </div>
    );
};

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: "sm" | "md" | "lg" | "xl";
}

export function Spinner({ className, size = "md", ...rest }: SpinnerProps) {
    return (
        <div
            className={classNames(
                "relative inline-block",
                size === "sm" && "h-3 w-3",
                size === "md" && "h-4 w-4",
                size === "lg" && "h-6 w-6",
                size === "xl" && "h-12 w-12",
                className
            )}
            {...rest}
        >
            {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className={classNames(css["spinner-blade"], "absolute left-[44%] top-[37%] w-[8%] h-[20%] bg-pink-500")} />
            ))}
        </div>
    );
}
