import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { subscribe } from "valtio";
import { stateNapiPosTracker } from "@/store/7-napi-atoms";
import { type PosAtoms } from "./9-state-of-tracker";

export function useStateNapiPosTracker(posAtoms: PosAtoms) {
    const setPosValueX = useSetAtom(posAtoms.xAtom);
    const setPosValueY = useSetAtom(posAtoms.yAtom);

    useEffect(
        () => {
            const unsubscribe = subscribe(stateNapiPosTracker.current,
                () => {
                    const { x, y, isInside } = stateNapiPosTracker.current;
                    if (isInside) {
                        setPosValueX(x);
                        setPosValueY(y);
                    }
                }
            );
            return unsubscribe;
        }, []
    );
}
