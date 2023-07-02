import { proxy } from 'valtio';

type ClientState = {
    buildRunning: boolean;      // content check build is runnning
    buildError: string;         // error message if build failed
    buildFailedBody: string;    // raw string returned from main that failed to parse
};

export const clientState = proxy<ClientState>({
    buildRunning: false,
    buildError: '',
    buildFailedBody: '',
});

type BuildState = {
    buildCounter: number;       // controls detection progress
};

export const buildState = proxy<BuildState>({
    buildCounter: 0,
});
