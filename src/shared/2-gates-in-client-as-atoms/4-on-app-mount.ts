import { useEffect } from "react";
import { sendToMain } from "../../store";
import { appSettings } from "@/store/1-atoms";

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
