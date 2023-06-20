import { proxy } from 'valtio';

type ControlsCheckProgress = {
    foundCounter: number;
};

export const controlsCheckProgress = proxy<ControlsCheckProgress>({
    foundCounter: 0,
});