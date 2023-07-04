import { MainActionsPanel } from "./panel-actions";
import { SawHandlePanel } from "./panel-hwnd";
import { SawContentPanel } from "./panel-window-content";

export function Section2Main() {
    return (
        <div className="m-4 min-h-0 text-primary-900 flex flex-col space-y-8">
            <MainActionsPanel />
            <SawHandlePanel />
            <SawContentPanel />
        </div>
    );
} 
