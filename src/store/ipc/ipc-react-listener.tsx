import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { doFromMainAtom } from "./ipc-handlers-atom";

export const worldStore = {
    listeners: new Set<(data: unknown) => void>(),
    update(data?: unknown) {
        data && this.listeners.forEach((listener) => listener(data));
    }
};

// React connector

export const WorldToReactListener = () => {
    const doFromMain = useSetAtom(doFromMainAtom);
    useEffect(() => {
        const cb = (data?: unknown) => data && doFromMain(data);
        worldStore.listeners.add(cb);
        return () => {
            worldStore.listeners.delete(cb); // TODO: we can remove all listeners from HMR.
        };
    }, [doFromMain]);
    return null;
};
