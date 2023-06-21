import { proxy } from 'valtio';

type ClientState = {
    buildCounter: number; // controls detection progress
    buildError: string;   // error message if build failed
    clearBuildResults: () => void,
};

export const clientState = proxy<ClientState>({
    buildCounter: 0,
    buildError: '',
    clearBuildResults() {
        clientState.buildCounter = 0;
        clientState.buildError = '';
    }
});