import { proxy } from 'valtio';

type ClientState = {
    buildRunning: boolean;      // content check build is runnning
    buildCounter: number;       // controls detection progress
    buildError: string;         // error message if build failed
    buildFailedBody: string;    // raw string returned from main that failed to parse
};

export const clientState = proxy<ClientState>({
    buildRunning: false,
    buildCounter: 0,
    buildError: '',
    buildFailedBody: '',
});
