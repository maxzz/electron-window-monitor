import { MainActionsPanel } from "./panel-main-actions";
import { SawHandlePanel } from "./panel-window-handle";
import { SawContentPanel } from "./panel-window-content";
import { MonitoringCounter } from "./panel-monitor";

export function Section2Main() {
    return (
        <div className="relative m-4 min-h-0 flex flex-col text-primary-900">
            <MainActionsPanel />
            <SawHandlePanel />
            <SawContentPanel />
            <MonitoringCounter />
        </div>
    );
} 
