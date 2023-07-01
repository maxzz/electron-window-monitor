import { addon } from ".";

export function createWindowManifestTest(hwnd: number, wantXml: boolean = false): void {
    const paramsObj = { hwnd: hwnd, wantXml: wantXml };
    const paramsStr = JSON.stringify(paramsObj);

    let collector = new addon.CManifestForWindowCreator();
    collector.create(paramsStr, (err: any, data: string) => {
        if (err) {
            console.error(err);
        }
        else {
            console.log(data);
        }
    });

    // collector.cancel();
}

