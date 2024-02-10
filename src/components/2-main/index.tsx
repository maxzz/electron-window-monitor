import { MainActionsPanel } from "./panel-actions";
import { PanelHwnd } from "./panel-hwnd";
import { SawContentPanel } from "./panel-window-content";

export function Section2Main() {
    return (
        <div className="m-4 min-h-0 text-primary-900 flex flex-col">
            <MainActionsPanel className="w-full max-w-xl" />
            <PanelHwnd className="mt-8 w-full max-w-xl" />
            <SawContentPanel className="w-full max-w-xl" />
        </div>
    );
} 
