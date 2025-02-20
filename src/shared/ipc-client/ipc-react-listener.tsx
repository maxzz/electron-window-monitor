import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { M2R } from "@/shared/ipc-types";
import { doFromMainAtom } from "./ipc-react-listener-atom";

import { sendToMain } from "../../store";
import { appSettings } from "@/store/1-atoms";

export const worldStore = {
    listeners: new Set<(data: unknown) => void>(),
    update(data?: unknown) {
        data && this.listeners.forEach((listener) => listener(data));
    }
};

// React connector

export function WorldToReactListener() {
    const doFromMain = useSetAtom(doFromMainAtom);

    useEffect(() => {
        const cb = (data?: unknown) => data && doFromMain(data as M2R.RendererCalls);
        worldStore.listeners.add(cb);
        return () => {
            worldStore.listeners.delete(cb); // TODO: we can remove all listeners from HMR.
        };
    }, [doFromMain]);

    return null;
}

// Initial state exchange with main

export function sendNapiOptions() {
    sendToMain({ type: 'r2m:set-client-options', state: { maxControls: appSettings.monitor.maxControls } });
}

export function OnAppMount() {
    useEffect(() => {
        sendNapiOptions();
    }, []);
    return null;
}
