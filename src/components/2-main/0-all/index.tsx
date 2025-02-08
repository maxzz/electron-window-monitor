import { MainActionsPanel } from "../1-panel-actions";
import { PanelHwnd } from "../2-panel-saw-hwnd-handle";
import { SawContentPanel } from "../3-panel-window-content";

export function Section2Main() {
    return (
        <div className="p-4 w-full max-w-2xl min-h-0 text-primary-900 flex flex-col">
            <MainActionsPanel className="" />

            <PanelHwnd className="mt-8" />

            <SawContentPanel className="" />
        </div>
    );
} 
