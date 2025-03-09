import { useEffect } from "react";
import { R2MCalls } from "../../store";
import { appSettings } from "@/store/1-atoms";

// Initial state exchange from renderer to main

export function OnAppMount() {
    useEffect(
        () => {
            sendNapiOptions();
        }, []
    );
    return null;
}

export function sendNapiOptions() {
    R2MCalls.setClientOptions({ state: { maxControls: appSettings.monitor.maxControls } });
}
