import { type PrimitiveAtom, useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { motion } from "motion/react";
import { IconDndTarget } from "@/components/ui/icons/normal";
import { dndActionAtom, dndActionInitAtom } from "@/store/7-napi-atoms/7-do-pos-tracking";
import { getFileUsConnectedHwndAtom, posAtoms, stateNapiPosTracker } from "@/store/7-napi-atoms/7-do-pos-tracking/9-state-of-tracker";
import { useStateNapiPosTracker } from "./2-picker-dnd-inputs";

export function NewInputXY() {
    useStateNapiPosTracker(posAtoms);
    return (
        <div className="my-4 min-h-12 flex items-center gap-x-2">
            <NapiPicker />
            <DraggingHint />
        </div>
    );
}

function NapiPicker() {
    const { dragIsRunning } = useSnapshot(stateNapiPosTracker);
    const dndActionInit = useSetAtom(dndActionInitAtom);
    const dndAction = useSetAtom(dndActionAtom);

    async function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
        if (event.buttons !== 1) { // if left button is not pressed then do nothing
            return;
        }

        const elm = event.target as HTMLDivElement;
        elm.setPointerCapture(event.pointerId);

        try {
            const error = await dndActionInit(getFileUsConnectedHwndAtom());
            error ? console.error('dnd.failed', error) : stateNapiPosTracker.dragIsRunning = true;
        } catch (err) {
            console.error(err);
        }
    }

    function onPointerUp() {
        if (dragIsRunning) {
            dndAction('stop');
            stateNapiPosTracker.dragIsRunning = false;
        }
    }

    function onPointerMove() {
        if (dragIsRunning) {
            dndAction('move');
        }
    }

    return (
        <div
            className="p-1 inline-block border-border border rounded shadow-sm"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerMove={onPointerMove}
        >
            <IconDndTarget className={classNames("size-8", dragIsRunning && "opacity-10")} />
        </div>
    );
}

function DraggingHint() {
    const { current: { isInside }, dragIsRunning } = useSnapshot(stateNapiPosTracker);
    const text =
        dragIsRunning
            ? isInside
                ? 'Drop it!'
                : 'Move cursor over the target window.'
            : 'To update the x and y coordinates, drag the icon to the target window, position it where you want the click to occur, and release the mouse button.';
    return (
        <motion.div
            key={text}
            className="1text-balance"
            initial={{ opacity: 0, transition: { delay: .2 } }}
            animate={{ opacity: 1 }}
            transition={{ duration: .7, }}
            style={{ ...(dragIsRunning && { color: isInside ? 'green' : 'red' }) }}
        >
            {text}
        </motion.div>
    );
}
