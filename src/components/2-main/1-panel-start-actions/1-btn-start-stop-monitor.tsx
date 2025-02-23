import { type ComponentPropsWithoutRef } from "react";
import { useSetAtom, useAtom, useAtomValue } from "jotai";
import { AnimatePresence, motion } from "motion/react";
import { classNames } from "@/utils";
import { animationProps, animationTransition, buttonClasses } from "./8-button-classes";
import { IconPlayStop, IconPlayStart } from "@/components/ui";
import { doGetTargetHwndAtom, doMonitoringAtom, monitorCounterAtom } from "@/store";

import { IconRadarV1 } from "@/components/ui/icons/animated/radar-v1";
import { IconEyes } from "@/components/ui/icons/animated/eyes";
import { EyesFollowCursor } from "@/components/ui/icons/animated/eyes-v2";
import { EyeV3 } from "@/components/ui/icons/animated/eyes-v3";
import { EyeV4 } from "@/components/ui/icons/animated/eyes-v4";
import { EyeV5 } from "@/components/ui/icons/animated/eyes-v5";
import { EyeV6 } from "@/components/ui/icons/animated/eyes-v6";

export function ButtonStartStopMonitor() {
    const [isMonitoring, setIsMonitoring] = useAtom(doMonitoringAtom);
    const doGetTargetHwnd = useSetAtom(doGetTargetHwndAtom);

    async function sendRequest() {
        function callback() {
            doGetTargetHwnd();
        }
        setIsMonitoring({ doStart: !isMonitoring, callback });
    }

    return (
        <button className={classNames("relative", buttonClasses)} onClick={sendRequest}>
            <MonitorButtonText isMonitoring={isMonitoring} />
            <MonitorCounter className="absolute -top-3" />

            {/* <div className="flex items-center gap-x-2">
                <IconRadarV1 />
                <EyesFollowCursor />
                <IconEyes />
                <EyeV3 />
            </div> */}
            <EyeV4 />
            {/* <EyeV5 />
            <EyeV6 /> */}
        </button>
    );
}

function MonitorButtonText({ isMonitoring }: { isMonitoring: boolean; }) {
    return (
        isMonitoring
            ? (
                <div className="w-28 flex items-center justify-center gap-1">
                    <IconPlayStop className="pt-0.5 size-4 fill-red-500 text-red-400" />
                    Stop Monitor
                </div>
            )
            : (
                <div className="w-28 flex items-center justify-center gap-1">
                    <IconPlayStart className="pt-0.5 size-4" />
                    Start Monitor
                </div>
            )
    );
}

function MonitorCounter({ className, ...rest }: ComponentPropsWithoutRef<typeof motion.div>) {

    const monitorCounter = useAtomValue(monitorCounterAtom);
    if (monitorCounter < 0) {
        return null;
    }

    return (
        <AnimatePresence>
            {monitorCounter > 0 && (
                <motion.div
                    {...animationProps}
                    transition={{ duration: .5, delay: .5 }}
                    className={classNames(counterClasses, className)}
                    title="Number of calls to check the active window"
                    {...rest}
                >
                    {`${monitorCounter}`.padStart(2, '0')}s
                </motion.div>
            )}
        </AnimatePresence>
    );
}

const counterClasses = "\
px-2 \
leading-6 \
scale-y-125 \
text-center \
font-mono font-semibold \
text-transparent \
bg-primary-200 border-primary-600 border rounded \
[-webkit-text-stroke-width:0.5px] \
[-webkit-text-stroke-color:#173717] \
";
