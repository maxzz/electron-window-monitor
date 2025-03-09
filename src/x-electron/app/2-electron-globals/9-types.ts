export type ElectronState = {
    maxControls: number;
    cancelDetection: boolean; // set by client and reset by main
}

export const electronState: ElectronState = {
    maxControls: 0,
    cancelDetection: false,
}
