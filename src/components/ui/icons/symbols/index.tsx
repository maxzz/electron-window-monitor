//export * from 'pm-manifest-icons';

import { ReactNode } from 'react';
import { DefFieldTypes } from 'pm-manifest-icons/src/symbols/field';

export * from 'pm-manifest-icons/src/symbols/field';

export function UISymbolDefsInject({ children }: { children: ReactNode; }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"
            id="svgfont" aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
        >
            <defs>
                {children}
            </defs>
        </svg>
    );
}

export function UISymbolDefs() {
    return (
        <UISymbolDefsInject>
            {DefFieldTypes()}
        </UISymbolDefsInject>
    );
}
