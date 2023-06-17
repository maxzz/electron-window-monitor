// declare namespace tmApi {
//     function sendNotification(message: string): void;
// }
// vs.
// declare var tmApi: {
//     sendNotification: (message: string) => void
// }

type TmApi = {
    callMain: (data: any) => void;
    invokeMain: (data: any) => any;
    setCbCallFromMain: (callback: (event: /*IpcRendererEvent*/any, data: any) => void) => void;
}

declare var tmApi: TmApi;
