import { UISymbolDefsInject } from "pm-manifest-icons";
import { DefFieldTypes } from "pm-manifest-icons";
import { DefAllOtherTypes } from "./all-other";

export * from "pm-manifest-icons";
export * from "./all-other";

export function UISymbolDefs() {
    return (
        <UISymbolDefsInject>
            {DefFieldTypes()}
            {DefAllOtherTypes()}
        </UISymbolDefsInject>
    );
}
