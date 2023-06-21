import { proxy } from 'valtio';

type ClientState = {
    buildCounter: number; // controls detection progress
    buildError: string;   // error message if build failed
};

export const clientState = proxy<ClientState>({
    buildCounter: 0,
    buildError: '',
});