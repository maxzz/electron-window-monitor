import { atom } from "jotai";
import { type TestScreenEnum } from "@/store/7-napi-atoms/8-create-mani-tests-w-fetch";
import { type TlwScreenshot } from "@/x-electron/xternal-to-renderer/7-napi-calls";
import { hashedQueryAtom } from "./8-hashed-query";

const testScreenIds: Record<TestScreenEnum, string> = {
    none: '',
    A: 'tests/25.01.16.25/TopLevelWindowsScreenshots.json',
    B: 'tests/25.01.16.25/TopLevelWindowsScreenshots2many.json',
};

export const doLoadFakeScreensAtom = atom(
    null,
    async (get, set, tsId: TestScreenEnum) => {
        const fname = testScreenIds[tsId];
        if (!fname) {
            return [];
        }

        const cnt = await get(hashedQueryAtom(fname)) as TlwScreenshot[]; //console.log('doLoadFakeScreenshotsAtom', fname, cnt);
        return cnt;
    }
);
