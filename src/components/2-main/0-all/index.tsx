import { MainActionsPanel } from "../1-panel-actions";
import { PanelHwnd } from "../2-panel-hwnd";
import { SawContentPanel } from "../3-panel-window-content";

export function Section2Main() {
    return (
        <div className="m-4 max-w-2xl min-h-0 text-primary-900 flex flex-col">
            <MainActionsPanel className="w-full" />
            <PanelHwnd className="mt-8 w-full" />
            <SawContentPanel className="w-full" />
        </div>
    );
} 
