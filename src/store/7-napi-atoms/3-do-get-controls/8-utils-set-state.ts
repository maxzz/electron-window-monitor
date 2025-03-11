import { type TypedError } from "@/utils";
import { napiBuildProgress, napiBuildState } from "../9-napi-build-state";

type SetLocalStateParams = {
    progress?: number;          // controls detection progress
    lastProgress?: number;      // last number of build progress or 0
    isRunning?: boolean;        // content check build is runnning
    error?: TypedError;         // error message if build failed
    failedBody?: string;        // raw string returned from main that failed to parse
};

export function setLocalState({ progress, lastProgress, isRunning, error, failedBody }: SetLocalStateParams) {
    progress !== undefined && (napiBuildProgress.buildCounter = progress);
    lastProgress !== undefined && (napiBuildProgress.lastProgress = lastProgress);
    isRunning !== undefined && (napiBuildState.buildRunning = isRunning);
    if (error) {
        napiBuildState.typedError = error.typed;
        napiBuildState.typedExtra = error.extra;
    }
    failedBody !== undefined && (napiBuildState.buildFailedBody = failedBody);
}
