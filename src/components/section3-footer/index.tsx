import { appUi } from "@/store/app-state";
import { classNames } from "@/utils";
import { useSnapshot } from "valtio";
import { focusClasses } from "../section2-main/shared-styles";
import { useAtomValue, useSetAtom } from "jotai";
import { doHighlightRectAtom } from "@/store/atoms/do-highlight-rect";
import { sawHandleAtom } from "@/store";
import { TargetClientRect } from "@/electron/app/napi-calls";
import { SymbolFieldBtn } from "pm-manifest-icons";

const linkClasses = "px-2 pb-0.5  hover:bg-primary-300 border-primary-500 border border-dotted rounded-sm underline underline-offset-2";

const checkboxClasses = classNames("form-checkbox text-primary-500 bg-primary-400 rounded-sm", focusClasses);

function TestHighlight() {
    const sawHandle = useAtomValue(sawHandleAtom);
    const doHighlightRect = useSetAtom(doHighlightRectAtom);
    if (!sawHandle?.hwnd) {
        return null;
    }
    return (
        <button className={linkClasses} onClick={() => {
            const rect: TargetClientRect = {
                left: 0,
                top: 0,
                right: 640,
                bottom: 480,
            };
            doHighlightRect({ hwnd: sawHandle.hwnd, rect });
        }}>hi</button>
    );
}

export function Section3Footer() {
    const { maxControls, acquireXml } = useSnapshot(appUi.uiState);
    function setValue(value: string) {
        let n = parseInt(value);
        if (isNaN(n)) {
            n = 0;
        }
        appUi.uiState.maxControls = n;
    }
    return (
        <div className="p-4 text-xs flex flex-col space-y-2">
            <div className="text-primary-600 flex items-center space-x-1">
                <div className="">Test web logins:</div>
                <a className={linkClasses} href="https://tailwindui.com/login" target="_blank">tw</a>
                <a className={linkClasses} href="https://www.bankofamerica.com" target="_blank">bofa</a>
                <TestHighlight />
            </div>

            <div className="flex gap-x-4">

                <label className="w-max flex items-center gap-x-2" title="Allowed number of controls before rejecting content detection (0 - unlimited).">
                    <div className="select-none">Max controls</div>
                    <input
                        className={classNames("px-2 py-1 w-20 text-primary-900 bg-primary-300 rounded-sm", focusClasses)}
                        value={maxControls}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </label>

                <SymbolFieldBtn className="w-4 h-4" />

                <label className="w-max flex items-center gap-x-1" title="The get manifest request format: JSON/XML">
                    <input type="checkbox"
                        className={checkboxClasses}
                        checked={acquireXml}
                        onChange={(e) => appUi.uiState.acquireXml = e.target.checked}
                    />
                    <div className="select-none">Get manifest in XML format</div>
                </label>
            </div>
        </div>
    );
}
