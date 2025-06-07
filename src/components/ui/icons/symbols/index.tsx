import { UISymbolDefsInject } from 'pm-manifest-icons';
import { DefFieldTypes } from 'pm-manifest-icons/src/symbols/field';
import { DefAllOtherTypes } from './all-other';

export * from 'pm-manifest-icons/src/symbols/field';
export * from "./all-other";

export function UISymbolDefs() {
    return (
        <UISymbolDefsInject>
            {DefFieldTypes()}
            {DefAllOtherTypes()}
        </UISymbolDefsInject>
    );
}
