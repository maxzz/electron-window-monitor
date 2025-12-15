import { useEffect } from "react";
import { R2MCalls } from "../../store";
import { debugSettings } from "@/store/1-atoms";
import { getZoomLevel } from "./3-to-main-apis";
import { useSetAtom } from "jotai";
import { zoomLevelAtom } from "@/store/1-atoms/atom-zoom";

// Initial state exchange from renderer to main

export function OnAppMount() {
    const setZoom = useSetAtom(zoomLevelAtom);
    useEffect(
        () => {
            sendNapiOptions();
            getZoomLevel().then(setZoom);
        }, [setZoom]
    );
    return null;
}

export function sendNapiOptions() {
    R2MCalls.setClientOptions({ state: { maxControls: debugSettings.uiState.maxControls } });
}
